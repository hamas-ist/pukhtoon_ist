/**
 * PUKHTOON COMMUNITY — IST ISLAMABAD
 * Core Application Controller, Theme Engine & RBAC Session Manager
 */

// Format Currency
function formatPKR(val) {
  if (val === null || val === undefined) return 'PKR 0';
  const num = Math.round(Number(val) || 0);
  return `PKR ${num.toLocaleString()}`;
}

// Format Date
function formatDate(d) {
  if (!d) return '—';
  try {
    return new Date(d).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return d;
  }
}

// Theme Engine
const Theme = {
  init() {
    const saved = localStorage.getItem('pukhtoon_theme') || 'dark';
    if (saved === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    this.updateIcons();
  },

  toggle() {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('pukhtoon_theme', isDark ? 'dark' : 'light');
    this.updateIcons();
    if (window.ChartManager) {
      ChartManager.updateAll();
    }
  },

  updateIcons() {
    const isDark = document.body.classList.contains('dark');
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.innerHTML = isDark
        ? '<i data-lucide="sun" class="w-4 h-4 text-accent-amber"></i>'
        : '<i data-lucide="moon" class="w-4 h-4 text-accent-blue"></i>';
    });
    if (window.lucide) {
      lucide.createIcons();
    }
  }
};

// Executive Council Credentials & Profiles
const COUNCIL_ACCOUNTS = {
  'hamas.khan@ist.edu.pk': {
    name: 'Hamas Khan',
    username: 'hamaskhan',
    email: 'hamas.khan@ist.edu.pk',
    password: 'Hamas@IST2026',
    role: 'SUPER_ADMIN',
    title: 'Super Admin (Finance Secretary)',
    avatar: 'HK'
  },
  'misbah.ullah@ist.edu.pk': {
    name: 'Misbah Ullah',
    username: 'misbahullah',
    email: 'misbah.ullah@ist.edu.pk',
    password: 'Misbah@IST2026',
    role: 'GENERAL_SECRETARY',
    title: 'General Secretary',
    avatar: 'MU'
  },
  'maaz.muhammad@ist.edu.pk': {
    name: 'Maaz Muhammad',
    username: 'maazmuhammad',
    email: 'maaz.muhammad@ist.edu.pk',
    password: 'Maaz@IST2026',
    role: 'VICE_PRESIDENT',
    title: 'Vice President',
    avatar: 'MM'
  },
  'huzaifa.tariq@ist.edu.pk': {
    name: 'Huzaifa Tariq',
    username: 'huzaifatariq',
    email: 'huzaifa.tariq@ist.edu.pk',
    password: 'Huzaifa@IST2026',
    role: 'PRESIDENT',
    title: 'President',
    avatar: 'HT'
  }
};

// Permission Checking (Only Super Admin Hamas Khan can edit/modify)
function canEdit() {
  const user = Auth.getUser();
  return user && (user.role === 'SUPER_ADMIN' || user.username === 'hamaskhan');
}

function requireSuperAdmin(actionDesc = 'make changes') {
  if (!canEdit()) {
    showRestrictedModal(actionDesc);
    return false;
  }
  return true;
}

function showRestrictedModal(actionDesc = 'make changes') {
  let modal = document.getElementById('restrictedActionModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'restrictedActionModal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-dialog" style="max-width: 440px; text-align: center; padding: 2.25rem 2rem;">
        <div style="width: 3.75rem; height: 3.75rem; margin: 0 auto 1.25rem; border-radius: 1.125rem; background: rgba(239, 68, 68, 0.12); color: var(--accent-red); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(239, 68, 68, 0.25);">
          <i data-lucide="shield-alert" class="w-8 h-8"></i>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem; letter-spacing: -0.02em;">
          Access Restricted
        </h3>
        <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
          Only <strong>Super Admin Hamas Khan</strong> can do these changes. Your current account has read-only executive audit permissions.
        </p>
        <button class="btn btn-primary" onclick="closeModal('restrictedActionModal')" style="width: 100%;">
          <span>Understood</span>
        </button>
      </div>
    `;
    document.body.appendChild(modal);
  }
  openModal('restrictedActionModal');
  showToast('Access Restricted', 'Only Super Admin Hamas Khan can do these changes.', 'warning');
  if (window.lucide) lucide.createIcons();
}

// Auth / RBAC Session Simulator
const Auth = {
  getUser() {
    try {
      const stored = localStorage.getItem('pukhtoon_user');
      if (stored) return JSON.parse(stored);
    } catch {}
    // Default to Super Admin Hamas Khan
    return COUNCIL_ACCOUNTS['hamas.khan@ist.edu.pk'];
  },

  setUser(user) {
    localStorage.setItem('pukhtoon_user', JSON.stringify(user));
    this.renderHeaderUser();
  },

  logout() {
    localStorage.removeItem('pukhtoon_user');
    window.location.href = 'login.html';
  },

  renderHeaderUser() {
    const user = this.getUser();
    const avatarEl = document.getElementById('userAvatar');
    const nameEl = document.getElementById('userName');
    const roleEl = document.getElementById('userRole');

    if (avatarEl && user) {
      const initials = user.name.split(' ').map(n => n[0]).slice(0, 2).join('');
      avatarEl.textContent = initials;
    }
    if (nameEl && user) nameEl.textContent = user.name;
    if (roleEl && user) roleEl.textContent = user.title || user.role.replace('_', ' ');
  }
};

// Toast Notifications
function showToast(title, message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  const iconName = type === 'error' ? 'alert-circle' : type === 'warning' ? 'alert-triangle' : 'check-circle-2';
  const iconColor = type === 'error' ? 'text-accent-red' : type === 'warning' ? 'text-accent-amber' : 'text-accent-emerald';

  toast.innerHTML = `
    <i data-lucide="${iconName}" class="w-5 h-5 shrink-0 ${iconColor}"></i>
    <div style="flex: 1; min-width: 0;">
      <p style="font-size: 0.8125rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.125rem;">${title}</p>
      <p style="font-size: 0.75rem; color: var(--text-muted);">${message}</p>
    </div>
  `;

  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.style.transition = 'all 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Modal Handlers
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Command Palette (Ctrl+K)
const CommandPalette = {
  init() {
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openModal('cmdPaletteModal');
        const input = document.getElementById('cmdSearchInput');
        if (input) input.focus();
      }
      if (e.key === 'Escape') {
        closeModal('cmdPaletteModal');
      }
    });

    const input = document.getElementById('cmdSearchInput');
    if (input) {
      input.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }
  },

  handleSearch(query) {
    const list = document.getElementById('cmdResultsList');
    if (!list) return;

    const data = DataStore.load();
    const q = query.toLowerCase().trim();

    if (!q) {
      list.innerHTML = `
        <div style="padding: 0.5rem 0.75rem; font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; color: var(--text-subtle);">Navigation Shortcuts</div>
        <a href="dashboard.html" class="cmd-item"><span>Command Center Overview</span><i data-lucide="arrow-right" class="w-3.5 h-3.5"></i></a>
        <a href="students.html" class="cmd-item"><span>Student Directory</span><i data-lucide="arrow-right" class="w-3.5 h-3.5"></i></a>
        <a href="contributions.html" class="cmd-item"><span>Contribution Cycles</span><i data-lucide="arrow-right" class="w-3.5 h-3.5"></i></a>
        <a href="events.html" class="cmd-item"><span>Events & Budgets</span><i data-lucide="arrow-right" class="w-3.5 h-3.5"></i></a>
        <a href="ledger.html" class="cmd-item"><span>Financial Ledger</span><i data-lucide="arrow-right" class="w-3.5 h-3.5"></i></a>
        <a href="analytics.html" class="cmd-item"><span>Financial Analytics</span><i data-lucide="arrow-right" class="w-3.5 h-3.5"></i></a>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    const matchedStudents = data.students.filter(s =>
      s.fullName.toLowerCase().includes(q) || s.regNo.toLowerCase().includes(q) || s.department.toLowerCase().includes(q)
    );

    const matchedEvents = data.events.filter(e =>
      e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)
    );

    let html = '';
    if (matchedStudents.length > 0) {
      html += `<div style="padding: 0.5rem 0.75rem; font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; color: var(--text-subtle);">Students</div>`;
      matchedStudents.forEach(s => {
        html += `
          <a href="student-detail.html?id=${s.id}" class="cmd-item">
            <div>
              <strong style="color: var(--text-primary);">${s.fullName}</strong>
              <span style="color: var(--text-muted); font-size: 0.75rem; margin-left: 0.5rem;">(${s.regNo}) • ${s.department}</span>
            </div>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </a>
        `;
      });
    }

    if (matchedEvents.length > 0) {
      html += `<div style="padding: 0.5rem 0.75rem; font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; color: var(--text-subtle);">Events</div>`;
      matchedEvents.forEach(e => {
        html += `
          <a href="event-detail.html?id=${e.id}" class="cmd-item">
            <div>
              <strong style="color: var(--text-primary);">${e.title}</strong>
              <span style="color: var(--text-muted); font-size: 0.75rem; margin-left: 0.5rem;">• ${e.status}</span>
            </div>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </a>
        `;
      });
    }

    if (matchedStudents.length === 0 && matchedEvents.length === 0) {
      html = `<div style="padding: 2rem; text-align: center; font-size: 0.8125rem; color: var(--text-muted);">No records found matching "${query}"</div>`;
    }

    list.innerHTML = html;
    if (window.lucide) lucide.createIcons();
  }
};

// CSV Exporter Utility
function exportCSV(filename, rows) {
  if (!rows || !rows.length) return;
  const separator = ',';
  const keys = Object.keys(rows[0]);
  const csvContent =
    keys.join(separator) +
    '\n' +
    rows
      .map(row => {
        return keys
          .map(k => {
            let cell = row[k] === null || row[k] === undefined ? '' : row[k].toString();
            cell = cell.replace(/"/g, '""');
            if (cell.search(/("|,|\n)/g) >= 0) {
              cell = `"${cell}"`;
            }
            return cell;
          })
          .join(separator);
      })
      .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Apple-Style Mobile Navigation & Native iOS Human Interface Controller
const AppleMobileNav = {
  init() {
    this.renderTabBar();
    this.renderMoreSheet();
    this.enhanceMobileHeader();
    if (window.lucide) {
      lucide.createIcons();
    }
  },

  getCurrentPage() {
    let p = window.location.pathname.split('/').pop().toLowerCase();
    if (!p || p === '') return 'index.html';
    p = p.split('?')[0].split('#')[0];
    if (!p.includes('.')) p += '.html';
    return p;
  },

  isPublicPage() {
    const cur = this.getCurrentPage();
    const publicPages = ['index.html', 'transparency.html', 'gallery.html', 'login.html'];
    return publicPages.includes(cur);
  },

  renderTabBar() {
    if (document.getElementById('appleBottomTabBar')) return;

    const nav = document.createElement('nav');
    nav.id = 'appleBottomTabBar';
    nav.className = 'apple-bottom-tab-bar';
    nav.setAttribute('aria-label', 'Mobile Navigation');

    const cur = this.getCurrentPage();
    const isPublic = this.isPublicPage();
    const user = Auth.getUser();

    if (isPublic) {
      const councilHref = user ? 'dashboard.html' : 'login.html';
      const isCouncilActive = cur.includes('login') || (user && cur.includes('dashboard'));

      nav.innerHTML = `
        <div class="apple-tab-bar-inner">
          <a href="index.html" class="apple-tab-item ${cur === 'index.html' ? 'active' : ''}">
            <div class="apple-tab-icon-wrap"><i data-lucide="home" class="w-5 h-5"></i></div>
            <span class="apple-tab-label">Home</span>
          </a>
          <a href="transparency.html" class="apple-tab-item ${cur.includes('transparency') ? 'active' : ''}">
            <div class="apple-tab-icon-wrap"><i data-lucide="shield-check" class="w-5 h-5"></i></div>
            <span class="apple-tab-label">Treasury</span>
          </a>
          <a href="gallery.html" class="apple-tab-item ${cur.includes('gallery') ? 'active' : ''}">
            <div class="apple-tab-icon-wrap"><i data-lucide="image" class="w-5 h-5"></i></div>
            <span class="apple-tab-label">Gallery</span>
          </a>
          <a href="${councilHref}" class="apple-tab-item ${isCouncilActive ? 'active' : ''}">
            <div class="apple-tab-icon-wrap"><i data-lucide="${user ? 'layout-dashboard' : 'user'}" class="w-5 h-5"></i></div>
            <span class="apple-tab-label">${user ? 'Portal' : 'Council'}</span>
          </a>
          <button type="button" class="apple-tab-item" onclick="Theme.toggle()" title="Toggle Theme">
            <div class="apple-tab-icon-wrap"><i data-lucide="sun-moon" class="w-5 h-5"></i></div>
            <span class="apple-tab-label">Theme</span>
          </button>
        </div>
      `;
    } else {
      const isMoreActive = ['analytics.html', 'reports.html', 'organizers.html', 'settings.html', 'audit-logs.html', 'expenses.html'].some(p => cur.includes(p));

      nav.innerHTML = `
        <div class="apple-tab-bar-inner">
          <a href="dashboard.html" class="apple-tab-item ${cur.includes('dashboard') ? 'active' : ''}">
            <div class="apple-tab-icon-wrap"><i data-lucide="layout-dashboard" class="w-5 h-5"></i></div>
            <span class="apple-tab-label">Hub</span>
          </a>
          <a href="students.html" class="apple-tab-item ${cur.includes('student') ? 'active' : ''}">
            <div class="apple-tab-icon-wrap"><i data-lucide="users" class="w-5 h-5"></i></div>
            <span class="apple-tab-label">Students</span>
          </a>
          <a href="contributions.html" class="apple-tab-item ${cur.includes('contribution') ? 'active' : ''}">
            <div class="apple-tab-icon-wrap"><i data-lucide="coins" class="w-5 h-5"></i></div>
            <span class="apple-tab-label">Dues</span>
          </a>
          <a href="events.html" class="apple-tab-item ${cur.includes('event') ? 'active' : ''}">
            <div class="apple-tab-icon-wrap"><i data-lucide="calendar" class="w-5 h-5"></i></div>
            <span class="apple-tab-label">Events</span>
          </a>
          <a href="ledger.html" class="apple-tab-item ${cur.includes('ledger') ? 'active' : ''}">
            <div class="apple-tab-icon-wrap"><i data-lucide="file-spreadsheet" class="w-5 h-5"></i></div>
            <span class="apple-tab-label">Ledger</span>
          </a>
          <button type="button" class="apple-tab-item ${isMoreActive ? 'active' : ''}" onclick="openModal('mobileMoreSheetModal')" title="More Menus">
            <div class="apple-tab-icon-wrap"><i data-lucide="grid" class="w-5 h-5"></i></div>
            <span class="apple-tab-label">More</span>
          </button>
        </div>
      `;
    }

    document.body.appendChild(nav);
  },

  renderMoreSheet() {
    if (document.getElementById('mobileMoreSheetModal')) return;

    const user = Auth.getUser();
    const sheet = document.createElement('div');
    sheet.id = 'mobileMoreSheetModal';
    sheet.className = 'apple-sheet-backdrop';
    sheet.onclick = (e) => {
      if (e.target === sheet) closeModal('mobileMoreSheetModal');
    };

    sheet.innerHTML = `
      <div class="apple-sheet-dialog" onclick="event.stopPropagation()">
        <div class="apple-sheet-handle"></div>
        
        <div class="apple-sheet-header">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div class="user-avatar" style="width: 2.25rem; height: 2.25rem; font-size: 0.8125rem;">
              ${user ? user.avatar || user.name.substring(0, 2).toUpperCase() : 'HK'}
            </div>
            <div>
              <div style="font-size: 0.875rem; font-weight: 700; color: var(--text-primary);">${user ? user.name : 'Hamas Khan'}</div>
              <div style="font-size: 0.6875rem; color: var(--accent-blue); font-weight: 600;">${user ? user.title || user.role : 'Super Admin'}</div>
            </div>
          </div>
          <button class="btn btn-icon btn-sm" onclick="closeModal('mobileMoreSheetModal')">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <div class="apple-sheet-grid">
          <a href="analytics.html" class="apple-sheet-tile">
            <div class="apple-sheet-icon" style="background: rgba(0, 113, 227, 0.12); color: var(--accent-blue);">
              <i data-lucide="bar-chart-3" class="w-6 h-6"></i>
            </div>
            <span>Analytics</span>
          </a>

          <a href="reports.html" class="apple-sheet-tile">
            <div class="apple-sheet-icon" style="background: rgba(16, 185, 129, 0.12); color: var(--accent-emerald);">
              <i data-lucide="printer" class="w-6 h-6"></i>
            </div>
            <span>Reports</span>
          </a>

          <a href="organizers.html" class="apple-sheet-tile">
            <div class="apple-sheet-icon" style="background: rgba(139, 92, 246, 0.12); color: #8B5CF6;">
              <i data-lucide="shield-check" class="w-6 h-6"></i>
            </div>
            <span>Council</span>
          </a>

          <a href="expenses.html" class="apple-sheet-tile">
            <div class="apple-sheet-icon" style="background: rgba(239, 68, 68, 0.12); color: var(--accent-red);">
              <i data-lucide="receipt" class="w-6 h-6"></i>
            </div>
            <span>Expenses</span>
          </a>

          <a href="audit-logs.html" class="apple-sheet-tile">
            <div class="apple-sheet-icon" style="background: rgba(245, 158, 11, 0.12); color: var(--accent-amber);">
              <i data-lucide="history" class="w-6 h-6"></i>
            </div>
            <span>Audit Logs</span>
          </a>

          <a href="settings.html" class="apple-sheet-tile">
            <div class="apple-sheet-icon" style="background: rgba(120, 120, 128, 0.15); color: var(--text-primary);">
              <i data-lucide="settings" class="w-6 h-6"></i>
            </div>
            <span>Settings</span>
          </a>

          <a href="gallery.html" class="apple-sheet-tile">
            <div class="apple-sheet-icon" style="background: rgba(236, 72, 153, 0.12); color: #EC4899;">
              <i data-lucide="image" class="w-6 h-6"></i>
            </div>
            <span>Gallery</span>
          </a>

          <a href="transparency.html" class="apple-sheet-tile">
            <div class="apple-sheet-icon" style="background: rgba(6, 182, 212, 0.12); color: #06B6D4;">
              <i data-lucide="eye" class="w-6 h-6"></i>
            </div>
            <span>Treasury</span>
          </a>
        </div>

        <div style="padding: 0.5rem 1rem 0; display: flex; gap: 0.75rem;">
          <button class="btn btn-outline" onclick="Theme.toggle(); closeModal('mobileMoreSheetModal');" style="flex: 1; font-size: 0.75rem; justify-content: center;">
            <i data-lucide="sun-moon" class="w-4 h-4"></i>
            <span>Switch Theme</span>
          </button>
          <button class="btn btn-outline" onclick="Auth.logout()" style="flex: 1; font-size: 0.75rem; justify-content: center; color: var(--accent-red); border-color: rgba(239, 68, 68, 0.3);">
            <i data-lucide="log-out" class="w-4 h-4"></i>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(sheet);
  },

  enhanceMobileHeader() {
    const header = document.querySelector('.app-header');
    if (header && !header.querySelector('.mobile-header-brand')) {
      const brand = document.createElement('a');
      brand.href = 'dashboard.html';
      brand.className = 'mobile-header-brand';
      brand.innerHTML = `
        <div class="logo-symbol" style="width: 2rem; height: 2rem; padding: 2px;">
          <img src="images/logo.png" alt="Pukhtoon Community">
        </div>
        <div class="mobile-brand-title">PUKHTOON <span>IST</span></div>
      `;
      header.insertBefore(brand, header.firstChild);
    }
  }
};

// Global Initialization
document.addEventListener('DOMContentLoaded', () => {
  Theme.init();
  Auth.renderHeaderUser();
  CommandPalette.init();
  AppleMobileNav.init();
  if (window.lucide) {
    lucide.createIcons();
  }
});
