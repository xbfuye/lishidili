/**
 * 华夏文明 - 第六期学习增强功能
 * 1. 人物大全（扩充非政治类人物+民国+上古）
 * 2. 近现代时间线（民国时期）
 * 3. 上古三代专题
 */
(function () {
  'use strict';

  // ========== 新增人物数据 ==========
  const EXTRA_FIGURES = [
    // --- 上古三代 ---
    { name: '大禹', dynasty: '夏', place: '四川北川', year: -2100, life: '约前21世纪', title: '治水英雄', deeds: '治理黄河洪水，三过家门而不入，建立夏朝，划定九州', quote: '（三过家门而不入）' },
    { name: '周文王', dynasty: '商末周初', place: '陕西岐山', year: -1152, life: '前1152-前1056', title: '周朝奠基者', deeds: '推演周易，礼贤下士，访姜太公于渭水，为周朝建立奠基', quote: '（天行健，君子以自强不息）' },
    { name: '周公', dynasty: '西周', place: '陕西岐山', year: -1100, life: '约前11世纪', title: '制礼作乐', deeds: '周武王弟，辅佐成王，制周礼，建典章制度，孔子最崇拜的圣人', quote: '（周公吐哺，天下归心）' },
    { name: '扁鹊', dynasty: '春秋', place: '河北任丘', year: -407, life: '约前407-前310', title: '医学祖师', deeds: '望闻问切四诊法，中医切脉诊断奠基人，著《难经》', quote: '（病入膏肓、讳疾忌医典故）' },

    // --- 科学家 ---
    { name: '张衡', dynasty: '东汉', place: '河南南阳', year: 78, life: '78-139', title: '科圣', deeds: '发明地动仪、浑天仪，著《灵宪》，正确解释月食成因', quote: '（数术穷天地，制作侔造化）' },
    { name: '蔡伦', dynasty: '东汉', place: '湖南耒阳', year: 63, life: '63-121', title: '造纸术改进者', deeds: '改进造纸术，用树皮、破布造纸，使纸普及，影响世界文明', quote: '（四大发明之一）' },
    { name: '张仲景', dynasty: '东汉', place: '河南邓州', year: 150, life: '约150-219', title: '医圣', deeds: '著《伤寒杂病论》，确立辨证论治原则，中医临床基本原则', quote: '（东汉瘟疫，宗族死伤三分之二）' },
    { name: '华佗', dynasty: '东汉末', place: '安徽亳州', year: 145, life: '约145-208', title: '外科鼻祖', deeds: '发明麻沸散，世界最早全身麻醉手术，创编五禽戏', quote: '（曹操头风病，华佗开颅治疗）' },
    { name: '祖冲之', dynasty: '南北朝', place: '河北涞水', year: 429, life: '429-500', title: '数学家', deeds: '圆周率精确到小数点后7位，比欧洲早1000年，制定《大明历》', quote: '（已在第三期人物中）' },
    { name: '毕昇', dynasty: '北宋', place: '湖北英山', year: 990, life: '约990-1051', title: '活字印刷发明者', deeds: '发明泥活字印刷术，比欧洲早400年，四大发明之一', quote: '（印刷术改变了世界）' },
    { name: '沈括', dynasty: '北宋', place: '浙江杭州', year: 1031, life: '1031-1095', title: '科学全才', deeds: '著《梦溪笔谈》，涉及天文、数学、物理、地理，中国科学史上的里程碑', quote: '（石油命名者）' },
    { name: '郭守敬', dynasty: '元', place: '河北邢台', year: 1231, life: '1231-1316', title: '天文学家', deeds: '编制《授时历》，一年365.2425天，与现行公历相同，早300年', quote: '（主持全国天文测量）' },
    { name: '李时珍', dynasty: '明', place: '湖北蕲春', year: 1518, life: '1518-1593', title: '药圣', deeds: '历时27年著《本草纲目》，收录药物1892种，东方医学巨典', quote: '（《本草纲目》被译成多国文字）' },
    { name: '宋应星', dynasty: '明', place: '江西奉新', year: 1587, life: '1587-约1666', title: '技术百科全书', deeds: '著《天工开物》，农业手工业生产技术百科全书，中国17世纪工艺百科全书', quote: '（中国有代表性的科技著作）' },

    // --- 文学家 ---
    { name: '苏轼', dynasty: '北宋', place: '四川眉山', year: 1037, life: '1037-1101', title: '文学全才', deeds: '唐宋八大家之一，诗、词、文、书、画俱佳，著《赤壁赋》《水调歌头》', quote: '大江东去，浪淘尽，千古风流人物。' },
    { name: '辛弃疾', dynasty: '南宋', place: '山东济南', year: 1140, life: '1140-1207', title: '词中之龙', deeds: '豪放派词人代表，醉里挑灯看剑，梦回吹角连营，著《稼轩长短句》', quote: '醉里挑灯看剑，梦回吹角连营。' },
    { name: '陆游', dynasty: '南宋', place: '浙江绍兴', year: 1125, life: '1125-1210', title: '爱国诗人', deeds: '存诗9300余首，《示儿》《书愤》，一生渴望收复中原', quote: '王师北定中原日，家祭无忘告乃翁。' },
    { name: '关汉卿', dynasty: '元', place: '河北安国', year: 1234, life: '约1234-1300', title: '曲圣', deeds: '元曲四大家之首，著《窦娥冤》《救风尘》，元杂剧奠基人', quote: '（我是个蒸不烂煮不熟响当当一粒铜豌豆）' },
    { name: '曹雪芹', dynasty: '清', place: '辽宁辽阳', year: 1715, life: '1715-1763', title: '小说之王', deeds: '著《红楼梦》，中国古典小说巅峰，四大名著之首，红学研究对象', quote: '（满纸荒唐言，一把辛酸泪）' },

    // --- 艺术家 ---
    { name: '张衡', dynasty: '东汉', place: '河南南阳', year: 78, life: '78-139', title: '科学家/文学家', deeds: '（已列科学家）', quote: '' },
    { name: '吴道子', dynasty: '唐', place: '河南禹州', year: 680, life: '约680-759', title: '画圣', deeds: '擅画佛道人物，画衣袂飘飘如迎风起舞，著《送子天王图》', quote: '（吴带当风）' },
    { name: '张择端', dynasty: '北宋', place: '山东诸城', year: 1085, life: '约1085-1145', title: '风俗画大师', deeds: '著《清明上河图》，描绘北宋汴京繁华，中国十大传世名画之一', quote: '（五米长卷，800多个人物）' },
    { name: '唐寅', dynasty: '明', place: '江苏苏州', year: 1470, life: '1470-1524', title: '江南才子', deeds: '江南四大才子之首，诗书画三绝，唐伯虎点秋香典故', quote: '（别人笑我太疯癫，我笑他人看不穿）' },

    // --- 工匠/发明家 ---
    { name: '鲁班', dynasty: '春秋', place: '山东曲阜', year: -507, life: '约前507-前444', title: '木匠祖师', deeds: '发明锯子、曲尺、墨斗等木工工具，被尊为木匠鼻祖', quote: '（班门弄斧）' },
    { name: '李冰', dynasty: '战国', place: '山西运城', year: -250, life: '约前256-前251', title: '水利专家', deeds: '修建都江堰，成都平原成为天府之国，2200多年仍在使用', quote: '（深淘滩，低作堰）' },
    { name: '李春', dynasty: '隋', place: '河北邢台', year: 595, life: '约6世纪', title: '桥梁专家', deeds: '设计建造赵州桥，世界最早敞肩石拱桥，1400多年仍保存完好', quote: '（奇巧固护，甲于天下）' },

    // --- 民国人物 ---
    { name: '孙中山', dynasty: '民国', place: '广东中山', year: 1866, life: '1866-1925', title: '国父', deeds: '领导辛亥革命，推翻两千多年帝制，建立中华民国，三民主义', quote: '革命尚未成功，同志仍需努力。' },
    { name: '蔡元培', dynasty: '民国', place: '浙江绍兴', year: 1868, life: '1868-1940', title: '教育奠基人', deeds: '北京大学校长，思想自由兼容并包，新文化运动保护伞', quote: '（大学者，研究高深学问者也）' },
    { name: '鲁迅', dynasty: '民国', place: '浙江绍兴', year: 1881, life: '1881-1936', title: '民族魂', deeds: '文学家思想家，著《呐喊》《彷徨》，弃医从文，唤醒国民', quote: '横眉冷对千夫指，俯首甘为孺子牛。' },
    { name: '陈独秀', dynasty: '民国', place: '安徽安庆', year: 1879, life: '1879-1942', title: '新文化运动旗手', deeds: '创办《新青年》，五四运动总司令，中国共产党创始人之一', quote: '（德先生和赛先生）' },
    { name: '李大钊', dynasty: '民国', place: '河北乐亭', year: 1889, life: '1889-1927', title: '建党先驱', deeds: '传播马克思主义，中国共产党主要创始人之一，就义于北京', quote: '（铁肩担道义，妙手著文章）' },
    { name: '胡适', dynasty: '民国', place: '安徽绩溪', year: 1891, life: '1891-1962', title: '新文化运动主将', deeds: '提倡白话文，文学改良刍议，新文化运动旗手之一', quote: '（大胆的假设，小心的求证）' },
    { name: '钱学森', dynasty: '现代', place: '浙江杭州', year: 1911, life: '1911-2009', title: '航天之父', deeds: '两弹一星元勋，放弃美国优渥生活回国，中国航天事业奠基人', quote: '（我的事业在中国，我的成就在中国，我的归宿在中国）' },
    { name: '邓稼先', dynasty: '现代', place: '安徽怀宁', year: 1924, life: '1924-1986', title: '两弹元勋', deeds: '原子弹氢弹理论设计负责人，隐姓埋名28年，为国防奉献一生', quote: '（许身国威壮河山）' },
    { name: '袁隆平', dynasty: '现代', place: '江西德安', year: 1930, life: '1930-2021', title: '杂交水稻之父', deeds: '培育杂交水稻，解决亿万人吃饭问题，功勋科学家', quote: '（禾下乘凉梦，杂交水稻覆盖全球梦）' }
  ];

  // ========== 新增历史事件 ==========
  const EXTRA_EVENTS = [
    // --- 上古三代 ---
    { year: -2070, title: '夏朝建立', desc: '大禹治水成功，建立夏朝，中国第一个世袭制王朝', place: '河南登封' },
    { year: -1600, title: '商汤灭夏', desc: '商汤在鸣条之战灭夏，建立商朝', place: '河南商丘' },
    { year: -1046, title: '武王伐纣', desc: '牧野之战，周武王灭商，建立周朝', place: '河南淇县' },
    { year: -841, title: '国人暴动', desc: '周厉王暴政，国人暴动，周召共和，中国历史有确切纪年开始', place: '陕西西安' },
    { year: -771, title: '平王东迁', desc: '犬戎攻破镐京，周平王东迁洛邑，东周开始，春秋时代开启', place: '河南洛阳' },

    // --- 民国时期 ---
    { year: 1911, title: '辛亥革命', desc: '武昌起义爆发，各省纷纷独立，清朝统治瓦解', place: '湖北武汉' },
    { year: 1912, title: '中华民国成立', desc: '孙中山在南京就任临时大总统，中华民国成立', place: '江苏南京' },
    { year: 1915, title: '新文化运动', desc: '陈独秀创办《新青年》，提倡民主与科学，反对旧道德', place: '上海' },
    { year: 1919, title: '五四运动', desc: '巴黎和会外交失败，北京学生游行，反帝反封建爱国运动', place: '北京' },
    { year: 1921, title: '中共一大', desc: '中国共产党第一次全国代表大会在上海召开，中国共产党成立', place: '上海' },
    { year: 1924, title: '国共第一次合作', desc: '国民党一大召开，联俄联共扶助农工，大革命开始', place: '广州' },
    { year: 1926, title: '北伐战争', desc: '国民革命军北伐，讨伐吴佩孚孙传芳张作霖，势如破竹', place: '广州' },
    { year: 1927, title: '南昌起义', desc: '八一南昌起义，中国共产党独立领导武装斗争开始', place: '江西南昌' },
    { year: 1934, title: '长征开始', desc: '第五次反围剿失败，红军开始二万五千里长征', place: '江西瑞金' },
    { year: 1935, title: '遵义会议', desc: '遵义会议召开，确立毛泽东领导地位，生死攸关转折点', place: '贵州遵义' },
    { year: 1936, title: '西安事变', desc: '张学良兵谏蒋介石，停止内战一致抗日，抗日民族统一战线形成', place: '陕西西安' },
    { year: 1937, title: '七七事变', desc: '卢沟桥事变，日本全面侵华开始，全民族抗战开始', place: '北京' },
    { year: 1937, title: '南京大屠杀', desc: '日军攻占南京，6周内屠杀中国军民30万人以上', place: '江苏南京' },
    { year: 1938, title: '台儿庄大捷', desc: '李宗仁指挥台儿庄战役，抗战以来正面战场最大胜利', place: '山东枣庄' },
    { year: 1940, title: '百团大战', desc: '彭德怀指挥百团大战，破袭日军交通线，振奋全国民心', place: '华北' },
    { year: 1945, title: '抗战胜利', desc: '日本宣布无条件投降，中国人民抗日战争胜利', place: '全国' },
    { year: 1946, title: '解放战争开始', desc: '国民党进攻中原解放区，全面内战爆发', place: '河南' },
    { year: 1948, title: '三大战役', desc: '辽沈、淮海、平津三大战役，国民党主力基本被消灭', place: '东北/华东/华北' },
    { year: 1949, title: '新中国成立', desc: '中华人民共和国成立，中国人民从此站起来了', place: '北京' }
  ];

  // ========== 工具函数 ==========
  function $(sel) { return document.querySelector(sel); }
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

  // ========== 功能1：人物大全面板 ==========
  let figurePanelOpen = false;

  function toggleFigurePanel() {
    if (figurePanelOpen) {
      closeFigurePanel();
      return;
    }
    openFigurePanel();
  }

  function openFigurePanel() {
    figurePanelOpen = true;

    const panel = el('div', { id: 'figure-encyclopedia-panel', class: 'figure-encyclopedia-panel' }, [
      el('div', { class: 'fep-header' }, [
        el('span', { text: '📚 人物大全' }),
        el('button', { class: 'panel-close', text: '✕', onclick: 'window.__jiangshan_phase6.closeFigurePanel()' })
      ]),
      el('div', { class: 'fep-search' }, [
        el('input', {
          type: 'text',
          id: 'fep-search-input',
          placeholder: '搜索人物姓名...',
          oninput: 'window.__jiangshan_phase6.filterFigures(this.value)'
        })
      ]),
      el('div', { class: 'fep-tabs' }, [
        el('button', { class: 'fep-tab active', 'data-cat': 'all', text: '全部', onclick: 'window.__jiangshan_phase6.switchTab(this)' }),
        el('button', { class: 'fep-tab', 'data-cat': 'politics', text: '帝王将相', onclick: 'window.__jiangshan_phase6.switchTab(this)' }),
        el('button', { class: 'fep-tab', 'data-cat': 'science', text: '科学家', onclick: 'window.__jiangshan_phase6.switchTab(this)' }),
        el('button', { class: 'fep-tab', 'data-cat': 'literature', text: '文学家', onclick: 'window.__jiangshan_phase6.switchTab(this)' }),
        el('button', { class: 'fep-tab', 'data-cat': 'art', text: '艺术家', onclick: 'window.__jiangshan_phase6.switchTab(this)' }),
        el('button', { class: 'fep-tab', 'data-cat': 'modern', text: '近现代', onclick: 'window.__jiangshan_phase6.switchTab(this)' })
      ]),
      el('div', { id: 'fep-list', class: 'fep-list' })
    ]);
    document.body.appendChild(panel);
    renderFigureList('all', '');
  }

  function getFigureCategory(fig) {
    if (['民国', '现代'].includes(fig.dynasty)) return 'modern';
    if (['张衡', '蔡伦', '张仲景', '华佗', '祖冲之', '毕昇', '沈括', '郭守敬', '李时珍', '宋应星', '李冰', '李春', '钱学森', '邓稼先', '袁隆平', '鲁班', '扁鹊'].includes(fig.name)) return 'science';
    if (['苏轼', '辛弃疾', '陆游', '关汉卿', '曹雪芹', '鲁迅', '陈独秀', '胡适'].includes(fig.name)) return 'literature';
    if (['吴道子', '张择端', '唐寅'].includes(fig.name)) return 'art';
    return 'politics';
  }

  function renderFigureList(category, keyword) {
    const list = $('#fep-list');
    if (!list) return;
    list.innerHTML = '';

    const filtered = EXTRA_FIGURES.filter(fig => {
      if (category !== 'all' && getFigureCategory(fig) !== category) return false;
      if (keyword && !fig.name.includes(keyword) && !fig.title.includes(keyword)) return false;
      return true;
    });

    if (filtered.length === 0) {
      list.innerHTML = '<div class="fep-empty">未找到相关人物</div>';
      return;
    }

    filtered.forEach(fig => {
      const item = el('div', { class: 'fep-item', onclick: `window.__jiangshan_phase6.locateFigure('${fig.name}')` }, [
        el('div', { class: 'fep-item-name', text: fig.name }),
        el('div', { class: 'fep-item-title', text: fig.title }),
        el('div', { class: 'fep-item-meta', text: fig.dynasty + ' · ' + fig.place })
      ]);
      list.appendChild(item);
    });
  }

  function filterFigures(keyword) {
    const activeTab = document.querySelector('.fep-tab.active');
    const cat = activeTab ? activeTab.dataset.cat : 'all';
    renderFigureList(cat, keyword);
  }

  function switchTab(btn) {
    document.querySelectorAll('.fep-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    const keyword = $('#fep-search-input')?.value || '';
    renderFigureList(btn.dataset.cat, keyword);
  }

  function locateFigure(name) {
    const fig = EXTRA_FIGURES.find(f => f.name === name);
    if (!fig) return;

    // 在地图上标记位置（简化：显示一个提示）
    showToast(`定位到：${fig.name}（${fig.dynasty} · ${fig.place}）`);

    // 切换到对应年份
    const input = document.getElementById('inp-year');
    if (input) {
      input.value = fig.year;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  function closeFigurePanel() {
    figurePanelOpen = false;
    $('#figure-encyclopedia-panel')?.remove();
  }

  // ========== 功能2：近现代时间线 ==========
  let modernTimelineOpen = false;

  function toggleModernTimeline() {
    if (modernTimelineOpen) {
      closeModernTimeline();
      return;
    }
    openModernTimeline();
  }

  function openModernTimeline() {
    modernTimelineOpen = true;

    const panel = el('div', { id: 'modern-timeline-panel', class: 'modern-timeline-panel' }, [
      el('div', { class: 'mtp-header' }, [
        el('span', { text: '📅 近现代大事年表' }),
        el('button', { class: 'panel-close', text: '✕', onclick: 'window.__jiangshan_phase6.closeModernTimeline()' })
      ]),
      el('div', { class: 'mtp-body', id: 'mtp-body' })
    ]);
    document.body.appendChild(panel);
    renderModernTimeline();
  }

  function renderModernTimeline() {
    const body = $('#mtp-body');
    if (!body) return;
    body.innerHTML = '';

    // 只显示民国以后的事件
    const modernEvents = EXTRA_EVENTS.filter(e => e.year >= 1911).sort((a, b) => a.year - b.year);

    modernEvents.forEach(ev => {
      const item = el('div', { class: 'mtp-item', onclick: `window.__jiangshan_phase6.locateEvent(${ev.year})` }, [
        el('div', { class: 'mtp-year', text: ev.year + '年' }),
        el('div', { class: 'mtp-content' }, [
          el('div', { class: 'mtp-title', text: ev.title }),
          el('div', { class: 'mtp-desc', text: ev.desc }),
          el('div', { class: 'mtp-place', text: '📍 ' + ev.place })
        ])
      ]);
      body.appendChild(item);
    });
  }

  function locateEvent(year) {
    const input = document.getElementById('inp-year');
    if (input) {
      input.value = year;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
    showToast(`已跳转到 ${year} 年`);
  }

  function closeModernTimeline() {
    modernTimelineOpen = false;
    $('#modern-timeline-panel')?.remove();
  }

  // ========== 注入工具栏按钮 ==========
  function injectToolbar() {
    const toolbar = $('.learning-toolbar');
    if (!toolbar) return;

    const btns = [
      { id: 'figure-encyclopedia-btn', class: 'action-btn subtle learning-btn', title: '人物大全', text: '📚 人物', onclick: 'window.__jiangshan_phase6.toggleFigurePanel()' },
      { id: 'modern-timeline-btn', class: 'action-btn subtle learning-btn', title: '近现代大事年表', text: '📅 年表', onclick: 'window.__jiangshan_phase6.toggleModernTimeline()' }
    ];

    btns.forEach(b => {
      const btn = el('button', { id: b.id, class: b.class, title: b.title, onclick: b.onclick }, [el('span', { text: b.text })]);
      toolbar.appendChild(btn);
    });
  }

  // ========== 暴露全局 ==========
  window.__jiangshan_phase6 = {
    toggleFigurePanel,
    closeFigurePanel,
    filterFigures,
    switchTab,
    locateFigure,
    toggleModernTimeline,
    closeModernTimeline,
    locateEvent
  };

  // ========== 启动 ==========
  function init() {
    injectToolbar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
