/**
 * ==============================================================================
 * PUKHTOON SOCIETY — SUPABASE CLOUD DATABASE ADAPTER
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

  // Synchronize live Supabase PostgreSQL tables into DataStore
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
        
        if (studentsRes.data && studentsRes.data.length > 0) {
          localData.students = studentsRes.data.map(s => ({
            id: s.id,
            fullName: s.full_name,
            regNo: s.reg_no,
            department: s.department,
            batch: s.cohort,
            phone: s.phone || '',
            status: s.enrollment_status,
            totalContributed: Number(s.total_contributed || 0),
            outstandingBalance: Number(s.outstanding_balance || 0),
            email: s.email,
            contributionFrequency: 'MONTHLY',
            expectedAmountPerCycle: 1000
          }));
        }

        if (eventsRes.data && eventsRes.data.length > 0) {
          localData.events = eventsRes.data.map(e => ({
            id: e.id,
            title: e.title,
            date: e.event_date,
            location: e.location,
            plannedBudget: Number(e.planned_budget || 0),
            actualSpending: Number(e.actual_spending || 0),
            status: e.status,
            description: e.description || '',
            leadOrganizer: e.lead_organizer
          }));
        }

        if (cyclesRes.data && cyclesRes.data.length > 0) {
          localData.cycles = cyclesRes.data.map(c => ({
            id: c.id,
            title: c.title,
            academicTerm: c.academic_term,
            targetAmount: Number(c.target_amount || 0),
            collectedAmount: Number(c.collected_amount || 0),
            deadline: c.deadline,
            status: c.status
          }));
        }

        if (auditRes.data && auditRes.data.length > 0) {
          localData.auditLogs = auditRes.data.map(a => ({
            id: a.id,
            action: a.action,
            actor: a.actor,
            details: a.details,
            timestamp: a.created_at
          }));
        }

        DataStore.save(localData);
        console.log('✅ Supabase live cloud database successfully synced to local state.');
        return true;
      }
    } catch (e) {
      console.warn('⚠️ Supabase background sync notice:', e);
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
    const { data, error } = await this.client
      .from('students')
      .insert([{
        reg_no: student.regNo,
        full_name: student.fullName || student.name,
        email: student.email,
        department: student.department,
        cohort: student.batch || student.cohort,
        phone: student.phone || '',
        enrollment_status: student.status || 'ACTIVE',
        total_contributed: student.totalContributed || 0,
        outstanding_balance: student.outstandingBalance || 0
      }])
      .select();

    if (error) throw error;
    await this.logAudit('STUDENT_ENROLLED', 'Council Officer', `Enrolled ${student.fullName} (${student.regNo})`);
    return data[0];
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
  document.addEventListener('DOMContentLoaded', () => {
    if (window.supabase) {
      SupabaseDB.syncToDataStore();
    }
  });
}
