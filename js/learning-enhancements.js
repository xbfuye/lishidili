/**
 * 江山时序 - 学习增强模块
 * 功能：
 * 1. 随机探索（随机朝代/城市/事件）
 * 2. 学习进度追踪（localStorage）
 * 3. 快捷键帮助面板
 * 4. 首次访问导览
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'jiangshan_learning_progress';
  const TOUR_KEY = 'jiangshan_tour_shown';

  // ========== 学习进度存储 ==========
  const progress = {
    load() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { dynasties: [], places: [], events: 0, firstVisit: Date.now() };
      } catch { return { dynasties: [], places: [], events: 0, firstVisit: Date.now() }; }
    },
    save(data) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
    },
    markDynasty(name) {
      const d = this.load();
      if (!d.dynasties.includes(name)) { d.dynasties.push(name); this.save(d); }
    },
    markPlace(name) {
      const d = this.load();
      if (!d.places.includes(name)) { d.places.push(name); this.save(d); }
    },
    markEvent() {
      const d = this.load();
      d.events++; this.save(d);
    }
  };

  // ========== 工具函数 ==========
  function $(sel) { return document.querySelector(sel); }
  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'text') e.textContent = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    if (children) children.forEach(c => e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
    return e;
  }

  // 朝代列表（用于随机探索）
  const DYNASTIES = [
    { name: '战国', year: -403, range: '前403—前221' },
    { name: '秦', year: -214, range: '前221—前202' },
    { name: '西汉', year: -100, range: '前202—25' },
    { name: '东汉', year: 100, range: '25—220' },
    { name: '三国', year: 250, range: '220—280' },
    { name: '西晋', year: 300, range: '280—316' },
    { name: '东晋十六国', year: 383, range: '317—420' },
    { name: '南北朝', year: 500, range: '420—581' },
    { name: '隋', year: 605, range: '581—618' },
    { name: '唐', year: 700, range: '618—907' },
    { name: '五代十国', year: 950, range: '907—960' },
    { name: '北宋', year: 1100, range: '960—1127' },
    { name: '南宋', year: 1200, range: '1127—1279' },
    { name: '元', year: 1300, range: '1279—1368' },
    { name: '明', year: 1450, range: '1368—1644' },
    { name: '清', year: 1800, range: '1644—1912' },
    { name: '中华民国', year: 1936, range: '1912—1949' },
    { name: '现代', year: 2026, range: '1949—今' }
  ];

  // 著名城市（用于随机探索）
  const FAMOUS_PLACES = [
    '咸阳', '长安', '洛阳', '开封', '南京', '北京', '杭州', '成都',
    '荆州', '苏州', '扬州', '广州', '福州', '南昌', '武汉', '西安',
    '邯郸', '临淄', '郢都', '寿春', '蓟城', '大梁', '新郑', '姑苏',
    '会稽', '豫章', '幽州', '凉州', '益州', '荆州', '并州', '青州'
  ];

  // 历史事件（年份 + 描述）
  const EVENTS = [
    { year: -221, place: '咸阳', desc: '秦灭六国，天下一统' },
    { year: -202, place: '长安', desc: '刘邦称帝，建立西汉' },
    { year: -138, place: '长安', desc: '张骞出使西域，凿空丝绸之路' },
    { year: -119, place: '长安', desc: '卫青霍去病北击匈奴，封狼居胥' },
    { year: 208, place: '赤壁', desc: '赤壁之战，三国鼎立' },
    { year: 383, place: '淝水', desc: '淝水之战，东晋以少胜多' },
    { year: 589, place: '建康', desc: '隋灭陈，结束三百年分裂' },
    { year: 626, place: '长安', desc: '玄武门之变，贞观之治开启' },
    { year: 755, place: '长安', desc: '安史之乱，唐朝由盛转衰' },
    { year: 960, place: '开封', desc: '陈桥兵变，赵匡胤建宋' },
    { year: 1127, place: '开封', desc: '靖康之变，宋室南渡' },
    { year: 1279, place: '崖山', desc: '崖山海战，南宋灭亡' },
    { year: 1368, place: '南京', desc: '朱元璋称帝，建立明朝' },
    { year: 1405, place: '南京', desc: '郑和下西洋' },
    { year: 1644, place: '北京', desc: '清军入关，定都北京' },
    { year: 1840, place: '广州', desc: '鸦片战争，近代开端' },
    { year: 1911, place: '武昌', desc: '辛亥革命，帝制终结' },
    { year: 1949, place: '北京', desc: '中华人民共和国成立' }
  ];

  // ========== 随机探索 ==========
  function randomDynasty() {
    const d = DYNASTIES[Math.floor(Math.random() * DYNASTIES.length)];
    if (window.atlasAPI && window.atlasAPI.locate) {
      window.atlasAPI.locate({ year: d.year });
    } else {
      window.location.href = './?year=' + d.year;
    }
    progress.markDynasty(d.name);
    showToast('随机朝代：' + d.name + '（' + d.range + '）');
  }

  function randomPlace() {
    const place = FAMOUS_PLACES[Math.floor(Math.random() * FAMOUS_PLACES.length)];
    const year = DYNASTIES[Math.floor(Math.random() * DYNASTIES.length)].year;
    if (window.atlasAPI && window.atlasAPI.locate) {
      window.atlasAPI.locate({ year, place });
    } else {
      window.location.href = './?year=' + year + '&place=' + encodeURIComponent(place);
    }
    progress.markPlace(place);
    showToast('随机探索：' + place + '（约' + formatYear(year) + '年）');
  }

  function randomEvent() {
    const e = EVENTS[Math.floor(Math.random() * EVENTS.length)];
    if (window.atlasAPI && window.atlasAPI.locate) {
      window.atlasAPI.locate({ year: e.year, place: e.place });
    } else {
      window.location.href = './?year=' + e.year + '&place=' + encodeURIComponent(e.place);
    }
    progress.markEvent();
    showToast('历史事件：' + e.desc + '（' + formatYear(e.year) + '年）');
  }

  function formatYear(y) {
    return y < 0 ? '前' + (-y) : y;
  }

  // ========== Toast 提示 ==========
  let toastTimer;
  function showToast(msg) {
    let t = $('#learning-toast');
    if (!t) {
      t = el('div', { id: 'learning-toast', class: 'learning-toast' });
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
  }

  // ========== 学习进度面板 ==========
  function toggleProgressPanel() {
    let panel = $('#progress-panel');
    if (panel) {
      panel.remove();
      return;
    }
    const d = progress.load();
    const days = Math.max(1, Math.floor((Date.now() - d.firstVisit) / 86400000));

    panel = el('div', { id: 'progress-panel', class: 'learning-panel' }, [
      el('div', { class: 'panel-header' }, [
        el('span', { text: '学习进度' }),
        el('button', { class: 'panel-close', text: '✕', onclick: 'document.getElementById("progress-panel").remove()' })
      ]),
      el('div', { class: 'panel-body' }, [
        el('div', { class: 'stat-row' }, [
          el('div', { class: 'stat-item' }, [
            el('div', { class: 'stat-num', text: String(d.dynasties.length) }),
            el('div', { class: 'stat-label', text: '已探索朝代' })
          ]),
          el('div', { class: 'stat-item' }, [
            el('div', { class: 'stat-num', text: String(d.places.length) }),
            el('div', { class: 'stat-label', text: '已访问城市' })
          ]),
          el('div', { class: 'stat-item' }, [
            el('div', { class: 'stat-num', text: String(d.events) }),
            el('div', { class: 'stat-label', text: '事件探索' })
          ])
        ]),
        el('div', { class: 'progress-bar-wrap' }, [
          el('div', { class: 'progress-bar-label', text: '朝代探索进度 ' + d.dynasties.length + '/18' }),
          el('div', { class: 'progress-bar-bg' }, [
            el('div', { class: 'progress-bar-fill', style: 'width:' + (d.dynasties.length / 18 * 100) + '%' })
          ])
        ]),
        d.dynasties.length > 0 ? el('div', { class: 'dynasty-tags' },
          d.dynasties.map(name => el('span', { class: 'dynasty-tag', text: name }))
        ) : el('div', { class: 'empty-hint', text: '还没有探索记录，点击「随机探索」开始吧！' }),
        el('button', { class: 'reset-btn', text: '清空进度', onclick: 'localStorage.removeItem("' + STORAGE_KEY + '");document.getElementById("progress-panel").remove();' })
      ])
    ]);
    document.body.appendChild(panel);
  }

  // ========== 快捷键帮助面板 ==========
  function toggleHelpPanel() {
    let panel = $('#help-panel');
    if (panel) { panel.remove(); return; }

    const shortcuts = [
      { keys: '/ 或 Ctrl+K', desc: '打开搜索框（搜城池/帝王/年号/事件）' },
      { keys: '← / →', desc: '上/下一历史阶段（Shift+←→ 进退10年）' },
      { keys: 'Space', desc: '自动播放/暂停历史演进' },
      { keys: 'Esc', desc: '关闭弹窗/清除搜索' },
      { keys: '单击古城', desc: '打开「点地溯源」千年沿革卡片' },
      { keys: '双击地图', desc: '在任意位置打开溯源卡片' },
      { keys: 'R', desc: '随机探索朝代（本增强功能）' },
      { keys: 'P', desc: '随机探索城市（本增强功能）' },
      { keys: 'E', desc: '随机历史事件（本增强功能）' },
      { keys: 'H', desc: '打开/关闭本帮助面板' }
    ];

    panel = el('div', { id: 'help-panel', class: 'learning-panel' }, [
      el('div', { class: 'panel-header' }, [
        el('span', { text: '快捷键与操作指南' }),
        el('button', { class: 'panel-close', text: '✕', onclick: 'document.getElementById("help-panel").remove()' })
      ]),
      el('div', { class: 'panel-body' }, [
        el('table', { class: 'shortcut-table' },
          shortcuts.map(s => el('tr', {}, [
            el('td', { class: 'shortcut-keys', text: s.keys }),
            el('td', { class: 'shortcut-desc', text: s.desc })
          ]))
        ),
        el('div', { class: 'help-tip', text: '提示：拖动底部时间轴可自由浏览两千四百年历史；点击左下角图例可高亮对应政权。' })
      ])
    ]);
    document.body.appendChild(panel);
  }

  // ========== 首次访问导览 ==========
  function showTour() {
    if (localStorage.getItem(TOUR_KEY)) return;
    localStorage.setItem(TOUR_KEY, '1');

    const tour = el('div', { id: 'tour-overlay', class: 'tour-overlay' }, [
      el('div', { class: 'tour-card' }, [
        el('h2', { text: '欢迎来到江山时序' }),
        el('p', { text: '一幅可以拖动时间、点城读史、追随古人足迹的中国历史交互舆图。' }),
        el('div', { class: 'tour-features' }, [
          el('div', { class: 'tour-feature' }, [
            el('div', { class: 'tour-icon', text: '🕐' }),
            el('div', {}, [
              el('b', { text: '拖动时间轴' }),
              el('p', { text: '底部滑块自由穿梭两千四百年，看天下分合' })
            ])
          ]),
          el('div', { class: 'tour-feature' }, [
            el('div', { class: 'tour-icon', text: '🏯' }),
            el('div', {}, [
              el('b', { text: '点击古城' }),
              el('p', { text: '展开「点地溯源」卡片，读一座城的千年风云' })
            ])
          ]),
          el('div', { class: 'tour-feature' }, [
            el('div', { class: 'tour-icon', text: '🎲' }),
            el('div', {}, [
              el('b', { text: '随机探索' }),
              el('p', { text: '右上角新功能：随机朝代/城市/事件，发现历史惊喜' })
            ])
          ])
        ]),
        el('button', { class: 'tour-start-btn', text: '开始探索', onclick: 'document.getElementById("tour-overlay").remove()' })
      ])
    ]);
    document.body.appendChild(tour);
  }

  // ========== 注入 UI ==========
  function injectUI() {
    // 在导航栏添加学习工具按钮组
    const controlStrip = $('.control-strip') || $('#nav-bar');
    if (!controlStrip) return;

    const learningGroup = el('div', { class: 'learning-toolbar', role: 'toolbar', 'aria-label': '学习工具' }, [
      el('button', { class: 'action-btn subtle learning-btn', title: '随机朝代 (R)', onclick: 'window.__jiangshan.randomDynasty()' }, [
        el('span', { text: '🎲 随机' })
      ]),
      el('button', { class: 'action-btn subtle learning-btn', title: '学习进度', onclick: 'window.__jiangshan.toggleProgressPanel()' }, [
        el('span', { text: '📊 进度' })
      ]),
      el('button', { class: 'action-btn subtle learning-btn', title: '快捷键帮助 (H)', onclick: 'window.__jiangshan.toggleHelpPanel()' }, [
        el('span', { text: '❓ 帮助' })
      ])
    ]);

    // 插入到控制栏末尾
    controlStrip.appendChild(learningGroup);
  }

  // ========== 键盘快捷键 ==========
  function initKeyboard() {
    document.addEventListener('keydown', (e) => {
      // 不在输入框中触发
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      switch (e.key.toLowerCase()) {
        case 'r': randomDynasty(); break;
        case 'p': randomPlace(); break;
        case 'e': randomEvent(); break;
        case 'h': toggleHelpPanel(); break;
      }
    });
  }

  // ========== 监听朝代变化记录进度 ==========
  function initProgressTracking() {
    // 监听 URL 变化和 atlasApp 的年份变化
    setInterval(() => {
      if (window.atlasApp && window.atlasApp.dynasties && window.atlasApp.dynastyIdx != null) {
        const d = window.atlasApp.dynasties[window.atlasApp.dynastyIdx];
        if (d && d.title) progress.markDynasty(d.title);
      }
    }, 5000);
  }

  // ========== 暴露全局 ==========
  window.__jiangshan = {
    randomDynasty,
    randomPlace,
    randomEvent,
    toggleProgressPanel,
    toggleHelpPanel,
    showToast
  };

  // ========== 启动 ==========
  function init() {
    injectUI();
    initKeyboard();
    initProgressTracking();
    // 延迟显示导览，等主界面加载完
    setTimeout(showTour, 1500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
