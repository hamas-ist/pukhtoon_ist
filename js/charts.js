/**
 * PUKHTOON COMMUNITY — IST ISLAMABAD
 * Chart.js Visualizers & Dynamic Adaptive Theme Engine
 */

const ChartManager = {
  instances: {},

  getThemeColors() {
    const isDark = document.body.classList.contains('dark');
    return {
      textColor: isDark ? '#A1A1AA' : '#515154',
      gridColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
      tooltipBg: isDark ? '#101010' : '#FFFFFF',
      tooltipBorder: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
      tooltipText: isDark ? '#F5F5F7' : '#1D1D1F'
    };
  },

  renderCashFlow(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    if (this.instances[canvasId]) {
      this.instances[canvasId].destroy();
    }

    const tc = this.getThemeColors();
    const ctx = canvas.getContext('2d');

    const gradCollected = ctx.createLinearGradient(0, 0, 0, 300);
    gradCollected.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
    gradCollected.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

    const gradSpent = ctx.createLinearGradient(0, 0, 0, 300);
    gradSpent.addColorStop(0, 'rgba(0, 113, 227, 0.35)');
    gradSpent.addColorStop(1, 'rgba(0, 113, 227, 0.0)');

    const data = (typeof DataStore !== 'undefined' ? DataStore.load() : null) || {};
    const txns = data.transactions || [];
    const dues = data.monthlyDues || [];
    const expenses = data.expenses || [];

    const monthKeys = ['2026-05', '2026-06', '2026-07', '2026-08', '2026-09', '2026-10'];
    const monthLabels = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct 2026'];

    const inflowData = monthKeys.map(k => {
      const fromDues = dues.filter(d => d.monthKey === k).reduce((s, d) => s + (d.paidAmount || 0), 0);
      const fromTxns = txns.filter(t => t.type === 'INFLOW' && (t.date || '').startsWith(k)).reduce((s, t) => s + (t.amount || 0), 0);
      return Math.max(fromDues, fromTxns);
    });

    const expenseData = monthKeys.map(k => {
      const fromExp = expenses.filter(e => (e.date || '').startsWith(k)).reduce((s, e) => s + (e.amount || 0), 0);
      const fromTxns = txns.filter(t => t.type === 'OUTFLOW' && (t.date || '').startsWith(k)).reduce((s, t) => s + Math.abs(t.amount || 0), 0);
      return Math.max(fromExp, fromTxns);
    });

    this.instances[canvasId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: monthLabels,
        datasets: [
          {
            label: 'Contributions Inflow (PKR)',
            data: inflowData,
            borderColor: '#10B981',
            backgroundColor: gradCollected,
            tension: 0.35,
            fill: true,
            borderWidth: 2.5,
            pointRadius: 4,
            pointBackgroundColor: '#10B981'
          },
          {
            label: 'Event Expenditures (PKR)',
            data: expenseData,
            borderColor: '#0071E3',
            backgroundColor: gradSpent,
            tension: 0.35,
            fill: true,
            borderWidth: 2.5,
            pointRadius: 4,
            pointBackgroundColor: '#0071E3'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: tc.tooltipBg,
            borderColor: tc.tooltipBorder,
            borderWidth: 1,
            titleColor: tc.tooltipText,
            bodyColor: tc.tooltipText,
            padding: 12,
            boxPadding: 6,
            usePointStyle: true,
            callbacks: {
              label: (context) => ` ${context.dataset.label.split(' ')[0]}: PKR ${context.parsed.y.toLocaleString()}`
            }
          }
        },
        scales: {
          x: {
            grid: { color: tc.gridColor },
            ticks: { color: tc.textColor, font: { size: 11, family: 'var(--font-sans)' } }
          },
          y: {
            beginAtZero: true,
            grid: { color: tc.gridColor },
            ticks: {
              color: tc.textColor,
              font: { size: 11, family: 'var(--font-sans)' },
              callback: (val) => val === 0 ? '0' : `${val / 1000}k`
            }
          }
        }
      }
    });
  },

  renderCategoryDonut(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    if (this.instances[canvasId]) {
      this.instances[canvasId].destroy();
    }

    const tc = this.getThemeColors();
    const data = (typeof DataStore !== 'undefined' ? DataStore.load() : null) || {};
    const expenses = data.expenses || [];
    const categories = {};
    expenses.forEach(e => {
      categories[e.category] = (categories[e.category] || 0) + e.amount;
    });

    let labels = Object.keys(categories);
    let values = Object.values(categories);
    let colors = ['#0071E3', '#10B981', '#F59E0B', '#8B5CF6', '#06B6D4', '#EF4444'];

    const isEmpty = labels.length === 0 || values.every(v => v === 0);
    if (isEmpty) {
      labels = ['No Expenses Incurred'];
      values = [1];
      colors = [document.body.classList.contains('dark') ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'];
    }

    this.instances[canvasId] = new Chart(canvas.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: colors,
            borderWidth: 2,
            borderColor: document.body.classList.contains('dark') ? '#101010' : '#FFFFFF',
            hoverOffset: isEmpty ? 0 : 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: tc.tooltipBg,
            borderColor: tc.tooltipBorder,
            borderWidth: 1,
            titleColor: tc.tooltipText,
            bodyColor: tc.tooltipText,
            padding: 12,
            callbacks: {
              label: (context) => isEmpty ? ' No expenses recorded yet' : ` ${context.label}: PKR ${context.parsed.toLocaleString()}`
            }
          }
        },
        cutout: '70%'
      }
    });
  },

  renderBudgetComparison(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    if (this.instances[canvasId]) {
      this.instances[canvasId].destroy();
    }

    const tc = this.getThemeColors();
    const data = (typeof DataStore !== 'undefined' ? DataStore.load() : null) || {};
    const events = data.events || [];

    const isEmpty = events.length === 0;
    const labels = isEmpty
      ? ['No Events Scheduled']
      : events.map(e => e.title.length > 20 ? e.title.substring(0, 18) + '...' : e.title);
    const planned = isEmpty ? [0] : events.map(e => e.plannedBudget);
    const actual = isEmpty ? [0] : events.map(e => e.actualSpending);

    this.instances[canvasId] = new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Planned Budget',
            data: planned,
            backgroundColor: '#94A3B8',
            borderRadius: 6
          },
          {
            label: 'Actual Spent',
            data: actual,
            backgroundColor: '#0071E3',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: tc.tooltipBg,
            borderColor: tc.tooltipBorder,
            borderWidth: 1,
            titleColor: tc.tooltipText,
            bodyColor: tc.tooltipText,
            padding: 12,
            callbacks: {
              label: (context) => ` ${context.dataset.label}: PKR ${context.parsed.y.toLocaleString()}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: tc.textColor, font: { size: 10 } }
          },
          y: {
            beginAtZero: true,
            grid: { color: tc.gridColor },
            ticks: {
              color: tc.textColor,
              font: { size: 10 },
              callback: (val) => val === 0 ? '0' : `${val / 1000}k`
            }
          }
        }
      }
    });
  },

  updateAll() {
    Object.keys(this.instances).forEach(id => {
      if (id.includes('cashFlow') || id.includes('flow')) {
        this.renderCashFlow(id);
      } else if (id.includes('category') || id.includes('cat')) {
        this.renderCategoryDonut(id);
      } else if (id.includes('budget') || id.includes('bar')) {
        this.renderBudgetComparison(id);
      }
    });
  }
};
