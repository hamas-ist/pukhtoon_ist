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
      id: 'bff4d2e9-c911-4a6c-8e41-6900563521d9',
      supabase_id: 'bff4d2e9-c911-4a6c-8e41-6900563521d9',
      fullName: 'Muhammad Ahmad Khan',
      regNo: '210104012',
      department: 'Aerospace Engineering',
      batch: '2021-2025',
      contributionFrequency: 'MONTHLY',
      expectedAmountPerCycle: 1000,
      totalContributed: 6000,
      outstandingBalance: 0,
      status: 'ACTIVE',
      email: 'ahmad.khan@ist.edu.pk',
      phone: '+92 300 1234567',
      joinDate: '2021-10-15',
      notes: 'Final year project lead, regular contributor'
    },
    {
      id: '7051b11d-1da4-4376-9a8b-b621fabf35aa',
      supabase_id: '7051b11d-1da4-4376-9a8b-b621fabf35aa',
      fullName: 'Bilal Khattak',
      regNo: '220101004',
      department: 'Computer Science',
      batch: '2022-2026',
      contributionFrequency: 'MONTHLY',
      expectedAmountPerCycle: 1000,
      totalContributed: 4500,
      outstandingBalance: 1500,
      status: 'ACTIVE',
      email: 'bilal.khattak@ist.edu.pk',
      phone: '+92 312 9876543',
      joinDate: '2022-09-20',
      notes: 'Community web council volunteer'
    },
    {
      id: 'dddf3ce3-4f83-4b63-a956-79d0e1078089',
      supabase_id: 'dddf3ce3-4f83-4b63-a956-79d0e1078089',
      fullName: 'Hamza Afridi',
      regNo: '210102045',
      department: 'Electrical Engineering',
      batch: '2021-2025',
      contributionFrequency: 'MONTHLY',
      expectedAmountPerCycle: 1000,
      totalContributed: 6000,
      outstandingBalance: 0,
      status: 'ACTIVE',
      email: 'hamza.afridi@ist.edu.pk',
      phone: '+92 333 4567890',
      joinDate: '2021-09-10',
      notes: 'Badminton team player'
    },
    {
      id: '1d6e66de-8b81-4ee2-830c-6ec4401d4a9c',
      supabase_id: '1d6e66de-8b81-4ee2-830c-6ec4401d4a9c',
      fullName: 'Zarghona Khattak',
      regNo: '230103019',
      department: 'Avionics Engineering',
      batch: '2023-2027',
      contributionFrequency: 'MONTHLY',
      expectedAmountPerCycle: 1000,
      totalContributed: 3000,
      outstandingBalance: 0,
      status: 'ACTIVE',
      email: 'zarghona.k@ist.edu.pk',
      phone: '+92 345 6789012',
      joinDate: '2023-09-20',
      notes: 'Cultural debate team delegate'
    },
    {
      id: '2c39d188-54d0-4e1c-95ea-38a260e60715',
      supabase_id: '2c39d188-54d0-4e1c-95ea-38a260e60715',
      fullName: 'Shahid Khan Shinwari',
      regNo: '220105031',
      department: 'Mechanical Engineering',
      batch: '2022-2026',
      contributionFrequency: 'MONTHLY',
      expectedAmountPerCycle: 1000,
      totalContributed: 3000,
      outstandingBalance: 1500,
      status: 'ACTIVE',
      email: 'shahid.shinwari@ist.edu.pk',
      phone: '+92 321 2345678',
      joinDate: '2022-11-05',
      notes: 'Former logistics lead'
    },
    {
      id: '171d89d1-9fa6-4bd8-b5e8-23e95974b656',
      supabase_id: '171d89d1-9fa6-4bd8-b5e8-23e95974b656',
      fullName: 'Palwasha Wazir',
      regNo: '230101088',
      department: 'Computer Science',
      batch: '2023-2027',
      contributionFrequency: 'MONTHLY',
      expectedAmountPerCycle: 1000,
      totalContributed: 3000,
      outstandingBalance: 0,
      status: 'ACTIVE',
      email: 'palwasha.wazir@ist.edu.pk',
      phone: '+92 334 5678901',
      joinDate: '2023-10-12',
      notes: 'Literary committee'
    },
    {
      id: '96a8b295-358d-4c8d-847f-5003ad8b9337',
      supabase_id: '96a8b295-358d-4c8d-847f-5003ad8b9337',
      fullName: 'Sher Alam Mehsud',
      regNo: '240106002',
      department: 'Space Sciences',
      batch: '2024-2028',
      contributionFrequency: 'MONTHLY',
      expectedAmountPerCycle: 1000,
      totalContributed: 1500,
      outstandingBalance: 0,
      status: 'ACTIVE',
      email: 'sher.alam@ist.edu.pk',
      phone: '+92 316 7890123',
      joinDate: '2024-09-01',
      notes: 'Freshman representative'
    },
    {
      id: '345a427c-4959-4465-9349-6697261734a4',
      supabase_id: '345a427c-4959-4465-9349-6697261734a4',
      fullName: 'Gul Panra Yousafzai',
      regNo: '240107015',
      department: 'Materials Science',
      batch: '2024-2028',
      contributionFrequency: 'BIWEEKLY',
      expectedAmountPerCycle: 500,
      totalContributed: 1500,
      outstandingBalance: 0,
      status: 'ACTIVE',
      email: 'gul.panra@ist.edu.pk',
      phone: '+92 335 8901234',
      joinDate: '2024-09-15',
      notes: 'Cultural debate team delegate'
    },
    {
      id: 'c8250067-29b7-4f61-8ec8-32c31205289e',
      supabase_id: 'c8250067-29b7-4f61-8ec8-32c31205289e',
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
      id: '32c0b8cb-e6a9-49f6-901f-ce8f7bb2c598',
      supabase_id: '32c0b8cb-e6a9-49f6-901f-ce8f7bb2c598',
      fullName: 'Bilal Orakzai',
      regNo: '220101077',
      department: 'Aerospace Engineering',
      batch: '2022-2026',
      contributionFrequency: 'MONTHLY',
      expectedAmountPerCycle: 1000,
      totalContributed: 5000,
      outstandingBalance: 0,
      status: 'ACTIVE',
      email: 'bilal.o@ist.edu.pk',
      phone: '+92 346 9012345',
      joinDate: '2022-09-15',
      notes: 'IST Rover club coordinator'
    }
  ],

  cycles: [
    {
      id: 'cyc_oct_2026',
      name: 'Fall 2026 Monthly Dues — October',
      cycleType: 'MONTHLY',
      monthKey: '2026-10',
      targetAmount: 50000,
      collectedAmount: 37500,
      startDate: '2026-10-01',
      dueDate: '2026-10-31',
      status: 'ACTIVE'
    },
    {
      id: 'cyc_01',
      name: 'Fall 2026 Monthly Dues — September',
      cycleType: 'MONTHLY',
      monthKey: '2026-09',
      targetAmount: 60000,
      collectedAmount: 47500,
      startDate: '2026-09-01',
      dueDate: '2026-09-30',
      status: 'COMPLETED'
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

  monthlyDues: [
    // October 2026 (Active Current Month)
    { id: 'md_10_01', studentId: 'bff4d2e9-c911-4a6c-8e41-6900563521d9', studentName: 'Muhammad Ahmad Khan', regNo: '210104012', department: 'Aerospace Engineering', batch: '2021-2025', monthKey: '2026-10', monthLabel: 'October 2026', expectedAmount: 1000, paidAmount: 1000, status: 'PAID', date: '2026-10-02', channel: 'EasyPaisa', voucherRef: 'TXN-2026-201', recordedBy: 'Hamas Khan (Finance Secretary)', notes: 'October monthly installment cleared' },
    { id: 'md_10_02', studentId: '7051b11d-1da4-4376-9a8b-b621fabf35aa', studentName: 'Bilal Khattak', regNo: '220101004', department: 'Computer Science', batch: '2022-2026', monthKey: '2026-10', monthLabel: 'October 2026', expectedAmount: 1000, paidAmount: 0, status: 'PENDING', date: null, channel: null, voucherRef: null, recordedBy: null, notes: 'Awaiting monthly payment' },
    { id: 'md_10_03', studentId: 'dddf3ce3-4f83-4b63-a956-79d0e1078089', studentName: 'Hamza Afridi', regNo: '210102045', department: 'Electrical Engineering', batch: '2021-2025', monthKey: '2026-10', monthLabel: 'October 2026', expectedAmount: 1000, paidAmount: 1000, status: 'PAID', date: '2026-10-03', channel: 'JazzCash', voucherRef: 'TXN-2026-202', recordedBy: 'Hamas Khan (Finance Secretary)', notes: 'Cleared via JazzCash wallet' },
    { id: 'md_10_04', studentId: '1d6e66de-8b81-4ee2-830c-6ec4401d4a9c', studentName: 'Zarghona Khattak', regNo: '230103019', department: 'Avionics Engineering', batch: '2023-2027', monthKey: '2026-10', monthLabel: 'October 2026', expectedAmount: 1000, paidAmount: 1000, status: 'PAID', date: '2026-10-01', channel: 'EasyPaisa', voucherRef: 'TXN-2026-203', recordedBy: 'Hamas Khan (Finance Secretary)', notes: 'Cleared via EasyPaisa' },
    { id: 'md_10_05', studentId: '2c39d188-54d0-4e1c-95ea-38a260e60715', studentName: 'Shahid Khan Shinwari', regNo: '220105031', department: 'Mechanical Engineering', batch: '2022-2026', monthKey: '2026-10', monthLabel: 'October 2026', expectedAmount: 1000, paidAmount: 0, status: 'PENDING', date: null, channel: null, voucherRef: null, recordedBy: null, notes: 'Dues notice dispatched' },
    { id: 'md_10_06', studentId: '171d89d1-9fa6-4bd8-b5e8-23e95974b656', studentName: 'Palwasha Wazir', regNo: '230101088', department: 'Computer Science', batch: '2023-2027', monthKey: '2026-10', monthLabel: 'October 2026', expectedAmount: 1000, paidAmount: 1000, status: 'PAID', date: '2026-10-04', channel: 'EasyPaisa', voucherRef: 'TXN-2026-204', recordedBy: 'Hamas Khan (Finance Secretary)', notes: 'Paid on due date' },
    { id: 'md_10_07', studentId: '96a8b295-358d-4c8d-847f-5003ad8b9337', studentName: 'Sher Alam Mehsud', regNo: '240106002', department: 'Space Sciences', batch: '2024-2028', monthKey: '2026-10', monthLabel: 'October 2026', expectedAmount: 1000, paidAmount: 1000, status: 'PAID', date: '2026-10-02', channel: 'Cash', voucherRef: 'TXN-2026-205', recordedBy: 'Hamas Khan (Finance Secretary)', notes: 'Handed over at Secretariat' },
    { id: 'md_10_08', studentId: '345a427c-4959-4465-9349-6697261734a4', studentName: 'Gul Panra Yousafzai', regNo: '240107015', department: 'Materials Science', batch: '2024-2028', monthKey: '2026-10', monthLabel: 'October 2026', expectedAmount: 500, paidAmount: 500, status: 'PAID', date: '2026-10-01', channel: 'JazzCash', voucherRef: 'TXN-2026-206', recordedBy: 'Hamas Khan (Finance Secretary)', notes: 'Bi-weekly installment' },
    { id: 'md_10_09', studentId: 'c8250067-29b7-4f61-8ec8-32c31205289e', studentName: 'Asfandiyar Mohmand', regNo: '240105033', department: 'Space Science', batch: '2024-2028', monthKey: '2026-10', monthLabel: 'October 2026', expectedAmount: 1000, paidAmount: 1000, status: 'PAID', date: '2026-10-01', channel: 'Cash', voucherRef: 'TXN-2026-207', recordedBy: 'Hamas Khan (Finance Secretary)', notes: 'Handed over at Secretariat' },
    { id: 'md_10_10', studentId: '32c0b8cb-e6a9-49f6-901f-ce8f7bb2c598', studentName: 'Bilal Orakzai', regNo: '220101077', department: 'Aerospace Engineering', batch: '2022-2026', monthKey: '2026-10', monthLabel: 'October 2026', expectedAmount: 1000, paidAmount: 1000, status: 'PAID', date: '2026-10-02', channel: 'Bank Transfer', voucherRef: 'TXN-2026-208', recordedBy: 'Hamas Khan (Finance Secretary)', notes: 'Online bank payment' },

    // September 2026
    { id: 'md_09_01', studentId: 'bff4d2e9-c911-4a6c-8e41-6900563521d9', studentName: 'Muhammad Ahmad Khan', regNo: '210104012', department: 'Aerospace Engineering', batch: '2021-2025', monthKey: '2026-09', monthLabel: 'September 2026', expectedAmount: 1000, paidAmount: 1000, status: 'PAID', date: '2026-09-24', channel: 'Cash', voucherRef: 'TXN-2026-101', recordedBy: 'Hamas Khan (Finance Secretary)', notes: 'Secretariat cash handover' },
    { id: 'md_09_02', studentId: '7051b11d-1da4-4376-9a8b-b621fabf35aa', studentName: 'Bilal Khattak', regNo: '220101004', department: 'Computer Science', batch: '2022-2026', monthKey: '2026-09', monthLabel: 'September 2026', expectedAmount: 1000, paidAmount: 1000, status: 'PAID', date: '2026-09-21', channel: 'EasyPaisa', voucherRef: 'TXN-2026-104', recordedBy: 'Hamas Khan (Finance Secretary)', notes: 'Direct wallet transfer' },
    { id: 'md_09_03', studentId: 'dddf3ce3-4f83-4b63-a956-79d0e1078089', studentName: 'Hamza Afridi', regNo: '210102045', department: 'Electrical Engineering', batch: '2021-2025', monthKey: '2026-09', monthLabel: 'September 2026', expectedAmount: 1000, paidAmount: 1000, status: 'PAID', date: '2026-09-22', channel: 'Cash', voucherRef: 'TXN-2026-112', recordedBy: 'Hamas Khan (Finance Secretary)', notes: 'Paid on campus' },
    { id: 'md_09_04', studentId: '1d6e66de-8b81-4ee2-830c-6ec4401d4a9c', studentName: 'Zarghona Khattak', regNo: '230103019', department: 'Avionics Engineering', batch: '2023-2027', monthKey: '2026-09', monthLabel: 'September 2026', expectedAmount: 1000, paidAmount: 1000, status: 'PAID', date: '2026-09-20', channel: 'EasyPaisa', voucherRef: 'TXN-2026-114', recordedBy: 'Hamas Khan (Finance Secretary)', notes: 'Cleared via EasyPaisa' },
    { id: 'md_09_05', studentId: 'c8250067-29b7-4f61-8ec8-32c31205289e', studentName: 'Asfandiyar Mohmand', regNo: '240105033', department: 'Space Science', batch: '2024-2028', monthKey: '2026-09', monthLabel: 'September 2026', expectedAmount: 1000, paidAmount: 1000, status: 'PAID', date: '2026-09-15', channel: 'Cash', voucherRef: 'TXN-2026-118', recordedBy: 'Hamas Khan (Finance Secretary)', notes: 'Orientation welcome dues' },
    { id: 'md_09_06', studentId: '2c39d188-54d0-4e1c-95ea-38a260e60715', studentName: 'Shahid Khan Shinwari', regNo: '220105031', department: 'Mechanical Engineering', batch: '2022-2026', monthKey: '2026-09', monthLabel: 'September 2026', expectedAmount: 1000, paidAmount: 1000, status: 'PAID', date: '2026-09-23', channel: 'Bank Transfer', voucherRef: 'TXN-2026-120', recordedBy: 'Hamas Khan (Finance Secretary)', notes: 'Cleared via 1Link' },
    { id: 'md_09_07', studentId: '171d89d1-9fa6-4bd8-b5e8-23e95974b656', studentName: 'Palwasha Wazir', regNo: '230101088', department: 'Computer Science', batch: '2023-2027', monthKey: '2026-09', monthLabel: 'September 2026', expectedAmount: 1000, paidAmount: 1000, status: 'PAID', date: '2026-09-25', channel: 'Cash', voucherRef: 'TXN-2026-125', recordedBy: 'Hamas Khan (Finance Secretary)', notes: 'Paid on campus' },
    { id: 'md_09_08', studentId: '32c0b8cb-e6a9-49f6-901f-ce8f7bb2c598', studentName: 'Bilal Orakzai', regNo: '220101077', department: 'Aerospace Engineering', batch: '2022-2026', monthKey: '2026-09', monthLabel: 'September 2026', expectedAmount: 1000, paidAmount: 1000, status: 'PAID', date: '2026-09-18', channel: 'EasyPaisa', voucherRef: 'TXN-2026-115', recordedBy: 'Hamas Khan (Finance Secretary)', notes: 'Verified and reconciled' }
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
        const parsed = JSON.parse(stored);
        let updated = false;
        if (!parsed.monthlyDues || parsed.monthlyDues.length === 0) {
          parsed.monthlyDues = JSON.parse(JSON.stringify(DEFAULT_IST_DATA.monthlyDues || []));
          updated = true;
        }
        if (!parsed.cycles || !parsed.cycles.some(c => c.id === 'cyc_oct_2026')) {
          parsed.cycles = JSON.parse(JSON.stringify(DEFAULT_IST_DATA.cycles));
          updated = true;
        }
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

  getMonthlyDuesSummary(monthKey) {
    const data = this.load();
    const dues = data.monthlyDues || [];
    const activeKey = monthKey || '2026-10';
    const monthRecords = dues.filter(d => d.monthKey === activeKey);

    const matchingCycle = (data.cycles || []).find(c => c.monthKey === activeKey);
    const targetAmount = matchingCycle ? matchingCycle.targetAmount : 50000;
    
    const collectedAmount = monthRecords.reduce((sum, r) => sum + (r.paidAmount || 0), 0);
    const pendingAmount = monthRecords.reduce((sum, r) => sum + (r.status === 'PENDING' ? ((r.expectedAmount || 1000) - (r.paidAmount || 0)) : 0), 0);
    const paidCount = monthRecords.filter(r => r.status === 'PAID').length;
    const pendingCount = monthRecords.filter(r => r.status === 'PENDING').length;
    const totalAssessed = monthRecords.length;
    const progressPct = targetAmount > 0 ? Math.min(100, Math.round((collectedAmount / targetAmount) * 100)) : 0;

    // Distinct available months with labels
    const monthMap = new Map();
    dues.forEach(d => {
      if (d.monthKey && !monthMap.has(d.monthKey)) {
        monthMap.set(d.monthKey, d.monthLabel || d.monthKey);
      }
    });
    const availableMonths = Array.from(monthMap.entries())
      .map(([key, label]) => ({ key, label }))
      .sort((a, b) => b.key.localeCompare(a.key));

    return {
      monthKey: activeKey,
      monthLabel: monthRecords[0]?.monthLabel || (matchingCycle ? matchingCycle.name.split('—')[1]?.trim() : activeKey),
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

    const freq = studentData.contributionFrequency || 'MONTHLY';
    const quota = freq === 'WEEKLY' ? 250 : freq === 'BIWEEKLY' ? 500 : 1000;

    const newStudent = {
      id: 'std_' + Date.now(),
      fullName: studentData.fullName,
      regNo: studentData.regNo,
      department: studentData.department,
      batch: studentData.batch,
      contributionFrequency: freq,
      expectedAmountPerCycle: studentData.expectedAmountPerCycle || quota,
      totalContributed: 0,
      outstandingBalance: studentData.expectedAmountPerCycle || quota,
      status: studentData.status || 'ACTIVE',
      email: studentData.email || `${studentData.regNo}@ist.edu.pk`,
      phone: studentData.phone || '+92 300 0000000',
      joinDate: studentData.joinDate || new Date().toISOString().split('T')[0],
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

    // Initialize October 2026 dues record for the new student
    if (!data.monthlyDues) data.monthlyDues = [];
    const hasOctRecord = data.monthlyDues.some(d => (d.studentId === newStudent.id || d.regNo === newStudent.regNo) && d.monthKey === '2026-10');
    if (!hasOctRecord) {
      data.monthlyDues.unshift({
        id: 'md_10_' + Date.now(),
        studentId: newStudent.id,
        studentName: newStudent.fullName,
        regNo: newStudent.regNo,
        department: newStudent.department,
        batch: newStudent.batch,
        monthKey: '2026-10',
        monthLabel: 'October 2026',
        expectedAmount: newStudent.expectedAmountPerCycle,
        paidAmount: 0,
        status: 'PENDING',
        date: null,
        channel: null,
        voucherRef: null,
        recordedBy: null,
        notes: 'Enrolled member October dues quota'
      });
    }

    // Add audit log
    const actor = (typeof Auth !== 'undefined' && Auth.getUser()) ? Auth.getUser().name : 'Hamas Khan (Finance Secretary)';
    data.auditLogs.unshift({
      id: 'aud_' + Date.now(),
      action: 'STUDENT_ENROLLED',
      actor: actor,
      details: `Enrolled student ${newStudent.fullName} (${newStudent.regNo}) in ${newStudent.department} (Supabase Cloud Synced)`,
      timestamp: new Date().toISOString()
    });

    this.save(data);

    // Also log audit in Supabase Cloud
    if (typeof window !== 'undefined' && window.SupabaseDB && typeof window.SupabaseDB.logAudit === 'function') {
      window.SupabaseDB.logAudit('STUDENT_ENROLLED', actor, `Enrolled student ${newStudent.fullName} (${newStudent.regNo})`).catch(() => {});
    }

    return { student: newStudent, isNew: true, cloudSaved };
  },

  addStudent(studentData) {
    const data = this.load();
    if (!data.students) data.students = [];

    // Check for existing student by regNo
    const existing = data.students.find(s => s.regNo.toLowerCase() === studentData.regNo.toLowerCase());
    if (existing) {
      return { student: existing, isNew: false };
    }

    const freq = studentData.contributionFrequency || 'MONTHLY';
    const quota = freq === 'WEEKLY' ? 250 : freq === 'BIWEEKLY' ? 500 : 1000;

    const newStudent = {
      id: 'std_' + Date.now(),
      fullName: studentData.fullName,
      regNo: studentData.regNo,
      department: studentData.department,
      batch: studentData.batch,
      contributionFrequency: freq,
      expectedAmountPerCycle: studentData.expectedAmountPerCycle || quota,
      totalContributed: 0,
      outstandingBalance: studentData.expectedAmountPerCycle || quota,
      status: studentData.status || 'ACTIVE',
      email: studentData.email || `${studentData.regNo}@ist.edu.pk`,
      phone: studentData.phone || '+92 300 0000000',
      joinDate: studentData.joinDate || new Date().toISOString().split('T')[0],
      notes: studentData.notes || 'Enrolled member'
    };

    data.students.unshift(newStudent);

    // Initialize October 2026 dues record for the new student
    if (!data.monthlyDues) data.monthlyDues = [];
    const hasOctRecord = data.monthlyDues.some(d => (d.studentId === newStudent.id || d.regNo === newStudent.regNo) && d.monthKey === '2026-10');
    if (!hasOctRecord) {
      data.monthlyDues.unshift({
        id: 'md_10_' + Date.now(),
        studentId: newStudent.id,
        studentName: newStudent.fullName,
        regNo: newStudent.regNo,
        department: newStudent.department,
        batch: newStudent.batch,
        monthKey: '2026-10',
        monthLabel: 'October 2026',
        expectedAmount: newStudent.expectedAmountPerCycle,
        paidAmount: 0,
        status: 'PENDING',
        date: null,
        channel: null,
        voucherRef: null,
        recordedBy: null,
        notes: 'Enrolled member October dues quota'
      });
    }

    // Add audit log
    const actor = (typeof Auth !== 'undefined' && Auth.getUser()) ? Auth.getUser().name : 'Hamas Khan (Finance Secretary)';
    data.auditLogs.unshift({
      id: 'aud_' + Date.now(),
      action: 'STUDENT_ENROLLED',
      actor: actor,
      details: `Enrolled student ${newStudent.fullName} (${newStudent.regNo}) in ${newStudent.department}`,
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

    return { student: newStudent, isNew: true };
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
    const totalCollected = data.students.reduce((acc, s) => acc + (s.totalContributed || 0), 0);
    const totalSpent = data.expenses.reduce((acc, e) => acc + (e.amount || 0), 0);
    const availableBalance = totalCollected - totalSpent;
    const activeContributors = data.students.filter(s => s.status === 'ACTIVE').length;
    const pendingDues = data.students.reduce((acc, s) => acc + (s.outstandingBalance || 0), 0);
    
    // Dynamic monthly collections for current active month (October 2026)
    const octRecords = (data.monthlyDues || []).filter(d => d.monthKey === '2026-10');
    const monthlyCollections = octRecords.length > 0 
      ? octRecords.reduce((acc, r) => acc + (r.paidAmount || 0), 0)
      : 37500;
    const monthlyTarget = 50000;
    const monthlyExpenses = 35000;

    return {
      totalCollected,
      totalSpent,
      availableBalance,
      activeContributors,
      pendingDues,
      monthlyCollections,
      monthlyTarget,
      monthlyExpenses,
      totalStudents: data.students.length,
      totalEvents: data.events.length
    };
  }
};
