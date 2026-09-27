/**
 * PUKHTOON COMMUNITY — IST ISLAMABAD
 * Core Data Engine & LocalStorage State Synchronizer
 * Pre-seeded with realistic Institute of Space Technology (IST) student records.
 */

const PUKHTOON_STORAGE_KEY = 'pukhtoon_community_data_v3';

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

  batches: ['2021-2025', '2022-2026', '2023-2027', '2024-2028'],

  students: [
    {
      id: 'std_01',
      fullName: 'Muhammad Ahmad Khan',
      regNo: '210101045',
      department: 'Aerospace Engineering',
      batch: '2021-2025',
      contributionFrequency: 'MONTHLY',
      expectedAmountPerCycle: 1000,
      totalContributed: 8000,
      outstandingBalance: 0,
      status: 'ACTIVE',
      email: 'ahmad.khan@ist.edu.pk',
      phone: '+92 300 1234567',
      joinDate: '2021-10-15',
      notes: 'Final year project lead, regular contributor'
    },
    {
      id: 'std_02',
      fullName: 'Zarghona Khattak',
      regNo: '220202018',
      department: 'Computer Science',
      batch: '2022-2026',
      contributionFrequency: 'MONTHLY',
      expectedAmountPerCycle: 1000,
      totalContributed: 6000,
      outstandingBalance: 1000,
      status: 'ACTIVE',
      email: 'zarghona.k@ist.edu.pk',
      phone: '+92 312 9876543',
      joinDate: '2022-09-20',
      notes: 'Community web council volunteer'
    },
    {
      id: 'std_03',
      fullName: 'Hamza Afridi',
      regNo: '230103092',
      department: 'Avionics Engineering',
      batch: '2023-2027',
      contributionFrequency: 'MONTHLY',
      expectedAmountPerCycle: 1000,
      totalContributed: 4000,
      outstandingBalance: 0,
      status: 'ACTIVE',
      email: 'hamza.afridi@ist.edu.pk',
      phone: '+92 333 4567890',
      joinDate: '2023-09-10',
      notes: 'Badminton team player'
    },
    {
      id: 'std_04',
      fullName: 'Gul Panra Yousafzai',
      regNo: '220401015',
      department: 'Electrical Engineering',
      batch: '2022-2026',
      contributionFrequency: 'BIWEEKLY',
      expectedAmountPerCycle: 500,
      totalContributed: 5500,
      outstandingBalance: 500,
      status: 'ACTIVE',
      email: 'gul.panra@ist.edu.pk',
      phone: '+92 345 6789012',
      joinDate: '2022-10-01',
      notes: 'Cultural debate team delegate'
    },
    {
      id: 'std_05',
      fullName: 'Asfandiyar Mohmand',
      regNo: '240105033',
      department: 'Space Science',
      batch: '2024-2028',
      contributionFrequency: 'MONTHLY',
      expectedAmountPerCycle: 1000,
      totalContributed: 2000,
      outstandingBalance: 0,
      status: 'ACTIVE',
      email: 'asfand.m@ist.edu.pk',
      phone: '+92 315 8901234',
      joinDate: '2024-09-01',
      notes: 'Freshman representative'
    },
    {
      id: 'std_06',
      fullName: 'Sher Alam Shinwari',
      regNo: '210203060',
      department: 'Mechanical Engineering',
      batch: '2021-2025',
      contributionFrequency: 'MONTHLY',
      expectedAmountPerCycle: 1000,
      totalContributed: 7000,
      outstandingBalance: 1000,
      status: 'ACTIVE',
      email: 'sher.alam@ist.edu.pk',
      phone: '+92 321 2345678',
      joinDate: '2021-11-05',
      notes: 'Former logistics lead'
    },
    {
      id: 'std_07',
      fullName: 'Palwasha Wazir',
      regNo: '230501008',
      department: 'Materials Science & Engineering',
      batch: '2023-2027',
      contributionFrequency: 'WEEKLY',
      expectedAmountPerCycle: 250,
      totalContributed: 3500,
      outstandingBalance: 0,
      status: 'ACTIVE',
      email: 'palwasha.w@ist.edu.pk',
      phone: '+92 334 5678901',
      joinDate: '2023-10-12',
      notes: 'Literary committee'
    },
    {
      id: 'std_08',
      fullName: 'Bilal Orakzai',
      regNo: '220101077',
      department: 'Aerospace Engineering',
      batch: '2022-2026',
      contributionFrequency: 'MONTHLY',
      expectedAmountPerCycle: 1000,
      totalContributed: 5000,
      outstandingBalance: 0,
      status: 'ACTIVE',
      email: 'bilal.orakzai@ist.edu.pk',
      phone: '+92 301 3456789',
      joinDate: '2022-09-15',
      notes: 'IST Rover club coordinator'
    }
  ],

  cycles: [
    {
      id: 'cyc_01',
      name: 'Fall 2026 Monthly Dues — September',
      cycleType: 'MONTHLY',
      targetAmount: 60000,
      collectedAmount: 47500,
      startDate: '2026-09-01',
      dueDate: '2026-09-30',
      status: 'ACTIVE'
    },
    {
      id: 'cyc_02',
      name: 'Khyber Cultural Gala 2026 Special Pool',
      cycleType: 'CUSTOM',
      targetAmount: 80000,
      collectedAmount: 72000,
      startDate: '2026-08-15',
      dueDate: '2026-10-10',
      status: 'ACTIVE'
    },
    {
      id: 'cyc_03',
      name: 'Spring 2026 End-Term Farewell Pool',
      cycleType: 'CUSTOM',
      targetAmount: 50000,
      collectedAmount: 50000,
      startDate: '2026-05-01',
      dueDate: '2026-05-25',
      status: 'CLOSED'
    }
  ],

  events: [
    {
      id: 'evt_01',
      title: 'Khyber Cultural Night & Annual Gala 2026',
      date: '2026-10-15',
      location: 'IST Main Auditorium, Islamabad',
      plannedBudget: 120000,
      actualSpending: 94500,
      status: 'UPCOMING',
      description: 'The signature annual cultural festivity of IST Pukhtoon Community featuring traditional Attan performance, Pashto literary mushaira, folkloric instrumentation, and ethnic delicacies.',
      leadOrganizer: 'Zarghona Khattak'
    },
    {
      id: 'evt_02',
      title: 'Freshers Welcome & Orientation Gathering',
      date: '2026-09-10',
      location: 'IST Student Activity Center',
      plannedBudget: 45000,
      actualSpending: 41200,
      status: 'COMPLETED',
      description: 'Official welcoming ceremony for new Batch 2024-2028 Pukhtoon freshmen across all university faculties.',
      leadOrganizer: 'Muhammad Ahmad Khan'
    },
    {
      id: 'evt_03',
      title: 'Annual Pashto Poetry Mushaira 2026',
      date: '2026-11-20',
      location: 'IST Space Sciences Seminar Hall',
      plannedBudget: 35000,
      actualSpending: 0,
      status: 'UPCOMING',
      description: 'Literary symposium featuring prominent contemporary poets and student writers from Islamabad universities.',
      leadOrganizer: 'Palwasha Wazir'
    },
    {
      id: 'evt_04',
      title: 'Inter-University Pashto Debate Competition',
      date: '2026-04-18',
      location: 'IST Video Conference Hall',
      plannedBudget: 30000,
      actualSpending: 28400,
      status: 'COMPLETED',
      description: 'Parliamentary debate tournament with delegations from NUST, FAST, and COMSATS.',
      leadOrganizer: 'Gul Panra Yousafzai'
    }
  ],

  expenses: [
    {
      id: 'exp_01',
      eventId: 'evt_01',
      eventTitle: 'Khyber Cultural Night & Annual Gala 2026',
      title: 'Traditional Catering & Refreshments Advance',
      amount: 45000,
      category: 'Food',
      date: '2026-09-20',
      voucherRef: 'VCH-2026-081',
      approvedBy: 'Huzaifa Tariq (President)'
    },
    {
      id: 'exp_02',
      eventId: 'evt_01',
      eventTitle: 'Khyber Cultural Night & Annual Gala 2026',
      title: 'Traditional Attan & Cultural Stage Decoration',
      amount: 28000,
      category: 'Decoration',
      date: '2026-09-22',
      voucherRef: 'VCH-2026-082',
      approvedBy: 'Hamas Khan (Finance Secretary)'
    },
    {
      id: 'exp_03',
      eventId: 'evt_01',
      eventTitle: 'Khyber Cultural Night & Annual Gala 2026',
      title: 'Rubab & Mangay Sound System Rental',
      amount: 21500,
      category: 'Sound & Media',
      date: '2026-09-23',
      voucherRef: 'VCH-2026-083',
      approvedBy: 'Hamas Khan (Finance Secretary)'
    },
    {
      id: 'exp_04',
      eventId: 'evt_02',
      eventTitle: 'Freshers Welcome & Orientation Gathering',
      title: 'Chai, Pakora & Traditional Sweets for 120 Guests',
      amount: 26500,
      category: 'Food',
      date: '2026-09-10',
      voucherRef: 'VCH-2026-074',
      approvedBy: 'Hamas Khan (Finance Secretary)'
    },
    {
      id: 'exp_05',
      eventId: 'evt_02',
      eventTitle: 'Freshers Welcome & Orientation Gathering',
      title: 'Welcome Badges & IST Community Souvenirs',
      amount: 14700,
      category: 'Printing',
      date: '2026-09-08',
      voucherRef: 'VCH-2026-075',
      approvedBy: 'Huzaifa Tariq (President)'
    }
  ],

  transactions: [
    {
      id: 'txn_01',
      transactionRef: 'TXN-2026-101',
      date: '2026-09-24',
      description: 'Monthly Pool Dues — Muhammad Ahmad Khan (Reg: 210101045)',
      amount: 1000,
      type: 'INFLOW',
      category: 'Student Dues',
      recordedBy: 'Hamas Khan'
    },
    {
      id: 'txn_02',
      transactionRef: 'TXN-2026-102',
      date: '2026-09-23',
      description: 'Catering Advance for Khyber Cultural Gala 2026',
      amount: -45000,
      type: 'OUTFLOW',
      category: 'Event Expense',
      recordedBy: 'Hamas Khan'
    },
    {
      id: 'txn_03',
      transactionRef: 'TXN-2026-103',
      date: '2026-09-22',
      description: 'Stage Backdrop & Cultural Props (VCH-2026-082)',
      amount: -28000,
      type: 'OUTFLOW',
      category: 'Event Expense',
      recordedBy: 'Hamas Khan'
    },
    {
      id: 'txn_04',
      transactionRef: 'TXN-2026-104',
      date: '2026-09-21',
      description: 'Monthly Pool Dues — Zarghona Khattak (Reg: 220202018)',
      amount: 1000,
      type: 'INFLOW',
      category: 'Student Dues',
      recordedBy: 'Hamas Khan'
    },
    {
      id: 'txn_05',
      transactionRef: 'TXN-2026-105',
      date: '2026-09-20',
      description: 'Monthly Pool Dues — Gul Panra Yousafzai (Reg: 220401015)',
      amount: 500,
      type: 'INFLOW',
      category: 'Student Dues',
      recordedBy: 'Hamas Khan'
    },
    {
      id: 'txn_06',
      transactionRef: 'TXN-2026-106',
      date: '2026-09-19',
      description: 'Khyber Gala Sponsorship Token — Al-Makkah Printers',
      amount: 15000,
      type: 'INFLOW',
      category: 'Sponsorship',
      recordedBy: 'Huzaifa Tariq'
    }
  ],

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
      id: 'aud_01',
      action: 'CYCLE_CREATED',
      actor: 'Hamas Khan (Finance Secretary)',
      details: 'Created Fall 2026 Monthly Dues — September (Target: PKR 60,000)',
      timestamp: '2026-09-01T09:00:00Z'
    },
    {
      id: 'aud_02',
      action: 'EXPENSE_APPROVED',
      actor: 'Huzaifa Tariq (President)',
      details: 'Approved VCH-2026-081 (PKR 45,000) for Khyber Gala Catering',
      timestamp: '2026-09-20T14:30:00Z'
    },
    {
      id: 'aud_03',
      action: 'DUES_RECORDED',
      actor: 'Hamas Khan (Finance Secretary)',
      details: 'Recorded PKR 1,000 contribution from Zarghona Khattak',
      timestamp: '2026-09-21T11:15:00Z'
    },
    {
      id: 'aud_04',
      action: 'EVENT_SCHEDULED',
      actor: 'Zarghona Khattak (Event Director)',
      details: 'Scheduled Annual Pashto Poetry Mushaira 2026 for Nov 20, 2026',
      timestamp: '2026-09-22T16:00:00Z'
    }
  ]
};

// Data Store Accessor
const DataStore = {
  load() {
    try {
      const stored = localStorage.getItem(PUKHTOON_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
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

  getStats() {
    const data = this.load();
    const totalCollected = data.students.reduce((acc, s) => acc + (s.totalContributed || 0), 0);
    const totalSpent = data.expenses.reduce((acc, e) => acc + (e.amount || 0), 0);
    const availableBalance = totalCollected - totalSpent;
    const activeContributors = data.students.filter(s => s.status === 'ACTIVE').length;
    const pendingDues = data.students.reduce((acc, s) => acc + (s.outstandingBalance || 0), 0);
    const monthlyCollections = 47500;
    const monthlyExpenses = 35000;

    return {
      totalCollected,
      totalSpent,
      availableBalance,
      activeContributors,
      pendingDues,
      monthlyCollections,
      monthlyExpenses,
      totalStudents: data.students.length,
      totalEvents: data.events.length
    };
  }
};
