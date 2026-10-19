/**
 * 华夏文明 - 第二期学习增强功能
 * 1. 历史事件动画播放
 * 2. 帝王世系图
 * 3. 学习笔记导出
 * 4. 语音朗读
 */
(function () {
  'use strict';

  // ========== 帝王世系数据 ==========
  const DYNASTY_EMPERORS = {
    '秦': [
      { name: '秦始皇 嬴政', reign: '前221-前210', years: 11, note: '统一六国，建立中央集权，书同文车同轨' },
      { name: '秦二世 胡亥', reign: '前210-前207', years: 3, note: '赵高专权，陈胜吴广起义，秦朝灭亡' }
    ],
    '西汉': [
      { name: '汉高祖 刘邦', reign: '前202-前195', years: 7, note: '建立汉朝，休养生息' },
      { name: '汉文帝 刘恒', reign: '前180-前157', years: 23, note: '文景之治，轻徭薄赋' },
      { name: '汉景帝 刘启', reign: '前157-前141', years: 16, note: '平定七国之乱' },
      { name: '汉武帝 刘彻', reign: '前141-前87', years: 54, note: '罢黜百家，北击匈奴，开辟丝绸之路' },
      { name: '汉昭帝 刘弗陵', reign: '前87-前74', years: 13, note: '霍光辅政，昭宣中兴' },
      { name: '汉宣帝 刘询', reign: '前74-前49', years: 25, note: '昭宣中兴，设西域都护府' },
      { name: '汉元帝 刘奭', reign: '前49-前33', years: 16, note: '昭君出塞，外戚宦官开始专权' },
      { name: '汉成帝 刘骜', reign: '前33-前7', years: 26, note: '王氏外戚崛起' },
      { name: '汉平帝 刘衎', reign: '前1-6', years: 7, note: '王莽专权，后被毒杀' }
    ],
    '东汉': [
      { name: '光武帝 刘秀', reign: '25-57', years: 32, note: '光武中兴，重建汉朝' },
      { name: '汉明帝 刘庄', reign: '57-75', years: 18, note: '明章之治，佛教传入' },
      { name: '汉章帝 刘炟', reign: '75-88', years: 13, note: '明章之治' },
      { name: '汉和帝 刘肇', reign: '88-105', years: 17, note: '永元之隆，窦宪破北匈奴' },
      { name: '汉桓帝 刘志', reign: '146-167', years: 21, note: '党锢之祸' },
      { name: '汉灵帝 刘宏', reign: '168-189', years: 21, note: '黄巾起义爆发' },
      { name: '汉献帝 刘协', reign: '189-220', years: 31, note: '曹操挟天子以令诸侯，后禅让曹丕' }
    ],
    '三国': [
      { name: '魏文帝 曹丕', reign: '220-226', years: 6, note: '代汉建魏，九品中正制' },
      { name: '魏明帝 曹叡', reign: '226-239', years: 13, note: '抵御蜀吴，司马懿崛起' },
      { name: '蜀汉昭烈帝 刘备', reign: '221-223', years: 2, note: '建立蜀汉，夷陵之战战败' },
      { name: '蜀汉后主 刘禅', reign: '223-263', years: 40, note: '诸葛亮辅政，后降魏' },
      { name: '吴大帝 孙权', reign: '229-252', years: 23, note: '建立东吴，开发江南' }
    ],
    '西晋': [
      { name: '晋武帝 司马炎', reign: '265-290', years: 25, note: '统一三国，太康之治' },
      { name: '晋惠帝 司马衷', reign: '290-306', years: 16, note: '八王之乱，"何不食肉糜"' },
      { name: '晋怀帝 司马炽', reign: '306-313', years: 7, note: '永嘉之乱，被匈奴俘虏' },
      { name: '晋愍帝 司马邺', reign: '313-316', years: 3, note: '西晋灭亡' }
    ],
    '东晋': [
      { name: '晋元帝 司马睿', reign: '317-322', years: 5, note: '衣冠南渡，建立东晋' },
      { name: '晋孝武帝 司马曜', reign: '372-396', years: 24, note: '淝水之战大胜前秦' },
      { name: '晋安帝 司马德宗', reign: '396-418', years: 22, note: '刘裕掌权' },
      { name: '晋恭帝 司马德文', reign: '418-420', years: 2, note: '禅让刘裕，东晋灭亡' }
    ],
    '南北朝': [
      { name: '北魏孝文帝 元宏', reign: '471-499', years: 28, note: '迁都洛阳，推行汉化改革' },
      { name: '梁武帝 萧衍', reign: '502-549', years: 47, note: '南朝文化鼎盛，侯景之乱' },
      { name: '北周武帝 宇文邕', reign: '560-578', years: 18, note: '灭北齐，统一北方' }
    ],
    '隋': [
      { name: '隋文帝 杨坚', reign: '581-604', years: 23, note: '统一南北，开皇之治，创立科举' },
      { name: '隋炀帝 杨广', reign: '604-618', years: 14, note: '开凿大运河，三征高句丽，隋末民变' }
    ],
    '唐': [
      { name: '唐高祖 李渊', reign: '618-626', years: 8, note: '建立唐朝' },
      { name: '唐太宗 李世民', reign: '626-649', years: 23, note: '贞观之治，天可汗' },
      { name: '唐高宗 李治', reign: '649-683', years: 34, note: '永徽之治，版图最大' },
      { name: '武则天', reign: '690-705', years: 15, note: '中国唯一女皇帝，开创武举' },
      { name: '唐玄宗 李隆基', reign: '712-756', years: 44, note: '开元盛世，安史之乱' },
      { name: '唐肃宗 李亨', reign: '756-762', years: 6, note: '平定安史之乱' },
      { name: '唐宪宗 李纯', reign: '805-820', years: 15, note: '元和中兴' },
      { name: '唐宣宗 李忱', reign: '846-859', years: 13, note: '大中之治，"小太宗"' },
      { name: '唐哀帝 李柷', reign: '904-907', years: 3, note: '朱温篡唐，唐朝灭亡' }
    ],
    '五代十国': [
      { name: '后梁太祖 朱温', reign: '907-912', years: 5, note: '代唐建梁，五代开始' },
      { name: '后唐庄宗 李存勖', reign: '923-926', years: 3, note: '灭后梁，统一北方' },
      { name: '后周世宗 柴荣', reign: '954-959', years: 5, note: '励精图治，为北宋统一奠基' }
    ],
    '北宋': [
      { name: '宋太祖 赵匡胤', reign: '960-976', years: 16, note: '陈桥兵变，杯酒释兵权' },
      { name: '宋太宗 赵光义', reign: '976-997', years: 21, note: '统一南方，雍熙北伐失败' },
      { name: '宋真宗 赵恒', reign: '997-1022', years: 25, note: '澶渊之盟' },
      { name: '宋仁宗 赵祯', reign: '1022-1063', years: 41, note: '仁宗盛治，庆历新政' },
      { name: '宋神宗 赵顼', reign: '1067-1085', years: 18, note: '王安石变法' },
      { name: '宋徽宗 赵佶', reign: '1100-1125', years: 25, note: '书画皇帝，靖康之变' },
      { name: '宋钦宗 赵桓', reign: '1125-1127', years: 2, note: '靖康之变，北宋灭亡' }
    ],
    '南宋': [
      { name: '宋高宗 赵构', reign: '1127-1162', years: 35, note: '建立南宋，绍兴和议，杀岳飞' },
      { name: '宋孝宗 赵昚', reign: '1162-1189', years: 27, note: '乾淳之治，为岳飞平反' },
      { name: '宋理宗 赵昀', reign: '1224-1264', years: 40, note: '端平入洛，蒙古崛起' },
      { name: '宋恭帝 赵㬎', reign: '1274-1276', years: 2, note: '临安降元' },
      { name: '宋怀宗 赵昺', reign: '1278-1279', years: 1, note: '崖山海战，陆秀夫背帝投海' }
    ],
    '元': [
      { name: '元世祖 忽必烈', reign: '1271-1294', years: 23, note: '建立元朝，统一中国，行省制' },
      { name: '元成宗 铁穆耳', reign: '1294-1307', years: 13, note: '守成之君' },
      { name: '元仁宗 爱育黎拔力八达', reign: '1311-1320', years: 9, note: '恢复科举' },
      { name: '元顺帝 妥懽帖睦尔', reign: '1333-1368', years: 35, note: '红巾军起义，退回漠北' }
    ],
    '明': [
      { name: '明太祖 朱元璋', reign: '1368-1398', years: 30, note: '建立明朝，洪武之治' },
      { name: '明惠帝 朱允炆', reign: '1398-1402', years: 4, note: '削藩，靖难之役后失踪' },
      { name: '明成祖 朱棣', reign: '1402-1424', years: 22, note: '永乐盛世，迁都北京，郑和下西洋' },
      { name: '明仁宗 朱高炽', reign: '1424-1425', years: 1, note: '仁宣之治开端' },
      { name: '明宣宗 朱瞻基', reign: '1425-1435', years: 10, note: '仁宣之治' },
      { name: '明英宗 朱祁镇', reign: '1435-1449/1457-1464', years: 21, note: '土木堡之变，夺门之变' },
      { name: '明代宗 朱祁钰', reign: '1449-1457', years: 8, note: '北京保卫战' },
      { name: '明孝宗 朱祐樘', reign: '1487-1505', years: 18, note: '弘治中兴' },
      { name: '明神宗 朱翊钧', reign: '1572-1620', years: 48, note: '万历新政，万历三大征，后期怠政' },
      { name: '明思宗 朱由检', reign: '1627-1644', years: 17, note: '李自成破北京，自缢煤山' }
    ],
    '清': [
      { name: '清太祖 努尔哈赤', reign: '1616-1626', years: 10, note: '建立后金，萨尔浒之战' },
      { name: '清太宗 皇太极', reign: '1626-1643', years: 17, note: '改国号大清' },
      { name: '清世祖 福临', reign: '1644-1661', years: 18, note: '顺治入关，定都北京' },
      { name: '清圣祖 玄烨', reign: '1661-1722', years: 61, note: '康熙盛世，平三藩收台湾' },
      { name: '清世宗 胤禛', reign: '1722-1735', years: 13, note: '雍正改革，摊丁入亩' },
      { name: '清高宗 弘历', reign: '1735-1795', years: 60, note: '乾隆盛世，十全老人，闭关锁国' },
      { name: '清仁宗 颙琰', reign: '1796-1820', years: 25, note: '嘉庆，杀和珅' },
      { name: '清宣宗 旻宁', reign: '1820-1850', years: 30, note: '道光，鸦片战争' },
      { name: '清文宗 奕詝', reign: '1850-1861', years: 11, note: '咸丰，太平天国，第二次鸦片战争' },
      { name: '清穆宗 载淳', reign: '1861-1875', years: 14, note: '同治，洋务运动，同治中兴' },
      { name: '清德宗 载湉', reign: '1875-1908', years: 34, note: '光绪，戊戌变法，甲午战争' },
      { name: '宣统帝 溥仪', reign: '1908-1912', years: 4, note: '末代皇帝，辛亥革命后退位' }
    ]
  };

  // ========== 重要历史事件（用于动画播放） ==========
  const KEY_EVENTS = [
    { year: -403, title: '三家分晋', desc: '韩赵魏三家瓜分晋国，战国时代开始', place: '山西' },
    { year: -356, title: '商鞅变法', desc: '秦孝公任用商鞅变法，秦国崛起', place: '陕西咸阳' },
    { year: -260, title: '长平之战', desc: '秦白起大破赵括，坑杀赵卒40万', place: '山西高平' },
    { year: -221, title: '秦灭六国', desc: '秦始皇统一中国，建立中央集权', place: '陕西咸阳' },
    { year: -214, title: '修筑长城', desc: '秦始皇连接各国长城，万里长城初具规模', place: '北方边境' },
    { year: -202, title: '楚汉之争结束', desc: '刘邦垓下围项羽，建立汉朝', place: '安徽灵璧' },
    { year: -138, title: '张骞出使西域', desc: '汉武帝派张骞出使西域，开辟丝绸之路', place: '陕西西安' },
    { year: -119, title: '漠北之战', desc: '卫青霍去病大破匈奴，封狼居胥', place: '蒙古高原' },
    { year: -60, title: '西域都护府', desc: '汉朝设西域都护府，新疆正式纳入版图', place: '新疆轮台' },
    { year: 9, title: '王莽篡汉', desc: '王莽代汉建新，推行复古改革', place: '陕西西安' },
    { year: 25, title: '光武中兴', desc: '刘秀重建汉朝，定都洛阳', place: '河南洛阳' },
    { year: 184, title: '黄巾起义', desc: '张角领导农民起义，东汉名存实亡', place: '河北平乡' },
    { year: 200, title: '官渡之战', desc: '曹操以少胜多大败袁绍，统一北方', place: '河南中牟' },
    { year: 208, title: '赤壁之战', desc: '孙刘联军火攻大破曹操，三国鼎立', place: '湖北赤壁' },
    { year: 280, title: '西晋统一', desc: '晋灭吴，三国归晋', place: '河南洛阳' },
    { year: 311, title: '永嘉之乱', desc: '匈奴破洛阳，西晋灭亡，衣冠南渡', place: '河南洛阳' },
    { year: 383, title: '淝水之战', desc: '东晋以少胜多大败前秦，北方再度分裂', place: '安徽寿县' },
    { year: 494, title: '孝文帝迁都', desc: '北魏孝文帝迁都洛阳，推行汉化', place: '河南洛阳' },
    { year: 589, title: '隋朝统一', desc: '隋灭陈，结束南北朝分裂', place: '陕西西安' },
    { year: 605, title: '开凿大运河', desc: '隋炀帝开凿大运河，沟通南北', place: '北京-杭州' },
    { year: 626, title: '玄武门之变', desc: '李世民杀兄逼父，即位为唐太宗', place: '陕西西安' },
    { year: 641, title: '文成公主入藏', desc: '文成公主嫁松赞干布，汉藏友好', place: '西藏拉萨' },
    { year: 755, title: '安史之乱', desc: '安禄山史思明叛乱，唐朝由盛转衰', place: '北京' },
    { year: 960, title: '陈桥兵变', desc: '赵匡胤黄袍加身，建立北宋', place: '河南封丘' },
    { year: 1004, title: '澶渊之盟', desc: '宋辽订立和约，维持百年和平', place: '河南濮阳' },
    { year: 1127, title: '靖康之变', desc: '金军破开封，北宋灭亡', place: '河南开封' },
    { year: 1279, title: '崖山海战', desc: '元灭南宋，陆秀夫背帝投海', place: '广东新会' },
    { year: 1368, title: '明朝建立', desc: '朱元璋称帝，驱逐蒙元', place: '江苏南京' },
    { year: 1405, title: '郑和下西洋', desc: '郑和七下西洋，最远到达非洲', place: '江苏太仓' },
    { year: 1421, title: '迁都北京', desc: '明成祖迁都北京，天子守国门', place: '北京' },
    { year: 1449, title: '土木堡之变', desc: '明英宗被瓦剌俘虏，明朝由盛转衰', place: '河北怀来' },
    { year: 1644, title: '清军入关', desc: '李自成破北京，清军入关定都北京', place: '北京' },
    { year: 1683, title: '统一台湾', desc: '施琅收复台湾，设台湾府', place: '台湾' },
    { year: 1840, title: '鸦片战争', desc: '英国发动鸦片战争，中国近代史开端', place: '广东广州' },
    { year: 1894, title: '甲午战争', desc: '中日甲午战争，中国战败割台湾', place: '黄海' },
    { year: 1911, title: '辛亥革命', desc: '武昌起义，推翻清朝建立民国', place: '湖北武汉' },
    { year: 1937, title: '全面抗战', desc: '七七事变，全民族抗战开始', place: '北京' },
    { year: 1949, title: '新中国成立', desc: '中华人民共和国成立', place: '北京' }
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

  // ========== 功能1：历史事件动画播放 ==========
  let eventPlaybackActive = false;
  let eventVoiceEnabled = true; // 默认开启语音讲解
  let lastEventYear = null;

  function getCurrentYear() {
    // 从年份输入框读取（最可靠）
    const input = document.getElementById('inp-year');
    if (input && input.value) {
      return parseInt(input.value);
    }
    // 备选：从年份显示元素读取
    const yearDisplay = $('.ep-year, .year-display, .current-year, #year-label');
    if (yearDisplay) {
      const text = yearDisplay.textContent;
      const match = text.match(/前?(\d+)/);
      if (match) {
        return text.includes('前') ? -parseInt(match[1]) : parseInt(match[1]);
      }
    }
    return null;
  }

  function toggleEventPlayback() {
    eventPlaybackActive = !eventPlaybackActive;
    const btn = $('#event-playback-btn');
    if (btn) {
      btn.textContent = eventPlaybackActive ? '⏸ 暂停讲解' : '▶️ 事件讲解';
      btn.classList.toggle('active', eventPlaybackActive);
    }
    if (eventPlaybackActive) {
      startEventMonitoring();
      // 在用户点击的直接上下文中调用语音，解锁自动播放限制
      if (eventVoiceEnabled && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const unlockUtter = new SpeechSynthesisUtterance('事件讲解已开启');
        unlockUtter.lang = 'zh-CN';
        unlockUtter.rate = 1.0;
        window.speechSynthesis.speak(unlockUtter);
      }
      showToast('事件讲解已开启，播放时会语音播报重要事件');
    } else {
      // 停止时取消语音
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      $('.event-playback-card')?.remove();
      showToast('事件讲解已关闭');
    }
  }

  function toggleEventVoice() {
    eventVoiceEnabled = !eventVoiceEnabled;
    showToast(eventVoiceEnabled ? '语音讲解已开启' : '语音讲解已关闭');
    if (!eventVoiceEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  function isVoiceEnabled() {
    return eventVoiceEnabled;
  }

  function startEventMonitoring() {
    const monitor = setInterval(() => {
      if (!eventPlaybackActive) {
        clearInterval(monitor);
        return;
      }
      const year = getCurrentYear();
      if (year === null || year === lastEventYear) return;

      // 查找当前年份附近的重要事件（±5年）
      const event = KEY_EVENTS.find(e => Math.abs(e.year - year) <= 3);
      if (event && event.year !== lastEventYear) {
        lastEventYear = event.year;
        showEventCard(event);
      }
    }, 1000);
  }

  function showEventCard(event) {
    // 移除旧卡片
    $('.event-playback-card')?.remove();

    const card = el('div', { class: 'event-playback-card' }, [
      el('div', { class: 'event-playback-header' }, [
        el('div', { class: 'event-playback-year', text: formatYear(event.year) + '年' }),
        el('button', {
          class: 'event-voice-toggle' + (eventVoiceEnabled ? ' active' : ''),
          text: eventVoiceEnabled ? '🔊' : '🔇',
          title: eventVoiceEnabled ? '点击关闭语音' : '点击开启语音',
          onclick: 'window.__jiangshan_phase2.toggleEventVoice(); this.textContent = window.__jiangshan_phase2.isVoiceEnabled() ? "🔊" : "🔇"; this.classList.toggle("active", window.__jiangshan_phase2.isVoiceEnabled());'
        })
      ]),
      el('div', { class: 'event-playback-title', text: event.title }),
      el('div', { class: 'event-playback-desc', text: event.desc }),
      el('div', { class: 'event-playback-place', text: '📍 ' + event.place }),
      el('button', {
        class: 'event-play-speech-btn',
        text: '🔊 播放讲解',
        onclick: `window.__jiangshan_phase2.speakEvent(${JSON.stringify(event).replace(/"/g, '&quot;')})`
      })
    ]);
    document.body.appendChild(card);

    // 动画入场
    setTimeout(() => card.classList.add('show'), 50);

    // 尝试自动语音朗读（在支持自动播放的浏览器上有效）
    if (eventVoiceEnabled && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const speakText = `${formatYear(event.year)}年，${event.title}。${event.desc}`;
        const utterance = new SpeechSynthesisUtterance(speakText);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.onerror = () => {
          // 自动播放被阻止时，显示播放按钮提示
          const btn = card.querySelector('.event-play-speech-btn');
          if (btn) btn.classList.add('show');
        };
        utterance.onstart = () => {
          const btn = card.querySelector('.event-play-speech-btn');
          if (btn) btn.classList.remove('show');
        };
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        // 忽略错误，用户可手动点击播放
      }
    }

    // 8秒后自动消失
    setTimeout(() => {
      card.classList.remove('show');
      setTimeout(() => card.remove(), 500);
    }, 10000);
  }

  function speakEvent(event) {
    if (!('speechSynthesis' in window)) {
      showToast('您的浏览器不支持语音朗读');
      return;
    }
    window.speechSynthesis.cancel();
    const speakText = `${formatYear(event.year)}年，${event.title}。${event.desc}`;
    const utterance = new SpeechSynthesisUtterance(speakText);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
    showToast('正在播放讲解...');
  }

  function formatYear(y) {
    return y < 0 ? '前' + (-y) : y;
  }

  // ========== 功能2：帝王世系图 ==========
  let emperorPanelOpen = false;

  function toggleEmperorPanel() {
    if (emperorPanelOpen) {
      closeEmperorPanel();
      return;
    }
    openEmperorPanel();
  }

  function openEmperorPanel() {
    emperorPanelOpen = true;

    // 获取当前朝代
    const currentDynasty = getCurrentDynasty();
    const dynasties = Object.keys(DYNASTY_EMPERORS);

    const panel = el('div', { id: 'emperor-panel', class: 'emperor-panel' }, [
      el('div', { class: 'emperor-header' }, [
        el('span', { text: '帝王世系图' }),
        el('button', { class: 'panel-close', text: '✕', onclick: 'window.__jiangshan_phase2.closeEmperorPanel()' })
      ]),
      el('div', { class: 'emperor-body' }, [
        el('div', { class: 'emperor-dynasty-select' },
          dynasties.map(d => {
            const btn = el('button', {
              class: 'dynasty-tab' + (d === currentDynasty ? ' active' : ''),
              text: d,
              onclick: `window.__jiangshan_phase2.showEmperors('${d}')`
            });
            return btn;
          })
        ),
        el('div', { id: 'emperor-list', class: 'emperor-list' })
      ])
    ]);
    document.body.appendChild(panel);

    // 显示当前朝代帝王
    if (currentDynasty && DYNASTY_EMPERORS[currentDynasty]) {
      showEmperors(currentDynasty);
    } else {
      showEmperors(dynasties[0]);
    }
  }

  function showEmperors(dynasty) {
    // 更新 tab 状态
    $$('.dynasty-tab').forEach(t => t.classList.toggle('active', t.textContent === dynasty));

    const list = $('#emperor-list');
    if (!list) return;

    const emperors = DYNASTY_EMPERORS[dynasty] || [];
    list.innerHTML = '';

    if (emperors.length === 0) {
      list.appendChild(el('div', { class: 'emperor-empty', text: '该朝代帝王数据待补充' }));
      return;
    }

    emperors.forEach((emp, i) => {
      const item = el('div', { class: 'emperor-item' }, [
        el('div', { class: 'emperor-index', text: (i + 1) }),
        el('div', { class: 'emperor-info' }, [
          el('div', { class: 'emperor-name', text: emp.name }),
          el('div', { class: 'emperor-reign', text: emp.reign + ' · 在位' + emp.years + '年' }),
          el('div', { class: 'emperor-note', text: emp.note })
        ])
      ]);
      list.appendChild(item);
    });
  }

  function closeEmperorPanel() {
    emperorPanelOpen = false;
    $('#emperor-panel')?.remove();
  }

  function getCurrentDynasty() {
    // 从时间轴或标题获取当前朝代
    const dynastyBtn = $('.dynasty-btn.active, .timeline-dynasty.active, [class*="dynasty"][class*="active"]');
    if (dynastyBtn) {
      const text = dynastyBtn.textContent.trim();
      for (const d of Object.keys(DYNASTY_EMPERORS)) {
        if (text.includes(d) || d.includes(text.substring(0, 2))) return d;
      }
    }
    // 从年份推断
    const year = getCurrentYear();
    if (year !== null) {
      if (year < -221) return '战国';
      if (year < -202) return '秦';
      if (year < 25) return '西汉';
      if (year < 220) return '东汉';
      if (year < 280) return '三国';
      if (year < 316) return '西晋';
      if (year < 420) return '东晋';
      if (year < 581) return '南北朝';
      if (year < 618) return '隋';
      if (year < 907) return '唐';
      if (year < 960) return '五代十国';
      if (year < 1127) return '北宋';
      if (year < 1279) return '南宋';
      if (year < 1368) return '元';
      if (year < 1644) return '明';
      if (year < 1912) return '清';
    }
    return '西汉';
  }

  // ========== 功能3：学习笔记导出 ==========
  function exportNotes() {
    const dynasty = getCurrentDynasty();
    const year = getCurrentYear();
    const emperors = DYNASTY_EMPERORS[dynasty] || [];

    // 获取当前朝代的事件
    const events = KEY_EVENTS.filter(e => {
      if (dynasty === '战国') return e.year >= -475 && e.year < -221;
      if (dynasty === '秦') return e.year >= -221 && e.year < -202;
      if (dynasty === '西汉') return e.year >= -202 && e.year < 25;
      if (dynasty === '东汉') return e.year >= 25 && e.year < 220;
      if (dynasty === '三国') return e.year >= 220 && e.year < 280;
      if (dynasty === '西晋') return e.year >= 280 && e.year < 316;
      if (dynasty === '东晋') return e.year >= 317 && e.year < 420;
      if (dynasty === '南北朝') return e.year >= 420 && e.year < 581;
      if (dynasty === '隋') return e.year >= 581 && e.year < 618;
      if (dynasty === '唐') return e.year >= 618 && e.year < 907;
      if (dynasty === '五代十国') return e.year >= 907 && e.year < 960;
      if (dynasty === '北宋') return e.year >= 960 && e.year < 1127;
      if (dynasty === '南宋') return e.year >= 1127 && e.year < 1279;
      if (dynasty === '元') return e.year >= 1279 && e.year < 1368;
      if (dynasty === '明') return e.year >= 1368 && e.year < 1644;
      if (dynasty === '清') return e.year >= 1644 && e.year < 1912;
      return false;
    });

    // 生成笔记内容
    let notes = `📜 ${dynasty}学习笔记\n`;
    notes += `生成时间：${new Date().toLocaleDateString()}\n`;
    notes += `当前年份：${year ? formatYear(year) + '年' : '未知'}\n`;
    notes += `${'='.repeat(30)}\n\n`;

    notes += `👑 主要帝王（${emperors.length}位）\n`;
    notes += `${'-'.repeat(20)}\n`;
    emperors.forEach((e, i) => {
      notes += `${i + 1}. ${e.name}\n`;
      notes += `   在位：${e.reign}（${e.years}年）\n`;
      notes += `   事迹：${e.note}\n\n`;
    });

    notes += `⚔️ 重要事件（${events.length}件）\n`;
    notes += `${'-'.repeat(20)}\n`;
    events.forEach(e => {
      notes += `• ${formatYear(e.year)}年 ${e.title}\n`;
      notes += `  ${e.desc}\n`;
      notes += `  地点：${e.place}\n\n`;
    });

    notes += `${'='.repeat(30)}\n`;
    notes += `笔记由「华夏文明」自动生成\n`;

    // 显示导出面板
    showExportPanel(notes, dynasty);
  }

  function showExportPanel(notes, dynasty) {
    const panel = el('div', { id: 'export-panel', class: 'export-panel' }, [
      el('div', { class: 'export-header' }, [
        el('span', { text: dynasty + ' · 学习笔记' }),
        el('button', { class: 'panel-close', text: '✕', onclick: 'this.closest(\'.export-panel\').remove()' })
      ]),
      el('div', { class: 'export-body' }, [
        el('textarea', { class: 'export-textarea', readonly: 'readonly', text: notes }),
        el('div', { class: 'export-actions' }, [
          el('button', { class: 'export-btn copy', text: '📋 复制笔记', onclick: 'window.__jiangshan_phase2.copyNotes()' }),
          el('button', { class: 'export-btn download', text: '💾 下载TXT', onclick: 'window.__jiangshan_phase2.downloadNotes()' })
        ])
      ])
    ]);
    document.body.appendChild(panel);
  }

  function copyNotes() {
    const textarea = $('.export-textarea');
    if (textarea) {
      textarea.select();
      document.execCommand('copy');
      showToast('笔记已复制到剪贴板');
    }
  }

  function downloadNotes() {
    const textarea = $('.export-textarea');
    if (!textarea) return;
    const dynasty = getCurrentDynasty();
    const blob = new Blob([textarea.value], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = dynasty + '学习笔记.txt';
    a.click();
    URL.revokeObjectURL(url);
    showToast('笔记已下载');
  }

  // ========== 功能4：语音朗读 ==========
  let isSpeaking = false;
  let currentUtterance = null;

  function toggleSpeech() {
    if (isSpeaking) {
      stopSpeech();
    } else {
      startSpeech();
    }
  }

  function startSpeech() {
    // 获取侧栏史志内容
    const chronicle = $('#chronicle-pane, .chronicle-pane, .sidebar-content, [class*="chronicle"]');
    let text = '';

    if (chronicle) {
      text = chronicle.textContent.trim();
    }

    if (!text || text.length < 10) {
      // 尝试获取当前朝代详情
      const dynasty = getCurrentDynasty();
      const emperors = DYNASTY_EMPERORS[dynasty] || [];
      if (emperors.length > 0) {
        text = `现在是${dynasty}时期。${emperors.slice(0, 3).map(e => e.name + '，' + e.note).join('。')}。`;
      } else {
        text = '当前是' + dynasty + '时期。';
      }
    }

    // 截断过长文本
    if (text.length > 500) text = text.substring(0, 500) + '...';

    if (!('speechSynthesis' in window)) {
      showToast('您的浏览器不支持语音朗读');
      return;
    }

    window.speechSynthesis.cancel();
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = 'zh-CN';
    currentUtterance.rate = 0.9;
    currentUtterance.pitch = 1.0;

    currentUtterance.onend = () => {
      isSpeaking = false;
      updateSpeechButton();
    };

    currentUtterance.onerror = () => {
      isSpeaking = false;
      updateSpeechButton();
    };

    window.speechSynthesis.speak(currentUtterance);
    isSpeaking = true;
    updateSpeechButton();
    showToast('开始朗读...');
  }

  function stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    isSpeaking = false;
    updateSpeechButton();
  }

  function updateSpeechButton() {
    const btn = $('#speech-btn');
    if (btn) {
      btn.textContent = isSpeaking ? '🔇 停止朗读' : '🔊 朗读';
      btn.classList.toggle('active', isSpeaking);
    }
  }

  // ========== Toast 提示 ==========
  function showToast(msg) {
    $('.toast-msg')?.remove();
    const toast = el('div', { class: 'toast-msg', text: msg });
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 50);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  }

  // ========== 注入工具栏按钮 ==========
  function injectToolbar() {
    const toolbar = $('.learning-toolbar');
    if (!toolbar) return;

    const btns = [
      { id: 'event-playback-btn', class: 'action-btn subtle learning-btn', title: '事件讲解', text: '▶️ 讲解', onclick: 'window.__jiangshan_phase2.toggleEventPlayback()' },
      { id: 'emperor-btn', class: 'action-btn subtle learning-btn', title: '帝王世系', text: '👑 帝王', onclick: 'window.__jiangshan_phase2.toggleEmperorPanel()' },
      { id: 'export-btn', class: 'action-btn subtle learning-btn', title: '导出笔记', text: '📝 笔记', onclick: 'window.__jiangshan_phase2.exportNotes()' },
      { id: 'speech-btn', class: 'action-btn subtle learning-btn', title: '语音朗读', text: '🔊 朗读', onclick: 'window.__jiangshan_phase2.toggleSpeech()' }
    ];

    btns.forEach(b => {
      const btn = el('button', { id: b.id, class: b.class, title: b.title, onclick: b.onclick }, [el('span', { text: b.text })]);
      toolbar.appendChild(btn);
    });
  }

  // ========== 暴露全局 ==========
  window.__jiangshan_phase2 = {
    toggleEventPlayback,
    toggleEventVoice,
    isVoiceEnabled,
    speakEvent,
    toggleEmperorPanel,
    showEmperors,
    closeEmperorPanel,
    exportNotes,
    copyNotes,
    downloadNotes,
    toggleSpeech
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
