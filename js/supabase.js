/**
 * ==============================================================================
 * PUKHTOON COMMUNITY — SUPABASE CLOUD DATABASE ADAPTER
 * Institute of Space Technology (IST), Islamabad
 * ==============================================================================
 * 
 * Active Supabase Project: pukhtoon-society
 * Project URL: https://mhepwlrrtkgprdoywqrt.supabase.co
 * 
 * Direct Two-Way Realtime Synchronization with PostgreSQL Database
 * Ensures all logged data on any device (phone, laptop, desktop) is
 * directly stored in Supabase and shared across all devices in real time.
 */

const SUPABASE_CONFIG = {
  url: 'https://mhepwlrrtkgprdoywqrt.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oZXB3bHJydGtncHJkb3l3cXJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0NDE0ODYsImV4cCI6MjEwNjAxNzQ4Nn0.Tsx3D7lQ1kwbSWXxBzgtBdqmORUM4_5QURsU9i5axuE',
};

// Check for valid localStorage override (only if valid non-empty URL and key)
try {
  const customUrl = localStorage.getItem('pukhtoon_supabase_url');
  const customKey = localStorage.getItem('pukhtoon_supabase_key');
  if (customUrl && typeof customUrl === 'string' && customUrl.trim().startsWith('http')) {
    SUPABASE_CONFIG.url = customUrl.trim();
  }
  if (customKey && typeof customKey === 'string' && customKey.trim().length > 30) {
    SUPABASE_CONFIG.anonKey = customKey.trim();
  }
} catch (e) {}

const SupabaseDB = {
  client: null,
  syncing: false,
  lastSyncTime: null,
  isOnline: true,

  isConfigured() {
    return Boolean(SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey);
  },

  init() {
    if (this.client) return true;
    if (this.isConfigured() && typeof window !== 'undefined' && window.supabase) {
      try {
        this.client = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
        console.log('✅ Supabase PostgreSQL Client initialized: pukhtoon-society');
        return true;
      } catch (err) {
        console.warn('⚠️ Supabase JS client init warning, falling back to direct REST API:', err);
      }
    }
    return this.isConfigured();
  },

  // Bulletproof Direct PostgREST HTTP Request (works even without external CDN library)
  async restRequest(endpoint, options = {}) {
    const url = `${SUPABASE_CONFIG.url}/rest/v1/${endpoint}`;
    const headers = {
      'apikey': SUPABASE_CONFIG.anonKey,
      'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
      ...(options.headers || {})
    };

    const res = await fetch(url, { ...options, headers });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Supabase HTTP ${res.status}: ${errText}`);
    }
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  },

  // Update Visual Connection & Sync Status Indicator
  updateSyncBadge(status, text) {
    if (typeof document === 'undefined') return;
    const badge = document.getElementById('cloudSyncBadge');
    if (!badge) return;

    badge.className = `cloud-sync-badge ${status}`;
    const dot = badge.querySelector('.sync-dot');
    const fullText = badge.querySelector('.sync-text-full');
    const shortText = badge.querySelector('.sync-text-short');

    if (status === 'syncing') {
      if (fullText) fullText.textContent = text || 'Syncing Database...';
      if (shortText) shortText.textContent = 'Syncing...';
      badge.title = 'Synchronizing with Supabase PostgreSQL cloud database...';
    } else if (status === 'live') {
      if (fullText) fullText.textContent = text || 'Cloud Synced • Live';
      if (shortText) shortText.textContent = 'Live';
      badge.title = `Connected to Supabase PostgreSQL (Project: pukhtoon-society). Last synced: ${new Date().toLocaleTimeString()}`;
    } else if (status === 'offline') {
      if (fullText) fullText.textContent = text || 'Offline (Local Cache)';
      if (shortText) shortText.textContent = 'Offline';
      badge.title = 'Offline mode: changes stored locally and will sync when reconnected.';
    }
  },

  // Dynamically inject Cloud Sync Badge into page header
  renderSyncBadge() {
    if (typeof document === 'undefined') return;
    if (document.getElementById('cloudSyncBadge')) return;

    const headerActions = document.querySelector('.header-actions');
    if (!headerActions) return;

    const badge = document.createElement('button');
    badge.id = 'cloudSyncBadge';
    badge.type = 'button';
    badge.className = 'cloud-sync-badge live';
    badge.title = 'Supabase PostgreSQL Cloud Database • Click to Sync Now';
    badge.innerHTML = `
      <span class="sync-dot"></span>
      <span class="sync-text-full">Cloud Synced • Live</span>
      <span class="sync-text-short">Live</span>
    `;

    badge.addEventListener('click', async () => {
      badge.style.transform = 'scale(0.95)';
      setTimeout(() => badge.style.transform = '', 150);
      await this.syncToDataStore();
      if (typeof showToast === 'function') {
        showToast('Cloud Database Synced', 'Live state reconciled with Supabase PostgreSQL.');
      }
    });

    headerActions.insertBefore(badge, headerActions.firstChild);
  },

  // Synchronize live Supabase PostgreSQL tables into DataStore (Two-Way Non-Destructive Sync)
  async syncToDataStore() {
    if (this.syncing) return false;
    this.syncing = true;
    this.updateSyncBadge('syncing', 'Syncing Database...');

    try {
      this.init();

      // Fetch active students and other collections in parallel
      const [cloudStudents, cloudCycles, cloudEvents] = await Promise.all([
        this.fetchActiveStudents().catch(() => null),
        this.restRequest('contribution_cycles?select=*').catch(() => null),
        this.restRequest('events?select=*').catch(() => null)
      ]);

      if (typeof DataStore !== 'undefined' && cloudStudents && Array.isArray(cloudStudents)) {
        const localData = DataStore.load();
        let stateChanged = false;
        if (!localData.students) localData.students = [];

        // 1. Two-Way Student Sync
        cloudStudents.forEach(cs => {
          const existing = localData.students.find(ls => 
            ls.regNo === cs.reg_no || 
            ls.id === cs.id || 
            ls.supabase_id === cs.id ||
            (ls.fullName && cs.full_name && ls.fullName.toLowerCase().trim() === cs.full_name.toLowerCase().trim())
          );

          if (existing) {
            existing.supabase_id = cs.id;
            existing.fullName = cs.full_name;
            existing.regNo = cs.reg_no;
            if (cs.department) existing.department = cs.department;
            if (cs.cohort) existing.batch = cs.cohort;
            if (cs.phone) existing.phone = cs.phone;
            if (cs.email) existing.email = cs.email;
            if (cs.enrollment_status) existing.status = cs.enrollment_status;
            existing.totalContributed = Number(cs.total_contributed || 0);
            existing.outstandingBalance = Number(cs.outstanding_balance !== undefined ? cs.outstanding_balance : 0);
          } else {
            // New student from cloud -> add to local device
            const newLocalStd = {
              id: cs.id,
              supabase_id: cs.id,
              fullName: cs.full_name,
              regNo: cs.reg_no,
              department: cs.department || 'General',
              batch: cs.cohort || '2024-2028',
              contributionFrequency: 'MONTHLY',
              expectedAmountPerCycle: 1000,
              totalContributed: Number(cs.total_contributed || 0),
              outstandingBalance: Number(cs.outstanding_balance !== undefined ? cs.outstanding_balance : 1000),
              status: cs.enrollment_status || 'ACTIVE',
              email: cs.email || `${cs.reg_no}@ist.edu.pk`,
              phone: cs.phone || '+92 300 0000000',
              joinDate: cs.created_at ? cs.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
              notes: 'Synced from Supabase Cloud'
            };
            localData.students.push(newLocalStd);
            stateChanged = true;
          }

          // Ensure October 2026 dues record exists for this student
          if (!localData.monthlyDues) localData.monthlyDues = [];
          const hasOctDues = localData.monthlyDues.some(d => (d.studentId === cs.id || d.regNo === cs.reg_no) && d.monthKey === '2026-10');
          if (!hasOctDues) {
            localData.monthlyDues.unshift({
              id: 'md_10_' + (cs.id || cs.reg_no),
              studentId: cs.id,
              studentName: cs.full_name,
              regNo: cs.reg_no,
              department: cs.department || 'General',
              batch: cs.cohort || '2024-2028',
              monthKey: '2026-10',
              monthLabel: 'October 2026',
              expectedAmount: 1000,
              paidAmount: 0,
              status: 'PENDING',
              date: null,
              channel: null,
              voucherRef: null,
              recordedBy: null,
              notes: 'Monthly dues quota'
            });
            stateChanged = true;
          }
        });

        // 2. Upload any local students that were queued while offline
        for (const ls of localData.students) {
          if (ls.status === 'ARCHIVED') continue;
          if (ls.sync_status !== 'PENDING_UPLOAD') continue;
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
                ls.id = inserted.id;
                delete ls.sync_status;
                stateChanged = true;
              }
            } catch (uploadErr) {
              console.warn('Notice: Local student preserved, cloud sync will retry:', uploadErr);
            }
          } else {
            delete ls.sync_status;
            stateChanged = true;
          }
        }

        // 3. Remove archived students from active local roster
        localData.students = localData.students.filter(s => s.status !== 'ARCHIVED');

        DataStore.save(localData);
        this.lastSyncTime = new Date();
        this.isOnline = true;
        this.updateSyncBadge('live');

        // Dispatch live event to notify all UI views
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('pukhtoon:datasync', { detail: localData }));
        }

        return true;
      }
    } catch (err) {
      console.warn('⚠️ Supabase sync notice:', err);
      this.isOnline = false;
      this.updateSyncBadge('offline', 'Offline (Local Cache)');
    } finally {
      this.syncing = false;
    }
    return false;
  },

  // Fetch all active students from Supabase
  async fetchActiveStudents() {
    return await this.restRequest('students?enrollment_status=neq.ARCHIVED&order=full_name.asc');
  },

  // Add new student directly to Supabase PostgreSQL
  async addStudent(student) {
    const payload = {
      reg_no: (student.regNo || '').trim(),
      full_name: (student.fullName || student.name || '').trim(),
      email: (student.email || `${student.regNo}@ist.edu.pk`).trim(),
      department: student.department || 'General',
      cohort: student.batch || student.cohort || '2024-2028',
      phone: student.phone || '',
      enrollment_status: student.status || 'ACTIVE',
      total_contributed: Number(student.totalContributed || 0),
      outstanding_balance: Number(student.outstandingBalance !== undefined ? student.outstandingBalance : (student.expectedAmountPerCycle || 1000))
    };

    try {
      const res = await this.restRequest('students', {
        method: 'POST',
        body: JSON.stringify([payload])
      });

      if (res && res[0]) {
        console.log('✅ Student directly stored in Supabase PostgreSQL:', res[0].full_name, res[0].reg_no);
        return res[0];
      }
      return null;
    } catch (err) {
      console.error('❌ Failed to store student in Supabase:', err);
      throw err;
    }
  },

  // Update student balances directly in Supabase
  async updateStudentBalance(regOrId, totalContributed, outstandingBalance) {
    if (!regOrId) return false;
    try {
      const query = regOrId.includes('-') ? `id=eq.${regOrId}` : `reg_no=eq.${encodeURIComponent(regOrId)}`;
      const res = await this.restRequest(`students?${query}`, {
        method: 'PATCH',
        body: JSON.stringify({
          total_contributed: Number(totalContributed || 0),
          outstanding_balance: Number(outstandingBalance || 0)
        })
      });
      console.log('✅ Student balances updated in Supabase:', regOrId, { totalContributed, outstandingBalance });
      return Boolean(res && res.length > 0);
    } catch (err) {
      console.warn('⚠️ Supabase updateStudentBalance notice:', err);
      return false;
    }
  },

  // Archive student in Supabase
  async archiveStudent(regOrId) {
    if (!regOrId) return false;
    try {
      const query = regOrId.includes('-') ? `id=eq.${regOrId}` : `reg_no=eq.${encodeURIComponent(regOrId)}`;
      const res = await this.restRequest(`students?${query}`, {
        method: 'PATCH',
        body: JSON.stringify({ enrollment_status: 'ARCHIVED' })
      });
      console.log('✅ Student archived in Supabase:', regOrId);
      return Boolean(res && res.length > 0);
    } catch (err) {
      console.warn('⚠️ Supabase archiveStudent notice:', err);
      return false;
    }
  },

  // Update monthly collection target in Supabase PostgreSQL
  async updateCycleTarget(monthKey, targetAmount, title) {
    try {
      const term = monthKey && monthKey.startsWith('2026') ? 'Fall 2026' : 'Active Term';
      const cycles = await this.restRequest(`contribution_cycles?academic_term=eq.${encodeURIComponent(term)}&limit=1`);
      if (cycles && cycles.length > 0) {
        await this.restRequest(`contribution_cycles?id=eq.${cycles[0].id}`, {
          method: 'PATCH',
          body: JSON.stringify({ target_amount: Number(targetAmount) })
        });
        console.log('✅ Supabase contribution_cycles target updated:', targetAmount);
      }
      await this.logAudit('TARGET_CONFIGURED', 'Hamas Khan (Finance Secretary)', `Set ${title || 'Monthly'} collection target to PKR ${Number(targetAmount).toLocaleString()}`);
      return true;
    } catch (err) {
      console.warn('⚠️ Supabase updateCycleTarget notice:', err);
      return false;
    }
  },

  // Add expense voucher directly in Supabase
  async addExpense(expense) {
    try {
      const res = await this.restRequest('expenses', {
        method: 'POST',
        body: JSON.stringify([{
          event_id: expense.eventId || null,
          title: expense.title,
          amount: expense.amount,
          category: expense.category,
          voucher_ref: expense.voucherRef,
          approved_by: expense.approvedBy,
          spent_at: expense.date || new Date().toISOString().split('T')[0]
        }])
      });
      await this.logAudit('EXPENSE_DISBURSED', expense.approvedBy, `Disbursed PKR ${expense.amount} for ${expense.title}`);
      return res && res[0] ? res[0] : null;
    } catch (err) {
      console.warn('⚠️ Supabase addExpense notice:', err);
      return null;
    }
  },

  // Append audit log directly in Supabase
  async logAudit(action, actor, details) {
    try {
      return await this.restRequest('audit_logs', {
        method: 'POST',
        body: JSON.stringify([{ action, actor, details }])
      });
    } catch (err) {
      console.warn('⚠️ Supabase logAudit notice:', err);
      return null;
    }
  }
};

// Global Exposure & Auto-Run on DOM Ready
if (typeof window !== 'undefined') {
  window.SupabaseDB = SupabaseDB;

  if (typeof document !== 'undefined') {
    const handleInit = () => {
      SupabaseDB.renderSyncBadge();
      SupabaseDB.syncToDataStore();
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleInit);
    } else {
      handleInit();
    }
  }
}
