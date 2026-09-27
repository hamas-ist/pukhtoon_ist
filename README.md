# PUKHTOON COMMUNITY — Institute of Space Technology (IST), Islamabad
### Enterprise-Grade Financial Intelligence & Cultural Event Management Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Design System](https://img.shields.io/badge/Design_System-Apple_Obsidian-000000?style=flat&logo=apple)](css/style.css)
[![Status](https://img.shields.io/badge/Status-Production_Ready-emerald.svg)](index.html)
[![Affiliation](https://img.shields.io/badge/Affiliation-IST_Islamabad-blue.svg)](https://www.ist.edu.pk)

A full-fledged, multi-page web platform engineered for the **PUKHTOON COMMUNITY (PUKHTOON IST)** at the **Institute of Space Technology (IST), Islamabad**, operating under the Directorate of Student Affairs (DSA).

This repository contains the standalone, zero-build web edition crafted with pure semantic HTML5, Apple-inspired CSS3 design tokens, and modular ES6 JavaScript. It runs natively in any modern web browser offline or locally, and can be hosted instantly on **Vercel** or **GitHub Pages** with zero configuration or build steps.

---

## 🌟 Key Capabilities & Features

### 1. Apple-Inspired Dual Design System
- **Obsidian Dark Mode** (`#090A0F` base, `#11131F` surfaces, vibrant blue/amber/emerald neon accents, subtle radial grid textures).
- **Pure Apple Light Mode** (`#FBFBFD` canvas, pure white card surfaces, `#E5E7EB` borders, high-contrast typography).
- Instant mode toggle with local storage persistence and smooth CSS transitions.

### 2. Autonomous LocalStorage State Engine & Supabase Cloud Sync
- Comes preloaded with a curated, true-to-life **IST Islamabad seed dataset**:
  - 8 engineering faculties: Aerospace, Avionics, Electrical, Mechanical, Materials, Computer Science, Space Science, Systems.
  - Batches 2021 through 2025 with official IST student registration numbers (`210101001`, `210101045`, etc.).
  - Realistic contribution cycles, automated dues tracking, multi-category expense vouchers, and double-entry ledger.
- Full offline editing capability: Add students, record fee payments, schedule events, log vouchers, and export client-side CSV and JSON backups.
- Connected directly to live Supabase PostgreSQL Cloud backend for multi-device data synchronization.

### 3. Role-Based Access Control (RBAC) & Security Directives
- **Super Admin Sole Write Authority**: Only **Super Admin Hamas Khan (Finance Secretary)** can enroll/delete members, reconcile dues, launch cycles, approve expense vouchers, and alter cloud settings.
- **Executive Audit Transparency**: Other executive leaders (President Huzaifa Tariq, Vice President Maaz Muhammad, General Secretary Misbah Ullah) have full access to view all features, analytics, and buttons. When any non-Super Admin attempts to make changes, a restricted modal alert and toast alert pop up: *"Only Super Admin Hamas Khan can do these changes."*

---

## 🔑 Authorized Executive Credentials

| Name | Role / Portfolio | Username | Password | Access Level |
| :--- | :--- | :--- | :--- | :--- |
| **Hamas Khan** | Super Admin (Finance Secretary) | `hamaskhan` | `Hamas@IST2026` | 🟢 **Full Access** (Edit, Delete, Reconcile, Reset) |
| **Huzaifa Tariq** | President | `huzaifatariq` | `Huzaifa@IST2026` | 🔵 **View & Audit Only** (Protected Write Guard) |
| **Maaz Muhammad** | Vice President | `maazmuhammad` | `Maaz@IST2026` | 🔵 **View & Audit Only** (Protected Write Guard) |
| **Misbah Ullah** | General Secretary | `misbahullah` | `Misbah@IST2026` | 🔵 **View & Audit Only** (Protected Write Guard) |

> **Note**: You can log in using either the **Username** (e.g. `hamaskhan`) or your **IST Email** (e.g. `hamas.khan@ist.edu.pk`).

---

## 📁 Repository Directory & Page Architecture

```text
pukhtoon-society-web/
├── index.html              # Public Gateway: Mission, live KPIs, upcoming cultural events
├── transparency.html       # Public Financial Portal: Real-time public audit & cash flow
├── gallery.html            # Cultural Showcase: Photo gallery with interactive lightbox
├── login.html              # Council Portal: Secure login with username/email & password
│
├── dashboard.html          # Council Command Hub: Master financial metrics, liquidity chart, quick actions
├── students.html           # Member Directory: Search, batch/dept filters, add student modal, CSV export
├── student-detail.html     # Student Profile: Complete dues breakdown & payment history ledger
├── contributions.html      # Contribution Cycles: Dues tracking, target progress, new cycle launch
├── events.html             # Events & Budgets: Cultural night, welcome gala, budget vs actual gauges
├── event-detail.html       # Event Financial Breakdown: Itemized receipt vouchers & approval trail
├── expenses.html           # Expense Voucher Register: Search, category filtering, voucher logger
├── ledger.html             # Master Double-Entry Ledger: Timestamped debits & credits, CSV export
├── analytics.html          # Financial Intelligence: Multi-metric comparative analytics & breakdowns
├── reports.html            # Official University Audit Report: Printable A4 document with IST letterhead
├── organizers.html         # Council Roster: Executive cabinet portfolios & RBAC permissions matrix
├── audit-logs.html         # Security Audit Trail: Immutable chronological action logs
├── settings.html           # Preferences: Institution settings, role switcher, JSON backup & seed reset
│
├── css/
│   └── style.css           # Master CSS design system with custom properties, grid, cards, tables, modals
│
├── images/
│   └── logo.png            # Official Pukhtoon Students IST emblem
│
└── js/
    ├── data.js             # IST Islamabad dataset, schemas, and LocalStorage synchronization engine
    ├── charts.js           # Theme-adaptive Chart.js visualizations
    ├── supabase.js         # Supabase PostgreSQL cloud adapter
    └── app.js              # Application controller, modal managers, toast alerts, command palette
```

---

## 🚀 Instant Deployment on Vercel

1. Push or upload your project repository to GitHub (e.g. `https://github.com/hamas-ist/pukhtoon_ist`).
2. Go to **[vercel.com](https://vercel.com)** and log in with your GitHub account.
3. Click **"Add New..."** > **"Project"**.
4. Find your repository `pukhtoon_ist` and click **"Import"**.
5. Leave all build settings at default (Framework Preset: **Other**, Root Directory: `./`).
6. Click **"Deploy"**.
7. In ~15 seconds, your platform is live at `https://your-project.vercel.app`!

---

## 🏛️ Institutional Credit & Governance

- **Organization**: Pukhtoon Community (PUKHTOON IST)
- **Parent Institution**: [Institute of Space Technology (IST), Islamabad](https://www.ist.edu.pk)
- **Governing Body**: Directorate of Student Affairs (DSA), IST
- **Campus Address**: 1, Islamabad Expressway, Sector H-12 Near Rawat Toll Plaza, Islamabad, Pakistan

---

## 📄 License

This software is released under the **MIT License**. Created for the student leadership, council officers, and student body of the Institute of Space Technology (IST), Islamabad.
