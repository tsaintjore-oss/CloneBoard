(function () {
  'use strict';

  var data = {
    kpis: {
      total: 672341.82,
      net: 603891.47,
      newSubs: 2843,
      activeSubs: 18387,
      arpu: 36.42
    },
    kpiChanges: { total: 12.2, net: 11.6, newSubs: 8.1, activeSubs: -2.1, arpu: 5.2 },
    earnings: [
      { day: 'Oct 1', v: 28472, growth: 12.5 },
      { day: 'Oct 3', v: 22083, growth: -22.4 },
      { day: 'Oct 5', v: 18891, growth: -14.5 },
      { day: 'Oct 7', v: 24067, growth: 27.4 },
      { day: 'Oct 9', v: 26794, growth: 11.2 },
      { day: 'Oct 11', v: 19187, growth: -28.3 },
      { day: 'Oct 13', v: 25291, growth: 31.8 },
      { day: 'Oct 15', v: 27863, growth: 10.2 },
      { day: 'Oct 17', v: 24271, growth: -12.9 },
      { day: 'Oct 18', v: 13660.76, growth: -43.91 },
      { day: 'Oct 20', v: 22094, growth: 61.7 },
      { day: 'Oct 22', v: 26782, growth: 21.2 },
      { day: 'Oct 24', v: 24483, growth: -8.6 },
      { day: 'Oct 26', v: 27191, growth: 11.0 },
      { day: 'Oct 28', v: 28847, growth: 6.3 },
      { day: 'Oct 31', v: 29368, growth: 1.7 }
    ],
    subscribers: [
      { m: 'Jan', v: 14200 },
      { m: 'Feb', v: 14847 },
      { m: 'Mar', v: 15520 },
      { m: 'Apr', v: 16103 },
      { m: 'May', v: 16892 },
      { m: 'Jun', v: 17198 },
      { m: 'Jul', v: 17651 },
      { m: 'Aug', v: 17918 },
      { m: 'Sep', v: 18104 },
      { m: 'Oct', v: 18387 }
    ],
    creatorReports: {
      earningsSummary: { total: 8272.42, subscriptions: 534.48, tips: 440, posts: 0, referrals: 0, messages: 7297.94, streams: 0 },
      earningsTrends: [
        { day: 'Jul 11', v: 420 }, { day: 'Jul 12', v: 380 }, { day: 'Jul 13', v: 510 }, { day: 'Jul 14', v: 290 },
        { day: 'Jul 15', v: 640 }, { day: 'Jul 16', v: 720 }, { day: 'Jul 17', v: 580 }, { day: 'Jul 18', v: 890 },
        { day: 'Jul 19', v: 940 }, { day: 'Jul 20', v: 820 }, { day: 'Jul 21', v: 760 }, { day: 'Jul 22', v: 650 },
        { day: 'Jul 23', v: 920 }, { day: 'Jul 24', v: 880 }, { day: 'Jul 25', v: 780 }, { day: 'Jul 26', v: 950 }
      ]
    },
    transactions: [
      { date: '31 Oct 2025, 16:12', type: 'Tip', user: 'user_9***2', amount: 25, net: 21.23 },
      { date: '31 Oct 2025, 14:08', type: 'Subscription', user: 'j***k', amount: 9.99, net: 7.49 },
      { date: '31 Oct 2025, 11:44', type: 'Message', user: 'm***7', amount: 15, net: 12.81 },
      { date: '30 Oct 2025, 21:22', type: 'PPV', user: 'a***n', amount: 12.99, net: 10.37 },
      { date: '30 Oct 2025, 18:15', type: 'Tip', user: 'b***1', amount: 50, net: 42.48 },
      { date: '30 Oct 2025, 15:01', type: 'Post', user: '—', amount: 0, net: 0 },
      { date: '30 Oct 2025, 13:33', type: 'Referral', user: '—', amount: 4.99, net: 4.99 },
      { date: '29 Oct 2025, 20:50', type: 'Subscription', user: 'c***w', amount: 14.99, net: 11.21 },
      { date: '29 Oct 2025, 17:12', type: 'Tip', user: 'd***4', amount: 10, net: 8.49 },
      { date: '29 Oct 2025, 10:08', type: 'Message', user: 'e***l', amount: 5.99, net: 5.07 }
    ]
  };

  function formatMoney(v) {
    if (v == null || isNaN(v)) return '$0.00';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);
  }

  function formatPercent(v) {
    if (v == null || isNaN(v)) return '0%';
    return (v >= 0 ? '+' : '') + v.toFixed(1) + '%';
  }

  var chartEarnings = null;
  var chartEarningsByChannelOverview = null;
  var chartEarningsTrends = null;
  var chartEarningsByChannel = null;
  var creatorReportsChartInited = false;
  var creatorChannelChartInited = false;

  function renderOverviewSummary() {
    var s = data.creatorReports && data.creatorReports.earningsSummary;
    if (!s) return;
    var el = function (id) { return document.getElementById(id); };
    if (el('overview-total')) el('overview-total').textContent = formatMoney(s.total);
    if (el('overview-subs')) el('overview-subs').textContent = formatMoney(s.subscriptions);
    if (el('overview-tips')) el('overview-tips').textContent = formatMoney(s.tips);
    if (el('overview-posts')) el('overview-posts').textContent = formatMoney(s.posts);
    if (el('overview-referrals')) el('overview-referrals').textContent = formatMoney(s.referrals);
    if (el('overview-messages')) el('overview-messages').textContent = formatMoney(s.messages);
    if (el('overview-streams')) el('overview-streams').textContent = formatMoney(s.streams);
    var c = data.kpiChanges.total;
    var changeEl = el('overview-total-change');
    if (changeEl) {
      changeEl.textContent = formatPercent(c) + ' vs prior period';
      changeEl.className = 'overview-summary-total-change ' + (c >= 0 ? 'positive' : 'negative');
    }
  }

  function renderTransactions() {
    var tbody = document.getElementById('transactions-body');
    if (!tbody) return;
    tbody.innerHTML = data.transactions.map(function (r) {
      return '<tr><td class="date">' + r.date + '</td><td class="type">' + r.type + '</td><td class="user">' + r.user + '</td><td class="amount">' + formatMoney(r.amount) + '</td><td class="net">' + formatMoney(r.net) + '</td></tr>';
    }).join('');
  }

  function renderCreatorSummary() {
    var s = data.creatorReports && data.creatorReports.earningsSummary;
    if (!s) return;
    var el = function (id) { return document.getElementById(id); };
    if (el('creator-total')) el('creator-total').textContent = formatMoney(s.total);
    if (el('creator-subs')) el('creator-subs').textContent = formatMoney(s.subscriptions);
    if (el('creator-tips')) el('creator-tips').textContent = formatMoney(s.tips);
    if (el('creator-posts')) el('creator-posts').textContent = formatMoney(s.posts);
    if (el('creator-referrals')) el('creator-referrals').textContent = formatMoney(s.referrals);
    if (el('creator-messages')) el('creator-messages').textContent = formatMoney(s.messages);
    if (el('creator-streams')) el('creator-streams').textContent = formatMoney(s.streams);
  }

  function initCharts() {
    if (typeof Chart === 'undefined') return;

    var gridColor = 'rgba(255,255,255,0.06)';
    var axisColor = '#6b7280';

    var ctxE = document.getElementById('chart-earnings');
    if (ctxE) {
      chartEarnings = new Chart(ctxE.getContext('2d'), {
        type: 'bar',
        data: {
          labels: data.earnings.map(function (d) { return d.day; }),
          datasets: [{
            label: 'Earnings',
            data: data.earnings.map(function (d) { return d.v; }),
            backgroundColor: '#3d82f8',
            borderColor: '#3d82f8',
            borderWidth: 0,
            borderRadius: 0,
            barPercentage: 0.7,
            categoryPercentage: 0.85
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: { top: 10, right: 6, bottom: 0, left: 0 } },
          animation: { duration: 420, easing: 'easeOut' },
          interaction: { intersect: false, mode: 'index' },
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: true,
              backgroundColor: '#0f1114',
              titleColor: '#ffffff',
              bodyColor: '#e5e7eb',
              titleFont: { family: 'Inter', size: 11, weight: 400 },
              bodyFont: { family: 'Inter', size: 11, weight: 500 },
              borderWidth: 0,
              cornerRadius: 8,
              padding: 10,
              displayColors: false,
              callbacks: {
                title: function (items) { return items[0] && items[0].label ? items[0].label : ''; },
                afterTitle: function (items) {
                  var i = items[0] && items[0].dataIndex;
                  if (i != null && data.earnings[i]) return [formatMoney(data.earnings[i].v)];
                  return '';
                },
                label: function () { return ''; }
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: axisColor, maxRotation: 0, font: { family: 'Inter', size: 10, weight: 400 }, padding: 10 }
            },
            y: {
              min: 0,
              grid: { color: 'rgba(255,255,255,0.05)', drawTicks: false },
              ticks: { color: axisColor, font: { family: 'Inter', size: 10, weight: 400 }, padding: 10, callback: function (v) { return '$' + (v >= 1000 ? (v / 1000) + 'k' : v); } }
            }
          }
        }
      });
    }

    var ctxOverview = document.getElementById('chart-earnings-by-channel-overview');
    if (ctxOverview) {
      var s = data.creatorReports && data.creatorReports.earningsSummary;
      if (s) {
        var total = s.total || 1;
        var lbs = ['Subscriptions', 'Tips', 'Posts', 'Referrals', 'Messages', 'Streams'];
        var vals = [s.subscriptions, s.tips, s.posts, s.referrals, s.messages, s.streams];
        var cols = ['#3d82f8', '#38715a', '#38715a', '#8a5757', '#a78bfa', '#3d82f8'];
        chartEarningsByChannelOverview = new Chart(ctxOverview.getContext('2d'), {
          type: 'doughnut',
          data: { labels: lbs, datasets: [{ data: vals, backgroundColor: cols, borderWidth: 0 }] },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: { legend: { display: false } }
          }
        });
      }
    }
  }

  function renderOverviewChannelLegend() {
    var el = document.getElementById('overview-channel-legend');
    if (!el) return;
    var s = data.creatorReports && data.creatorReports.earningsSummary;
    if (!s) { el.innerHTML = ''; return; }
    var total = s.total || 1;
    var items = [
      { label: 'Subscriptions', val: s.subscriptions, col: '#3d82f8' },
      { label: 'Tips', val: s.tips, col: '#38715a' },
      { label: 'Posts', val: s.posts, col: '#38715a' },
      { label: 'Referrals', val: s.referrals, col: '#8a5757' },
      { label: 'Messages', val: s.messages, col: '#a78bfa' },
      { label: 'Streams', val: s.streams, col: '#3d82f8' }
    ];
    el.innerHTML = items.map(function (it) {
      var pct = total > 0 ? ((it.val / total) * 100).toFixed(2) : '0';
      return '<span class="legend-item"><span class="legend-dot" style="background:' + it.col + '"></span>' + it.label + ' <span class="legend-pct">' + pct + '%</span> <span class="legend-val">' + formatMoney(it.val) + '</span></span>';
    }).join('');
  }

  function initEarningsTrendsChart() {
    if (creatorReportsChartInited || typeof Chart === 'undefined') return;
    var ctx = document.getElementById('chart-earnings-trends');
    if (!ctx) return;
    var tr = data.creatorReports && data.creatorReports.earningsTrends;
    if (!tr || !tr.length) return;
    var gridColor = 'rgba(255,255,255,0.06)';
    var axisColor = '#6b7280';
    chartEarningsTrends = new Chart(ctx.getContext('2d'), {
      type: 'bar',
      data: {
        labels: tr.map(function (d) { return d.day; }),
        datasets: [{
          label: 'Earnings',
          data: tr.map(function (d) { return d.v; }),
          backgroundColor: '#4a8eed',
          borderColor: '#4a8eed',
          borderWidth: 0,
          barPercentage: 0.7,
          categoryPercentage: 0.85
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 10, right: 6, bottom: 0, left: 0 } },
        animation: { duration: 420, easing: 'easeOut' },
        interaction: { intersect: false, mode: 'index' },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: '#0f1114',
            titleColor: '#ffffff',
            bodyColor: '#e5e7eb',
            titleFont: { family: 'Inter', size: 11, weight: 400 },
            bodyFont: { family: 'Inter', size: 11, weight: 500 },
            borderWidth: 0,
            cornerRadius: 8,
            padding: 10,
            displayColors: false,
            callbacks: {
              title: function (items) { return items[0] && items[0].label ? items[0].label : ''; },
              afterTitle: function (items) {
                var i = items[0] && items[0].dataIndex;
                if (i != null && tr[i]) return [formatMoney(tr[i].v)];
                return '';
              },
              label: function () { return ''; }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: axisColor, maxRotation: 0, font: { family: 'Inter', size: 10, weight: 400 }, padding: 10 }
          },
          y: {
            min: 0,
            max: 1000,
            grid: { color: gridColor, drawTicks: false },
            ticks: { color: axisColor, font: { family: 'Inter', size: 10, weight: 400 }, padding: 10, stepSize: 200 }
          }
        }
      }
    });
    creatorReportsChartInited = true;
  }

  function initEarningsByChannelChart() {
    if (creatorChannelChartInited || typeof Chart === 'undefined') return;
    var ctx = document.getElementById('chart-earnings-by-channel');
    if (!ctx) return;
    var s = data.creatorReports && data.creatorReports.earningsSummary;
    if (!s) return;
    var total = s.total || 1;
    var lbs = ['Subscriptions', 'Tips', 'Posts', 'Referrals', 'Messages', 'Streams'];
    var vals = [s.subscriptions, s.tips, s.posts, s.referrals, s.messages, s.streams];
    var cols = ['#3d82f8', '#38715a', '#38715a', '#8a5757', '#a78bfa', '#3d82f8'];
    chartEarningsByChannel = new Chart(ctx.getContext('2d'), {
      type: 'doughnut',
      data: { labels: lbs, datasets: [{ data: vals, backgroundColor: cols, borderWidth: 0 }] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: { legend: { display: false } }
      }
    });
    creatorChannelChartInited = true;
  }

  function initTabs() {
    var pageOverview = document.querySelector('.page-overview');
    var pageCreator = document.querySelector('.page-creator-reports');
    var headerTitle = document.getElementById('header-title');
    var tabs = document.querySelectorAll('.tab[data-tab]');
    var topRightOverview = document.querySelector('.top-right-overview');
    var topRightCreator = document.querySelector('.top-right-creator');
    var dashboardLink = document.querySelector('.sidebar-nav > .nav-link');
    var creatorLink = document.querySelector('.nav-sub a[data-nav="creator"]');
    var analyticsGroup = creatorLink ? creatorLink.closest('.nav-group') : null;
    if (!pageOverview || !pageCreator || !tabs.length) return;

    function showOverview() {
      pageOverview.classList.remove('is-hidden');
      pageCreator.classList.remove('is-visible');
      if (topRightOverview) topRightOverview.classList.remove('is-hidden');
      if (topRightCreator) topRightCreator.classList.remove('is-visible');
      tabs.forEach(function (t) {
        t.classList.toggle('active', t.getAttribute('data-tab') === 'overview');
      });
      if (headerTitle) headerTitle.textContent = 'Inflow';
      if (dashboardLink) dashboardLink.classList.add('active');
      if (creatorLink) creatorLink.classList.remove('active');
    }

    function showCreator() {
      pageCreator.classList.add('is-visible');
      pageOverview.classList.add('is-hidden');
      if (topRightOverview) topRightOverview.classList.add('is-hidden');
      if (topRightCreator) topRightCreator.classList.add('is-visible');
      tabs.forEach(function (t) {
        t.classList.toggle('active', t.getAttribute('data-tab') === 'creator');
      });
      if (headerTitle) headerTitle.textContent = 'Creator reports';
      if (dashboardLink) dashboardLink.classList.remove('active');
      if (creatorLink) creatorLink.classList.add('active');
      if (analyticsGroup) analyticsGroup.classList.add('nav-group--open');
      initEarningsTrendsChart();
      initEarningsByChannelChart();
      requestAnimationFrame(function () {
        if (chartEarningsTrends) chartEarningsTrends.resize();
        if (chartEarningsByChannel) chartEarningsByChannel.resize();
      });
    }

    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        if (this.getAttribute('data-tab') === 'overview') showOverview();
        else if (this.getAttribute('data-tab') === 'creator') showCreator();
      });
    });
    if (creatorLink) creatorLink.addEventListener('click', function (e) { e.preventDefault(); showCreator(); });
    if (dashboardLink) dashboardLink.addEventListener('click', function (e) { e.preventDefault(); showOverview(); });
  }

  function getPeriod() {
    var sel = document.getElementById('date-range-select');
    if (!sel) return 30;
    var v = (sel.value || '').toLowerCase();
    if (v === '7d') return 7;
    if (v === '90d') return 90;
    if (v === 'custom') {
      var fromEl = document.getElementById('date-from');
      var toEl = document.getElementById('date-to');
      if (!fromEl || !toEl || !fromEl.value || !toEl.value) return 30;
      var from = new Date(fromEl.value);
      var to = new Date(toEl.value);
      if (isNaN(from.getTime()) || isNaN(to.getTime()) || from > to) return 30;
      var days = Math.round((to - from) / 86400000) + 1;
      if (days < 1) days = 1;
      if (days > 365) days = 365;
      return { custom: true, days: days, from: from, to: to };
    }
    return 30;
  }

  var API_BASE = '/api/dashboard';
  var ADMIN_API = '/api/admin';
  var STORAGE_KEY = 'ofm_totals';
  var DEFAULT_TOTAL = 8272.42;

  function loadTotalsFromStorage() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { totalEarnings7d: DEFAULT_TOTAL, totalEarnings30d: DEFAULT_TOTAL, totalEarnings90d: DEFAULT_TOTAL };
      var o = JSON.parse(raw);
      return {
        totalEarnings7d: o.totalEarnings7d != null ? Number(o.totalEarnings7d) : DEFAULT_TOTAL,
        totalEarnings30d: o.totalEarnings30d != null ? Number(o.totalEarnings30d) : DEFAULT_TOTAL,
        totalEarnings90d: o.totalEarnings90d != null ? Number(o.totalEarnings90d) : DEFAULT_TOTAL
      };
    } catch (e) { return { totalEarnings7d: DEFAULT_TOTAL, totalEarnings30d: DEFAULT_TOTAL, totalEarnings90d: DEFAULT_TOTAL }; }
  }

  function saveTotalsToStorage(obj) {
    try {
      var cur = loadTotalsFromStorage();
      if (obj.totalEarnings7d != null) cur.totalEarnings7d = obj.totalEarnings7d;
      if (obj.totalEarnings30d != null) cur.totalEarnings30d = obj.totalEarnings30d;
      if (obj.totalEarnings90d != null) cur.totalEarnings90d = obj.totalEarnings90d;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cur));
    } catch (e) { /* ignore */ }
  }

  (function () {
    var PCT = { subscriptions: 0.15, tips: 0.12, posts: 0.04, messages: 0.55, referrals: 0.08, streams: 0.06 };
    var LABELS_7 = ['Oct 25', 'Oct 26', 'Oct 27', 'Oct 28', 'Oct 29', 'Oct 30', 'Oct 31'];
    var LABELS_30 = ['Oct 1', 'Oct 2', 'Oct 3', 'Oct 4', 'Oct 5', 'Oct 6', 'Oct 7', 'Oct 8', 'Oct 9', 'Oct 10', 'Oct 11', 'Oct 12', 'Oct 13', 'Oct 14', 'Oct 15', 'Oct 16', 'Oct 17', 'Oct 18', 'Oct 19', 'Oct 20', 'Oct 21', 'Oct 22', 'Oct 23', 'Oct 24', 'Oct 25', 'Oct 26', 'Oct 27', 'Oct 28', 'Oct 29', 'Oct 30'];
    var LABELS_90 = (function () {
      var out = [];
      var months = [['Aug', 31], ['Sep', 30], ['Oct', 30]];
      var i = 0;
      for (var m = 0; m < months.length; m++) {
        for (var d = 1; d <= months[m][1] && i < 90; d++, i++) out.push(months[m][0] + ' ' + d);
      }
      return out;
    })();
    function getLabels(n) {
      if (n === 7) return LABELS_7;
      if (n === 30) return LABELS_30;
      if (n === 90) return LABELS_90.slice(0, 90);
      return LABELS_30.slice(0, Math.min(30, n));
    }
    var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    function getLabelsFromRange(from, to) {
      var out = [], d = new Date(from);
      d.setHours(0, 0, 0, 0);
      var end = new Date(to);
      end.setHours(23, 59, 59, 999);
      while (d <= end) {
        out.push(MONTHS[d.getMonth()] + ' ' + d.getDate());
        d.setDate(d.getDate() + 1);
      }
      return out;
    }
    function seededRandom(seed) {
      var x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    }
    function allocateDailyAmounts(total, n) {
      var seed = total * 7 + n * 13;
      var w = [];
      var sumW = 0;
      for (var i = 0; i < n; i++) {
        var r = seededRandom(seed + i * 17);
        var r2 = seededRandom(seed + i * 19 + 100);
        var low = 0.25;
        var high = 1.85;
        var mult = low + r * (high - low);
        if (r2 < 0.25) mult *= 0.45;
        else if (r2 < 0.45) mult *= 0.7;
        w.push(mult);
        sumW += mult;
      }
      var amounts = w.map(function (t) { return Math.round((total * (t / sumW)) * 100) / 100; });
      var sum = amounts.reduce(function (a, b) { return a + b; }, 0);
      var diff = Math.round((total - sum) * 100) / 100;
      if (diff !== 0 && amounts.length) amounts[amounts.length - 1] = Math.round((amounts[amounts.length - 1] + diff) * 100) / 100;
      return amounts;
    }
    function totalForPeriod(period, totals) {
      var p = (period === 7 || period === 30 || period === 90) ? period : null;
      if (p) {
        var key = 'totalEarnings' + p + 'd';
        return totals[key] != null ? Number(totals[key]) : DEFAULT_TOTAL;
      }
      return (totals.totalEarnings30d != null ? Number(totals.totalEarnings30d) : DEFAULT_TOTAL) * (period / 30);
    }
    function getOverviewLocal(period, totals, totalOverride) {
      var total = totalOverride != null ? totalOverride : totalForPeriod(period, totals);
      var round2 = function (x) { return Math.round(x * 100) / 100; };
      var subs = round2(total * PCT.subscriptions), tips = round2(total * PCT.tips), posts = round2(total * PCT.posts);
      var referrals = round2(total * PCT.referrals), streams = round2(total * PCT.streams);
      var messages = round2(total - (subs + tips + posts + referrals + streams));
      return { totalEarnings: total, subscriptions: subs, tips: tips, posts: posts, messages: messages, referrals: referrals, streams: streams, growth: 12.2 };
    }
    function getEarningsOverTimeLocal(period, totals, customLabels) {
      var total = totalForPeriod(period, totals);
      var n = typeof period === 'number' ? period : 30;
      var labels = customLabels && customLabels.length ? customLabels : getLabels(n);
      var amounts = allocateDailyAmounts(total, n);
      return labels.slice(0, amounts.length).map(function (date, i) { return { date: date, amount: amounts[i] }; });
    }
    function getSubscriberGrowthLocal(period, totals, totalOverride) {
      var total = totalOverride != null ? totalOverride : totalForPeriod(period, totals);
      var seed = total * 31 + 47;
      var base = 14200;
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
      var subs = [base];
      for (var i = 1; i < months.length; i++) {
        var r = seededRandom(seed + i * 23);
        var r2 = seededRandom(seed + i * 29 + 50);
        var trend = 80 + Math.floor(r * 120);
        if (r2 < 0.2) trend = -40 - Math.floor(r2 * 200);
        else if (r2 < 0.35) trend = -10 - Math.floor(r2 * 50);
        else if (r2 > 0.9) trend += 60;
        var next = Math.max(13500, subs[i - 1] + trend);
        subs.push(next);
      }
      return months.map(function (month, i) { return { month: month, subs: subs[i] }; });
    }
    function getTransactionsLocal(period, totals, totalOverride) {
      var total = totalOverride != null ? totalOverride : totalForPeriod(period, totals);
      var rows = [
        { type: 'Tip', user: 'user_9***2', pct: 0.003 },
        { type: 'Subscription', user: 'j***k', pct: 0.0012 },
        { type: 'Message', user: 'm***7', pct: 0.0018 },
        { type: 'PPV', user: 'a***n', pct: 0.0016 },
        { type: 'Tip', user: 'b***1', pct: 0.006 }
      ];
      var dates = ['31 Oct 2025, 16:12', '31 Oct 2025, 14:08', '31 Oct 2025, 11:44', '30 Oct 2025, 21:22', '30 Oct 2025, 18:15'];
      return rows.map(function (r, i) {
        var amount = Math.round(r.pct * total * 100) / 100;
        var net = Math.round(amount * 0.85 * 100) / 100;
        return { date: dates[i], type: r.type, user: r.user, amount: amount, net: net };
      });
    }
    window.__deriveLocal = function (periodOrCustom, totals) {
      if (periodOrCustom && periodOrCustom.custom) {
        var days = periodOrCustom.days;
        var from = periodOrCustom.from;
        var to = periodOrCustom.to;
        var totalOverride = (totals.totalEarnings30d != null ? Number(totals.totalEarnings30d) : DEFAULT_TOTAL) * (days / 30);
        var customLabels = getLabelsFromRange(from, to);
        return {
          overview: getOverviewLocal(days, totals, totalOverride),
          earnings: getEarningsOverTimeLocal(days, totals, customLabels),
          growth: getSubscriberGrowthLocal(days, totals, totalOverride),
          transactions: getTransactionsLocal(days, totals, totalOverride)
        };
      }
      return {
        overview: getOverviewLocal(periodOrCustom, totals),
        earnings: getEarningsOverTimeLocal(periodOrCustom, totals),
        growth: getSubscriberGrowthLocal(periodOrCustom, totals),
        transactions: getTransactionsLocal(periodOrCustom, totals)
      };
    };
  })();

  function applyDerivedToData(period) {
    var totals = loadTotalsFromStorage();
    var d = window.__deriveLocal(period, totals);
    applyApiToData(d.overview, d.earnings, d.growth, d.transactions);
  }

  function applyApiToData(overview, earnings, growth, transactions) {
    if (!data.creatorReports) data.creatorReports = {};
    data.creatorReports.earningsSummary = {
      total: overview.totalEarnings,
      subscriptions: overview.subscriptions,
      tips: overview.tips,
      posts: overview.posts,
      referrals: overview.referrals,
      messages: overview.messages,
      streams: overview.streams
    };
    data.creatorReports.earningsTrends = (earnings || []).map(function (d) { return { day: d.date, v: d.amount }; });
    data.kpiChanges = { total: overview.growth != null ? overview.growth : 12.2 };
    data.earnings = (earnings || []).map(function (d) { return { day: d.date, v: d.amount }; });
    data.subscribers = (growth || []).map(function (d) { return { m: d.month, v: d.subs }; });
    data.transactions = transactions || [];
  }

  function fetchDashboardData(period, cb) {
    var p = period || getPeriod();
    if (p && p.custom) {
      applyDerivedToData(p);
      refreshDashboardFromData();
      if (typeof cb === 'function') cb();
      return;
    }
    var num = typeof p === 'number' ? p : 30;
    var q = '?period=' + num;
    function ok(r) {
      if (!r.ok) throw new Error('API ' + r.status);
      return r.json();
    }
    Promise.all([
      fetch(API_BASE + '/overview' + q).then(ok),
      fetch(API_BASE + '/earnings' + q).then(ok),
      fetch(API_BASE + '/growth' + q).then(ok),
      fetch(API_BASE + '/transactions' + q).then(ok)
    ]).then(function (arr) {
      applyApiToData(arr[0], arr[1], arr[2], arr[3]);
      refreshDashboardFromData();
      if (typeof cb === 'function') cb();
    }).catch(function (e) {
      console.warn('Dashboard API error:', e);
      applyDerivedToData(p);
      refreshDashboardFromData();
      if (typeof cb === 'function') cb();
    });
  }

  function setDefaultCustomDates() {
    var fromEl = document.getElementById('date-from');
    var toEl = document.getElementById('date-to');
    if (!fromEl || !toEl) return;
    if (fromEl.value && toEl.value) return;
    var to = new Date();
    var from = new Date(to);
    from.setDate(from.getDate() - 29);
    toEl.value = to.toISOString().slice(0, 10);
    fromEl.value = from.toISOString().slice(0, 10);
  }

  function bindDateRange() {
    var sel = document.getElementById('date-range-select');
    var customWrap = document.getElementById('date-range-custom');
    var dateFrom = document.getElementById('date-from');
    var dateTo = document.getElementById('date-to');

    function toggleCustom() {
      var isCustom = (sel.value || '').toLowerCase() === 'custom';
      if (customWrap) customWrap.hidden = !isCustom;
      if (isCustom) {
        setDefaultCustomDates();
        fetchDashboardData(getPeriod());
      } else {
        fetchDashboardData(getPeriod());
      }
    }

    if (sel) sel.addEventListener('change', toggleCustom);
    if (dateFrom) dateFrom.addEventListener('change', function () { if ((sel.value || '').toLowerCase() === 'custom') fetchDashboardData(getPeriod()); });
    if (dateTo) dateTo.addEventListener('change', function () { if ((sel.value || '').toLowerCase() === 'custom') fetchDashboardData(getPeriod()); });
  }

  function initSidebar() {
    var toggles = document.querySelectorAll('.nav-toggle');
    toggles.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var group = this.closest('.nav-group');
        if (!group) return;
        group.classList.toggle('nav-group--open');
        this.setAttribute('aria-expanded', group.classList.contains('nav-group--open'));
      });
    });
  }

  function refreshDashboardFromData() {
    renderOverviewSummary();
    renderTransactions();
    renderCreatorSummary();
    if (chartEarnings) {
      chartEarnings.data.labels = data.earnings.map(function (d) { return d.day; });
      chartEarnings.data.datasets[0].data = data.earnings.map(function (d) { return d.v; });
      chartEarnings.update();
    }
    renderOverviewChannelLegend();
    if (chartEarningsByChannelOverview) {
      var s = data.creatorReports && data.creatorReports.earningsSummary;
      if (s) {
        var vals = [s.subscriptions, s.tips, s.posts, s.referrals, s.messages, s.streams];
        chartEarningsByChannelOverview.data.datasets[0].data = vals;
        chartEarningsByChannelOverview.update();
      }
    }
    var tr = data.creatorReports && data.creatorReports.earningsTrends;
    if (chartEarningsTrends && tr && tr.length) {
      chartEarningsTrends.data.labels = tr.map(function (d) { return d.day; });
      chartEarningsTrends.data.datasets[0].data = tr.map(function (d) { return d.v; });
      chartEarningsTrends.update();
    }
  }

  function adminEl(id) { return document.getElementById(id); }

  function adminStatus(msg, ok) {
    var el = adminEl('admin-status');
    if (!el) return;
    el.textContent = msg;
    el.className = 'admin-status ' + (ok === true ? 'ok' : ok === false ? 'err' : '');
  }

  function adminLoad() {
    adminStatus('Chargement…');
    fetch(ADMIN_API + '/data')
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (t) {
        var e7 = adminEl('admin-total7d');
        var e30 = adminEl('admin-total30d');
        var e90 = adminEl('admin-total90d');
        if (e7 && t.totalEarnings7d != null) e7.value = t.totalEarnings7d;
        if (e30 && t.totalEarnings30d != null) e30.value = t.totalEarnings30d;
        if (e90 && t.totalEarnings90d != null) e90.value = t.totalEarnings90d;
        adminStatus('Chargé.', true);
      })
      .catch(function () {
        var t = loadTotalsFromStorage();
        var e7 = adminEl('admin-total7d');
        var e30 = adminEl('admin-total30d');
        var e90 = adminEl('admin-total90d');
        if (e7) e7.value = t.totalEarnings7d;
        if (e30) e30.value = t.totalEarnings30d;
        if (e90) e90.value = t.totalEarnings90d;
        adminStatus('Chargé (local). Données dans ce navigateur.', true);
      });
  }

  function adminSave() {
    var e7 = adminEl('admin-total7d');
    var e30 = adminEl('admin-total30d');
    var e90 = adminEl('admin-total90d');
    var v7 = e7 && e7.value.trim() !== '' ? parseFloat(e7.value) : null;
    var v30 = e30 && e30.value.trim() !== '' ? parseFloat(e30.value) : null;
    var v90 = e90 && e90.value.trim() !== '' ? parseFloat(e90.value) : null;
    if (v7 == null && v30 == null && v90 == null) {
      adminStatus('Remplis au moins un total (7j, 30j ou 90j).', false);
      return;
    }
    var payload = {
      totalEarnings7d: v7 != null ? v7 : undefined,
      totalEarnings30d: v30 != null ? v30 : undefined,
      totalEarnings90d: v90 != null ? v90 : undefined
    };
    adminStatus('Enregistrement…');
    fetch(ADMIN_API + '/data', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function () {
        adminStatus('Mise à jour du dashboard…');
        fetchDashboardData(getPeriod(), function (err) {
          if (err) {
            adminStatus('Enregistré mais erreur au rechargement.', false);
            return;
          }
          adminStatus('Enregistré. Dashboard à jour.', true);
          adminHide();
        });
      })
      .catch(function (e) {
        var cur = loadTotalsFromStorage();
        if (v7 != null) cur.totalEarnings7d = v7;
        if (v30 != null) cur.totalEarnings30d = v30;
        if (v90 != null) cur.totalEarnings90d = v90;
        saveTotalsToStorage(cur);
        applyDerivedToData(getPeriod());
        refreshDashboardFromData();
        adminStatus('Enregistré (local). Données dans ce navigateur.', true);
        adminHide();
      });
  }

  function adminShow() {
    var ov = adminEl('admin-overlay');
    if (ov) { ov.hidden = false; adminLoad(); }
  }

  function adminHide() {
    var ov = adminEl('admin-overlay');
    if (ov) ov.hidden = true;
  }

  function initAdmin() {
    var openSidebar = adminEl('admin-open-sidebar');
    var closeBtn = document.querySelector('.admin-close');
    var overlay = adminEl('admin-overlay');
    var saveBtn = adminEl('admin-btn-save');
    var loadBtn = adminEl('admin-btn-load');

    if (openSidebar) openSidebar.addEventListener('click', function (e) { e.preventDefault(); adminShow(); });
    if (closeBtn) closeBtn.addEventListener('click', adminHide);
    if (overlay) overlay.addEventListener('click', function (e) { if (e.target === overlay) adminHide(); });
    if (saveBtn) saveBtn.addEventListener('click', adminSave);
    if (loadBtn) loadBtn.addEventListener('click', adminLoad);
  }

  function init() {
    renderOverviewSummary();
    renderTransactions();
    renderCreatorSummary();
    initCharts();
    initTabs();
    bindDateRange();
    initSidebar();
    initAdmin();
    fetchDashboardData(getPeriod());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
