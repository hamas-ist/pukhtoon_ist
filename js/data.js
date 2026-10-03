/**
 * PUKHTOON COMMUNITY — IST ISLAMABAD
 * Core Data Engine & LocalStorage State Synchronizer
 * Clean slate configured for live student data injection & dynamic monthly collection target.
 */

const PUKHTOON_STORAGE_KEY = 'pukhtoon_community_data_v4';

const DEFAULT_IST_DATA = {
  departments: [
    'Aerospace Engineering',
    'Avionics Engineering',
    'Computer Science',
    'Electrical Engineering',
    'Materials Science & Engineering',
    'Space Science',
    'Mechanical Engineering',
    'Mathematics'
  ],

  batches: ['2021-2025', '2022-2026', '2023-2027', '2024-2028', '2025-2029'],

  // Active Monthly & Custom Contribution Cycles
  cycles: [
    {
      id: 'cyc_oct_2026',
      name: 'Fall 2026 Monthly Dues — October',
      cycleType: 'MONTHLY',
      monthKey: '2026-10',
      targetAmount: 50000,
      collectedAmount: 0,
      startDate: '2026-10-01',
      dueDate: '2026-10-31',
      status: 'ACTIVE'
    }
  ],

  // Live Student Members (Empty — ready for real student data injection)
  students: [],

  // Live Monthly Dues Records (Empty — generated dynamically as students are enrolled/collected)
  monthlyDues: [],

  // Live Community Events (Empty — ready for scheduled events)
  events: [],

  // Live Expense Vouchers (Empty — ready for real vouchers)
  expenses: [],

  // Double-Entry Master Transactions Ledger (Empty — recorded on real payments/expenses)
  transactions: [],

  // Executive Council Access & RBAC Accounts (Hamas Khan Super Admin)
  organizers: [
    {
      id: 'org_01',
      name: 'Hamas Khan',
      role: 'Super Admin',
      societyTitle: 'Super Admin (Finance Secretary)',
      email: 'hamas.khan@ist.edu.pk',
      username: 'hamaskhan',
      regNo: '210101001',
      department: 'Aerospace Engineering',
      appointedDate: '2025-09-01'
    },
    {
      id: 'org_02',
      name: 'Huzaifa Tariq',
      role: 'President',
      societyTitle: 'President',
      email: 'huzaifa.tariq@ist.edu.pk',
      username: 'huzaifatariq',
      regNo: '210101002',
      department: 'Electrical Engineering',
      appointedDate: '2025-09-01'
    },
    {
      id: 'org_03',
      name: 'Maaz Muhammad',
      role: 'Vice President',
      societyTitle: 'Vice President',
      email: 'maaz.muhammad@ist.edu.pk',
      username: 'maazmuhammad',
      regNo: '220101003',
      department: 'Computer Science',
      appointedDate: '2025-09-01'
    },
    {
      id: 'org_04',
      name: 'Misbah Ullah',
      role: 'General Secretary',
      societyTitle: 'General Secretary',
      email: 'misbah.ullah@ist.edu.pk',
      username: 'misbahullah',
      regNo: '220101004',
      department: 'Avionics Engineering',
      appointedDate: '2025-09-01'
    }
  ],

  auditLogs: [
    {
      id: 'aud_init',
      action: 'SYSTEM_INITIALIZED',
      actor: 'Hamas Khan (Super Admin)',
      details: 'Pukhtoon Community Portal ready for live student data injection',
      timestamp: '2026-10-01T00:00:00Z'
    }
  ]
};

// Data Store Accessor
const DataStore = {
  load() {
    try {
      // Clear legacy storage keys if present to ensure no stale dummy data persists
      ['pukhtoon_community_data_v1', 'pukhtoon_community_data_v2', 'pukhtoon_community_data_v3'].forEach(k => {
        try { localStorage.removeItem(k); } catch (e) {}
      });

      const stored = localStorage.getItem(PUKHTOON_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        let updated = false;

        // Ensure cycles array exists and has active October cycle
        if (!parsed.cycles || !Array.isArray(parsed.cycles) || parsed.cycles.length === 0) {
          parsed.cycles = JSON.parse(JSON.stringify(DEFAULT_IST_DATA.cycles));
          updated = true;
        } else if (!parsed.cycles.some(c => c.monthKey === '2026-10' || c.id === 'cyc_oct_2026')) {
          parsed.cycles.unshift(JSON.parse(JSON.stringify(DEFAULT_IST_DATA.cycles[0])));
          updated = true;
        }

        // Ensure metadata lists
        if (!parsed.departments || !Array.isArray(parsed.departments)) {
          parsed.departments = JSON.parse(JSON.stringify(DEFAULT_IST_DATA.departments));
          updated = true;
        }
        if (!parsed.batches || !Array.isArray(parsed.batches)) {
          parsed.batches = JSON.parse(JSON.stringify(DEFAULT_IST_DATA.batches));
          updated = true;
        }
        if (!parsed.organizers || !Array.isArray(parsed.organizers)) {
          parsed.organizers = JSON.parse(JSON.stringify(DEFAULT_IST_DATA.organizers));
          updated = true;
        }

        // Ensure data arrays exist
        if (!Array.isArray(parsed.students)) { parsed.students = []; updated = true; }
        if (!Array.isArray(parsed.monthlyDues)) { parsed.monthlyDues = []; updated = true; }
        if (!Array.isArray(parsed.events)) { parsed.events = []; updated = true; }
        if (!Array.isArray(parsed.expenses)) { parsed.expenses = []; updated = true; }
        if (!Array.isArray(parsed.transactions)) { parsed.transactions = []; updated = true; }
        if (!Array.isArray(parsed.auditLogs)) { parsed.auditLogs = []; updated = true; }

        if (updated) {
          this.save(parsed);
        }
        return parsed;
      }
    } catch (e) {
      console.warn('LocalStorage error, using default state', e);
    }
    this.save(DEFAULT_IST_DATA);
    return JSON.parse(JSON.stringify(DEFAULT_IST_DATA));
  },

  save(data) {
    try {
      localStorage.setItem(PUKHTOON_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  },

  reset() {
    localStorage.removeItem(PUKHTOON_STORAGE_KEY);
    return this.load();
  },

  /**
   * Set how much money should be collected for this month in figures (PKR)
   * Dynamically updates cycle target, logs audit, and synchronizes to Supabase.
   */
  setMonthlyTarget(amount, monthKey = '2026-10') {
    const numAmount = Math.max(0, parseInt(amount, 10) || 0);
    const data = this.load();
    if (!data.cycles) data.cycles = [];

    let cycle = data.cycles.find(c => c.monthKey === monthKey || (monthKey === '2026-10' && c.id === 'cyc_oct_2026'));
    if (cycle) {
      cycle.targetAmount = numAmount;
    } else {
      const monthNames = {
        '2026-10': 'October', '2026-11': 'November', '2026-12': 'December',
        '2026-09': 'September', '2027-01': 'January 2027'
      };
      const label = monthNames[monthKey] || monthKey;
      cycle = {
        id: 'cyc_' + monthKey.replace('-', '_'),
        name: `Monthly Dues Collection — ${label}`,
        cycleType: 'MONTHLY',
        monthKey: monthKey,
        targetAmount: numAmount,
        collectedAmount: 0,
        startDate: `${monthKey}-01`,
        dueDate: `${monthKey}-28`,
        status: 'ACTIVE'
      };
      data.cycles.unshift(cycle);
    }

    const actor = (typeof Auth !== 'undefined' && Auth.getUser()) ? Auth.getUser().name : 'Hamas Khan (Super Admin)';
    const formattedAmount = (typeof formatPKR === 'function') ? formatPKR(numAmount) : 'PKR ' + numAmount.toLocaleString();
    data.auditLogs.unshift({
      id: 'aud_' + Date.now(),
      action: 'TARGET_CONFIGURED',
      actor: actor,
      details: `Configured monthly collection target for ${monthKey} to ${formattedAmount}`,
      timestamp: new Date().toISOString()
    });

    this.save(data);

    // Synchronize to Supabase Cloud contribution_cycles
    if (typeof window !== 'undefined' && window.SupabaseDB && typeof window.SupabaseDB.updateCycleTarget === 'function') {
      window.SupabaseDB.updateCycleTarget(monthKey, numAmount, cycle.name).catch(err => {
        console.warn('Supabase cycle target update notice:', err);
      });
      if (typeof window.SupabaseDB.logAudit === 'function') {
        window.SupabaseDB.logAudit('TARGET_CONFIGURED', actor, `Configured target for ${monthKey} to ${formattedAmount}`).catch(() => {});
      }
    }

    return cycle;
  },

  getMonthlyTarget(monthKey = '2026-10') {
    const data = this.load();
    const cycle = (data.cycles || []).find(c => c.monthKey === monthKey || (monthKey === '2026-10' && c.id === 'cyc_oct_2026'));
    if (cycle && cycle.targetAmount !== undefined && cycle.targetAmount !== null) {
      return Number(cycle.targetAmount);
    }
    return 1000;
  },

  getAvailableBillingMonths() {
    const data = this.load();
    const monthMap = new Map();
    monthMap.set('2026-10', 'October 2026');
    monthMap.set('2026-11', 'November 2026');
    monthMap.set('2026-12', 'December 2026');
    monthMap.set('2026-09', 'September 2026');
    monthMap.set('2026-08', 'August 2026');
    (data.cycles || []).forEach(c => {
      if (c.monthKey && !monthMap.has(c.monthKey)) {
        const parts = (c.name || '').split('—');
        monthMap.set(c.monthKey, parts[1] ? parts[1].trim() : c.monthKey);
      }
    });
    (data.monthlyDues || []).forEach(d => {
      if (d.monthKey && !monthMap.has(d.monthKey)) {
        monthMap.set(d.monthKey, d.monthLabel || d.monthKey);
      }
    });
    return Array.from(monthMap.entries()).map(([key, label]) => ({ key, label }));
  },

  getMonthlyDuesSummary(monthKey) {
    const data = this.load();
    const dues = data.monthlyDues || [];
    const activeKey = monthKey || '2026-10';
    const monthRecords = dues.filter(d => d.monthKey === activeKey);

    const matchingCycle = (data.cycles || []).find(c => c.monthKey === activeKey || (activeKey === '2026-10' && c.id === 'cyc_oct_2026'));
    const targetAmount = matchingCycle ? Number(matchingCycle.targetAmount) : 50000;
    
    const collectedAmount = monthRecords.reduce((sum, r) => sum + (r.paidAmount || 0), 0);
    const pendingAmount = monthRecords.reduce((sum, r) => sum + (r.status === 'PENDING' ? ((r.expectedAmount || targetAmount || 1000) - (r.paidAmount || 0)) : 0), 0);
    const paidCount = monthRecords.filter(r => r.status === 'PAID').length;
    const pendingCount = monthRecords.filter(r => r.status === 'PENDING').length;
    const totalAssessed = monthRecords.length;
    const progressPct = targetAmount > 0 ? Math.min(100, Math.round((collectedAmount / targetAmount) * 100)) : 0;

    // Distinct available months with labels
    const monthMap = new Map();
    // Always guarantee October 2026 exists
    monthMap.set('2026-10', 'October 2026');
    (data.cycles || []).forEach(c => {
      if (c.monthKey && !monthMap.has(c.monthKey)) {
        const parts = (c.name || '').split('—');
        monthMap.set(c.monthKey, parts[1] ? parts[1].trim() : c.monthKey);
      }
    });
    dues.forEach(d => {
      if (d.monthKey && !monthMap.has(d.monthKey)) {
        monthMap.set(d.monthKey, d.monthLabel || d.monthKey);
      }
    });

    const availableMonths = Array.from(monthMap.entries())
      .map(([key, label]) => ({ key, label }))
      .sort((a, b) => b.key.localeCompare(a.key));

    const monthNames = {
      '2026-10': 'October 2026',
      '2026-11': 'November 2026',
      '2026-12': 'December 2026',
      '2026-09': 'September 2026',
      '2026-08': 'August 2026'
    };
    const monthLabel = monthRecords[0]?.monthLabel || monthNames[activeKey] || (matchingCycle ? matchingCycle.name.split('—')[1]?.trim() : activeKey);

    return {
      monthKey: activeKey,
      monthLabel,
      cycle: matchingCycle,
      targetAmount,
      collectedAmount,
      pendingAmount,
      paidCount,
      pendingCount,
      totalAssessed,
      progressPct,
      records: monthRecords,
      availableMonths
    };
  },

  getStudentMonthlyDues(studentId) {
    const data = this.load();
    const dues = data.monthlyDues || [];
    const student = (data.students || []).find(s => s.id === studentId || s.regNo === studentId);
    if (!student) {
      return { student: null, records: [], totalPaid: 0, totalExpected: 0, paidMonthsCount: 0, pendingMonthsCount: 0 };
    }

    const records = dues.filter(d => d.studentId === student.id || d.regNo === student.regNo)
      .sort((a, b) => b.monthKey.localeCompare(a.monthKey));

    const totalPaid = records.reduce((sum, r) => sum + (r.paidAmount || 0), 0);
    const totalExpected = records.reduce((sum, r) => sum + (r.expectedAmount || 0), 0);
    const paidMonthsCount = records.filter(r => r.status === 'PAID').length;
    const pendingMonthsCount = records.filter(r => r.status === 'PENDING').length;

    return {
      student,
      records,
      totalPaid,
      totalExpected,
      paidMonthsCount,
      pendingMonthsCount
    };
  },

  recordMonthlyPayment(payload) {
    const data = this.load();
    const { studentId, monthKey, amount, channel, notes, officer } = payload;
    const dues = data.monthlyDues || [];
    const student = (data.students || []).find(s => s.id === studentId || s.regNo === studentId);
    const officerName = officer || 'Hamas Khan (Finance Secretary)';
    const txnRef = 'TXN-2026-' + Math.floor(200 + Math.random() * 800);
    const today = new Date().toISOString().split('T')[0];

    let record = dues.find(d => (d.studentId === studentId || d.regNo === studentId) && d.monthKey === monthKey);

    const monthNames = {
      '2026-10': 'October 2026',
      '2026-09': 'September 2026',
      '2026-08': 'August 2026',
      '2026-07': 'July 2026',
      '2026-06': 'June 2026',
      '2026-05': 'May 2026'
    };
    const monthLabel = monthNames[monthKey] || monthKey;

    if (record) {
      record.paidAmount = amount;
      record.status = 'PAID';
      record.date = today;
      record.channel = channel;
      record.voucherRef = txnRef;
      record.recordedBy = officerName;
      if (notes) record.notes = notes;
    } else if (student) {
      record = {
        id: 'md_' + Date.now(),
        studentId: student.id,
        studentName: student.fullName,
        regNo: student.regNo,
        department: student.department,
        batch: student.batch,
        monthKey: monthKey,
        monthLabel: monthLabel,
        expectedAmount: amount,
        paidAmount: amount,
        status: 'PAID',
        date: today,
        channel: channel,
        voucherRef: txnRef,
        recordedBy: officerName,
        notes: notes || 'Monthly dues payment'
      };
      dues.unshift(record);
    }
    data.monthlyDues = dues;

    // Update student totals
    if (student) {
      student.totalContributed = (student.totalContributed || 0) + amount;
      student.outstandingBalance = Math.max(0, (student.outstandingBalance || 0) - amount);
    }

    // Update cycle collected amount if active
    const cycle = (data.cycles || []).find(c => c.monthKey === monthKey);
    if (cycle) {
      cycle.collectedAmount = (cycle.collectedAmount || 0) + amount;
    }

    // Append Inflow Transaction
    if (!data.transactions) data.transactions = [];
    data.transactions.unshift({
      id: 'txn_' + Date.now(),
      transactionRef: txnRef,
      date: today,
      description: `Monthly Pool Dues (${channel}) — ${student ? student.fullName : 'Student'} (${monthLabel})`,
      amount: amount,
      type: 'INFLOW',
      category: 'Student Dues',
      recordedBy: officerName
    });

    // Append Audit Log
    const formattedAmount = (typeof formatPKR === 'function') ? formatPKR(amount) : 'PKR ' + amount.toLocaleString();
    if (!data.auditLogs) data.auditLogs = [];
    data.auditLogs.unshift({
      id: 'aud_' + Date.now(),
      action: 'DUES_RECORDED',
      actor: officerName,
      details: `Reconciled ${formattedAmount} for ${student ? student.fullName : ''} (${monthLabel})`,
      timestamp: new Date().toISOString()
    });

    this.save(data);

    // Direct synchronization to Supabase PostgreSQL cloud database
    if (typeof window !== 'undefined' && window.SupabaseDB) {
      if (student) {
        window.SupabaseDB.updateStudentBalance(
          student.supabase_id || student.id || student.regNo,
          student.totalContributed,
          student.outstandingBalance
        ).catch(err => console.warn('Supabase balance update notice:', err));
      }
      window.SupabaseDB.logAudit(
        'DUES_RECORDED',
        officerName,
        `Reconciled ${formattedAmount} for ${student ? student.fullName : ''} (${monthLabel})`
      ).catch(err => console.warn('Supabase audit notice:', err));
    }

    return { record, student, txnRef };
  },

  async addStudentAsync(studentData) {
    const data = this.load();
    if (!data.students) data.students = [];

    // Check for existing student by regNo (case-insensitive)
    const existing = data.students.find(s => s.regNo.toLowerCase() === studentData.regNo.toLowerCase());
    if (existing) {
      return { student: existing, isNew: false, cloudSaved: true };
    }

    const monthKey = studentData.monthKey || '2026-10';
    const monthNames = {
      '2026-10': 'October 2026',
      '2026-11': 'November 2026',
      '2026-12': 'December 2026',
      '2026-09': 'September 2026',
      '2026-08': 'August 2026'
    };
    const monthLabel = monthNames[monthKey] || monthKey;

    // Dynamically resolve target amount for this month if not explicitly specified
    const monthlyTarget = this.getMonthlyTarget(monthKey);
    const quota = (studentData.expectedAmountPerCycle !== undefined && studentData.expectedAmountPerCycle !== null && !isNaN(studentData.expectedAmountPerCycle) && Number(studentData.expectedAmountPerCycle) > 0)
      ? Number(studentData.expectedAmountPerCycle)
      : monthlyTarget;

    const isPaidNow = (studentData.paymentStatus === 'PAID');
    const paymentAmount = isPaidNow ? (Number(studentData.paidAmount) || quota) : 0;
    const paymentChannel = studentData.paymentChannel || 'Cash Handover';
    const txnRef = isPaidNow ? ('TXN-2026-' + Math.floor(200 + Math.random() * 800)) : null;
    const today = new Date().toISOString().split('T')[0];
    const actor = (typeof Auth !== 'undefined' && Auth.getUser()) ? Auth.getUser().name : 'Hamas Khan (Finance Secretary)';

    const newStudent = {
      id: 'std_' + Date.now(),
      fullName: studentData.fullName,
      regNo: studentData.regNo,
      department: studentData.department,
      batch: studentData.batch,
      contributionFrequency: 'MONTHLY',
      expectedAmountPerCycle: quota,
      totalContributed: isPaidNow ? paymentAmount : 0,
      outstandingBalance: isPaidNow ? Math.max(0, quota - paymentAmount) : quota,
      status: studentData.status || 'ACTIVE',
      email: studentData.email || `${studentData.regNo}@ist.edu.pk`,
      phone: studentData.phone || '+92 300 0000000',
      joinDate: studentData.joinDate || today,
      notes: studentData.notes || 'Enrolled member'
    };

    // 1. Direct Cloud Persistence to Supabase PostgreSQL
    let cloudSaved = false;
    if (typeof window !== 'undefined' && window.SupabaseDB && typeof window.SupabaseDB.addStudent === 'function') {
      try {
        const created = await window.SupabaseDB.addStudent(newStudent);
        if (created && created.id) {
          newStudent.id = created.id;
          newStudent.supabase_id = created.id;
          cloudSaved = true;
          console.log('✅ Student persisted directly in Supabase Cloud:', newStudent.fullName);
        }
      } catch (err) {
        console.warn('Notice: Offline/Network issue, student queued in local storage for cloud sync:', err);
        newStudent.sync_status = 'PENDING_UPLOAD';
      }
    }

    // 2. Commit to local storage
    data.students.unshift(newStudent);

    // Initialize monthly dues record for the selected specific month
    if (!data.monthlyDues) data.monthlyDues = [];
    const hasMonthRecord = data.monthlyDues.some(d => (d.studentId === newStudent.id || d.regNo === newStudent.regNo) && d.monthKey === monthKey);
    if (!hasMonthRecord) {
      data.monthlyDues.unshift({
        id: 'md_' + Date.now(),
        studentId: newStudent.id,
        studentName: newStudent.fullName,
        regNo: newStudent.regNo,
        department: newStudent.department,
        batch: newStudent.batch,
        monthKey: monthKey,
        monthLabel: monthLabel,
        expectedAmount: quota,
        paidAmount: isPaidNow ? paymentAmount : 0,
        status: isPaidNow ? 'PAID' : 'PENDING',
        date: isPaidNow ? today : null,
        channel: isPaidNow ? paymentChannel : null,
        voucherRef: txnRef,
        recordedBy: isPaidNow ? actor : null,
        notes: isPaidNow ? (studentData.paymentNotes || `${monthLabel} dues paid on enrollment`) : `Enrolled member ${monthLabel} dues quota`
      });
    }

    // If paid immediately on enrollment:
    if (isPaidNow) {
      // Update cycle collected amount
      const cycle = (data.cycles || []).find(c => c.monthKey === monthKey);
      if (cycle) {
        cycle.collectedAmount = (cycle.collectedAmount || 0) + paymentAmount;
      }

      // Record inflow transaction
      if (!data.transactions) data.transactions = [];
      data.transactions.unshift({
        id: 'txn_' + Date.now(),
        transactionRef: txnRef,
        date: today,
        description: `Monthly Pool Dues (${paymentChannel}) — ${newStudent.fullName} (${monthLabel})`,
        amount: paymentAmount,
        type: 'INFLOW',
        category: 'Student Dues',
        recordedBy: actor
      });
    }

    // Add audit log
    const fmt = (v) => (typeof formatPKR === 'function') ? formatPKR(v) : 'PKR ' + (Number(v) || 0).toLocaleString();
    const auditDetails = isPaidNow
      ? `Enrolled student ${newStudent.fullName} (${newStudent.regNo}) and collected ${fmt(paymentAmount)} for ${monthLabel} (${paymentChannel})`
      : `Enrolled student ${newStudent.fullName} (${newStudent.regNo}) in ${newStudent.department} with ${monthLabel} quota of ${fmt(quota)}`;

    if (!data.auditLogs) data.auditLogs = [];
    data.auditLogs.unshift({
      id: 'aud_' + Date.now(),
      action: isPaidNow ? 'STUDENT_ENROLLED_AND_PAID' : 'STUDENT_ENROLLED',
      actor: actor,
      details: auditDetails,
      timestamp: new Date().toISOString()
    });

    this.save(data);

    // Also log audit and update balance in Supabase Cloud
    if (typeof window !== 'undefined' && window.SupabaseDB) {
      if (typeof window.SupabaseDB.logAudit === 'function') {
        window.SupabaseDB.logAudit(isPaidNow ? 'STUDENT_ENROLLED_AND_PAID' : 'STUDENT_ENROLLED', actor, auditDetails).catch(() => {});
      }
      if (isPaidNow && typeof window.SupabaseDB.updateStudentBalance === 'function') {
        window.SupabaseDB.updateStudentBalance(
          newStudent.supabase_id || newStudent.id,
          newStudent.totalContributed,
          newStudent.outstandingBalance
        ).catch(() => {});
      }
    }

    return { student: newStudent, isNew: true, cloudSaved, isPaidNow, paymentAmount };
  },

  addStudent(studentData) {
    const data = this.load();
    if (!data.students) data.students = [];

    // Check for existing student by regNo
    const existing = data.students.find(s => s.regNo.toLowerCase() === studentData.regNo.toLowerCase());
    if (existing) {
      return { student: existing, isNew: false };
    }

    const monthKey = studentData.monthKey || '2026-10';
    const monthNames = {
      '2026-10': 'October 2026',
      '2026-11': 'November 2026',
      '2026-12': 'December 2026',
      '2026-09': 'September 2026',
      '2026-08': 'August 2026'
    };
    const monthLabel = monthNames[monthKey] || monthKey;

    const monthlyTarget = this.getMonthlyTarget(monthKey);
    const quota = (studentData.expectedAmountPerCycle !== undefined && studentData.expectedAmountPerCycle !== null && !isNaN(studentData.expectedAmountPerCycle) && Number(studentData.expectedAmountPerCycle) > 0)
      ? Number(studentData.expectedAmountPerCycle)
      : monthlyTarget;

    const isPaidNow = (studentData.paymentStatus === 'PAID');
    const paymentAmount = isPaidNow ? (Number(studentData.paidAmount) || quota) : 0;
    const paymentChannel = studentData.paymentChannel || 'Cash Handover';
    const txnRef = isPaidNow ? ('TXN-2026-' + Math.floor(200 + Math.random() * 800)) : null;
    const today = new Date().toISOString().split('T')[0];
    const actor = (typeof Auth !== 'undefined' && Auth.getUser()) ? Auth.getUser().name : 'Hamas Khan (Finance Secretary)';

    const newStudent = {
      id: 'std_' + Date.now(),
      fullName: studentData.fullName,
      regNo: studentData.regNo,
      department: studentData.department,
      batch: studentData.batch,
      contributionFrequency: 'MONTHLY',
      expectedAmountPerCycle: quota,
      totalContributed: isPaidNow ? paymentAmount : 0,
      outstandingBalance: isPaidNow ? Math.max(0, quota - paymentAmount) : quota,
      status: studentData.status || 'ACTIVE',
      email: studentData.email || `${studentData.regNo}@ist.edu.pk`,
      phone: studentData.phone || '+92 300 0000000',
      joinDate: studentData.joinDate || today,
      notes: studentData.notes || 'Enrolled member'
    };

    data.students.unshift(newStudent);

    // Initialize monthly dues record for this specific month
    if (!data.monthlyDues) data.monthlyDues = [];
    const hasMonthRecord = data.monthlyDues.some(d => (d.studentId === newStudent.id || d.regNo === newStudent.regNo) && d.monthKey === monthKey);
    if (!hasMonthRecord) {
      data.monthlyDues.unshift({
        id: 'md_' + Date.now(),
        studentId: newStudent.id,
        studentName: newStudent.fullName,
        regNo: newStudent.regNo,
        department: newStudent.department,
        batch: newStudent.batch,
        monthKey: monthKey,
        monthLabel: monthLabel,
        expectedAmount: quota,
        paidAmount: isPaidNow ? paymentAmount : 0,
        status: isPaidNow ? 'PAID' : 'PENDING',
        date: isPaidNow ? today : null,
        channel: isPaidNow ? paymentChannel : null,
        voucherRef: txnRef,
        recordedBy: isPaidNow ? actor : null,
        notes: isPaidNow ? (studentData.paymentNotes || `${monthLabel} dues paid on enrollment`) : `Enrolled member ${monthLabel} dues quota`
      });
    }

    if (isPaidNow) {
      const cycle = (data.cycles || []).find(c => c.monthKey === monthKey);
      if (cycle) {
        cycle.collectedAmount = (cycle.collectedAmount || 0) + paymentAmount;
      }

      if (!data.transactions) data.transactions = [];
      data.transactions.unshift({
        id: 'txn_' + Date.now(),
        transactionRef: txnRef,
        date: today,
        description: `Monthly Pool Dues (${paymentChannel}) — ${newStudent.fullName} (${monthLabel})`,
        amount: paymentAmount,
        type: 'INFLOW',
        category: 'Student Dues',
        recordedBy: actor
      });
    }

    const fmt = (v) => (typeof formatPKR === 'function') ? formatPKR(v) : 'PKR ' + (Number(v) || 0).toLocaleString();
    const auditDetails = isPaidNow
      ? `Enrolled student ${newStudent.fullName} (${newStudent.regNo}) and collected ${fmt(paymentAmount)} for ${monthLabel} (${paymentChannel})`
      : `Enrolled student ${newStudent.fullName} (${newStudent.regNo}) in ${newStudent.department} with ${monthLabel} quota of ${fmt(quota)}`;

    if (!data.auditLogs) data.auditLogs = [];
    data.auditLogs.unshift({
      id: 'aud_' + Date.now(),
      action: isPaidNow ? 'STUDENT_ENROLLED_AND_PAID' : 'STUDENT_ENROLLED',
      actor: actor,
      details: auditDetails,
      timestamp: new Date().toISOString()
    });

    this.save(data);

    // Directly push to Supabase Cloud
    if (typeof window !== 'undefined' && window.SupabaseDB && typeof window.SupabaseDB.addStudent === 'function') {
      window.SupabaseDB.addStudent(newStudent).then(created => {
        if (created && created.id) {
          const current = this.load();
          const target = current.students.find(s => s.id === newStudent.id || s.regNo === newStudent.regNo);
          if (target) {
            target.supabase_id = created.id;
            target.id = created.id;
            this.save(current);
          }
        }
      }).catch(err => {
        console.warn('Supabase background add notice (local student preserved):', err);
      });
    }

    return { student: newStudent, isNew: true, isPaidNow, paymentAmount };
  },

  deleteStudent(studentId) {
    const data = this.load();
    if (!data.students) return false;

    const index = data.students.findIndex(s => s.id === studentId || s.regNo === studentId);
    if (index === -1) return false;

    const removed = data.students.splice(index, 1)[0];

    // Remove monthly dues records for this student
    if (data.monthlyDues) {
      data.monthlyDues = data.monthlyDues.filter(d => d.studentId !== studentId && d.regNo !== removed.regNo);
    }

    // Add audit log
    const actor = (typeof Auth !== 'undefined' && Auth.getUser()) ? Auth.getUser().name : 'Hamas Khan (Finance Secretary)';
    if (!data.auditLogs) data.auditLogs = [];
    data.auditLogs.unshift({
      id: 'aud_' + Date.now(),
      action: 'STUDENT_REMOVED',
      actor: actor,
      details: `Removed student record ${removed.fullName} (${removed.regNo})`,
      timestamp: new Date().toISOString()
    });

    this.save(data);

    // Directly archive in Supabase Cloud
    if (typeof window !== 'undefined' && window.SupabaseDB && typeof window.SupabaseDB.archiveStudent === 'function') {
      window.SupabaseDB.archiveStudent(removed.supabase_id || removed.id || removed.regNo).catch(err => {
        console.warn('Supabase archive notice:', err);
      });
    }

    return true;
  },

  getStats() {
    const data = this.load();
    const students = data.students || [];
    const expenses = data.expenses || [];
    const dues = data.monthlyDues || [];

    const totalCollected = students.reduce((acc, s) => acc + (s.totalContributed || 0), 0);
    const totalSpent = expenses.reduce((acc, e) => acc + (e.amount || 0), 0);
    const availableBalance = totalCollected - totalSpent;
    const activeContributors = students.filter(s => s.status === 'ACTIVE').length;
    const pendingDues = students.reduce((acc, s) => acc + (s.outstandingBalance || 0), 0);
    
    // Dynamic monthly collections for current active month (October 2026)
    const octRecords = dues.filter(d => d.monthKey === '2026-10');
    const monthlyCollections = octRecords.reduce((acc, r) => acc + (r.paidAmount || 0), 0);

    // Active cycle target figure
    const octCycle = (data.cycles || []).find(c => c.monthKey === '2026-10' || c.id === 'cyc_oct_2026');
    const monthlyTarget = octCycle ? Number(octCycle.targetAmount) : 50000;
    
    // Dynamic monthly expenses for October 2026
    const monthlyExpenses = expenses
      .filter(e => (e.date || '').startsWith('2026-10'))
      .reduce((acc, e) => acc + (e.amount || 0), 0);

    return {
      totalCollected,
      totalSpent,
      availableBalance,
      activeContributors,
      pendingDues,
      monthlyCollections,
      monthlyTarget,
      monthlyExpenses,
      totalStudents: students.length,
      totalEvents: (data.events || []).length
    };
  }
};
