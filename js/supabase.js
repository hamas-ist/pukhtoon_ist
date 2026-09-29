/**
 * ==============================================================================
 * PUKHTOON COMMUNITY — SUPABASE CLOUD DATABASE ADAPTER
 * Institute of Space Technology (IST), Islamabad
 * ==============================================================================
 * 
 * Active Supabase Project: pukhtoon-society
 * Project URL: https://mhepwlrrtkgprdoywqrt.supabase.co
 */

const SUPABASE_CONFIG = {
  url: localStorage.getItem('pukhtoon_supabase_url') || 'https://mhepwlrrtkgprdoywqrt.supabase.co',
  anonKey: localStorage.getItem('pukhtoon_supabase_key') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oZXB3bHJydGtncHJkb3l3cXJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0NDE0ODYsImV4cCI6MjEwNjAxNzQ4Nn0.Tsx3D7lQ1kwbSWXxBzgtBdqmORUM4_5QURsU9i5axuE',
};

const SupabaseDB = {
  client: null,

  isConfigured() {
    return Boolean(
      SUPABASE_CONFIG.url && 
      SUPABASE_CONFIG.anonKey && 
      window.supabase
    );
  },

  init() {
    if (this.client) return true;
    if (this.isConfigured()) {
      try {
        this.client = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
        console.log('✅ Supabase PostgreSQL Client connected: pukhtoon-society');
        return true;
      } catch (err) {
        console.warn('⚠️ Failed to initialize Supabase client:', err);
        return false;
      }
    }
    return false;
  },

  // Synchronize live Supabase PostgreSQL tables into DataStore (Two-Way Non-Destructive Sync)
  async syncToDataStore() {
    if (!this.init()) return false;
    try {
      const [studentsRes, cyclesRes, eventsRes, expensesRes, auditRes] = await Promise.all([
        this.client.from('students').select('*'),
        this.client.from('contribution_cycles').select('*'),
        this.client.from('events').select('*'),
        this.client.from('expenses').select('*'),
        this.client.from('audit_logs').select('*')
      ]);

      if (typeof DataStore !== 'undefined') {
        const localData = DataStore.load();
        let stateChanged = false;

        // 1. Non-destructive Two-Way Student Sync
        if (studentsRes.data && studentsRes.data.length > 0) {
          if (!localData.students) localData.students = [];
          const cloudStudents = studentsRes.data;

          // Merge cloud students into local array without deleting any local students
          cloudStudents.forEach(cs => {
            const existing = localData.students.find(ls => 
              ls.regNo === cs.reg_no || 
              ls.id === cs.id || 
              ls.supabase_id === cs.id ||
              (ls.fullName && cs.full_name && ls.fullName.toLowerCase().trim() === cs.full_name.toLowerCase().trim())
            );

            if (existing) {
              existing.supabase_id = cs.id;
              if (cs.phone && !existing.phone) existing.phone = cs.phone;
              if (cs.email && !existing.email) existing.email = cs.email;
              if (cs.enrollment_status) existing.status = cs.enrollment_status;
            } else {
              // Add student from cloud to local
              const newLocalStd = {
                id: 'std_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
                supabase_id: cs.id,
                fullName: cs.full_name,
                regNo: cs.reg_no,
                department: cs.department || 'General',
                batch: cs.cohort || '2024-2028',
                contributionFrequency: 'MONTHLY',
                expectedAmountPerCycle: 1000,
                totalContributed: Number(cs.total_contributed || 0),
                outstandingBalance: Number(cs.outstanding_balance || 1000),
                status: cs.enrollment_status || 'ACTIVE',
                email: cs.email || `${cs.reg_no}@ist.edu.pk`,
                phone: cs.phone || '+92 300 0000000',
                joinDate: cs.created_at ? cs.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
                notes: 'Synced from Supabase Cloud'
              };
              localData.students.push(newLocalStd);
              stateChanged = true;
            }
          });

          // Upload any locally added students that are not yet in Supabase cloud!
          for (const ls of localData.students) {
            const inCloud = cloudStudents.some(cs => 
              cs.reg_no === ls.regNo || 
              cs.id === ls.id || 
              cs.id === ls.supabase_id
            );
            if (!inCloud) {
              try {
                const inserted = await this.addStudent(ls);
                if (inserted && inserted.id) {
                  ls.supabase_id = inserted.id;
                  stateChanged = true;
                }
              } catch (err) {
                console.warn('Notice: Local student preserved, cloud sync queued:', err);
              }
            }
          }
        }

        // 2. Non-destructive Cycles Sync
        if (cyclesRes.data && cyclesRes.data.length > 0) {
          if (!localData.cycles) localData.cycles = [];
          cyclesRes.data.forEach(cc => {
            const exists = localData.cycles.find(lc => lc.id === cc.id || lc.name === cc.title);
            if (!exists) {
              localData.cycles.push({
                id: cc.id,
                name: cc.title,
                cycleType: 'MONTHLY',
                targetAmount: Number(cc.target_amount || 0),
                collectedAmount: Number(cc.collected_amount || 0),
                dueDate: cc.deadline,
                status: cc.status
              });
              stateChanged = true;
            }
          });
        }

        // 3. Non-destructive Events Sync
        if (eventsRes.data && eventsRes.data.length > 0) {
          if (!localData.events) localData.events = [];
          eventsRes.data.forEach(ce => {
            const exists = localData.events.find(le => le.id === ce.id || le.title === ce.title);
            if (!exists) {
              localData.events.push({
                id: ce.id,
                title: ce.title,
                date: ce.event_date,
                location: ce.location,
                plannedBudget: Number(ce.planned_budget || 0),
                actualSpending: Number(ce.actual_spending || 0),
                status: ce.status,
                description: ce.description || '',
                leadOrganizer: ce.lead_organizer
              });
              stateChanged = true;
            }
          });
        }

        DataStore.save(localData);
        console.log('✅ Supabase live cloud database successfully merged with local state.');
        
        // Dispatch data sync notification for live views
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('pukhtoon:datasync', { detail: localData }));
        }

        return true;
      }
    } catch (e) {
      console.warn('⚠️ Supabase background sync notice (local data unaffected):', e);
    }
    return false;
  },

  // Fetch all students
  async getStudents() {
    if (!this.init()) return null;
    const { data, error } = await this.client
      .from('students')
      .select('*')
      .order('full_name', { ascending: true });
    return error ? null : data;
  },

  // Add new student
  async addStudent(student) {
    if (!this.init()) return null;
    try {
      const { data, error } = await this.client
        .from('students')
        .insert([{
          reg_no: student.regNo,
          full_name: student.fullName || student.name,
          email: student.email || `${student.regNo}@ist.edu.pk`,
          department: student.department,
          cohort: student.batch || student.cohort,
          phone: student.phone || '',
          enrollment_status: student.status || 'ACTIVE',
          total_contributed: Number(student.totalContributed || 0),
          outstanding_balance: Number(student.outstandingBalance || 0)
        }])
        .select();

      if (error) {
        console.warn('Supabase addStudent error:', error);
        return null;
      }
      return data && data[0] ? data[0] : null;
    } catch (err) {
      console.warn('Supabase addStudent exception:', err);
      return null;
    }
  },

  // Delete student
  async deleteStudent(studentId, regNo) {
    if (!this.init()) return false;
    try {
      let query = this.client.from('students').delete();
      if (regNo) {
        query = query.eq('reg_no', regNo);
      } else if (studentId) {
        query = query.eq('id', studentId);
      }
      const { error } = await query;
      if (error) {
        console.warn('Supabase deleteStudent error:', error);
        return false;
      }
      return true;
    } catch (e) {
      console.warn('Supabase deleteStudent exception:', e);
      return false;
    }
  },

  // Add expense voucher
  async addExpense(expense) {
    if (!this.init()) return null;
    const { data, error } = await this.client
      .from('expenses')
      .insert([{
        event_id: expense.eventId || null,
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
        voucher_ref: expense.voucherRef,
        approved_by: expense.approvedBy,
        spent_at: expense.date || new Date().toISOString().split('T')[0]
      }])
      .select();

    if (error) throw error;
    await this.logAudit('EXPENSE_DISBURSED', expense.approvedBy, `Disbursed PKR ${expense.amount} for ${expense.title}`);
    return data[0];
  },

  // Append audit log
  async logAudit(action, actor, details) {
    if (!this.init()) return null;
    const { data, error } = await this.client
      .from('audit_logs')
      .insert([{ action, actor, details }]);
    return error ? null : data;
  }
};

// Initialize globally and perform background sync
if (typeof window !== 'undefined') {
  window.SupabaseDB = SupabaseDB;
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      if (window.supabase) {
        SupabaseDB.syncToDataStore();
      }
    });
  }
}
