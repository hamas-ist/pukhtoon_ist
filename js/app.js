/**
 * PUKHTOON SOCIETY — IST ISLAMABAD
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

// Auth / RBAC Session Simulator
const Auth = {
  getUser() {
    try {
      const stored = localStorage.getItem('pukhtoon_user');
      if (stored) return JSON.parse(stored);
    } catch {}
    // Default to Super Admin for seamless testing
    return {
      name: 'Muhammad Ahmad Khan',
      email: 'admin@ist.pukhtoon.org',
      role: 'SUPER_ADMIN',
      title: 'President & Cabinet Head'
    };
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
    if (roleEl && user) roleEl.textContent = user.role.replace('_', ' ');
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

// Global Initialization
document.addEventListener('DOMContentLoaded', () => {
  Theme.init();
  Auth.renderHeaderUser();
  CommandPalette.init();
  if (window.lucide) {
    lucide.createIcons();
  }
});
