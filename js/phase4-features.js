/**
 * 华夏文明 - 第四期学习增强功能
 * 1. 世界历史对照
 * 2. 地理知识卡片
 * 3. 错题本
 * 4. 每日一题
 */
(function () {
  'use strict';

  // ========== 世界历史对照数据 ==========
  const WORLD_HISTORY = {
    '战国': {
      period: '前475-前221',
      events: [
        { year: -508, event: '罗马共和国建立', desc: '罗马人推翻王政，建立元老院+执政官的共和体制' },
        { year: -490, event: '希波战争', desc: '希腊城邦击败波斯帝国，马拉松战役爆发' },
        { year: -431, event: '伯罗奔尼撒战争', desc: '雅典与斯巴达争霸，希腊城邦由盛转衰' },
        { year: -336, event: '亚历山大东征', desc: '马其顿亚历山大征服波斯，远达印度河流域' },
        { year: -264, event: '第一次布匿战争', desc: '罗马与迦太基争夺西西里岛，罗马海军崛起' }
      ]
    },
    '秦': {
      period: '前221-前207',
      events: [
        { year: -218, event: '第二次布匿战争', desc: '迦太基汉尼拔翻越阿尔卑斯山进攻罗马' },
        { year: -202, event: '扎马战役', desc: '罗马击败汉尼拔，迦太基丧失海外领地' }
      ]
    },
    '西汉': {
      period: '前202-8',
      events: [
        { year: -146, event: '罗马灭迦太基', desc: '第三次布匿战争，迦太基被夷为平地' },
        { year: -73, event: '斯巴达克起义', desc: '罗马奴隶大起义，动摇奴隶制基础' },
        { year: -58, event: '凯撒征服高卢', desc: '凯撒用8年征服今法国地区，实力大增' },
        { year: -44, event: '凯撒遇刺', desc: '凯撒被元老院共和派刺杀，罗马内战再起' },
        { year: -27, event: '罗马帝国建立', desc: '屋大维获"奥古斯都"称号，罗马进入帝国时代' },
        { year: 4, event: '耶稣诞生', desc: '基督教创始人耶稣诞生于伯利恒（传统纪年）' }
      ]
    },
    '东汉': {
      period: '25-220',
      events: [
        { year: 79, event: '庞贝古城毁灭', desc: '维苏威火山爆发，庞贝城被火山灰掩埋' },
        { year: 96, event: '罗马五贤帝时代', desc: '涅尔瓦、图拉真、哈德良等，罗马帝国全盛' },
        { year: 117, event: '罗马版图最大', desc: '图拉真时期罗马帝国疆域达到最大' },
        { year: 166, event: '罗马遣使汉朝', desc: '罗马帝国使者到达洛阳，中欧首次官方接触' }
      ]
    },
    '三国': {
      period: '220-280',
      events: [
        { year: 235, event: '罗马三世纪危机', desc: '罗马帝国内乱不断，50年换了26位皇帝' },
        { year: 284, event: '戴克里先改革', desc: '罗马皇帝戴克里先实行"四帝共治"，暂时稳定局面' }
      ]
    },
    '西晋': {
      period: '265-316',
      events: [
        { year: 313, event: '米兰敕令', desc: '罗马君士坦丁大帝颁布，基督教合法化' },
        { year: 330, event: '迁都君士坦丁堡', desc: '君士坦丁大帝迁都拜占庭，改名君士坦丁堡' }
      ]
    },
    '东晋': {
      period: '317-420',
      events: [
        { year: 378, event: '阿德里安堡战役', desc: '西哥特人大败罗马军团，罗马帝国衰落' },
        { year: 395, event: '罗马帝国分裂', desc: '罗马帝国正式分裂为东罗马和西罗马' },
        { year: 410, event: '西哥特人洗劫罗马', desc: '西哥特首领阿拉里克攻破罗马城' },
        { year: 476, event: '西罗马帝国灭亡', desc: '日耳曼雇佣军废黜末代皇帝，欧洲中世纪开始' }
      ]
    },
    '南北朝': {
      period: '420-589',
      events: [
        { year: 481, event: '法兰克王国建立', desc: '克洛维建立墨洛温王朝，今法国前身' },
        { year: 527, event: '查士丁尼大帝', desc: '拜占庭皇帝查士丁尼在位，编《罗马民法大全》' },
        { year: 532, event: '圣索菲亚大教堂', desc: '君士坦丁堡圣索菲亚大教堂建成' },
        { year: 570, event: '穆罕默德诞生', desc: '伊斯兰教创始人穆罕默德诞生于麦加' }
      ]
    },
    '隋': {
      period: '581-618',
      events: [
        { year: 610, event: '伊斯兰教创立', desc: '穆罕默德在麦加开始传教' },
        { year: 618, event: '唐朝建立', desc: '（同期）李渊建立唐朝，中国进入盛世' }
      ]
    },
    '唐': {
      period: '618-907',
      events: [
        { year: 632, event: '阿拉伯帝国崛起', desc: '穆罕默德去世后，阿拉伯人开始大规模扩张' },
        { year: 651, event: '波斯萨珊王朝灭亡', desc: '阿拉伯帝国征服波斯，伊斯兰化开始' },
        { year: 711, event: '阿拉伯人征服西班牙', desc: '摩尔人渡过直布罗陀海峡，统治伊比利亚半岛' },
        { year: 750, event: '阿拔斯王朝建立', desc: '阿拉伯帝国阿拔斯王朝，首都巴格达，文化繁荣' },
        { year: 800, event: '查理曼帝国', desc: '查理曼被教皇加冕为"罗马人的皇帝"' },
        { year: 843, event: '凡尔登条约', desc: '查理曼帝国三分，形成法德意三国雏形' },
        { year: 870, event: '维京时代', desc: '北欧维京人横扫欧洲，建立诺曼底公国' }
      ]
    },
    '五代十国': {
      period: '907-960',
      events: [
        { year: 960, event: '神圣罗马帝国建立', desc: '奥托一世加冕，神圣罗马帝国开始' },
        { year: 962, event: '拜占庭马其顿王朝', desc: '拜占庭帝国进入第二个黄金时代' }
      ]
    },
    '北宋': {
      period: '960-1127',
      events: [
        { year: 1054, event: '东西教会大分裂', desc: '基督教分裂为天主教和东正教' },
        { year: 1066, event: '诺曼征服英格兰', desc: '诺曼底公爵威廉征服英国，改变英国历史' },
        { year: 1096, event: '第一次十字军东征', desc: '欧洲基督徒开始东征，争夺耶路撒冷' },
        { year: 1127, event: '靖康之变', desc: '（同期）金军攻破开封，北宋灭亡' }
      ]
    },
    '南宋': {
      period: '1127-1279',
      events: [
        { year: 1206, event: '成吉思汗统一蒙古', desc: '铁木真建立大蒙古国，开始西征' },
        { year: 1215, event: '英国大宪章', desc: '英国国王约翰签署《大宪章》，限制王权' },
        { year: 1258, event: '蒙古攻陷巴格达', desc: '旭烈兀灭阿拉伯阿拔斯王朝，哈里发制度终结' },
        { year: 1271, event: '马可波罗来华', desc: '威尼斯商人马可波罗启程前往中国' }
      ]
    },
    '元': {
      period: '1271-1368',
      events: [
        { year: 1295, event: '马可波罗回国', desc: '马可波罗返回威尼斯，著《马可波罗游记》' },
        { year: 1337, event: '英法百年战争', desc: '英法两国爆发长达116年的战争' },
        { year: 1347, event: '黑死病', desc: '鼠疫席卷欧洲，死亡约三分之一人口' },
        { year: 1368, event: '明朝建立', desc: '（同期）朱元璋推翻元朝，建立明朝' }
      ]
    },
    '明': {
      period: '1368-1644',
      events: [
        { year: 1405, event: '郑和下西洋', desc: '（同期）郑和七下西洋，最远达非洲' },
        { year: 1453, event: '东罗马帝国灭亡', desc: '奥斯曼土耳其攻陷君士坦丁堡，拜占庭灭亡' },
        { year: 1492, event: '哥伦布发现美洲', desc: '哥伦布横渡大西洋，到达美洲，大航海时代开始' },
        { year: 1498, event: '达伽马到达印度', desc: '葡萄牙人达伽马开辟欧洲到印度的新航路' },
        { year: 1517, event: '宗教改革', desc: '马丁路德发表《九十五条论纲》，新教诞生' },
        { year: 1521, event: '麦哲伦环球航行', desc: '麦哲伦船队完成人类首次环球航行' },
        { year: 1543, event: '哥白尼日心说', desc: '哥白尼发表《天体运行论》，科学革命开始' },
        { year: 1600, event: '英国东印度公司', desc: '英国成立东印度公司，开始殖民亚洲' },
        { year: 1640, event: '英国资产阶级革命', desc: '英国爆发革命，议会与国王内战' }
      ]
    },
    '清': {
      period: '1644-1912',
      events: [
        { year: 1687, event: '牛顿发表《原理》', desc: '牛顿发表《自然哲学的数学原理》，经典力学建立' },
        { year: 1769, event: '瓦特改良蒸汽机', desc: '工业革命开始，人类进入蒸汽时代' },
        { year: 1776, event: '美国独立', desc: '美国发表《独立宣言》，脱离英国独立' },
        { year: 1789, event: '法国大革命', desc: '法国爆发大革命，攻占巴士底狱' },
        { year: 1804, event: '拿破仑称帝', desc: '拿破仑建立法兰西第一帝国' },
        { year: 1840, event: '鸦片战争', desc: '（同期）英国发动鸦片战争，中国近代史开端' },
        { year: 1859, event: '达尔文进化论', desc: '达尔文发表《物种起源》，提出进化论' },
        { year: 1861, event: '美国内战', desc: '美国南北战争爆发，废除奴隶制' },
        { year: 1868, event: '日本明治维新', desc: '日本开始明治维新，迅速崛起为亚洲强国' },
        { year: 1903, event: '莱特兄弟发明飞机', desc: '人类实现动力飞行' },
        { year: 1911, event: '辛亥革命', desc: '（同期）武昌起义，推翻清朝建立民国' }
      ]
    }
  };

  // ========== 地理知识数据 ==========
  const GEO_KNOWLEDGE = {
    // 山脉
    '秦岭': { type: '山脉', desc: '中国南北地理分界线，长江与黄河流域分水岭，海拔约2000-3000米。秦岭-淮河一线是中国最重要的地理分界线。' },
    '太行山': { type: '山脉', desc: '黄土高原与华北平原分界线，海拔约1500-2000米。山中多关隘，如娘子关、井陉，是古代兵家必争之地。' },
    '昆仑山': { type: '山脉', desc: '中国第一神山，西起帕米尔高原，东至青海，全长2500公里，平均海拔5500米，是塔里木盆地与青藏高原分界线。' },
    '天山': { type: '山脉', desc: '横亘新疆中部，将新疆分为南疆和北疆，海拔约4000-5000米，山顶终年积雪，是古代丝绸之路的重要通道。' },
    '喜马拉雅山': { type: '山脉', desc: '世界最高山脉，主峰珠穆朗玛峰海拔8848.86米，是中国与尼泊尔、印度等国的界山。' },
    '阴山': { type: '山脉', desc: '位于内蒙古中部，海拔约1500-2000米，是农耕区与游牧区的分界线，古代中原王朝防御北方游牧民族的屏障。' },
    '南岭': { type: '山脉', desc: '长江与珠江流域分水岭，位于湘赣粤桂交界处，海拔约1000米，是岭南与中原的天然屏障。' },
    '武夷山': { type: '山脉', desc: '江西与福建界山，海拔约2000米，丹霞地貌典型，产大红袍茶叶，是世界文化与自然双重遗产。' },
    '横断山脉': { type: '山脉', desc: '位于川滇藏交界处，南北走向，山高谷深，三江并流（金沙江、澜沧江、怒江），是中国生物多样性最丰富的地区。' },
    '燕山': { type: '山脉', desc: '位于河北北部，海拔约1000米，是华北平原与内蒙古高原分界线，长城沿燕山修筑，山海关、古北口等关隘在此。' },
    // 河流
    '黄河': { type: '河流', desc: '中国第二长河，全长5464公里，发源于青海巴颜喀拉山，流经9省区注入渤海。因含沙量大呈黄色得名，是中华民族母亲河。' },
    '长江': { type: '河流', desc: '中国第一长河，全长6300公里，发源于唐古拉山，流经11省市注入东海。是世界第三长河，航运发达，称"黄金水道"。' },
    '淮河': { type: '河流', desc: '全长约1000公里，发源于河南桐柏山，流经豫皖苏。秦岭-淮河一线是中国南北分界线，历史上黄河多次夺淮入海。' },
    '珠江': { type: '河流', desc: '中国第三长河，全长2320公里，由西江、北江、东江汇合而成，流经滇黔桂粤，是华南水运大动脉。' },
    '黑龙江': { type: '河流', desc: '中俄界河，全长4370公里，发源于蒙古肯特山，注入鞑靼海峡。因河水含腐殖质多色黑得名，流域森林资源丰富。' },
    '雅鲁藏布江': { type: '河流', desc: '西藏第一大河，全长2057公里，发源于喜马拉雅山北麓，流经印度称布拉马普特拉河，水能蕴藏量中国第二。' },
    '澜沧江': { type: '河流', desc: '全长4909公里，发源于青海唐古拉山，流经西藏云南，出境后称湄公河，是东南亚第一长河。' },
    '塔里木河': { type: '河流', desc: '中国最长内流河，全长2179公里，位于新疆塔里木盆地，水源靠高山冰雪融水，沿岸有胡杨林。' },
    // 关隘
    '函谷关': { type: '关隘', desc: '位于河南灵宝，因路在谷中深险如函得名。是秦国东大门，老子著《道德经》处，"紫气东来"典故发生地。' },
    '潼关': { type: '关隘', desc: '位于陕西潼关县，地处黄河渡口，是关中平原东大门，历来为兵家必争之地，安史之乱中唐军与叛军在此激战。' },
    '山海关': { type: '关隘', desc: '位于河北秦皇岛，是明长城东端起点，号称"天下第一关"。1644年吴三桂引清军入关即在此。' },
    '嘉峪关': { type: '关隘', desc: '位于甘肃嘉峪关市，是明长城西端终点，号称"天下第一雄关"，是丝绸之路的重要关隘。' },
    '雁门关': { type: '关隘', desc: '位于山西代县，是长城重要关隘，以"险"著称。杨家将镇守三关故事发生地，昭君出塞经此关。' },
    '居庸关': { type: '关隘', desc: '位于北京昌平，是长城重要关隘，北京西北门户。京张铁路人字形轨道即在此附近设计。' },
    '剑门关': { type: '关隘', desc: '位于四川剑阁，是蜀道重要关隘，两侧峭壁如剑，"一夫当关万夫莫开"。诸葛亮曾在此设关，姜维拒钟会于此。' },
    // 平原
    '华北平原': { type: '平原', desc: '中国第二大平原，面积约30万平方公里，由黄河、淮河、海河冲积而成，是中国重要农业区，盛产小麦棉花。' },
    '长江中下游平原': { type: '平原', desc: '面积约20万平方公里，包括江汉平原、洞庭湖平原、鄱阳湖平原、长三角等，是中国"鱼米之乡"。' },
    '东北平原': { type: '平原', desc: '中国最大平原，面积约35万平方公里，包括松嫩平原、三江平原、辽河平原，黑土肥沃，是中国重要商品粮基地。' },
    '关中平原': { type: '平原', desc: '又称渭河平原，位于陕西中部，号称"八百里秦川"，是周秦汉唐等13朝建都之地，中国古代政治中心。' },
    '成都平原': { type: '平原', desc: '位于四川盆地西部，由岷江冲积而成，都江堰水利工程灌溉，号称"天府之国"，是四川最富庶地区。' },
    '河套平原': { type: '平原', desc: '位于内蒙古黄河沿岸，包括前套、后套、西套，引黄河水灌溉，是西北重要农业区，"黄河百害唯富一套"。' },
    // 高原
    '青藏高原': { type: '高原', desc: '世界最高高原，平均海拔4000米以上，号称"世界屋脊"，是长江黄河等大江大河发源地。' },
    '内蒙古高原': { type: '高原', desc: '中国第二大高原，海拔约1000-1500米，地势平坦，草原广布，是中国重要牧区。' },
    '黄土高原': { type: '高原', desc: '世界最大黄土堆积区，海拔约1000-2000米，水土流失严重，是中华文明发源地之一。' },
    '云贵高原': { type: '高原', desc: '位于云南贵州，海拔约1000-2000米，喀斯特地貌典型，多溶洞暗河，民族文化多样。' },
    // 盆地
    '塔里木盆地': { type: '盆地', desc: '中国最大盆地，面积约53万平方公里，位于新疆南部，中心是塔克拉玛干沙漠，边缘有绿洲。' },
    '准噶尔盆地': { type: '盆地', desc: '位于新疆北部，面积约38万平方公里，中心是古尔班通古特沙漠，牧场广阔。' },
    '柴达木盆地': { type: '盆地', desc: '位于青海西北部，海拔约2600米，是中国最高盆地，盐矿资源丰富，号称"聚宝盆"。' },
    '四川盆地': { type: '盆地', desc: '位于四川东部，面积约26万平方公里，四周高山环绕，气候温暖湿润，号称"紫色盆地""天府之国"。' }
  };

  // ========== 每日一题题库 ==========
  const DAILY_QUESTIONS = [
    { q: '中国历史上第一个统一的中央集权王朝是？', options: ['夏朝', '商朝', '秦朝', '汉朝'], answer: 2, explain: '公元前221年秦始皇统一六国，建立秦朝，是中国历史上第一个统一的中央集权王朝。' },
    { q: '"贞观之治"是哪位皇帝在位时期？', options: ['唐高祖', '唐太宗', '唐高宗', '唐玄宗'], answer: 1, explain: '唐太宗李世民在位期间（627-649）政治清明、经济发展，史称"贞观之治"。' },
    { q: '丝绸之路的开拓者是谁？', options: ['班超', '张骞', '卫青', '霍去病'], answer: 1, explain: '西汉张骞两次出使西域，开辟了通往中亚、欧洲的丝绸之路。' },
    { q: '《史记》的作者是谁？', options: ['班固', '司马迁', '司马光', '陈寿'], answer: 1, explain: '西汉司马迁著《史记》，是中国第一部纪传体通史，被鲁迅誉为"史家之绝唱"。' },
    { q: '赤壁之战发生在哪一年？', options: ['200年', '208年', '220年', '222年'], answer: 1, explain: '208年孙刘联军在赤壁火攻大破曹操，奠定三国鼎立格局。' },
    { q: '中国历史上唯一的女皇帝是谁？', options: ['慈禧太后', '吕后', '武则天', '萧太后'], answer: 2, explain: '武则天（690-705在位）是中国历史上唯一正式称帝的女皇帝。' },
    { q: '安史之乱发生在哪个朝代？', options: ['隋朝', '唐朝', '宋朝', '明朝'], answer: 1, explain: '755-763年安禄山、史思明发动叛乱，是唐朝由盛转衰的转折点。' },
    { q: '活字印刷术的发明者是谁？', options: ['蔡伦', '毕昇', '张衡', '祖冲之'], answer: 1, explain: '北宋毕昇发明活字印刷术，比欧洲早约400年，是中国四大发明之一。' },
    { q: '靖康之变导致哪个朝代灭亡？', options: ['北宋', '南宋', '辽', '西夏'], answer: 0, explain: '1127年金军攻破开封，俘虏徽钦二帝，北宋灭亡，史称"靖康之变"。' },
    { q: '元朝的建立者是谁？', options: ['成吉思汗', '忽必烈', '窝阔台', '蒙哥'], answer: 1, explain: '1271年忽必烈改国号为元，1279年灭南宋统一中国。' },
    { q: '郑和下西洋最远到达哪里？', options: ['东南亚', '印度', '非洲东海岸', '欧洲'], answer: 2, explain: '郑和七下西洋，最远到达非洲东海岸和红海沿岸，比哥伦布早87年。' },
    { q: '清军入关是在哪一年？', options: ['1636年', '1644年', '1661年', '1683年'], answer: 1, explain: '1644年李自成攻破北京，吴三桂引清军入关，清朝开始统治全国。' },
    { q: '《本草纲目》的作者是谁？', options: ['华佗', '张仲景', '李时珍', '孙思邈'], answer: 2, explain: '明代李时珍历时27年著《本草纲目》，收录药物1892种，被称为"东方医药巨典"。' },
    { q: '中国近代史的开端是哪次战争？', options: ['甲午战争', '鸦片战争', '八国联军', '抗日战争'], answer: 1, explain: '1840年鸦片战争，中国战败签订《南京条约》，开始沦为半殖民地半封建社会。' },
    { q: '辛亥革命发生在哪一年？', options: ['1898年', '1900年', '1911年', '1919年'], answer: 2, explain: '1911年武昌起义爆发，推翻清朝统治，结束了两千多年的君主专制。' },
    { q: '三家分晋标志着哪个时代的开始？', options: ['春秋', '战国', '秦', '西汉'], answer: 1, explain: '公元前403年韩赵魏三家瓜分晋国，周天子正式承认，标志着战国时代开始。' },
    { q: '商鞅变法发生在哪个国家？', options: ['齐国', '楚国', '秦国', '赵国'], answer: 2, explain: '公元前356年秦孝公任用商鞅变法，使秦国迅速崛起，为统一六国奠定基础。' },
    { q: '被称为"诗仙"的唐代诗人是谁？', options: ['杜甫', '李白', '白居易', '王维'], answer: 1, explain: '李白（701-762）是唐代浪漫主义诗人代表，被称为"诗仙"，存诗900余首。' },
    { q: '被称为"诗圣"的唐代诗人是谁？', options: ['李白', '杜甫', '白居易', '孟浩然'], answer: 1, explain: '杜甫（712-770）是唐代现实主义诗人，被称为"诗圣"，其诗被称为"诗史"。' },
    { q: '科举制度创立于哪个朝代？', options: ['汉朝', '隋朝', '唐朝', '宋朝'], answer: 1, explain: '隋文帝开始分科考试选拔官员，隋炀帝设进士科，科举制度正式创立。' },
    { q: '行省制度创立于哪个朝代？', options: ['唐朝', '宋朝', '元朝', '明朝'], answer: 2, explain: '元朝创立行省制度，在地方设行中书省，是现代省制的开端。' },
    { q: '土木堡之变发生在哪个朝代？', options: ['宋朝', '元朝', '明朝', '清朝'], answer: 2, explain: '1449年明英宗亲征瓦剌，在土木堡被俘，明朝由盛转衰。' },
    { q: '虎门销烟的民族英雄是谁？', options: ['关天培', '林则徐', '邓世昌', '丁汝昌'], answer: 1, explain: '1839年林则徐在虎门海滩销毁鸦片237万斤，是中国禁烟运动的伟大胜利。' },
    { q: '收复台湾的民族英雄是谁？', options: ['戚继光', '郑成功', '施琅', '刘铭传'], answer: 1, explain: '1662年郑成功驱逐荷兰殖民者，收复台湾，被尊为"开台圣王"。' },
    { q: '抗金名将岳飞被谁以"莫须有"罪名杀害？', options: ['高俅', '蔡京', '秦桧', '童贯'], answer: 2, explain: '南宋秦桧以"莫须有"（也许有）的罪名杀害岳飞，成为千古奸臣。' },
    { q: '《红楼梦》的作者是谁？', options: ['罗贯中', '施耐庵', '吴承恩', '曹雪芹'], answer: 3, explain: '清代曹雪芹著《红楼梦》，是中国古典小说巅峰之作，前80回为曹雪芹所著。' },
    { q: '中国四大发明不包括以下哪项？', options: ['造纸术', '印刷术', '火药', '地动仪'], answer: 3, explain: '中国四大发明是造纸术、印刷术、火药、指南针。地动仪是张衡发明的地震仪器。' },
    { q: '罢黜百家独尊儒术是哪位皇帝的政策？', options: ['秦始皇', '汉高祖', '汉武帝', '唐太宗'], answer: 2, explain: '汉武帝采纳董仲舒建议，把儒家思想定为正统，影响中国两千年。' },
    { q: '淝水之战中东晋以少胜多击败的是？', options: ['前秦', '北魏', '前赵', '后秦'], answer: 0, explain: '383年东晋谢玄北府兵在淝水大败前秦苻坚，前秦瓦解，北方再度分裂。' },
    { q: '陈桥兵变黄袍加身说的是谁？', options: ['李世民', '赵匡胤', '朱元璋', '朱棣'], answer: 1, explain: '960年后周大将赵匡胤在陈桥驿被部下黄袍加身，建立宋朝，史称北宋。' }
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

  function getCurrentDynasty() {
    const year = getCurrentYear();
    if (year === null) return '西汉';
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
    return '清';
  }

  function getCurrentYear() {
    const yearDisplay = $('.year-display, .current-year, #year-label, [class*="year"]');
    if (yearDisplay) {
      const text = yearDisplay.textContent;
      const match = text.match(/前?(\d+)/);
      if (match) return text.includes('前') ? -parseInt(match[1]) : parseInt(match[1]);
    }
    return null;
  }

  // ========== 功能1：世界历史对照 ==========
  let worldPanelOpen = false;

  function toggleWorldPanel() {
    if (worldPanelOpen) {
      closeWorldPanel();
      return;
    }
    openWorldPanel();
  }

  function openWorldPanel() {
    worldPanelOpen = true;
    const dynasty = getCurrentDynasty();
    const data = WORLD_HISTORY[dynasty] || { period: '未知', events: [] };

    const panel = el('div', { id: 'world-panel', class: 'world-panel' }, [
      el('div', { class: 'world-header' }, [
        el('span', { text: '🌍 世界历史对照' }),
        el('button', { class: 'panel-close', text: '✕', onclick: 'window.__jiangshan_phase4.closeWorldPanel()' })
      ]),
      el('div', { class: 'world-body' }, [
        el('div', { class: 'world-dynasty-select' },
          Object.keys(WORLD_HISTORY).map(d => {
            const btn = el('button', {
              class: 'dynasty-tab' + (d === dynasty ? ' active' : ''),
              text: d,
              onclick: `window.__jiangshan_phase4.showWorldHistory('${d}')`
            });
            return btn;
          })
        ),
        el('div', { id: 'world-content', class: 'world-content' })
      ])
    ]);
    document.body.appendChild(panel);
    showWorldHistory(dynasty);
  }

  function showWorldHistory(dynasty) {
    $$('.world-panel .dynasty-tab').forEach(t => t.classList.toggle('active', t.textContent === dynasty));
    const content = $('#world-content');
    if (!content) return;

    const data = WORLD_HISTORY[dynasty];
    if (!data) {
      content.innerHTML = '<div class="world-empty">该朝代世界史数据待补充</div>';
      return;
    }

    content.innerHTML = '';
    content.appendChild(el('div', { class: 'world-period', text: `中国：${dynasty}（${data.period}）` }));

    const timeline = el('div', { class: 'world-timeline' });
    data.events.forEach(ev => {
      const item = el('div', { class: 'world-event' }, [
        el('div', { class: 'world-event-year', text: formatYear(ev.year) + '年' }),
        el('div', { class: 'world-event-info' }, [
          el('div', { class: 'world-event-title', text: ev.event }),
          el('div', { class: 'world-event-desc', text: ev.desc })
        ])
      ]);
      timeline.appendChild(item);
    });
    content.appendChild(timeline);
  }

  function closeWorldPanel() {
    worldPanelOpen = false;
    $('#world-panel')?.remove();
  }

  // ========== 功能2：地理知识卡片 ==========
  let geoPanelOpen = false;

  function toggleGeoPanel() {
    if (geoPanelOpen) {
      closeGeoPanel();
      return;
    }
    openGeoPanel();
  }

  function openGeoPanel() {
    geoPanelOpen = true;
    const categories = ['山脉', '河流', '关隘', '平原', '高原', '盆地'];

    const panel = el('div', { id: 'geo-panel', class: 'geo-panel' }, [
      el('div', { class: 'geo-header' }, [
        el('span', { text: '🗺️ 地理知识' }),
        el('button', { class: 'panel-close', text: '✕', onclick: 'window.__jiangshan_phase4.closeGeoPanel()' })
      ]),
      el('div', { class: 'geo-body' }, [
        el('div', { class: 'geo-categories' },
          categories.map((c, i) => {
            const btn = el('button', {
              class: 'geo-cat-btn' + (i === 0 ? ' active' : ''),
              text: c,
              onclick: `window.__jiangshan_phase4.showGeoCategory('${c}')`
            });
            return btn;
          })
        ),
        el('div', { id: 'geo-list', class: 'geo-list' })
      ])
    ]);
    document.body.appendChild(panel);
    showGeoCategory('山脉');
  }

  function showGeoCategory(category) {
    $$('.geo-cat-btn').forEach(b => b.classList.toggle('active', b.textContent === category));
    const list = $('#geo-list');
    if (!list) return;

    list.innerHTML = '';
    const items = Object.entries(GEO_KNOWLEDGE).filter(([_, v]) => v.type === category);

    if (items.length === 0) {
      list.appendChild(el('div', { class: 'geo-empty', text: '暂无数据' }));
      return;
    }

    items.forEach(([name, info]) => {
      const item = el('div', { class: 'geo-item' }, [
        el('div', { class: 'geo-name', text: name }),
        el('div', { class: 'geo-desc', text: info.desc })
      ]);
      list.appendChild(item);
    });
  }

  function closeGeoPanel() {
    geoPanelOpen = false;
    $('#geo-panel')?.remove();
  }

  // ========== 功能3：错题本 ==========
  let wrongPanelOpen = false;

  function getWrongQuestions() {
    try {
      return JSON.parse(localStorage.getItem('jiangshan_wrong_questions') || '[]');
    } catch { return []; }
  }

  function saveWrongQuestion(q) {
    const wrong = getWrongQuestions();
    // 去重
    if (!wrong.find(w => w.q === q.q)) {
      wrong.push(q);
      localStorage.setItem('jiangshan_wrong_questions', JSON.stringify(wrong));
    }
  }

  function removeWrongQuestion(q) {
    let wrong = getWrongQuestions();
    wrong = wrong.filter(w => w.q !== q);
    localStorage.setItem('jiangshan_wrong_questions', JSON.stringify(wrong));
  }

  // 拦截测验答题，记录错题
  function setupQuizInterceptor() {
    // 监听测验面板中的答题点击
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.quiz-option-btn');
      if (!btn) return;
      const panel = btn.closest('#quiz-panel');
      if (!panel) return;

      // 延迟检查答题结果
      setTimeout(() => {
        const wrongBtn = panel.querySelector('.quiz-option-btn.wrong');
        if (wrongBtn) {
          const question = panel.querySelector('.quiz-question')?.textContent || '';
          const hint = panel.querySelector('.quiz-hint')?.textContent || '';
          const options = Array.from(panel.querySelectorAll('.quiz-option-btn')).map(b => b.textContent);
          const correctBtn = panel.querySelector('.quiz-option-btn.correct');
          const answer = correctBtn ? options.indexOf(correctBtn.textContent) : -1;
          saveWrongQuestion({ q: question, hint, options, answer, time: Date.now() });
        }
      }, 500);
    });
  }

  function toggleWrongPanel() {
    if (wrongPanelOpen) {
      closeWrongPanel();
      return;
    }
    openWrongPanel();
  }

  function openWrongPanel() {
    wrongPanelOpen = true;
    const wrong = getWrongQuestions();

    const panel = el('div', { id: 'wrong-panel', class: 'wrong-panel' }, [
      el('div', { class: 'wrong-header' }, [
        el('span', { text: '📕 错题本（' + wrong.length + '题）' }),
        el('button', { class: 'panel-close', text: '✕', onclick: 'window.__jiangshan_phase4.closeWrongPanel()' })
      ]),
      el('div', { class: 'wrong-body', id: 'wrong-body' })
    ]);
    document.body.appendChild(panel);
    renderWrongList();
  }

  function renderWrongList() {
    const body = $('#wrong-body');
    if (!body) return;
    const wrong = getWrongQuestions();

    body.innerHTML = '';
    if (wrong.length === 0) {
      body.appendChild(el('div', { class: 'wrong-empty', text: '🎉 还没有错题，继续保持！' }));
      return;
    }

    wrong.forEach((item, idx) => {
      const div = el('div', { class: 'wrong-item' }, [
        el('div', { class: 'wrong-q', text: (idx + 1) + '. ' + item.q }),
        item.hint ? el('div', { class: 'wrong-hint', text: item.hint }) : null,
        el('div', { class: 'wrong-options' },
          item.options.map((opt, i) => {
            const cls = 'wrong-opt' + (i === item.answer ? ' correct' : '');
            return el('div', { class: cls, text: (i === item.answer ? '✓ ' : '') + opt });
          })
        ),
        el('div', { class: 'wrong-actions' }, [
          el('button', { class: 'wrong-remove-btn', text: '已掌握，移除', onclick: `window.__jiangshan_phase4.removeWrongAndRefresh('${item.q.replace(/'/g, "\\'")}')` })
        ])
      ].filter(Boolean));
      body.appendChild(div);
    });
  }

  function removeWrongAndRefresh(q) {
    removeWrongQuestion(q);
    renderWrongList();
    // 更新标题计数
    const wrong = getWrongQuestions();
    const header = $('.wrong-header span');
    if (header) header.textContent = '📕 错题本（' + wrong.length + '题）';
    showToast('已从错题本移除');
  }

  function closeWrongPanel() {
    wrongPanelOpen = false;
    $('#wrong-panel')?.remove();
  }

  // ========== 功能4：每日一题 ==========
  function getDailyQuestion() {
    const today = new Date().toDateString();
    const saved = localStorage.getItem('jiangshan_daily');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.date === today) return data;
      } catch {}
    }
    // 根据日期选择题目
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const idx = dayOfYear % DAILY_QUESTIONS.length;
    const q = DAILY_QUESTIONS[idx];
    const data = { date: today, question: q, answered: false, correct: null };
    localStorage.setItem('jiangshan_daily', JSON.stringify(data));
    return data;
  }

  function answerDaily(optionIdx) {
    const data = getDailyQuestion();
    data.answered = true;
    data.correct = optionIdx === data.question.answer;
    localStorage.setItem('jiangshan_daily', JSON.stringify(data));
    renderDailyCard();

    // 如果答错，加入错题本
    if (!data.correct) {
      saveWrongQuestion({
        q: data.question.q,
        hint: '每日一题',
        options: data.question.options,
        answer: data.question.answer,
        time: Date.now()
      });
    }
  }

  function renderDailyCard() {
    let card = $('#daily-card');
    const data = getDailyQuestion();
    const q = data.question;

    if (!card) {
      card = el('div', { id: 'daily-card', class: 'daily-card' });
      document.body.appendChild(card);
    }

    card.innerHTML = '';
    card.appendChild(el('div', { class: 'daily-header' }, [
      el('span', { class: 'daily-title', text: '📅 每日一题' }),
      el('button', { class: 'panel-close', text: '✕', onclick: 'document.getElementById("daily-card").remove()' })
    ]));

    const body = el('div', { class: 'daily-body' });
    body.appendChild(el('div', { class: 'daily-q', text: q.q }));

    if (!data.answered) {
      const opts = el('div', { class: 'daily-options' });
      q.options.forEach((opt, i) => {
        const btn = el('button', { class: 'daily-opt', text: opt });
        btn.onclick = () => answerDaily(i);
        opts.appendChild(btn);
      });
      body.appendChild(opts);
    } else {
      q.options.forEach((opt, i) => {
        const cls = 'daily-opt result' + (i === q.answer ? ' correct' : (data.correct ? '' : ' wrong'));
        const div = el('div', { class: cls, text: (i === q.answer ? '✓ ' : '') + opt });
        body.appendChild(div);
      });
      body.appendChild(el('div', { class: 'daily-result ' + (data.correct ? 'pass' : 'fail'), text: data.correct ? '✅ 回答正确！' : '❌ 回答错误' }));
      body.appendChild(el('div', { class: 'daily-explain', text: '💡 ' + q.explain }));
    }

    card.appendChild(body);
  }

  function toggleDailyCard() {
    const card = $('#daily-card');
    if (card) {
      card.remove();
    } else {
      renderDailyCard();
    }
  }

  function checkDailyPopup() {
    const data = getDailyQuestion();
    if (!data.answered) {
      // 延迟3秒弹出
      setTimeout(() => {
        if (!$('#daily-card')) renderDailyCard();
      }, 3000);
    }
  }

  // ========== 注入工具栏按钮 ==========
  function injectToolbar() {
    const toolbar = $('.learning-toolbar');
    if (!toolbar) return;

    const btns = [
      { id: 'world-btn', class: 'action-btn subtle learning-btn', title: '世界历史对照', text: '🌍 世界', onclick: 'window.__jiangshan_phase4.toggleWorldPanel()' },
      { id: 'geo-btn', class: 'action-btn subtle learning-btn', title: '地理知识', text: '🗺️ 地理', onclick: 'window.__jiangshan_phase4.toggleGeoPanel()' },
      { id: 'wrong-btn', class: 'action-btn subtle learning-btn', title: '错题本', text: '📕 错题', onclick: 'window.__jiangshan_phase4.toggleWrongPanel()' },
      { id: 'daily-btn', class: 'action-btn subtle learning-btn', title: '每日一题', text: '📅 每日', onclick: 'window.__jiangshan_phase4.toggleDailyCard()' }
    ];

    btns.forEach(b => {
      const btn = el('button', { id: b.id, class: b.class, title: b.title, onclick: b.onclick }, [el('span', { text: b.text })]);
      toolbar.appendChild(btn);
    });
  }

  // ========== 暴露全局 ==========
  window.__jiangshan_phase4 = {
    toggleWorldPanel,
    showWorldHistory,
    closeWorldPanel,
    toggleGeoPanel,
    showGeoCategory,
    closeGeoPanel,
    toggleWrongPanel,
    removeWrongAndRefresh,
    closeWrongPanel,
    toggleDailyCard,
    answerDaily
  };

  // ========== 启动 ==========
  function init() {
    injectToolbar();
    setupQuizInterceptor();
    checkDailyPopup();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
