/**
 * 华夏文明 - 第一期学习增强功能
 * 1. 古今地名直接标注
 * 2. 朝代对比模式（左右分屏）
 * 3. 测验模式扩展（3种题型）
 * 4. 历史名词悬浮解释
 */
(function () {
  'use strict';

  // ========== 古今地名字典 ==========
  const PLACE_MAP = {
    // 都城/大城市
    '咸阳': '陕西咸阳', '长安': '陕西西安', '大兴': '陕西西安',
    '洛阳': '河南洛阳', '大梁': '河南开封', '汴梁': '河南开封', '东京': '河南开封', '开封府': '河南开封',
    '建康': '江苏南京', '金陵': '江苏南京', '建业': '江苏南京', '石头城': '江苏南京', '应天府': '江苏南京',
    '临安': '浙江杭州', '杭州': '浙江杭州', '临安府': '浙江杭州',
    '成都': '四川成都', '益州': '四川成都', '蜀郡': '四川成都',
    '郢都': '湖北荆州', '江陵': '湖北荆州', '荆州': '湖北荆州',
    '姑苏': '江苏苏州', '吴郡': '江苏苏州', '苏州': '江苏苏州', '吴': '江苏苏州',
    '扬州': '江苏扬州', '广陵': '江苏扬州',
    '广州': '广东广州', '番禺': '广东广州', '南海': '广东广州',
    '福州': '福建福州', '闽州': '福建福州', '闽中': '福建福州', '东冶': '福建福州',
    '豫章': '江西南昌', '洪州': '江西南昌', '南昌': '江西南昌',
    '江夏': '湖北武汉', '鄂州': '湖北武汉', '武汉': '湖北武汉',
    '幽州': '北京', '燕京': '北京', '大都': '北京', '京师': '北京', '顺天府': '北京', '蓟城': '北京',
    '邯郸': '河北邯郸', '临淄': '山东淄博', '寿春': '安徽寿县', '新郑': '河南新郑',
    '会稽': '浙江绍兴', '山阴': '浙江绍兴', '绍兴': '浙江绍兴',
    '凉州': '甘肃武威', '姑臧': '甘肃武威', '武威': '甘肃武威',
    '并州': '山西太原', '晋阳': '山西太原', '太原': '山西太原',
    '青州': '山东青州', '徐州': '江苏徐州', '彭城': '江苏徐州',
    '襄阳': '湖北襄阳', '襄樊': '湖北襄阳',
    '敦煌': '甘肃敦煌', '酒泉': '甘肃酒泉', '张掖': '甘肃张掖',
    '邺城': '河北临漳', '许昌': '河南许昌', '谯': '安徽亳州',
    '南阳': '河南南阳', '宛': '河南南阳', '汉中': '陕西汉中',
    '巴郡': '重庆', '江州': '重庆', '重庆': '重庆',
    '桂林': '广西桂林', '辽东': '辽宁辽阳', '襄平': '辽宁辽阳',
    '渔阳': '北京密云', '上谷': '河北怀来', '右北平': '内蒙古宁城',
    '雁门': '山西代县', '云中': '内蒙古托克托', '九原': '内蒙古包头',
    '北地': '甘肃庆阳', '陇西': '甘肃临洮', '上郡': '陕西榆林',
    '河东': '山西夏县', '上党': '山西长子', '代郡': '河北蔚县',
    '颍川': '河南禹州', '阳翟': '河南禹州', '三川': '河南洛阳',
    '东郡': '河南濮阳', '濮阳': '河南濮阳', '砀郡': '河南商丘', '睢阳': '河南商丘',
    '齐郡': '山东淄博', '琅琊': '山东临沂', '泗水': '江苏沛县', '沛': '江苏沛县',
    '东海': '山东郯城', '郯': '山东郯城', '九江': '安徽寿县', '庐江': '安徽庐江',
    '衡山': '湖北黄冈', '黔中': '湖南沅陵', '长沙': '湖南长沙',
    '象郡': '广西崇左', '辽西': '辽宁义县', '沮阳': '河北怀来',
    '平刚': '内蒙古宁城', '善无': '山西右玉', '肤施': '陕西榆林',
    '安邑': '山西夏县', '长子': '山西长子', '代县': '河北蔚县',
    '汝南': '河南汝南', '灵寿': '河北灵寿', '阳翟': '河南禹州',
    '碎叶': '吉尔吉斯斯坦托克马克', '龟兹': '新疆库车', '于阗': '新疆和田',
    '楼兰': '新疆若羌', '高昌': '新疆吐鲁番', '交河': '新疆吐鲁番',
    '疏勒': '新疆喀什', '焉耆': '新疆焉耆', '康居': '哈萨克斯坦南部',
    '大宛': '乌兹别克斯坦费尔干纳', '大月氏': '阿富汗北部', '大夏': '阿富汗北部',
    '安息': '伊朗', '条支': '伊拉克', '身毒': '印度', '天竺': '印度',
    '狮子国': '斯里兰卡', '师子国': '斯里兰卡',
    // 名关
    '函谷关': '河南灵宝', '潼关': '陕西潼关', '武关': '陕西丹凤',
    '大散关': '陕西宝鸡', '萧关': '宁夏固原', '虎牢关': '河南荥阳',
    '剑门关': '四川剑阁', '阳平关': '陕西勉县', '雁门关': '山西代县',
    '居庸关': '北京昌平', '紫荆关': '河北易县', '娘子关': '山西平定',
    '山海关': '河北秦皇岛', '古北口': '北京密云', '玉门关': '甘肃敦煌',
    '阳关': '甘肃敦煌', '嘉峪关': '甘肃嘉峪关', '武胜关': '河南信阳',
    '仙霞关': '浙江江山', '梅关': '广东南雄', '井陉': '河北井陉',
    '函谷': '河南灵宝', '剑阁': '四川剑阁'
  };

  // ========== 历史名词解释词典 ==========
  const TERM_MAP = {
    '刺史': '刺史：古代监察官，相当于现在的省纪委书记+监察专员，负责巡视地方、弹劾贪官。',
    '节度使': '节度使：唐代地方军政长官，掌管一区的军、民、财政，权力很大，类似"军区司令+省长"。',
    '西域都护府': '西域都护府：汉朝设在西域的最高军政机构，管辖今新疆及中亚部分地区，"都护"意为"总监护"。',
    '安西四镇': '安西四镇：唐代安西都护府下辖的四个军事重镇——龟兹、焉耆、于阗、疏勒，是控制西域的支柱。',
    '郡县制': '郡县制：秦朝创立的地方行政制度，全国分为郡、县两级，官员由中央任免，不能世袭，加强了中央集权。',
    '分封制': '分封制：周朝制度，天子把土地和人民分给诸侯，诸侯世袭统治，容易导致地方割据。',
    '郡国并行': '郡国并行：西汉初期同时实行郡县制和分封制，既有中央直辖的郡，也有诸侯王的封国。',
    '九品中正制': '九品中正制：魏晋南北朝的选官制度，由中正官按家世、品德、才能把人分为九等，后来变成"上品无寒门，下品无势族"。',
    '科举制': '科举制：隋唐创立的考试选官制度，读书人通过考试做官，打破了门阀垄断，一直沿用到清朝。',
    '行省制': '行省制：元朝创立的地方行政制度，全国设10个行省，是现在省制的开端。',
    '道路制': '道路制：唐宋的地方监察区，"道"（唐）和"路"（宋）类似现在的省，但最初是监察区而非行政区。',
    '都督府': '都督府：唐代在边疆少数民族地区设的羁縻机构，由当地首领任都督，名义上隶属唐朝，实际自治。',
    '都护府': '都护府：唐朝在边疆设的军政机构，如安西、北庭、安北、安东、安南，负责管辖边疆和邻国。',
    '宣政院': '宣政院：元朝设立的管理全国佛教和西藏地区事务的中央机构，标志着西藏正式纳入中国版图。',
    '澎湖巡检司': '澎湖巡检司：元朝在澎湖设立的机构，管辖澎湖和台湾，是中国政府在台湾地区正式设立行政机构的开始。',
    '奴儿干都司': '奴儿干都司：明朝在东北设立的军政机构，管辖黑龙江、乌苏里江流域，包括库页岛。',
    '哈密卫': '哈密卫：明朝在新疆哈密设立的军事卫所，是明朝西北方向的前哨。',
    '交趾布政司': '交趾布政司：明朝在越南北部设立的行政机构，存在约20年，后越南恢复独立。',
    '燕云十六州': '燕云十六州：五代时石敬瑭割让给契丹的十六个州，包括今北京、天津、河北北部、山西北部，是中原的北方屏障，宋朝一直想收回但没成功。',
    '河西走廊': '河西走廊：甘肃西北部的狭长通道，因在黄河以西得名，是古代丝绸之路的必经之路，连接中原和西域。',
    '丝绸之路': '丝绸之路：古代从长安出发，经河西走廊、西域，通往中亚、西亚、欧洲的商路，因主要运输丝绸得名。',
    '大运河': '大运河：隋唐至明清的南北水运大动脉，北起北京，南至杭州，沟通海河、黄河、淮河、长江、钱塘江五大水系。',
    '长城': '长城：古代军事防御工程，战国时各国开始修，秦朝连接成万里长城，明朝大规模重修，是农耕民族防御游牧民族的屏障。',
    '三家分晋': '三家分晋：公元前403年，晋国被韩、赵、魏三家大夫瓜分，周天子正式承认，标志着战国时代的开始，也是《资治通鉴》的开篇。',
    '田氏代齐': '田氏代齐：公元前386年，齐国大夫田和取代姜姓齐国国君，周天子正式承认，战国七雄格局最终确立。',
    '商鞅变法': '商鞅变法：公元前356年起，秦孝公任用商鞅变法，废井田、奖耕战、行郡县，使秦国迅速崛起，为统一六国奠定基础。',
    '长平之战': '长平之战：公元前260年，秦赵在长平决战，秦白起大破赵括，坑杀赵卒40万，是战国时期规模最大的战役。',
    '焚书坑儒': '焚书坑儒：秦始皇为加强思想控制，焚烧民间藏书、坑杀非议朝政的方士和儒生，是文化史上的浩劫。',
    '楚汉之争': '楚汉之争：秦朝灭亡后，项羽（西楚霸王）和刘邦（汉王）争夺天下的战争，最终刘邦获胜建立汉朝。',
    '文景之治': '文景之治：西汉文帝、景帝时期，轻徭薄赋、与民休息，社会经济恢复发展，是中国第一个治世。',
    '罢黜百家独尊儒术': '罢黜百家独尊儒术：汉武帝采纳董仲舒建议，把儒家思想定为正统，其他学派受到排斥，影响中国两千年。',
    '王莽篡汉': '王莽篡汉：公元8年，西汉外戚王莽代汉建新，推行复古改革失败，引发绿林赤眉起义，23年新朝灭亡。',
    '光武中兴': '光武中兴：东汉光武帝刘秀重建汉朝，定都洛阳，整顿吏治、休养生息，出现了社会安定的局面。',
    '黄巾起义': '黄巾起义：184年，张角领导的农民起义，因头裹黄巾得名，沉重打击了东汉统治，导致群雄割据。',
    '官渡之战': '官渡之战：200年，曹操在官渡以少胜多大败袁绍，奠定了统一北方的基础。',
    '赤壁之战': '赤壁之战：208年，孙刘联军在赤壁火攻大破曹操，奠定了三国鼎立的格局。',
    '夷陵之战': '夷陵之战：222年，东吴陆逊在夷陵火烧连营大破刘备，蜀汉元气大伤，三国格局最终稳定。',
    '八王之乱': '八王之乱：西晋皇族为争夺中央政权爆发的内乱，历时16年，导致西晋衰落，五胡趁机起兵。',
    '永嘉之乱': '永嘉之乱：311年，匈奴汉赵攻破洛阳，俘虏晋怀帝，西晋灭亡，中原士族大规模南迁（衣冠南渡）。',
    '淝水之战': '淝水之战：383年，东晋谢玄北府兵在淝水以少胜多大败前秦苻坚，前秦瓦解，北方再度分裂。',
    '孝文帝改革': '孝文帝改革：北魏孝文帝推行汉化改革，迁都洛阳、改汉姓、穿汉服、说汉语、通婚姻，促进了民族融合。',
    '玄武门之变': '玄武门之变：626年，李世民在玄武门杀死太子李建成和齐王李元吉，随后即位为唐太宗，开启贞观之治。',
    '贞观之治': '贞观之治：唐太宗李世民在位期间（627-649），政治清明、经济发展、社会安定，是中国历史上著名的治世。',
    '开元盛世': '开元盛世：唐玄宗开元年间（713-741），唐朝国力达到鼎盛，经济繁荣、文化昌盛，是中国封建社会的高峰。',
    '安史之乱': '安史之乱：755-763年，安禄山、史思明发动的叛乱，是唐朝由盛转衰的转折点，此后藩镇割据、宦官专权。',
    '藩镇割据': '藩镇割据：安史之乱后，地方节度使拥兵自重，不听中央号令，形成割据局面，持续到唐朝灭亡。',
    '陈桥兵变': '陈桥兵变：960年，赵匡胤在陈桥驿被部下黄袍加身，取代后周建立宋朝，史称北宋。',
    '杯酒释兵权': '杯酒释兵权：宋太祖赵匡胤通过酒宴方式，委婉地解除了将领的兵权，加强了中央集权，确立了重文轻武国策。',
    '澶渊之盟': '澶渊之盟：1004年，北宋与辽在澶州订立和约，宋每年给辽岁币，双方维持了百余年和平。',
    '靖康之变': '靖康之变：1127年，金军攻破北宋都城开封，俘虏徽钦二帝，北宋灭亡，宋室南渡建立南宋。',
    '绍兴和议': '绍兴和议：1141年，南宋与金订立和约，以淮河-大散关为界，宋向金称臣纳贡，岳飞随后被杀害。',
    '崖山海战': '崖山海战：1279年，元军在崖山消灭南宋最后抵抗，陆秀夫背幼帝投海，南宋灭亡，中国首次被北方游牧民族完全统一。',
    '行省制度': '行省制度：元朝创立的地方行政制度，中央设中书省，地方设行中书省（简称行省），是现代省制的起源。',
    '靖难之役': '靖难之役：1399-1402年，燕王朱棣以"清君侧"为名起兵，攻破南京，夺取侄子建文帝的皇位，即明成祖。',
    '土木堡之变': '土木堡之变：1449年，明英宗亲征瓦剌，在土木堡被俘，明朝由盛转衰，此后收缩防线至长城。',
    '萨尔浒之战': '萨尔浒之战：1619年，后金努尔哈赤在萨尔浒大败明军，明朝在东北的统治瓦解，后金崛起。',
    '三藩之乱': '三藩之乱：1673-1681年，平西王吴三桂、平南王尚可喜、靖南王耿精忠发动叛乱，被康熙帝平定。',
    '雅克萨之战': '雅克萨之战：1685-1686年，清军两次进攻沙俄侵占的雅克萨，最终签订《尼布楚条约》，划定中俄东段边界。',
    '尼布楚条约': '尼布楚条约：1689年中俄签订的第一个边界条约，从法律上肯定了黑龙江和乌苏里江流域包括库页岛都是中国领土。',
    '鸦片战争': '鸦片战争：1840-1842年，英国以禁烟为借口发动的侵略战争，中国战败签订《南京条约》，是中国近代史的开端。',
    '南京条约': '南京条约：1842年中英签订，中国割让香港岛、赔款2100万银元、开放五口通商，是中国近代第一个不平等条约。',
    '太平天国': '太平天国：1851-1864年，洪秀全领导的农民起义，定都天京（南京），是中国历史上规模最大的农民战争。',
    '洋务运动': '洋务运动：19世纪60-90年代，清朝洋务派以"自强""求富"为口号，学习西方技术，创办近代工业和海军。',
    '甲午战争': '甲午战争：1894-1895年，中日战争，中国战败签订《马关条约》，割让台湾、赔款2亿两白银，民族危机加深。',
    '马关条约': '马关条约：1895年中日签订，中国割让辽东半岛（后赎回）、台湾、澎湖列岛，赔款2亿两白银，允许日本在华设厂。',
    '戊戌变法': '戊戌变法：1898年，光绪帝采纳康有为、梁启超建议推行变法，仅103天就被慈禧太后镇压，又称"百日维新"。',
    '辛亥革命': '辛亥革命：1911年（辛亥年），武昌起义爆发，各省响应，推翻了清朝统治，结束了两千多年的君主专制。',
    '五四运动': '五四运动：1919年，因巴黎和会中国外交失败，北京学生发起的爱国运动，是中国新民主主义革命的开端。',
    '九一八事变': '九一八事变：1931年9月18日，日本关东军炸毁南满铁路嫁祸中国军队，趁机占领东北，是日本侵华的开始。',
    '七七事变': '七七事变：1937年7月7日，日军在北平卢沟桥挑起事端，中国军队奋起抵抗，全民族抗战开始。',
    '抗日战争': '抗日战争：1931-1945年，中国人民抵抗日本侵略的战争，1945年日本投降，台湾光复，是近代以来中国第一次完全胜利的民族解放战争。',
    '解放战争': '解放战争：1946-1949年，中国共产党领导人民推翻国民党统治的战争，1949年建立中华人民共和国。'
  };

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

  // ========== 功能1：古今地名标注 ==========
  let placeLabelObserver = null;

  function addModernPlaceLabels() {
    const svg = document.querySelector('svg');
    if (!svg) return;

    // 清除旧的标注
    $$('.modern-place-label').forEach(e => e.remove());

    // 查找城市标签
    const cityLabels = $$('svg text.name');
    for (const label of cityLabels) {
      const name = label.textContent.trim();
      const modern = PLACE_MAP[name];
      if (!modern) continue;

      // 获取标签位置
      const bbox = label.getBBox();
      const transform = label.getAttribute('transform') || '';

      // 创建今地名标注（小字）
      const modernLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      modernLabel.setAttribute('class', 'modern-place-label');
      modernLabel.setAttribute('x', parseFloat(label.getAttribute('x') || bbox.x));
      modernLabel.setAttribute('y', parseFloat(label.getAttribute('y') || bbox.y) + 12);
      modernLabel.setAttribute('text-anchor', label.getAttribute('text-anchor') || 'middle');
      modernLabel.textContent = '（' + modern + '）';

      // 继承 transform
      if (transform) modernLabel.setAttribute('transform', transform);

      label.parentNode.insertBefore(modernLabel, label.nextSibling);
    }
  }

  function initPlaceLabels() {
    // 延迟执行，等地图渲染完
    setTimeout(addModernPlaceLabels, 2000);

    // 监听地图重新渲染
    if (!placeLabelObserver) {
      placeLabelObserver = new MutationObserver(() => {
        clearTimeout(window._placeLabelTimer);
        window._placeLabelTimer = setTimeout(addModernPlaceLabels, 800);
      });
      const svg = document.querySelector('svg');
      if (svg) placeLabelObserver.observe(svg, { childList: true, subtree: true });
    }
  }

  // ========== 功能2：朝代对比模式 ==========
  let comparePanelOpen = false;

  function toggleCompareMode() {
    if (comparePanelOpen) {
      closeCompareMode();
      return;
    }
    openCompareMode();
  }

  function openCompareMode() {
    comparePanelOpen = true;

    // 创建对比面板
    const panel = el('div', { id: 'compare-panel', class: 'compare-panel' }, [
      el('div', { class: 'compare-header' }, [
        el('span', { text: '朝代对比模式' }),
        el('button', { class: 'panel-close', text: '✕', onclick: 'window.__jiangshan_phase1.closeCompareMode()' })
      ]),
      el('div', { class: 'compare-body' }, [
        el('div', { class: 'compare-select-row' }, [
          el('div', { class: 'compare-select-group' }, [
            el('label', { text: '朝代 A' }),
            createDynastySelect('compare-dynasty-a', -403)
          ]),
          el('div', { class: 'compare-select-group' }, [
            el('label', { text: '朝代 B' }),
            createDynastySelect('compare-dynasty-b', 700)
          ])
        ]),
        el('button', { class: 'compare-start-btn', text: '开始对比', onclick: 'window.__jiangshan_phase1.startCompare()' }),
        el('div', { class: 'compare-hint', text: '选择两个朝代，左右分屏同时显示疆域版图，直观对比天下分合。' })
      ])
    ]);
    document.body.appendChild(panel);
  }

  function createDynastySelect(id, defaultYear) {
    const dynasties = [
      { name: '战国', year: -403 }, { name: '秦', year: -214 },
      { name: '西汉', year: -100 }, { name: '东汉', year: 100 },
      { name: '三国', year: 250 }, { name: '西晋', year: 300 },
      { name: '东晋十六国', year: 383 }, { name: '南北朝', year: 500 },
      { name: '隋', year: 605 }, { name: '唐', year: 700 },
      { name: '五代十国', year: 950 }, { name: '北宋', year: 1100 },
      { name: '南宋', year: 1200 }, { name: '元', year: 1300 },
      { name: '明', year: 1450 }, { name: '清', year: 1800 },
      { name: '中华民国', year: 1936 }, { name: '现代', year: 2026 }
    ];
    const select = el('select', { id, class: 'dynasty-select' });
    for (const d of dynasties) {
      const opt = el('option', { value: d.year, text: d.name });
      if (d.year === defaultYear) opt.selected = true;
      select.appendChild(opt);
    }
    return select;
  }

  function startCompare() {
    const yearA = parseInt($('#compare-dynasty-a').value);
    const yearB = parseInt($('#compare-dynasty-b').value);

    // 关闭设置面板
    closeCompareMode();

    // 创建分屏视图
    const container = el('div', { id: 'compare-view', class: 'compare-view' }, [
      el('div', { class: 'compare-close-bar' }, [
        el('button', { text: '✕ 退出对比', class: 'compare-exit-btn', onclick: 'window.__jiangshan_phase1.exitCompare()' })
      ]),
      el('div', { class: 'compare-screens' }, [
        el('div', { class: 'compare-screen compare-screen-a' }, [
          el('div', { class: 'compare-screen-label', text: formatYear(yearA) + '年' }),
          el('iframe', { src: './?year=' + yearA + '&compare=1', class: 'compare-iframe', sandbox: 'allow-scripts allow-same-origin' })
        ]),
        el('div', { class: 'compare-divider' }),
        el('div', { class: 'compare-screen compare-screen-b' }, [
          el('div', { class: 'compare-screen-label', text: formatYear(yearB) + '年' }),
          el('iframe', { src: './?year=' + yearB + '&compare=1', class: 'compare-iframe', sandbox: 'allow-scripts allow-same-origin' })
        ])
      ])
    ]);
    document.body.appendChild(container);
    document.body.style.overflow = 'hidden';
  }

  function closeCompareMode() {
    comparePanelOpen = false;
    const panel = $('#compare-panel');
    if (panel) panel.remove();
  }

  function exitCompare() {
    const view = $('#compare-view');
    if (view) view.remove();
    document.body.style.overflow = '';
  }

  function formatYear(y) {
    return y < 0 ? '前' + (-y) : y;
  }

  // ========== 功能3：测验模式扩展 ==========
  let quizPanelOpen = false;

  function toggleQuizPanel() {
    if (quizPanelOpen) {
      closeQuizPanel();
      return;
    }
    openQuizPanel();
  }

  function openQuizPanel() {
    quizPanelOpen = true;
    const panel = el('div', { id: 'quiz-panel', class: 'quiz-panel' }, [
      el('div', { class: 'quiz-header' }, [
        el('span', { text: '历史小测验' }),
        el('button', { class: 'panel-close', text: '✕', onclick: 'window.__jiangshan_phase1.closeQuizPanel()' })
      ]),
      el('div', { class: 'quiz-body' }, [
        el('div', { class: 'quiz-score', id: 'quiz-score', text: '得分：0 / 0' }),
        el('div', { class: 'quiz-type-selector' }, [
          el('button', { class: 'quiz-type-btn active', 'data-type': 'place', text: '🏯 地名猜猜看', onclick: 'window.__jiangshan_phase1.startQuiz("place")' }),
          el('button', { class: 'quiz-type-btn', 'data-type': 'dynasty', text: '📜 朝代排序', onclick: 'window.__jiangshan_phase1.startQuiz("dynasty")' }),
          el('button', { class: 'quiz-type-btn', 'data-type': 'event', text: '⚔️ 事件年份', onclick: 'window.__jiangshan_phase1.startQuiz("event")' })
        ]),
        el('div', { id: 'quiz-question-area', class: 'quiz-question-area' }, [
          el('div', { class: 'quiz-empty-hint', text: '选择一种题型开始挑战！答对后地图会自动定位讲解。' })
        ])
      ])
    ]);
    document.body.appendChild(panel);
  }

  function closeQuizPanel() {
    quizPanelOpen = false;
    const panel = $('#quiz-panel');
    if (panel) panel.remove();
  }

  let quizScore = 0, quizTotal = 0;

  function startQuiz(type) {
    // 更新按钮状态
    $$('.quiz-type-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.quiz-type-btn[data-type="' + type + '"]').classList.add('active');

    const area = $('#quiz-question-area');
    if (!area) return;

    if (type === 'place') {
      // 地名猜猜看：给今地名，猜古地名
      const items = Object.entries(PLACE_MAP).filter(([k, v]) => !k.includes('关') && k.length <= 4);
      const item = items[Math.floor(Math.random() * items.length)];
      const [ancient, modern] = item;

      // 生成4个选项（1对3错）
      const options = [ancient];
      const allAncient = items.map(([k]) => k);
      while (options.length < 4) {
        const rand = allAncient[Math.floor(Math.random() * allAncient.length)];
        if (!options.includes(rand)) options.push(rand);
      }
      options.sort(() => Math.random() - 0.5);

      renderQuestion(area, '这个地方在古代叫什么？', '今：' + modern, options, ancient, () => {
        if (window.atlasAPI) window.atlasAPI.locate({ year: -200, place: ancient });
      });
    } else if (type === 'dynasty') {
      // 朝代排序：给4个朝代，按时间先后排序
      const dynasties = [
        { name: '战国', year: -403 }, { name: '秦', year: -221 },
        { name: '西汉', year: -202 }, { name: '东汉', year: 25 },
        { name: '三国', year: 220 }, { name: '西晋', year: 280 },
        { name: '东晋', year: 317 }, { name: '南北朝', year: 420 },
        { name: '隋', year: 581 }, { name: '唐', year: 618 },
        { name: '五代', year: 907 }, { name: '北宋', year: 960 },
        { name: '南宋', year: 1127 }, { name: '元', year: 1279 },
        { name: '明', year: 1368 }, { name: '清', year: 1644 }
      ];
      // 随机选4个
      const shuffled = [...dynasties].sort(() => Math.random() - 0.5).slice(0, 4);
      const correctOrder = [...shuffled].sort((a, b) => a.year - b.year).map(d => d.name);
      const options = shuffled.map(d => d.name);

      renderOrderQuestion(area, '请按时间先后排序（从早到晚）：', options, correctOrder, () => {
        if (window.atlasAPI) window.atlasAPI.locate({ year: correctOrder[0] ? dynasties.find(d => d.name === correctOrder[0])?.year || -403 : -403 });
      });
    } else if (type === 'event') {
      // 事件年份：给事件，选年份
      const events = [
        { name: '秦灭六国，天下一统', year: -221 },
        { name: '张骞出使西域', year: -138 },
        { name: '赤壁之战', year: 208 },
        { name: '淝水之战', year: 383 },
        { name: '隋朝统一全国', year: 589 },
        { name: '玄武门之变', year: 626 },
        { name: '安史之乱爆发', year: 755 },
        { name: '陈桥兵变，北宋建立', year: 960 },
        { name: '靖康之变，北宋灭亡', year: 1127 },
        { name: '崖山海战，南宋灭亡', year: 1279 },
        { name: '明朝建立', year: 1368 },
        { name: '清军入关', year: 1644 },
        { name: '鸦片战争', year: 1840 },
        { name: '辛亥革命', year: 1911 },
        { name: '中华人民共和国成立', year: 1949 }
      ];
      const event = events[Math.floor(Math.random() * events.length)];
      // 生成4个年份选项
      const options = [event.year];
      while (options.length < 4) {
        const offset = (Math.floor(Math.random() * 200) - 100) * (Math.random() > 0.5 ? 1 : -1);
        const y = event.year + offset;
        if (!options.includes(y) && y > -500 && y < 2000) options.push(y);
      }
      options.sort((a, b) => a - b);

      renderQuestion(area, '这个历史事件发生在哪一年？', event.name, options.map(y => formatYear(y) + '年'), event.year, () => {
        if (window.atlasAPI) window.atlasAPI.locate({ year: event.year });
      }, true);
    }
  }

  function renderQuestion(area, question, hint, options, correct, onCorrect, isYear) {
    quizTotal++;
    area.innerHTML = '';
    area.appendChild(el('div', { class: 'quiz-question', text: question }));
    area.appendChild(el('div', { class: 'quiz-hint', text: hint }));

    const optsDiv = el('div', { class: 'quiz-options' });
    for (const opt of options) {
      const btn = el('button', { class: 'quiz-option-btn', text: opt });
      btn.onclick = function () {
        const isCorrect = isYear ? (parseInt(opt) === correct) : (opt === correct);
        if (isCorrect) {
          quizScore++;
          btn.classList.add('correct');
          area.appendChild(el('div', { class: 'quiz-feedback correct', text: '✅ 回答正确！地图正在定位...' }));
          setTimeout(onCorrect, 500);
        } else {
          btn.classList.add('wrong');
          area.appendChild(el('div', { class: 'quiz-feedback wrong', text: '❌ 答错了，正确答案是：' + (isYear ? formatYear(correct) + '年' : correct) }));
        }
        // 禁用所有按钮
        $$('.quiz-option-btn').forEach(b => b.disabled = true);
        updateQuizScore();
        // 下一题按钮
        setTimeout(() => {
          if (!area.querySelector('.quiz-next-btn')) {
            area.appendChild(el('button', { class: 'quiz-next-btn', text: '下一题 →', onclick: 'window.__jiangshan_phase1.nextQuiz()' }));
          }
        }, 300);
      };
      optsDiv.appendChild(btn);
    }
    area.appendChild(optsDiv);
  }

  function renderOrderQuestion(area, question, options, correctOrder, onCorrect) {
    quizTotal++;
    let userOrder = [];

    area.innerHTML = '';
    area.appendChild(el('div', { class: 'quiz-question', text: question }));

    const optsDiv = el('div', { class: 'quiz-options' });
    const selectedDiv = el('div', { class: 'quiz-selected-order', id: 'quiz-selected' });

    function renderOptions() {
      optsDiv.innerHTML = '';
      for (const opt of options) {
        if (userOrder.includes(opt)) continue;
        const btn = el('button', { class: 'quiz-option-btn', text: opt });
        btn.onclick = function () {
          userOrder.push(opt);
          renderOptions();
          renderSelected();
          if (userOrder.length === options.length) {
            checkOrder();
          }
        };
        optsDiv.appendChild(btn);
      }
    }

    function renderSelected() {
      selectedDiv.innerHTML = '';
      userOrder.forEach((name, i) => {
        selectedDiv.appendChild(el('span', { class: 'order-item', text: (i + 1) + '. ' + name }));
      });
    }

    function checkOrder() {
      const isCorrect = userOrder.every((v, i) => v === correctOrder[i]);
      if (isCorrect) {
        quizScore++;
        area.appendChild(el('div', { class: 'quiz-feedback correct', text: '✅ 排序正确！' }));
        setTimeout(onCorrect, 500);
      } else {
        area.appendChild(el('div', { class: 'quiz-feedback wrong', text: '❌ 顺序不对，正确顺序是：' + correctOrder.join(' → ') }));
      }
      updateQuizScore();
      setTimeout(() => {
        if (!area.querySelector('.quiz-next-btn')) {
          area.appendChild(el('button', { class: 'quiz-next-btn', text: '下一题 →', onclick: 'window.__jiangshan_phase1.nextQuiz()' }));
        }
      }, 300);
    }

    area.appendChild(el('div', { class: 'quiz-hint', text: '点击选项按顺序排列' }));
    area.appendChild(selectedDiv);
    area.appendChild(optsDiv);
  }

  function nextQuiz() {
    const activeBtn = document.querySelector('.quiz-type-btn.active');
    if (activeBtn) startQuiz(activeBtn.dataset.type);
  }

  function updateQuizScore() {
    const el2 = $('#quiz-score');
    if (el2) el2.textContent = '得分：' + quizScore + ' / ' + quizTotal;
  }

  // ========== 功能4：历史名词悬浮解释 ==========
  let termTooltip = null;

  function initTermTooltips() {
    // 监听侧栏和卡片中的文本
    document.addEventListener('mouseover', function (e) {
      const target = e.target;
      if (!target.textContent) return;

      // 检查是否是历史名词
      const text = target.textContent.trim();
      // 只在侧栏、卡片、事件列表中启用
      if (!target.closest('#chronicle-pane, .place-card, .milestone-section, #dynasty-summary, .event-item')) return;

      // 查找匹配的名词
      for (const term in TERM_MAP) {
        if (text.includes(term) && text.length < 50) {
          showTermTooltip(e, term, TERM_MAP[term]);
          return;
        }
      }
    });

    document.addEventListener('mouseout', function (e) {
      if (termTooltip && !e.relatedTarget?.closest('.term-tooltip')) {
        hideTermTooltip();
      }
    });
  }

  function showTermTooltip(e, term, explanation) {
    hideTermTooltip();
    termTooltip = el('div', { class: 'term-tooltip' }, [
      el('div', { class: 'term-tooltip-title', text: term }),
      el('div', { class: 'term-tooltip-body', text: explanation })
    ]);
    document.body.appendChild(termTooltip);

    // 定位
    const rect = e.target.getBoundingClientRect();
    let x = rect.left + rect.width / 2 - 150;
    let y = rect.bottom + 8;
    if (x < 10) x = 10;
    if (x + 300 > window.innerWidth) x = window.innerWidth - 310;
    if (y + 150 > window.innerHeight) y = rect.top - 150;

    termTooltip.style.left = x + 'px';
    termTooltip.style.top = y + 'px';
  }

  function hideTermTooltip() {
    if (termTooltip) {
      termTooltip.remove();
      termTooltip = null;
    }
  }

  // ========== 注入工具栏按钮 ==========
  function injectToolbar() {
    const toolbar = $('.learning-toolbar');
    if (!toolbar) return;

    // 对比模式按钮
    const compareBtn = el('button', { class: 'action-btn subtle learning-btn', title: '朝代对比', onclick: 'window.__jiangshan_phase1.toggleCompareMode()' }, [
      el('span', { text: '⚖️ 对比' })
    ]);

    // 测验按钮
    const quizBtn = el('button', { class: 'action-btn subtle learning-btn', title: '历史小测验', onclick: 'window.__jiangshan_phase1.toggleQuizPanel()' }, [
      el('span', { text: '🎯 测验' })
    ]);

    toolbar.appendChild(compareBtn);
    toolbar.appendChild(quizBtn);
  }

  // ========== 暴露全局 ==========
  window.__jiangshan_phase1 = {
    toggleCompareMode,
    startCompare,
    closeCompareMode,
    exitCompare,
    toggleQuizPanel,
    closeQuizPanel,
    startQuiz,
    nextQuiz
  };

  // ========== 启动 ==========
  function init() {
    injectToolbar();
    initPlaceLabels();
    initTermTooltips();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
