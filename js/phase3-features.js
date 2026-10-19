/**
 * 华夏文明 - 第三期学习增强功能
 * 1. 历史人物卡片
 * 2. 诗词地图联动
 * 3. 学习闯关模式
 * 4. 成语典故地图
 */
(function () {
  'use strict';

  // ========== 历史人物数据 ==========
  const HISTORICAL_FIGURES = [
    // 先秦
    { name: '孔子', dynasty: '春秋', place: '山东曲阜', year: -551, life: '前551-前479', title: '儒家学派创始人', deeds: '创立儒家学派，整理六经，提出"仁"的思想，被尊为"至圣先师"', quote: '学而时习之，不亦说乎？' },
    { name: '老子', dynasty: '春秋', place: '河南鹿邑', year: -571, life: '约前571-前471', title: '道家学派创始人', deeds: '著《道德经》，主张"无为而治"，道家学派创始人', quote: '千里之行，始于足下。' },
    { name: '屈原', dynasty: '战国', place: '湖北秭归', year: -340, life: '约前340-前278', title: '爱国诗人', deeds: '楚国大夫，创"楚辞"体，著《离骚》，投汨罗江殉国', quote: '路漫漫其修远兮，吾将上下而求索。' },
    { name: '孙武', dynasty: '春秋', place: '山东广饶', year: -545, life: '约前545-前470', title: '兵圣', deeds: '著《孙子兵法》，世界最早的军事著作，被尊为"兵圣"', quote: '知己知彼，百战不殆。' },
    { name: '商鞅', dynasty: '战国', place: '陕西咸阳', year: -390, life: '约前390-前338', title: '改革家', deeds: '在秦国推行变法，废井田、奖耕战、行郡县，使秦国崛起', quote: '治世不一道，便国不法古。' },
    { name: '荆轲', dynasty: '战国', place: '河北易县', year: -227, life: '?-前227', title: '刺客', deeds: '燕太子丹门客，刺秦王嬴政未遂，"风萧萧兮易水寒"', quote: '风萧萧兮易水寒，壮士一去兮不复还。' },
    // 秦汉
    { name: '秦始皇', dynasty: '秦', place: '陕西咸阳', year: -259, life: '前259-前210', title: '千古一帝', deeds: '统一六国，建立中央集权，统一文字度量衡，修筑长城', quote: '朕为始皇帝，后世以计数，二世三世至于万世。' },
    { name: '项羽', dynasty: '秦末', place: '江苏宿迁', year: -232, life: '前232-前202', title: '西楚霸王', deeds: '巨鹿之战破釜沉舟灭秦主力，楚汉之争败于刘邦，自刎乌江', quote: '力拔山兮气盖世，时不利兮骓不逝。' },
    { name: '韩信', dynasty: '西汉', place: '江苏淮安', year: -231, life: '?-前196', title: '兵仙', deeds: '汉初名将，明修栈道暗度陈仓，垓下之战破项羽，后被吕后所杀', quote: '韩信将兵，多多益善。' },
    { name: '司马迁', dynasty: '西汉', place: '陕西韩城', year: -145, life: '前145-约前86', title: '太史公', deeds: '著《史记》，中国第一部纪传体通史，被鲁迅誉为"史家之绝唱"', quote: '人固有一死，或重于泰山，或轻于鸿毛。' },
    { name: '张骞', dynasty: '西汉', place: '陕西城固', year: -164, life: '?-前114', title: '丝绸之路开拓者', deeds: '两次出使西域，开辟丝绸之路，促进中西交流', quote: '不入虎穴，焉得虎子。' },
    { name: '王昭君', dynasty: '西汉', place: '湖北兴山', year: -52, life: '约前52-前19', title: '四大美女之一', deeds: '远嫁匈奴呼韩邪单于，维护汉匈和平数十年', quote: '（昭君出塞成为民族友好象征）' },
    // 三国魏晋
    { name: '曹操', dynasty: '三国', place: '安徽亳州', year: 155, life: '155-220', title: '魏武帝', deeds: '统一北方，挟天子以令诸侯，建安文学代表，著《观沧海》', quote: '老骥伏枥，志在千里；烈士暮年，壮心不已。' },
    { name: '诸葛亮', dynasty: '三国', place: '河南南阳', year: 181, life: '181-234', title: '武侯', deeds: '蜀汉丞相，隆中对三分天下，六出祁山北伐曹魏，鞠躬尽瘁', quote: '鞠躬尽瘁，死而后已。' },
    { name: '关羽', dynasty: '三国', place: '山西运城', year: 160, life: '?-220', title: '武圣', deeds: '桃园结义，过五关斩六将，水淹七军，败走麦城，被尊为"武圣"', quote: '玉可碎而不可改其白，竹可焚而不可毁其节。' },
    { name: '王羲之', dynasty: '东晋', place: '山东临沂', year: 303, life: '303-361', title: '书圣', deeds: '东晋书法家，著《兰亭集序》被誉为"天下第一行书"', quote: '（《兰亭集序》：天朗气清，惠风和畅）' },
    { name: '陶渊明', dynasty: '东晋', place: '江西九江', year: 365, life: '365-427', title: '田园诗派鼻祖', deeds: '不为五斗米折腰，归隐田园，著《桃花源记》《归去来兮辞》', quote: '采菊东篱下，悠然见南山。' },
    { name: '祖冲之', dynasty: '南北朝', place: '河北涞水', year: 429, life: '429-500', title: '数学家', deeds: '将圆周率精确到小数点后7位，比欧洲早近千年', quote: '（著《缀术》，制定《大明历》）' },
    // 隋唐
    { name: '唐太宗', dynasty: '唐', place: '陕西西安', year: 598, life: '598-649', title: '天可汗', deeds: '玄武门之变即位，开创贞观之治，被尊为"天可汗"', quote: '以铜为镜，可以正衣冠；以史为镜，可以知兴替。' },
    { name: '魏征', dynasty: '唐', place: '河北巨鹿', year: 580, life: '580-643', title: '一代名相', deeds: '唐太宗谏臣，直言进谏200余次，著《谏太宗十思疏》', quote: '兼听则明，偏信则暗。' },
    { name: '玄奘', dynasty: '唐', place: '河南偃师', year: 602, life: '602-664', title: '三藏法师', deeds: '西行天竺取经17年，翻译佛经75部，著《大唐西域记》', quote: '（《西游记》唐僧原型）' },
    { name: '文成公主', dynasty: '唐', place: '陕西西安', year: 625, life: '625-680', title: '和亲公主', deeds: '远嫁吐蕃松赞干布，带去中原文化和技术，促进汉藏友好', quote: '（大昭寺内仍供奉文成公主像）' },
    { name: '武则天', dynasty: '唐', place: '山西文水', year: 624, life: '624-705', title: '唯一女皇帝', deeds: '中国历史上唯一女皇帝，开创武举，重用人才，为开元盛世奠基', quote: '（无字碑：功过留待后人评说）' },
    { name: '李白', dynasty: '唐', place: '四川江油', year: 701, life: '701-762', title: '诗仙', deeds: '浪漫主义诗人，存诗900余首，著《将进酒》《望庐山瀑布》', quote: '天生我材必有用，千金散尽还复来。' },
    { name: '杜甫', dynasty: '唐', place: '河南巩义', year: 712, life: '712-770', title: '诗圣', deeds: '现实主义诗人，著"三吏三别"，诗被称为"诗史"', quote: '安得广厦千万间，大庇天下寒士俱欢颜。' },
    { name: '白居易', dynasty: '唐', place: '河南新郑', year: 772, life: '772-846', title: '诗魔', deeds: '新乐府运动倡导者，著《长恨歌》《琵琶行》，语言通俗', quote: '野火烧不尽，春风吹又生。' },
    // 宋元
    { name: '宋太祖', dynasty: '北宋', place: '河南洛阳', year: 927, life: '927-976', title: '宋朝开国皇帝', deeds: '陈桥兵变黄袍加身，杯酒释兵权，建立宋朝', quote: '（卧榻之侧，岂容他人鼾睡）' },
    { name: '包拯', dynasty: '北宋', place: '安徽合肥', year: 999, life: '999-1062', title: '包青天', deeds: '开封府尹，铁面无私，断案如神，被百姓称为"包青天"', quote: '（关节不到，有阎罗包老）' },
    { name: '王安石', dynasty: '北宋', place: '江西抚州', year: 1021, life: '1021-1086', title: '改革家', deeds: '推行熙宁变法，青苗法、免役法等，唐宋八大家之一', quote: '不畏浮云遮望眼，自缘身在最高层。' },
    { name: '苏轼', dynasty: '北宋', place: '四川眉山', year: 1037, life: '1037-1101', title: '东坡居士', deeds: '唐宋八大家之一，豪放派词人，著《念奴娇·赤壁怀古》', quote: '但愿人长久，千里共婵娟。' },
    { name: '岳飞', dynasty: '南宋', place: '河南汤阴', year: 1103, life: '1103-1142', title: '民族英雄', deeds: '抗金名将，岳家军大败金军，被秦桧以"莫须有"罪名杀害', quote: '莫等闲，白了少年头，空悲切。' },
    { name: '文天祥', dynasty: '南宋', place: '江西吉安', year: 1236, life: '1236-1283', title: '民族英雄', deeds: '抗元名臣，被俘后坚贞不屈，从容就义', quote: '人生自古谁无死，留取丹心照汗青。' },
    { name: '成吉思汗', dynasty: '元', place: '内蒙古鄂尔多斯', year: 1162, life: '1162-1227', title: '一代天骄', deeds: '统一蒙古各部，建立蒙古帝国，横扫欧亚大陆', quote: '（要让青草覆盖的地方都成为我的牧马之地）' },
    // 明清
    { name: '明太祖', dynasty: '明', place: '安徽凤阳', year: 1328, life: '1328-1398', title: '明朝开国皇帝', deeds: '乞丐出身，参加红巾军，推翻元朝建立明朝', quote: '（驱逐胡虏，恢复中华）' },
    { name: '郑和', dynasty: '明', place: '云南昆明', year: 1371, life: '1371-1433', title: '航海家', deeds: '七下西洋，最远到达非洲东海岸，比哥伦布早87年', quote: '（宝船规模当时世界第一）' },
    { name: '戚继光', dynasty: '明', place: '山东蓬莱', year: 1528, life: '1528-1588', title: '抗倭名将', deeds: '组建戚家军，平定东南沿海倭寇，著《纪效新书》', quote: '封侯非我意，但愿海波平。' },
    { name: '李时珍', dynasty: '明', place: '湖北蕲春', year: 1518, life: '1518-1593', title: '药圣', deeds: '著《本草纲目》，收录药物1892种，被称为"东方医药巨典"', quote: '（27年著成《本草纲目》）' },
    { name: '郑成功', dynasty: '明末清初', place: '福建南安', year: 1624, life: '1624-1662', title: '民族英雄', deeds: '驱逐荷兰殖民者，收复台湾，被尊为"开台圣王"', quote: '（开辟荆榛逐荷夷，十年始克复先基）' },
    { name: '康熙', dynasty: '清', place: '北京', year: 1654, life: '1654-1722', title: '千古一帝', deeds: '平三藩、收台湾、征噶尔丹，开创康乾盛世', quote: '（在位61年，中国历史上在位最久的皇帝）' },
    { name: '曹雪芹', dynasty: '清', place: '江苏南京', year: 1715, life: '约1715-1763', title: '文学家', deeds: '著《红楼梦》，中国古典小说巅峰之作', quote: '满纸荒唐言，一把辛酸泪。都云作者痴，谁解其中味。' },
    { name: '林则徐', dynasty: '清', place: '福建福州', year: 1785, life: '1785-1850', title: '民族英雄', deeds: '虎门销烟，抗击英国侵略，近代中国"开眼看世界第一人"', quote: '苟利国家生死以，岂因祸福避趋之。' }
  ];

  // ========== 诗词数据 ==========
  const POEMS = [
    { title: '登鹳雀楼', author: '王之涣', dynasty: '唐', place: '山西永济', year: 700, content: '白日依山尽，黄河入海流。\n欲穷千里目，更上一层楼。', analysis: '鹳雀楼位于山西永济，是古代四大名楼之一。诗人登楼远望，写下这首千古名篇，最后两句蕴含"站得高看得远"的哲理。' },
    { title: '黄鹤楼', author: '崔颢', dynasty: '唐', place: '湖北武汉', year: 730, content: '昔人已乘黄鹤去，此地空余黄鹤楼。\n黄鹤一去不复返，白云千载空悠悠。\n晴川历历汉阳树，芳草萋萋鹦鹉洲。\n日暮乡关何处是？烟波江上使人愁。', analysis: '黄鹤楼位于武汉长江南岸，是江南三大名楼之一。传说李白登楼时看到崔颢此诗，感叹"眼前有景道不得，崔颢题诗在上头"。' },
    { title: '早发白帝城', author: '李白', dynasty: '唐', place: '重庆奉节', year: 759, content: '朝辞白帝彩云间，千里江陵一日还。\n两岸猿声啼不住，轻舟已过万重山。', analysis: '白帝城位于重庆奉节，是三峡入口。李白因永王案被流放夜郎，行至白帝城遇赦，惊喜交加写下此诗，全诗轻快奔放。' },
    { title: '望庐山瀑布', author: '李白', dynasty: '唐', place: '江西九江', year: 725, content: '日照香炉生紫烟，遥看瀑布挂前川。\n飞流直下三千尺，疑是银河落九天。', analysis: '庐山瀑布位于江西九江，是中国最著名的瀑布之一。李白用夸张手法写出瀑布的雄伟气势，"三千尺""落九天"成为千古名句。' },
    { title: '春望', author: '杜甫', dynasty: '唐', place: '陕西西安', year: 757, content: '国破山河在，城春草木深。\n感时花溅泪，恨别鸟惊心。\n烽火连三月，家书抵万金。\n白头搔更短，浑欲不胜簪。', analysis: '安史之乱中，杜甫被困长安，目睹国都残破，写下这首沉痛的诗。"家书抵万金"成为战乱中人们对亲情的共同感叹。' },
    { title: '茅屋为秋风所破歌', author: '杜甫', dynasty: '唐', place: '四川成都', year: 761, content: '八月秋高风怒号，卷我屋上三重茅。\n...\n安得广厦千万间，大庇天下寒士俱欢颜！\n风雨不动安如山。', analysis: '杜甫在成都草堂时，茅屋被秋风吹破，他没有只感叹自己的不幸，而是想到天下所有贫寒的读书人，发出"安得广厦千万间"的呼喊。' },
    { title: '钱塘湖春行', author: '白居易', dynasty: '唐', place: '浙江杭州', year: 822, content: '孤山寺北贾亭西，水面初平云脚低。\n几处早莺争暖树，谁家新燕啄春泥。\n乱花渐欲迷人眼，浅草才能没马蹄。\n最爱湖东行不足，绿杨阴里白沙堤。', analysis: '钱塘湖就是杭州西湖。白居易任杭州刺史时，最爱西湖春色，诗中"早莺""新燕""乱花""浅草"描绘了一幅生机勃勃的早春图。' },
    { title: '念奴娇·赤壁怀古', author: '苏轼', dynasty: '北宋', place: '湖北黄冈', year: 1082, content: '大江东去，浪淘尽，千古风流人物。\n故垒西边，人道是，三国周郎赤壁。\n乱石穿空，惊涛拍岸，卷起千堆雪。\n江山如画，一时多少豪杰。', analysis: '苏轼被贬黄州（今黄冈）时，游赤壁矶写下此词。他借周瑜赤壁之战的典故，感叹人生如梦，是豪放派宋词的巅峰之作。' },
    { title: '饮湖上初晴后雨', author: '苏轼', dynasty: '北宋', place: '浙江杭州', year: 1073, content: '水光潋滟晴方好，山色空蒙雨亦奇。\n欲把西湖比西子，淡妆浓抹总相宜。', analysis: '苏轼任杭州通判时，游览西湖，晴天和雨天各有韵味，于是把西湖比作美女西施，从此西湖又被称为"西子湖"。' },
    { title: '枫桥夜泊', author: '张继', dynasty: '唐', place: '江苏苏州', year: 755, content: '月落乌啼霜满天，江枫渔火对愁眠。\n姑苏城外寒山寺，夜半钟声到客船。', analysis: '枫桥位于苏州，寒山寺至今仍在。张继落第后夜泊枫桥，听到寒山寺的钟声，写下这首诗。此诗甚至影响了日本，日本人至今有新年听寒山寺钟声的习俗。' },
    { title: '滕王阁序', author: '王勃', dynasty: '唐', place: '江西南昌', year: 675, content: '落霞与孤鹜齐飞，秋水共长天一色。\n渔舟唱晚，响穷彭蠡之滨；\n雁阵惊寒，声断衡阳之浦。', analysis: '滕王阁位于南昌，是江南三大名楼之一。王勃路过南昌，在滕王阁宴会上即席作序，年仅26岁。"落霞与孤鹜齐飞"被称为千古绝唱。' },
    { title: '岳阳楼记', author: '范仲淹', dynasty: '北宋', place: '湖南岳阳', year: 1046, content: '不以物喜，不以己悲。\n居庙堂之高则忧其民，处江湖之远则忧其君。\n先天下之忧而忧，后天下之乐而乐。', analysis: '岳阳楼位于湖南岳阳，俯瞰洞庭湖。范仲淹应滕子京之请作记，提出"先天下之忧而忧，后天下之乐而乐"，成为中国知识分子的精神追求。' },
    { title: '醉翁亭记', author: '欧阳修', dynasty: '北宋', place: '安徽滁州', year: 1046, content: '环滁皆山也。其西南诸峰，林壑尤美。\n...\n醉翁之意不在酒，在乎山水之间也。\n山水之乐，得之心而寓之酒也。', analysis: '欧阳修被贬滁州时，常与百姓游琅琊山，在醉翁亭宴饮。"醉翁之意不在酒"现在已成为常用成语，比喻本意不在此而在别的方面。' },
    { title: '泊船瓜洲', author: '王安石', dynasty: '北宋', place: '江苏扬州', year: 1075, content: '京口瓜洲一水间，钟山只隔数重山。\n春风又绿江南岸，明月何时照我还？', analysis: '瓜洲位于扬州，是运河入江口。王安石奉召进京，夜泊瓜洲，看到春江南绿，思念家乡钟山（南京）。"绿"字是他反复推敲才选定的。' },
    { title: '示儿', author: '陆游', dynasty: '南宋', place: '浙江绍兴', year: 1210, content: '死去元知万事空，但悲不见九州同。\n王师北定中原日，家祭无忘告乃翁。', analysis: '这是陆游85岁临终时写给儿子的遗嘱。他一生渴望收复中原，至死念念不忘，这首诗是他爱国精神的绝唱。' },
    { title: '永遇乐·京口北固亭怀古', author: '辛弃疾', dynasty: '南宋', place: '江苏镇江', year: 1205, content: '千古江山，英雄无觅，孙仲谋处。\n舞榭歌台，风流总被，雨打风吹去。\n...\n凭谁问：廉颇老矣，尚能饭否？', analysis: '京口就是镇江，北固亭在长江边。辛弃疾66岁时登北固亭，怀念孙权、刘裕等英雄，感叹自己年老仍想报国，是豪放词的代表作。' }
  ];

  // ========== 成语典故数据 ==========
  const IDIOMS = [
    { idiom: '卧薪尝胆', place: '浙江绍兴', year: -496, story: '春秋时越王勾践被吴王夫差打败，被迫求和。回国后他睡在柴草上，每天尝苦胆，提醒自己不忘耻辱。经过十年生聚十年教训，终于灭掉吴国。' },
    { idiom: '完璧归赵', place: '陕西西安', year: -283, story: '秦昭王想用十五座城换赵国的和氏璧，蔺相如带璧入秦，识破秦王无诚意，用计将璧完好带回赵国。' },
    { idiom: '负荆请罪', place: '河北邯郸', year: -279, story: '赵国大将廉颇不服蔺相如位在己上，处处刁难。蔺相如以国家为重一再避让。廉颇知道后，光着上身背着荆条上门请罪，两人成为刎颈之交。' },
    { idiom: '纸上谈兵', place: '山西高平', year: -260, story: '赵国名将赵奢之子赵括，年轻时熟读兵书，谈起用兵头头是道。但他只会照搬书本，长平之战中被秦将白起大败，40万赵军被坑杀。' },
    { idiom: '指鹿为马', place: '陕西西安', year: -207, story: '秦二世时，赵高想篡位，牵了一头鹿献给二世，说是马。群臣有的沉默，有的附和说是马，说实话的人后来都被赵高陷害。' },
    { idiom: '破釜沉舟', place: '河北平乡', year: -207, story: '项羽率军救赵，渡过漳河后，下令打破锅、凿沉船，只带三天干粮，表示有进无退。最终以少胜多大败秦军。' },
    { idiom: '四面楚歌', place: '安徽灵璧', year: -202, story: '项羽被刘邦围困在垓下，夜里听到四面汉营都唱起楚地的歌，以为楚地已全被汉军占领，军心瓦解，最终自刎乌江。' },
    { idiom: '约法三章', place: '陕西西安', year: -206, story: '刘邦攻入咸阳后，为了争取民心，宣布废除秦朝苛法，只定三条法律：杀人者死，伤人及盗抵罪。得到百姓拥护。' },
    { idiom: '三顾茅庐', place: '湖北襄阳', year: 207, story: '刘备为请诸葛亮出山，三次亲自到隆中拜访。前两次诸葛亮都不在，第三次才见到，两人纵论天下大势，即著名的"隆中对"。' },
    { idiom: '草船借箭', place: '湖北赤壁', year: 208, story: '赤壁之战前，周瑜要诸葛亮十天造十万支箭。诸葛亮用二十艘草船，趁大雾驶向曹营，曹操下令放箭，箭全射在草人上，诸葛亮得箭十万余支。' },
    { idiom: '乐不思蜀', place: '河南洛阳', year: 271, story: '蜀汉灭亡后，后主刘禅被迁到洛阳。司马昭问他想不想蜀国，刘禅说"此间乐，不思蜀"。后来用这个成语形容乐而忘返或乐而忘本。' },
    { idiom: '闻鸡起舞', place: '河南洛阳', year: 280, story: '晋代祖逖和刘琨是好朋友，都立志报国。他们每天听到鸡叫就起床练剑，后来祖逖成为北伐名将，刘琨也成为镇守并州的将领。' },
    { idiom: '投鞭断流', place: '安徽寿县', year: 383, story: '前秦苻坚率大军南下伐晋，骄傲地说："我的军队把马鞭投入长江，就能截断江水。"结果在淝水之战中被东晋以少胜多打败。' },
    { idiom: '草木皆兵', place: '安徽寿县', year: 383, story: '淝水之战中，苻坚登上寿阳城，看到晋军阵容严整，又远望八公山，把山上的草木都当成了晋军，开始感到害怕。' },
    { idiom: '入木三分', place: '浙江绍兴', year: 350, story: '东晋书法家王羲之的笔力雄劲，传说他写的字，墨迹能透入木板三分深。后来用这个成语形容书法有力，也比喻分析问题深刻。' },
    { idiom: '黄袍加身', place: '河南封丘', year: 960, story: '后周大将赵匡胤率军北上，行至陈桥驿，部下把一件黄袍披在他身上，高呼万岁。赵匡胤于是回师开封，建立宋朝。' },
    { idiom: '精忠报国', place: '河南汤阴', year: 1126, story: '岳飞从军前，母亲姚氏在他背上刺下"精忠报国"四个字，勉励他为国尽忠。岳飞后来成为抗金名将，这四个字成为他一生的写照。' },
    { idiom: '莫须有', place: '浙江杭州', year: 1142, story: '秦桧想害岳飞，韩世忠质问他有什么证据，秦桧说"其事体莫须有"（也许有吧）。岳飞最终被杀害，"莫须有"后来指凭空捏造的罪名。' },
    { idiom: '留取丹心', place: '北京', year: 1283, story: '文天祥抗元被俘，元朝百般劝降，他坚贞不屈，写下"人生自古谁无死，留取丹心照汗青"，最终从容就义。' },
    { idiom: '两袖清风', place: '河南洛阳', year: 1449, story: '明代于谦为官清廉，每次进京办事都不带礼品。有人劝他带点土特产，他甩甩袖子说："我只有两袖清风。"后来用这个成语形容为官清廉。' }
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

  // ========== 功能1：历史人物卡片 ==========
  let figurePanelOpen = false;
  let figureMarkersVisible = false;

  function toggleFigureMarkers() {
    figureMarkersVisible = !figureMarkersVisible;
    const btn = $('#figure-btn');
    if (btn) {
      btn.textContent = figureMarkersVisible ? '🏛️ 隐藏人物' : '🏛️ 人物';
      btn.classList.toggle('active', figureMarkersVisible);
    }
    if (figureMarkersVisible) {
      showFigureMarkers();
      showToast('地图上已标注历史人物，点击查看详情');
    } else {
      hideFigureMarkers();
    }
  }

  function showFigureMarkers() {
    hideFigureMarkers();
    const svg = document.querySelector('svg');
    if (!svg) return;

    // 为每个人物创建一个标记点（简化版：在地图上添加可点击的标记）
    // 由于无法精确知道每个城市的坐标，我们用城市名匹配的方式
    HISTORICAL_FIGURES.forEach((fig, idx) => {
      // 查找地图上是否有对应地名
      const cityLabels = $$('svg text.name');
      for (const label of cityLabels) {
        if (fig.place.includes(label.textContent.trim()) || label.textContent.includes(fig.place.substring(0, 2))) {
          const bbox = label.getBBox();
          const marker = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          marker.setAttribute('class', 'figure-marker');
          marker.setAttribute('data-index', idx);
          marker.style.cursor = 'pointer';

          const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          circle.setAttribute('cx', parseFloat(label.getAttribute('x') || bbox.x));
          circle.setAttribute('cy', parseFloat(label.getAttribute('y') || bbox.y) - 18);
          circle.setAttribute('r', 6);
          circle.setAttribute('class', 'figure-marker-dot');

          const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          text.setAttribute('x', parseFloat(label.getAttribute('x') || bbox.x));
          text.setAttribute('y', parseFloat(label.getAttribute('y') || bbox.y) - 22);
          text.setAttribute('text-anchor', 'middle');
          text.setAttribute('class', 'figure-marker-label');
          text.textContent = fig.name;

          marker.appendChild(circle);
          marker.appendChild(text);
          marker.addEventListener('click', () => showFigureCard(fig));
          svg.appendChild(marker);
          break;
        }
      }
    });
  }

  function hideFigureMarkers() {
    $$('.figure-marker').forEach(m => m.remove());
  }

  function showFigureCard(fig) {
    $('.figure-card')?.remove();
    const card = el('div', { class: 'figure-card detail-card' }, [
      el('div', { class: 'detail-card-header' }, [
        el('div', { class: 'detail-card-title' }, [
          el('span', { class: 'figure-name', text: fig.name }),
          el('span', { class: 'figure-title', text: fig.title })
        ]),
        el('button', { class: 'panel-close', text: '✕', onclick: 'this.closest(\'.figure-card\').remove()' })
      ]),
      el('div', { class: 'detail-card-body' }, [
        el('div', { class: 'figure-meta' }, [
          el('span', { text: '📅 ' + fig.life }),
          el('span', { text: '📍 ' + fig.place }),
          el('span', { text: '🏛️ ' + fig.dynasty })
        ]),
        el('div', { class: 'figure-deeds', text: fig.deeds }),
        el('div', { class: 'figure-quote' }, [
          el('div', { class: 'quote-label', text: '名言' }),
          el('div', { class: 'quote-text', text: '"' + fig.quote + '"' })
        ])
      ])
    ]);
    document.body.appendChild(card);
  }

  // ========== 功能2：诗词地图联动 ==========
  let poemMarkersVisible = false;

  function togglePoemMarkers() {
    poemMarkersVisible = !poemMarkersVisible;
    const btn = $('#poem-btn');
    if (btn) {
      btn.textContent = poemMarkersVisible ? '📖 隐藏诗词' : '📖 诗词';
      btn.classList.toggle('active', poemMarkersVisible);
    }
    if (poemMarkersVisible) {
      showPoemMarkers();
      showToast('地图上已标注诗词创作地，点击查看全诗');
    } else {
      hidePoemMarkers();
    }
  }

  function showPoemMarkers() {
    hidePoemMarkers();
    const svg = document.querySelector('svg');
    if (!svg) return;

    POEMS.forEach((poem, idx) => {
      const cityLabels = $$('svg text.name');
      for (const label of cityLabels) {
        if (poem.place.includes(label.textContent.trim()) || label.textContent.includes(poem.place.substring(0, 2))) {
          const bbox = label.getBBox();
          const marker = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          marker.setAttribute('class', 'poem-marker');
          marker.style.cursor = 'pointer';

          const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          circle.setAttribute('cx', parseFloat(label.getAttribute('x') || bbox.x) + 14);
          circle.setAttribute('cy', parseFloat(label.getAttribute('y') || bbox.y) - 14);
          circle.setAttribute('r', 5);
          circle.setAttribute('class', 'poem-marker-dot');

          marker.appendChild(circle);
          marker.addEventListener('click', () => showPoemCard(poem));
          svg.appendChild(marker);
          break;
        }
      }
    });
  }

  function hidePoemMarkers() {
    $$('.poem-marker').forEach(m => m.remove());
  }

  function showPoemCard(poem) {
    $('.poem-card')?.remove();
    const card = el('div', { class: 'poem-card detail-card' }, [
      el('div', { class: 'detail-card-header' }, [
        el('div', { class: 'detail-card-title' }, [
          el('span', { class: 'poem-title', text: poem.title }),
          el('span', { class: 'poem-author', text: '【' + poem.dynasty + '】' + poem.author })
        ]),
        el('button', { class: 'panel-close', text: '✕', onclick: 'this.closest(\'.poem-card\').remove()' })
      ]),
      el('div', { class: 'detail-card-body' }, [
        el('div', { class: 'poem-place', text: '📍 创作地：' + poem.place + '（约' + formatYear(poem.year) + '年）' }),
        el('div', { class: 'poem-content', html: poem.content.replace(/\n/g, '<br>') }),
        el('div', { class: 'poem-analysis' }, [
          el('div', { class: 'analysis-label', text: '赏析' }),
          el('div', { class: 'analysis-text', text: poem.analysis })
        ])
      ])
    ]);
    document.body.appendChild(card);
  }

  // ========== 功能3：学习闯关模式 ==========
  let challengePanelOpen = false;

  const CHALLENGE_LEVELS = [
    { id: 1, name: '先秦风云', dynasty: '先秦', questions: [
      { q: '三家分晋发生在哪一年？', options: ['前403年', '前221年', '前356年', '前260年'], answer: 0 },
      { q: '商鞅变法发生在哪个国家？', options: ['齐国', '楚国', '秦国', '赵国'], answer: 2 },
      { q: '长平之战中，赵国的主将是谁？', options: ['廉颇', '赵括', '李牧', '白起'], answer: 1 },
      { q: '屈原是哪个国家的大夫？', options: ['齐国', '楚国', '燕国', '韩国'], answer: 1 },
      { q: '《孙子兵法》的作者是谁？', options: ['孙膑', '孙武', '吴起', '白起'], answer: 1 }
    ]},
    { id: 2, name: '秦汉一统', dynasty: '秦汉', questions: [
      { q: '秦始皇统一六国是在哪一年？', options: ['前221年', '前202年', '前210年', '前230年'], answer: 0 },
      { q: '楚汉之争中，刘邦的对手是谁？', options: ['项羽', '韩信', '陈胜', '吴广'], answer: 0 },
      { q: '丝绸之路的开拓者是谁？', options: ['班超', '张骞', '卫青', '霍去病'], answer: 1 },
      { q: '《史记》的作者是谁？', options: ['班固', '司马迁', '司马光', '陈寿'], answer: 1 },
      { q: '王莽篡汉建立的朝代叫什么？', options: ['新', '东汉', '魏', '晋'], answer: 0 }
    ]},
    { id: 3, name: '三国鼎立', dynasty: '三国', questions: [
      { q: '官渡之战的双方是谁？', options: ['曹操vs袁绍', '曹操vs刘备', '孙权vs曹操', '刘备vs孙权'], answer: 0 },
      { q: '赤壁之战发生在哪一年？', options: ['200年', '208年', '220年', '222年'], answer: 1 },
      { q: '蜀汉丞相是谁？', options: ['关羽', '张飞', '诸葛亮', '赵云'], answer: 2 },
      { q: '三国中最后灭亡的是？', options: ['魏', '蜀', '吴', '同时灭亡'], answer: 2 },
      { q: '"乐不思蜀"说的是谁？', options: ['刘备', '刘禅', '刘封', '刘永'], answer: 1 }
    ]},
    { id: 4, name: '魏晋风度', dynasty: '魏晋', questions: [
      { q: '西晋统一三国是在哪一年？', options: ['265年', '280年', '300年', '316年'], answer: 1 },
      { q: '八王之乱发生在哪个朝代？', options: ['东汉', '曹魏', '西晋', '东晋'], answer: 2 },
      { q: '淝水之战中东晋的统帅是谁？', options: ['谢安', '谢玄', '桓温', '祖逖'], answer: 1 },
      { q: '《兰亭集序》的作者是谁？', options: ['王羲之', '王献之', '颜真卿', '柳公权'], answer: 0 },
      { q: '北魏孝文帝改革的核心是什么？', options: ['汉化', '胡化', '军事化', '商业化'], answer: 0 }
    ]},
    { id: 5, name: '隋唐盛世', dynasty: '隋唐', questions: [
      { q: '隋朝统一南北是在哪一年？', options: ['581年', '589年', '605年', '618年'], answer: 1 },
      { q: '贞观之治是哪位皇帝时期？', options: ['唐高祖', '唐太宗', '唐高宗', '唐玄宗'], answer: 1 },
      { q: '中国历史上唯一的女皇帝是谁？', options: ['慈禧', '吕后', '武则天', '萧太后'], answer: 2 },
      { q: '安史之乱发生在哪一年？', options: ['755年', '763年', '700年', '800年'], answer: 0 },
      { q: '被称为"诗仙"的是谁？', options: ['杜甫', '李白', '白居易', '王维'], answer: 1 }
    ]},
    { id: 6, name: '宋元风云', dynasty: '宋元', questions: [
      { q: '陈桥兵变建立的朝代是？', options: ['后周', '北宋', '南宋', '辽'], answer: 1 },
      { q: '澶渊之盟是北宋和哪个国家签订的？', options: ['西夏', '金', '辽', '蒙古'], answer: 2 },
      { q: '靖康之变发生在哪一年？', options: ['1125年', '1127年', '1141年', '1279年'], answer: 1 },
      { q: '抗金名将岳飞被谁陷害？', options: ['秦桧', '高俅', '蔡京', '童贯'], answer: 0 },
      { q: '元朝的建立者是谁？', options: ['成吉思汗', '忽必烈', '窝阔台', '蒙哥'], answer: 1 }
    ]},
    { id: 7, name: '明清更替', dynasty: '明清', questions: [
      { q: '明朝的建立者是谁？', options: ['朱元璋', '朱棣', '朱允炆', '李自成'], answer: 0 },
      { q: '郑和下西洋最远到达哪里？', options: ['东南亚', '印度', '非洲东海岸', '欧洲'], answer: 2 },
      { q: '《本草纲目》的作者是谁？', options: ['华佗', '张仲景', '李时珍', '孙思邈'], answer: 2 },
      { q: '清军入关是在哪一年？', options: ['1644年', '1636年', '1661年', '1683年'], answer: 0 },
      { q: '《红楼梦》的作者是谁？', options: ['罗贯中', '施耐庵', '吴承恩', '曹雪芹'], answer: 3 }
    ]}
  ];

  function getChallengeProgress() {
    try {
      return JSON.parse(localStorage.getItem('jiangshan_challenge') || '{}');
    } catch { return {}; }
  }

  function saveChallengeProgress(progress) {
    localStorage.setItem('jiangshan_challenge', JSON.stringify(progress));
  }

  function toggleChallengePanel() {
    if (challengePanelOpen) {
      closeChallengePanel();
      return;
    }
    openChallengePanel();
  }

  function openChallengePanel() {
    challengePanelOpen = true;
    const progress = getChallengeProgress();

    const panel = el('div', { id: 'challenge-panel', class: 'challenge-panel' }, [
      el('div', { class: 'challenge-header' }, [
        el('span', { text: '🏆 历史闯关' }),
        el('button', { class: 'panel-close', text: '✕', onclick: 'window.__jiangshan_phase3.closeChallengePanel()' })
      ]),
      el('div', { class: 'challenge-body', id: 'challenge-body' })
    ]);
    document.body.appendChild(panel);
    renderChallengeLevels();
  }

  function renderChallengeLevels() {
    const body = $('#challenge-body');
    if (!body) return;
    const progress = getChallengeProgress();

    body.innerHTML = '';
    body.appendChild(el('div', { class: 'challenge-intro', text: '按朝代顺序闯关，每关5题，答对4题即可通关，解锁下一关！' }));

    const levelsDiv = el('div', { class: 'challenge-levels' });
    CHALLENGE_LEVELS.forEach((level, idx) => {
      const passed = progress[level.id]?.passed;
      const score = progress[level.id]?.score || 0;
      const unlocked = idx === 0 || progress[CHALLENGE_LEVELS[idx - 1].id]?.passed;

      const levelDiv = el('div', {
        class: 'challenge-level' + (passed ? ' passed' : '') + (!unlocked ? ' locked' : ''),
        onclick: unlocked ? `window.__jiangshan_phase3.startChallenge(${level.id})` : ''
      }, [
        el('div', { class: 'level-num', text: passed ? '✅' : (unlocked ? idx + 1 : '🔒') }),
        el('div', { class: 'level-info' }, [
          el('div', { class: 'level-name', text: level.name }),
          el('div', { class: 'level-desc', text: passed ? `已通关 · ${score}/5分` : (unlocked ? '点击开始挑战' : '通关上一关解锁') })
        ])
      ]);
      levelsDiv.appendChild(levelDiv);
    });
    body.appendChild(levelsDiv);

    // 统计
    const passedCount = CHALLENGE_LEVELS.filter(l => progress[l.id]?.passed).length;
    body.appendChild(el('div', { class: 'challenge-stats', text: `通关进度：${passedCount}/${CHALLENGE_LEVELS.length} 关` }));
  }

  function startChallenge(levelId) {
    const level = CHALLENGE_LEVELS.find(l => l.id === levelId);
    if (!level) return;

    const body = $('#challenge-body');
    if (!body) return;

    let currentQ = 0;
    let score = 0;

    function renderQuestion() {
      if (currentQ >= level.questions.length) {
        // 闯关结束
        const passed = score >= 4;
        const progress = getChallengeProgress();
        progress[levelId] = { passed, score };
        saveChallengeProgress(progress);

        body.innerHTML = '';
        body.appendChild(el('div', { class: 'challenge-result ' + (passed ? 'pass' : 'fail') }, [
          el('div', { class: 'result-title', text: passed ? '🎉 恭喜通关！' : '😢 挑战失败' }),
          el('div', { class: 'result-score', text: `得分：${score}/${level.questions.length}` }),
          el('div', { class: 'result-desc', text: passed ? '你已解锁下一关！' : '答对4题才能通关，再试一次吧！' }),
          el('div', { class: 'result-actions' }, [
            el('button', { class: 'result-btn', text: '返回关卡', onclick: 'window.__jiangshan_phase3.renderChallengeLevels()' }),
            !passed ? el('button', { class: 'result-btn retry', text: '重新挑战', onclick: `window.__jiangshan_phase3.startChallenge(${levelId})` }) : null
          ].filter(Boolean))
        ]));
        return;
      }

      const q = level.questions[currentQ];
      body.innerHTML = '';
      body.appendChild(el('div', { class: 'challenge-progress', text: `第 ${currentQ + 1}/${level.questions.length} 题 · ${level.name}` }));
      body.appendChild(el('div', { class: 'challenge-question', text: q.q }));

      const optsDiv = el('div', { class: 'challenge-options' });
      q.options.forEach((opt, i) => {
        const btn = el('button', { class: 'challenge-option', text: opt });
        btn.onclick = function () {
          if (i === q.answer) {
            score++;
            btn.classList.add('correct');
          } else {
            btn.classList.add('wrong');
            optsDiv.children[q.answer].classList.add('correct');
          }
          $$('.challenge-option').forEach(b => b.disabled = true);
          setTimeout(() => { currentQ++; renderQuestion(); }, 1000);
        };
        optsDiv.appendChild(btn);
      });
      body.appendChild(optsDiv);
    }

    renderQuestion();
  }

  function closeChallengePanel() {
    challengePanelOpen = false;
    $('#challenge-panel')?.remove();
  }

  // ========== 功能4：成语典故地图 ==========
  let idiomMarkersVisible = false;

  function toggleIdiomMarkers() {
    idiomMarkersVisible = !idiomMarkersVisible;
    const btn = $('#idiom-btn');
    if (btn) {
      btn.textContent = idiomMarkersVisible ? '📜 隐藏成语' : '📜 成语';
      btn.classList.toggle('active', idiomMarkersVisible);
    }
    if (idiomMarkersVisible) {
      showIdiomMarkers();
      showToast('地图上已标注成语典故发生地，点击查看故事');
    } else {
      hideIdiomMarkers();
    }
  }

  function showIdiomMarkers() {
    hideIdiomMarkers();
    const svg = document.querySelector('svg');
    if (!svg) return;

    IDIOMS.forEach((idiom, idx) => {
      const cityLabels = $$('svg text.name');
      for (const label of cityLabels) {
        if (idiom.place.includes(label.textContent.trim()) || label.textContent.includes(idiom.place.substring(0, 2))) {
          const bbox = label.getBBox();
          const marker = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          marker.setAttribute('class', 'idiom-marker');
          marker.style.cursor = 'pointer';

          const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          circle.setAttribute('cx', parseFloat(label.getAttribute('x') || bbox.x) - 14);
          circle.setAttribute('cy', parseFloat(label.getAttribute('y') || bbox.y) - 14);
          circle.setAttribute('r', 5);
          circle.setAttribute('class', 'idiom-marker-dot');

          marker.appendChild(circle);
          marker.addEventListener('click', () => showIdiomCard(idiom));
          svg.appendChild(marker);
          break;
        }
      }
    });
  }

  function hideIdiomMarkers() {
    $$('.idiom-marker').forEach(m => m.remove());
  }

  function showIdiomCard(idiom) {
    $('.idiom-card')?.remove();
    const card = el('div', { class: 'idiom-card detail-card' }, [
      el('div', { class: 'detail-card-header' }, [
        el('div', { class: 'detail-card-title' }, [
          el('span', { class: 'idiom-title', text: idiom.idiom }),
          el('span', { class: 'idiom-place', text: '📍 ' + idiom.place + ' · ' + formatYear(idiom.year) + '年' })
        ]),
        el('button', { class: 'panel-close', text: '✕', onclick: 'this.closest(\'.idiom-card\').remove()' })
      ]),
      el('div', { class: 'detail-card-body' }, [
        el('div', { class: 'idiom-story-label', text: '典故故事' }),
        el('div', { class: 'idiom-story', text: idiom.story })
      ])
    ]);
    document.body.appendChild(card);
  }

  // ========== 注入工具栏按钮 ==========
  function injectToolbar() {
    const toolbar = $('.learning-toolbar');
    if (!toolbar) return;

    const btns = [
      { id: 'figure-btn', class: 'action-btn subtle learning-btn', title: '历史人物', text: '🏛️ 人物', onclick: 'window.__jiangshan_phase3.toggleFigureMarkers()' },
      { id: 'poem-btn', class: 'action-btn subtle learning-btn', title: '诗词地图', text: '📖 诗词', onclick: 'window.__jiangshan_phase3.togglePoemMarkers()' },
      { id: 'challenge-btn', class: 'action-btn subtle learning-btn', title: '学习闯关', text: '🏆 闯关', onclick: 'window.__jiangshan_phase3.toggleChallengePanel()' },
      { id: 'idiom-btn', class: 'action-btn subtle learning-btn', title: '成语典故', text: '📜 成语', onclick: 'window.__jiangshan_phase3.toggleIdiomMarkers()' }
    ];

    btns.forEach(b => {
      const btn = el('button', { id: b.id, class: b.class, title: b.title, onclick: b.onclick }, [el('span', { text: b.text })]);
      toolbar.appendChild(btn);
    });
  }

  // ========== 暴露全局 ==========
  window.__jiangshan_phase3 = {
    toggleFigureMarkers,
    togglePoemMarkers,
    toggleChallengePanel,
    startChallenge,
    renderChallengeLevels,
    closeChallengePanel,
    toggleIdiomMarkers
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
