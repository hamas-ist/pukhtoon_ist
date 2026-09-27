# PUKHTOON SOCIETY — Institute of Space Technology (IST), Islamabad
### Enterprise-Grade Financial Intelligence & Cultural Event Management Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Design System](https://img.shields.io/badge/Design_System-Apple_Obsidian-000000?style=flat&logo=apple)](css/style.css)
[![Status](https://img.shields.io/badge/Status-Production_Ready-emerald.svg)](index.html)
[![Affiliation](https://img.shields.io/badge/Affiliation-IST_Islamabad-blue.svg)](https://www.ist.edu.pk)

A full-fledged, multi-page web platform engineered for the **PUKHTOON SOCIETY** at the **Institute of Space Technology (IST), Islamabad**, operating under the Directorate of Student Affairs (DSA).

This repository contains the standalone, zero-build web edition crafted with pure semantic HTML5, Apple-inspired CSS3 design tokens, and modular ES6 JavaScript. It runs natively in any modern web browser offline or locally, and can be hosted instantly on **GitHub Pages** with zero configuration or build steps.

---

## 🌟 Key Capabilities & Features

### 1. Apple-Inspired Dual Design System
- **Obsidian Dark Mode** (`#090A0F` base, `#11131F` surfaces, vibrant blue/amber/emerald neon accents, subtle radial grid textures).
- **Pure Apple Light Mode** (`#FBFBFD` canvas, pure white card surfaces, `#E5E7EB` borders, high-contrast typography).
- Instant mode toggle with local storage persistence and smooth CSS transitions.

### 2. Autonomous LocalStorage State Engine
- Comes preloaded with a curated, true-to-life **IST Islamabad seed dataset**:
  - 8 engineering faculties: Aerospace, Avionics, Electrical, Mechanical, Materials, Computer Science, Space Science, Systems.
  - Batches 2021 through 2025 with official IST student registration numbers (`210104012`, `220101004`, etc.).
  - Realistic contribution cycles, automated dues tracking, multi-category expense vouchers, and double-entry ledger.
- Full offline editing capability: Add students, record fee payments, schedule events, log vouchers, and export client-side CSV and JSON backups.

### 3. Comprehensive Financial Operations
- **Double-Entry Master Ledger**: Every rupee accounted for across inflow (dues collections) and outflow (event disbursements).
- **Itemized Expense Vouchers**: Categorized tracking (Catering, Attan Decor, Audio/Visual, Venue, Security, Logistics) with approval officer stamps.
- **Contribution Cycles**: Monthly, semester-wise, and annual subscription cycles with real-time target gauges.

### 4. Financial Intelligence & Visualizations
- Interactive **Chart.js** cash flow area charts, category allocation donuts, and planned vs. actual budget comparisons.
- **Ctrl+K Universal Command Palette** for rapid spotlight navigation and search.
- **DSA Audit Report Generator**: 1-click university-grade printable statement formatted for standard A4 paper with official IST letterheads and signature blocks.

---

## 📁 Repository Directory & Page Architecture

```text
pukhtoon-society-web/
├── index.html              # Public Gateway: Mission, live KPIs, upcoming cultural events
├── transparency.html       # Public Financial Portal: Real-time public audit & cash flow
├── gallery.html            # Cultural Showcase: Photo gallery with interactive lightbox
├── login.html              # Council Portal: Secure entry with 1-click RBAC profile selector
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
└── js/
    ├── data.js             # IST Islamabad dataset, schemas, and LocalStorage synchronization engine
    ├── charts.js           # Theme-adaptive Chart.js visualizations
    └── app.js              # Application controller, modal managers, toast alerts, command palette
```

---

## 🚀 How to Run Locally

You do **not** need Node.js, npm, or any server installed:

1. Download or clone this folder.
2. Double-click **`index.html`** to open the public portal in Google Chrome, Microsoft Edge, Safari, or Firefox.
3. Navigate to **Council Command Portal** via the top navigation or open **`dashboard.html`** directly to access the executive suite.

---

## 🌐 How to Upload to GitHub & Host on GitHub Pages

### Method 1: Upload via GitHub Web Browser (No Git Required)

1. Go to [GitHub.com](https://github.com) and log into your account.
2. Click the **`+`** icon in the top-right corner and select **New repository**.
3. Name your repository (e.g., `pukhtoon-society-ist`) and set it to **Public**. Leave other options unchecked, then click **Create repository**.
4. On the quick setup page, click the link that says **"uploading an existing file"**.
5. Drag and drop all files and folders (`index.html`, all other `.html` files, the `css/` folder, and the `js/` folder) directly into the browser window.
6. Scroll down, type a commit message (e.g. `Initial commit: Pukhtoon Society Web Platform`), and click **Commit changes**.

### Method 2: Enable Free Live Hosting via GitHub Pages

Once your files are committed to GitHub:

1. In your GitHub repository, click on the **Settings** tab.
2. In the left sidebar, click on **Pages** (under the "Code and automation" section).
3. Under **Build and deployment** > **Branch**:
   - Select **`main`** (or `master`) from the dropdown.
   - Leave the folder set to **`/(root)`**.
   - Click **Save**.
4. Wait 30–60 seconds, then refresh the page. You will see your live website URL:
   ```
   https://<your-username>.github.io/<repository-name>/
   ```
5. Click the link to view your live, production-ready website!

---

## 🔑 Demo Council Profiles (RBAC)

When logging in or switching roles in `login.html` or `settings.html`, you can simulate any of the following executive accounts:

| Role | Officer Name | IST Registration # | Permissions |
| :--- | :--- | :--- | :--- |
| **Super Admin** | Muhammad Ahmad | `210104012` | Full platform control, approvals, member deletion, system reset |
| **Finance Secretary** | Bilal Khattak | `220101004` | Log expenses, disburse funds, manage dues cycles, export ledger |
| **Event Organizer** | Hamza Afridi | `210102045` | Plan events, request budget allocations, submit expense receipts |
| **Council Auditor** | DSA Observer | `FAC-2026-IST` | Read-only observation, view-only analytics, financial report generator |

---

## 🏛️ Institutional Credit & Governance

- **Organization**: Pukhtoon Cultural & Student Welfare Society
- **Parent Institution**: [Institute of Space Technology (IST), Islamabad](https://www.ist.edu.pk)
- **Governing Body**: Directorate of Student Affairs (DSA), IST
- **Campus Address**: 1, Islamabad Expressway, Sector H-12 Near Rawat Toll Plaza, Islamabad, Pakistan

---

## 📄 License

This software is released under the **MIT License**. Created for the student leadership, council officers, and student body of the Institute of Space Technology (IST), Islamabad.
