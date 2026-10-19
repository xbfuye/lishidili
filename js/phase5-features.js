/**
 * 江山时序 - 第五期学习增强功能
 * 1. 朝代疆域变化动画（增强导览）
 * 2. 历史年代速记口诀
 * 3. 经典战役专题
 * 4. 打印友好版
 */
(function () {
  'use strict';

  // ========== 朝代列表（用于疆域动画） ==========
  const DYNASTY_TIMELINE = [
    { name: '战国', start: -403, end: -221, desc: '诸侯争霸，百家争鸣' },
    { name: '秦', start: -221, end: -202, desc: '首次统一，中央集权' },
    { name: '西汉', start: -202, end: 25, desc: '汉承秦制，丝路开通' },
    { name: '东汉', start: 25, end: 220, desc: '光武中兴，豪强崛起' },
    { name: '三国', start: 220, end: 280, desc: '魏蜀吴鼎立' },
    { name: '西晋', start: 280, end: 316, desc: '短暂统一，八王之乱' },
    { name: '东晋十六国', start: 317, end: 420, desc: '衣冠南渡，北方混战' },
    { name: '南北朝', start: 420, end: 581, desc: '南北对峙，民族融合' },
    { name: '隋', start: 581, end: 618, desc: '重新统一，科举创立' },
    { name: '唐', start: 618, end: 907, desc: '盛世辉煌，万国来朝' },
    { name: '五代十国', start: 907, end: 960, desc: '藩镇割据，政权更迭' },
    { name: '北宋', start: 960, end: 1127, desc: '重文轻武，经济繁荣' },
    { name: '南宋', start: 1127, end: 1279, desc: '偏安江南，蒙元崛起' },
    { name: '元', start: 1279, end: 1368, desc: '大一统，行省制度' },
    { name: '明', start: 1368, end: 1644, desc: '驱逐蒙元，郑和下西洋' },
    { name: '清', start: 1644, end: 1912, desc: '康乾盛世，近代屈辱' }
  ];

  // ========== 历史年代速记口诀 ==========
  const MNEMONICS = [
    {
      title: '朝代顺序口诀',
      content: '三皇五帝始，尧舜禹相传；\n夏商与西周，东周分两段；\n春秋和战国，一统秦两汉；\n三分魏蜀吴，二晋前后延；\n南北朝并立，隋唐五代传；\n宋元明清后，皇朝至此完。',
      note: '这是最经典的中国朝代顺序歌，记住它就能理清中国历史发展脉络。'
    },
    {
      title: '中国历史朝代公元对照',
      content: '夏约前2070，商约前1600；\n西周前1046，东周前770；\n春秋前770，战国前475；\n秦统一前221，西汉前202；\n东汉25年，三国220年；\n西晋265，东晋317；\n南北朝420，隋581；\n唐618，五代907；\n北宋960，南宋1127；\n元1271，明1368；\n清1644，民国1912。',
      note: '每个朝代的起始年份，配合地图使用效果更佳。'
    },
    {
      title: '战国七雄记忆法',
      content: '齐楚秦燕赵魏韩，\n东南西北到中间。\n（齐在东，楚在南，秦在西，燕在北，赵魏韩在中间）',
      note: '用方位记忆战国七雄的地理位置。'
    },
    {
      title: '春秋五霸',
      content: '齐桓公、晋文公、楚庄王、\n吴王阖闾、越王勾践。\n（另一说：齐桓公、晋文公、楚庄王、秦穆公、宋襄公）',
      note: '春秋时期先后称霸的五位诸侯。'
    },
    {
      title: '秦始皇统一措施',
      content: '统一文字（小篆），\n统一货币（圆形方孔钱），\n统一度量衡，\n统一车轨，\n修筑长城，\n焚书坑儒。',
      note: '秦始皇巩固统一的六大措施。'
    },
    {
      title: '丝绸之路路线',
      content: '长安→河西走廊→敦煌→\n新疆（西域）→葱岭→\n中亚→西亚→欧洲（大秦）。\n南道：敦煌→若羌→和田→喀什\n北道：敦煌→吐鲁番→喀什',
      note: '丝绸之路从长安出发，经河西走廊，分南北两道绕过塔克拉玛干沙漠。'
    },
    {
      title: '三国鼎立记忆',
      content: '魏：曹丕，220年，洛阳，北方；\n蜀：刘备，221年，成都，西南；\n吴：孙权，229年，建业，东南。\n（建业就是今天的南京）',
      note: '三国的建立者、时间、都城和地理位置。'
    },
    {
      title: '贞观之治措施',
      content: '轻徭薄赋，发展生产；\n知人善任，虚心纳谏；\n完善科举，选拔人才；\n开明民族，天可汗；\n开放对外，万国来朝。',
      note: '唐太宗李世民开创贞观之治的主要措施。'
    },
    {
      title: '安史之乱影响',
      content: '唐朝由盛转衰；\n藩镇割据形成；\n经济重心南移；\n人口大量南迁；\n边疆危机加重。',
      note: '755-763年安史之乱是唐朝历史的转折点。'
    },
    {
      title: '宋朝经济文化',
      content: '活字印刷（毕昇），\n指南针用于航海，\n火药用于军事，\n交子（世界最早纸币），\n景德镇瓷器，\n宋词繁荣（苏轼、李清照）。',
      note: '宋朝虽然军事上积弱，但经济文化高度繁荣。'
    },
    {
      title: '元朝行省制度',
      content: '中央：中书省（直辖腹里）；\n地方：行中书省（10个行省）；\n宣政院：管佛教和西藏；\n澎湖巡检司：管台湾；\n北庭都元帅府：管西域。',
      note: '元朝创立的行省制度是现代省制的开端。'
    },
    {
      title: '明清君主专制强化',
      content: '明：废丞相，设内阁；\n    设锦衣卫、东厂；\n    八股取士；\n清：设军机处（雍正）；\n    文字狱；\n    闭关锁国。',
      note: '明清时期君主专制达到顶峰。'
    },
    {
      title: '中国近代史不平等条约',
      content: '1842《南京条约》：割香港岛，开五口；\n1858《天津条约》：开十口，公使进京；\n1860《北京条约》：割九龙，开天津；\n1895《马关条约》：割台湾，赔2亿；\n1901《辛丑条约》：赔4.5亿，东交民巷。',
      note: '记住主要不平等条约的时间和内容。'
    },
    {
      title: '党史重要会议',
      content: '1921中共一大：建党；\n1927八七会议：枪杆子里出政权；\n1935遵义会议：生死攸关转折；\n1945中共七大：毛泽东思想；\n1978十一届三中全会：改革开放。',
      note: '中国共产党历史上的重要会议。'
    }
  ];

  // ========== 经典战役数据 ==========
  const BATTLES = [
    {
      name: '牧野之战',
      year: -1046,
      place: '河南淇县',
      sides: '周武王 vs 商纣王',
      result: '周军大胜，商朝灭亡',
      detail: '周武王率诸侯联军在牧野击败商军，商纣王自焚，周朝建立。这是中国历史上以少胜多的著名战役，"临阵倒戈"的典故即出于此。',
      impact: '结束了商朝600年统治，开启了周朝800年基业。'
    },
    {
      name: '长勺之战',
      year: -684,
      place: '山东莱芜',
      sides: '鲁国 vs 齐国',
      result: '鲁国大胜',
      detail: '曹刿论战，"一鼓作气，再而衰，三而竭"。鲁军在齐军三次击鼓后才出击，大败齐军。',
      impact: '创造了后发制人的战术典范，"曹刿论战"入选语文课本。'
    },
    {
      name: '城濮之战',
      year: -632,
      place: '山东鄄城',
      sides: '晋国 vs 楚国',
      result: '晋国大胜',
      detail: '晋文公兑现"退避三舍"的承诺，主动后撤90里，然后大败楚军。',
      impact: '晋文公确立霸主地位，成为春秋五霸之一。'
    },
    {
      name: '桂陵之战',
      year: -354,
      place: '河南长垣',
      sides: '齐国 vs 魏国',
      result: '齐国大胜',
      detail: '孙膑围魏救赵，在桂陵设伏大败魏军，生擒庞涓。',
      impact: '"围魏救赵"成为经典战术，孙膑名扬天下。'
    },
    {
      name: '长平之战',
      year: -260,
      place: '山西高平',
      sides: '秦国 vs 赵国',
      result: '秦国大胜，坑杀赵卒40万',
      detail: '秦将白起对阵赵将赵括（纸上谈兵），赵军被围46天后投降，白起坑杀降卒40万。',
      impact: '赵国元气大伤，秦国统一之势不可逆转。'
    },
    {
      name: '巨鹿之战',
      year: -207,
      place: '河北平乡',
      sides: '项羽 vs 秦军',
      result: '项羽大胜，秦军主力被歼',
      detail: '项羽破釜沉舟，只带三天干粮，与秦军九战九捷，大败秦军主力。',
      impact: '秦朝灭亡已成定局，项羽确立诸侯领袖地位。'
    },
    {
      name: '官渡之战',
      year: 200,
      place: '河南中牟',
      sides: '曹操 vs 袁绍',
      result: '曹操大胜',
      detail: '曹操以少胜多，奇袭乌巢烧毁袁绍粮草，袁军大乱溃败。',
      impact: '曹操统一北方，为曹魏奠定基础。'
    },
    {
      name: '赤壁之战',
      year: 208,
      place: '湖北赤壁',
      sides: '孙刘联军 vs 曹操',
      result: '孙刘联军大胜',
      detail: '周瑜用黄盖苦肉计，火攻曹军连环船，曹军大败北归。',
      impact: '奠定三国鼎立格局，曹操无力南下。'
    },
    {
      name: '夷陵之战',
      year: 222,
      place: '湖北宜昌',
      sides: '东吴 vs 蜀汉',
      result: '东吴大胜',
      detail: '陆逊火烧连营七百里，刘备大败退守白帝城，不久病逝。',
      impact: '蜀汉元气大伤，三国格局最终稳定。'
    },
    {
      name: '淝水之战',
      year: 383,
      place: '安徽寿县',
      sides: '东晋 vs 前秦',
      result: '东晋大胜',
      detail: '前秦苻坚率80万大军南下，东晋谢玄以8万北府兵迎战。秦军后撤时阵脚大乱，晋军乘机猛攻，前秦大败。"风声鹤唳""草木皆兵"出自此役。',
      impact: '前秦瓦解，北方再度分裂，东晋偏安江南。'
    },
    {
      name: '虎牢关之战',
      year: 621,
      place: '河南荥阳',
      sides: '李世民 vs 窦建德',
      result: '李世民大胜，生擒窦建德',
      detail: '李世民以3500玄甲军大破窦建德10万大军，同时逼降王世充，一举平定河南河北。',
      impact: '唐朝统一全国的关键战役，李世民威望达到顶峰。'
    },
    {
      name: '崖山海战',
      year: 1279,
      place: '广东新会',
      sides: '元朝 vs 南宋',
      result: '元朝大胜，南宋灭亡',
      detail: '元军张弘范围攻崖山，宋军全军覆没，陆秀夫背幼帝赵昺投海，10万军民殉国。',
      impact: '南宋灭亡，中国首次被北方游牧民族完全统一。'
    },
    {
      name: '鄱阳湖之战',
      year: 1363,
      place: '江西鄱阳湖',
      sides: '朱元璋 vs 陈友谅',
      result: '朱元璋大胜',
      detail: '朱元璋以20万水军对阵陈友谅60万大军，用火攻大败汉军，陈友谅中箭身亡。',
      impact: '朱元璋统一江南，为建立明朝奠定基础。这是中世纪世界最大规模的水战。'
    },
    {
      name: '萨尔浒之战',
      year: 1619,
      place: '辽宁抚顺',
      sides: '后金 vs 明朝',
      result: '后金大胜',
      detail: '努尔哈赤以"凭你几路来，我只一路去"的战术，各个击破明军四路大军，明军大败。',
      impact: '明朝在东北的统治瓦解，后金崛起，为清朝入关奠定基础。'
    },
    {
      name: '雅克萨之战',
      year: 1685,
      place: '黑龙江漠河',
      sides: '清朝 vs 沙俄',
      result: '清朝大胜',
      detail: '康熙帝两次派兵进攻沙俄侵占的雅克萨城，俄军战败投降，签订《尼布楚条约》。',
      impact: '从法律上确定了中俄东段边界，维护了中国领土主权。'
    },
    {
      name: '鸦片战争',
      year: 1840,
      place: '广东沿海',
      sides: '清朝 vs 英国',
      result: '清朝战败，签订《南京条约》',
      detail: '英国以禁烟为借口发动侵略战争，清军武器落后，战败求和，割让香港岛，赔款2100万银元。',
      impact: '中国近代史的开端，开始沦为半殖民地半封建社会。'
    },
    {
      name: '甲午战争',
      year: 1894,
      place: '黄海、朝鲜',
      sides: '清朝 vs 日本',
      result: '清朝战败，签订《马关条约》',
      detail: '日本发动侵略战争，北洋水师在黄海海战中损失惨重，威海卫之战全军覆没。',
      impact: '割让台湾，赔款2亿两白银，民族危机空前加深，唤醒了国人。'
    },
    {
      name: '抗日战争',
      year: 1937,
      place: '全中国',
      sides: '中国 vs 日本',
      result: '中国胜利，日本投降',
      detail: '1937年七七事变后全民族抗战开始，经过8年（从1931年算起14年）艰苦抗战，1945年日本无条件投降。',
      impact: '近代以来中国第一次完全胜利的民族解放战争，台湾光复，中国国际地位提高。'
    }
  ];

  // ========== 工具函数 ==========
  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return Array.from(document.querySelectorAll(sel)); }
  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'text') e.textContent = attrs[k];
      else if (k === 'html') e.innerHTML = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    if (children) children.forEach(c => e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
    return e;
  }
  function formatYear(y) { return y < 0 ? '前' + (-y) : y; }
  function showToast(msg) {
    $('.toast-msg')?.remove();
    const toast = el('div', { class: 'toast-msg', text: msg });
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 50);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 2500);
  }

  function setYear(year) {
    const input = document.getElementById('inp-year');
    if (input) {
      input.value = year;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  function getCurrentYear() {
    const input = document.getElementById('inp-year');
    return input ? parseInt(input.value) : null;
  }

  // ========== 功能1：朝代疆域变化动画（增强导览） ==========
  let tourPanelOpen = false;
  let tourPlaying = false;
  let tourInterval = null;
  let tourCurrentIdx = 0;

  function toggleTourPanel() {
    if (tourPanelOpen) {
      closeTourPanel();
      return;
    }
    openTourPanel();
  }

  function openTourPanel() {
    tourPanelOpen = true;

    const panel = el('div', { id: 'tour-panel', class: 'tour-panel' }, [
      el('div', { class: 'tour-header' }, [
        el('span', { text: '🎬 疆域演变导览' }),
        el('button', { class: 'panel-close', text: '✕', onclick: 'window.__jiangshan_phase5.closeTourPanel()' })
      ]),
      el('div', { class: 'tour-body' }, [
        el('div', { class: 'tour-desc', text: '一键播放从战国到清朝的疆域演变，每个朝代停留展示，直观感受天下分合。' }),
        el('div', { class: 'tour-controls' }, [
          el('button', { id: 'tour-play-btn', class: 'tour-play-btn', text: '▶️ 开始播放', onclick: 'window.__jiangshan_phase5.toggleTourPlay()' }),
          el('div', { class: 'tour-speed' }, [
            el('label', { text: '速度：' }),
            el('select', { id: 'tour-speed-select', class: 'tour-speed-select' }, [
              el('option', { value: '3000', text: '慢速（3秒/朝）' }),
              el('option', { value: '2000', text: '正常（2秒/朝）', selected: 'selected' }),
              el('option', { value: '1000', text: '快速（1秒/朝）' })
            ])
          ])
        ]),
        el('div', { id: 'tour-progress', class: 'tour-progress', text: '准备就绪' }),
        el('div', { id: 'tour-dynasty-list', class: 'tour-dynasty-list' })
      ])
    ]);
    document.body.appendChild(panel);
    renderTourDynastyList();
  }

  function renderTourDynastyList() {
    const list = $('#tour-dynasty-list');
    if (!list) return;
    list.innerHTML = '';
    DYNASTY_TIMELINE.forEach((d, idx) => {
      const item = el('div', {
        class: 'tour-dynasty-item' + (idx === tourCurrentIdx ? ' active' : ''),
        onclick: `window.__jiangshan_phase5.jumpToDynasty(${idx})`
      }, [
        el('span', { class: 'tour-dynasty-name', text: d.name }),
        el('span', { class: 'tour-dynasty-period', text: formatYear(d.start) + '-' + formatYear(d.end) })
      ]);
      list.appendChild(item);
    });
  }

  function toggleTourPlay() {
    if (tourPlaying) {
      stopTourPlay();
    } else {
      startTourPlay();
    }
  }

  function startTourPlay() {
    tourPlaying = true;
    const btn = $('#tour-play-btn');
    if (btn) btn.textContent = '⏸️ 暂停播放';

    const speed = parseInt($('#tour-speed-select')?.value || '2000');

    if (tourCurrentIdx >= DYNASTY_TIMELINE.length) tourCurrentIdx = 0;

    playNextDynasty();
    tourInterval = setInterval(playNextDynasty, speed);
  }

  function stopTourPlay() {
    tourPlaying = false;
    if (tourInterval) {
      clearInterval(tourInterval);
      tourInterval = null;
    }
    const btn = $('#tour-play-btn');
    if (btn) btn.textContent = '▶️ 继续播放';
  }

  function playNextDynasty() {
    if (tourCurrentIdx >= DYNASTY_TIMELINE.length) {
      stopTourPlay();
      $('#tour-progress').textContent = '✅ 播放完成！';
      const btn = $('#tour-play-btn');
      if (btn) btn.textContent = '🔄 重新播放';
      tourCurrentIdx = 0;
      return;
    }

    const d = DYNASTY_TIMELINE[tourCurrentIdx];
    setYear(d.start);
    $('#tour-progress').textContent = `正在播放：${d.name}（${formatYear(d.start)}年）— ${d.desc}`;
    renderTourDynastyList();
    tourCurrentIdx++;
  }

  function jumpToDynasty(idx) {
    tourCurrentIdx = idx;
    const d = DYNASTY_TIMELINE[idx];
    setYear(d.start);
    $('#tour-progress').textContent = `跳转到：${d.name}（${formatYear(d.start)}年）— ${d.desc}`;
    renderTourDynastyList();
  }

  function closeTourPanel() {
    stopTourPlay();
    tourPanelOpen = false;
    $('#tour-panel')?.remove();
  }

  // ========== 功能2：历史年代速记口诀 ==========
  let mnemonicPanelOpen = false;

  function toggleMnemonicPanel() {
    if (mnemonicPanelOpen) {
      closeMnemonicPanel();
      return;
    }
    openMnemonicPanel();
  }

  function openMnemonicPanel() {
    mnemonicPanelOpen = true;

    const panel = el('div', { id: 'mnemonic-panel', class: 'mnemonic-panel' }, [
      el('div', { class: 'mnemonic-header' }, [
        el('span', { text: '📝 历史速记口诀' }),
        el('button', { class: 'panel-close', text: '✕', onclick: 'window.__jiangshan_phase5.closeMnemonicPanel()' })
      ]),
      el('div', { class: 'mnemonic-body', id: 'mnemonic-body' })
    ]);
    document.body.appendChild(panel);
    renderMnemonicList();
  }

  function renderMnemonicList() {
    const body = $('#mnemonic-body');
    if (!body) return;
    body.innerHTML = '';

    MNEMONICS.forEach((m, idx) => {
      const item = el('div', { class: 'mnemonic-item' }, [
        el('div', { class: 'mnemonic-title', text: (idx + 1) + '. ' + m.title, onclick: `window.__jiangshan_phase5.toggleMnemonic(${idx})` }),
        el('div', { class: 'mnemonic-content', id: `mnemonic-content-${idx}`, style: 'display:none' }, [
          el('pre', { class: 'mnemonic-text', text: m.content }),
          el('div', { class: 'mnemonic-note', text: '💡 ' + m.note })
        ])
      ]);
      body.appendChild(item);
    });
  }

  function toggleMnemonic(idx) {
    const content = document.getElementById('mnemonic-content-' + idx);
    if (content) {
      content.style.display = content.style.display === 'none' ? 'block' : 'none';
    }
  }

  function closeMnemonicPanel() {
    mnemonicPanelOpen = false;
    $('#mnemonic-panel')?.remove();
  }

  // ========== 功能3：经典战役专题 ==========
  let battlePanelOpen = false;

  function toggleBattlePanel() {
    if (battlePanelOpen) {
      closeBattlePanel();
      return;
    }
    openBattlePanel();
  }

  function openBattlePanel() {
    battlePanelOpen = true;

    const panel = el('div', { id: 'battle-panel', class: 'battle-panel' }, [
      el('div', { class: 'battle-header' }, [
        el('span', { text: '⚔️ 经典战役' }),
        el('button', { class: 'panel-close', text: '✕', onclick: 'window.__jiangshan_phase5.closeBattlePanel()' })
      ]),
      el('div', { class: 'battle-body', id: 'battle-body' })
    ]);
    document.body.appendChild(panel);
    renderBattleList();
  }

  function renderBattleList() {
    const body = $('#battle-body');
    if (!body) return;
    body.innerHTML = '';

    BATTLES.forEach((b, idx) => {
      const item = el('div', { class: 'battle-item' }, [
        el('div', { class: 'battle-title-row', onclick: `window.__jiangshan_phase5.toggleBattle(${idx})` }, [
          el('span', { class: 'battle-name', text: b.name }),
          el('span', { class: 'battle-year', text: formatYear(b.year) + '年' })
        ]),
        el('div', { class: 'battle-detail', id: `battle-detail-${idx}`, style: 'display:none' }, [
          el('div', { class: 'battle-meta' }, [
            el('span', { text: '📍 ' + b.place }),
            el('span', { text: '🗡️ ' + b.sides })
          ]),
          el('div', { class: 'battle-result', text: '🏆 结果：' + b.result }),
          el('div', { class: 'battle-desc', text: b.detail }),
          el('div', { class: 'battle-impact', text: '📜 影响：' + b.impact }),
          el('button', { class: 'battle-locate-btn', text: '📍 在地图上定位', onclick: `window.__jiangshan_phase5.locateBattle(${idx})` })
        ])
      ]);
      body.appendChild(item);
    });
  }

  function toggleBattle(idx) {
    const detail = document.getElementById('battle-detail-' + idx);
    if (detail) {
      detail.style.display = detail.style.display === 'none' ? 'block' : 'none';
    }
  }

  function locateBattle(idx) {
    const b = BATTLES[idx];
    setYear(b.year);
    showToast(`已定位到${b.name}时期（${formatYear(b.year)}年）`);
    closeBattlePanel();
  }

  function closeBattlePanel() {
    battlePanelOpen = false;
    $('#battle-panel')?.remove();
  }

  // ========== 功能4：打印友好版 ==========
  let printMode = false;

  function togglePrintMode() {
    printMode = !printMode;
    if (printMode) {
      document.body.classList.add('print-friendly');
      showToast('已切换到打印友好版，按 Ctrl+P 可打印');
    } else {
      document.body.classList.remove('print-friendly');
      showToast('已恢复正常视图');
    }
    const btn = $('#print-btn');
    if (btn) {
      btn.textContent = printMode ? '🖨️ 退出打印' : '🖨️ 打印';
      btn.classList.toggle('active', printMode);
    }
  }

  // ========== 注入工具栏按钮 ==========
  function injectToolbar() {
    const toolbar = $('.learning-toolbar');
    if (!toolbar) return;

    const btns = [
      { id: 'tour-btn', class: 'action-btn subtle learning-btn', title: '疆域演变导览', text: '🎬 导览', onclick: 'window.__jiangshan_phase5.toggleTourPanel()' },
      { id: 'mnemonic-btn', class: 'action-btn subtle learning-btn', title: '历史速记口诀', text: '📝 口诀', onclick: 'window.__jiangshan_phase5.toggleMnemonicPanel()' },
      { id: 'battle-btn', class: 'action-btn subtle learning-btn', title: '经典战役', text: '⚔️ 战役', onclick: 'window.__jiangshan_phase5.toggleBattlePanel()' },
      { id: 'print-btn', class: 'action-btn subtle learning-btn', title: '打印友好版', text: '🖨️ 打印', onclick: 'window.__jiangshan_phase5.togglePrintMode()' }
    ];

    btns.forEach(b => {
      const btn = el('button', { id: b.id, class: b.class, title: b.title, onclick: b.onclick }, [el('span', { text: b.text })]);
      toolbar.appendChild(btn);
    });
  }

  // ========== 注入打印样式 ==========
  function injectPrintStyles() {
    const style = el('style', { text: `
      body.print-friendly {
        background: #fff !important;
      }
      body.print-friendly .learning-toolbar,
      body.print-friendly .event-playback-card,
      body.print-friendly .daily-card,
      body.print-friendly .toast-msg {
        display: none !important;
      }
      body.print-friendly .detail-card,
      body.print-friendly .tour-panel,
      body.print-friendly .mnemonic-panel,
      body.print-friendly .battle-panel {
        position: static !important;
        transform: none !important;
        box-shadow: none !important;
        border: 1px solid #333 !important;
        margin: 20px auto !important;
        page-break-inside: avoid;
      }
      @media print {
        .learning-toolbar, .event-playback-card, .daily-card, .toast-msg,
        .compare-view, .panel-close { display: none !important; }
        body { background: #fff !important; }
        .detail-card, .tour-panel, .mnemonic-panel, .battle-panel {
          position: static !important;
          transform: none !important;
          box-shadow: none !important;
          border: 1px solid #333 !important;
          page-break-inside: avoid;
        }
      }
    `});
    document.head.appendChild(style);
  }

  // ========== 暴露全局 ==========
  window.__jiangshan_phase5 = {
    toggleTourPanel,
    toggleTourPlay,
    jumpToDynasty,
    closeTourPanel,
    toggleMnemonicPanel,
    toggleMnemonic,
    closeMnemonicPanel,
    toggleBattlePanel,
    toggleBattle,
    locateBattle,
    closeBattlePanel,
    togglePrintMode
  };

  // ========== 启动 ==========
  function init() {
    injectToolbar();
    injectPrintStyles();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
