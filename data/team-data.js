/* ============================================================
   红魔看台 · 数据层
   所有赛程、阵容、荣誉均来自曼联官网 / 英超官网公开信息整理。
   纯静态数据，无后端、无数据库，直接挂在全局 RDS 上供页面读取。
   数据截至 2026 年 11 月 6 日。
   ============================================================ */

const RDS = {

  /* ---------- 俱乐部基本信息 ---------- */
  club: {
    name: "Manchester United",
    cnName: "曼彻斯特联",
    nick: "Red Devils 红魔",
    founded: 1878,
    originalName: "Newton Heath LYR",
    renamed: 1902,
    stadium: "Old Trafford 老特拉福德",
    stadiumSince: 1910,
    capacity: 74310,
    manager: "Michael Carrick 卡里克（临时主帅）",
    leaguePosition: 16,
    seasonRecord: { played: 9, won: 1, drawn: 4, lost: 4, gf: 10, ga: 13, points: 7 }
  },

  /* ---------- 下一场比赛（首页倒计时用） ---------- */
  nextMatch: {
    date: "2026-11-08T16:30:00",
    competition: "Premier League 英超",
    round: "第 10 轮",
    home: "Manchester United",
    away: "Aston Villa",
    venue: "Old Trafford 老特拉福德"
  },

  /* ---------- 赛程与赛果 ----------
     played: 是否已赛；home/away 为双方名称；
     homeScore/awayScore 为对应比分，未赛为 null。
     isHome 判断曼联是否主场。 -------------------------------- */
  fixtures: [
    // ===== 已赛（英超 1-9 轮）=====
    { date: "2026-08-22T13:30:00", competition: "PL", round: 1, home: "Hull City", away: "Manchester United", homeScore: 2, awayScore: 0, venue: "MKM Stadium", played: true },
    { date: "2026-08-30T17:30:00", competition: "PL", round: 2, home: "Manchester United", away: "Ipswich Town", homeScore: 5, awayScore: 2, venue: "Old Trafford", played: true },
    { date: "2026-09-06T15:00:00", competition: "PL", round: 3, home: "Everton", away: "Manchester United", homeScore: 2, awayScore: 2, venue: "Goodison Park", played: true },
    { date: "2026-09-13T17:30:00", competition: "PL", round: 4, home: "Manchester United", away: "Manchester City", homeScore: 0, awayScore: 1, venue: "Old Trafford", played: true },
    { date: "2026-09-20T17:30:00", competition: "PL", round: 5, home: "Fulham", away: "Manchester United", homeScore: 1, awayScore: 1, venue: "Craven Cottage", played: true },
    { date: "2026-10-10T18:30:00", competition: "PL", round: 6, home: "Manchester United", away: "Tottenham Hotspur", homeScore: 1, awayScore: 1, venue: "Old Trafford", played: true },
    { date: "2026-10-18T15:00:00", competition: "PL", round: 7, home: "Leeds United", away: "Manchester United", homeScore: 1, awayScore: 1, venue: "Elland Road", played: true },
    { date: "2026-10-25T15:00:00", competition: "PL", round: 8, home: "Manchester United", away: "Bournemouth", homeScore: 0, awayScore: 3, venue: "Old Trafford", played: true },
    { date: "2026-10-31T13:30:00", competition: "PL", round: 9, home: "Chelsea", away: "Manchester United", homeScore: 2, awayScore: 0, venue: "Stamford Bridge", played: true },

    // ===== 欧冠（已知赛程）=====
    { date: "2026-11-03T20:00:00", competition: "UCL", round: "联赛阶段", home: "Manchester United", away: "Roma", homeScore: null, awayScore: null, venue: "Old Trafford", played: true, pending: true },
    { date: "2026-11-25T20:00:00", competition: "UCL", round: "联赛阶段", home: "Sporting CP", away: "Manchester United", homeScore: null, awayScore: null, venue: "Estádio José Alvalade", played: false },

    // ===== 未赛（英超 10-38 轮，按时间顺序）=====
    { date: "2026-11-08T16:30:00", competition: "PL", round: 10, home: "Manchester United", away: "Aston Villa", homeScore: null, awayScore: null, venue: "Old Trafford", played: false },
    { date: "2026-11-22T16:30:00", competition: "PL", round: 11, home: "Liverpool", away: "Manchester United", homeScore: null, awayScore: null, venue: "Anfield", played: false },
    { date: "2026-11-28T15:00:00", competition: "PL", round: 12, home: "Manchester United", away: "Brentford", homeScore: null, awayScore: null, venue: "Old Trafford", played: false },
    { date: "2026-12-02T21:00:00", competition: "PL", round: 13, home: "Newcastle United", away: "Manchester United", homeScore: null, awayScore: null, venue: "St James' Park", played: false },
    { date: "2026-12-05T16:00:00", competition: "PL", round: 14, home: "Manchester United", away: "Coventry City", homeScore: null, awayScore: null, venue: "Old Trafford", played: false },
    { date: "2026-12-12T16:00:00", competition: "PL", round: 15, home: "Crystal Palace", away: "Manchester United", homeScore: null, awayScore: null, venue: "Selhurst Park", played: false },
    { date: "2026-12-19T16:00:00", competition: "PL", round: 16, home: "Arsenal", away: "Manchester United", homeScore: null, awayScore: null, venue: "Emirates Stadium", played: false },
    { date: "2026-12-26T16:00:00", competition: "PL", round: 17, home: "Manchester United", away: "Nottingham Forest", homeScore: null, awayScore: null, venue: "Old Trafford", played: false },
    { date: "2026-12-30T21:00:00", competition: "PL", round: 18, home: "Manchester United", away: "Sunderland", homeScore: null, awayScore: null, venue: "Old Trafford", played: false },
    { date: "2027-01-02T16:00:00", competition: "PL", round: 19, home: "Brighton & Hove Albion", away: "Manchester United", homeScore: null, awayScore: null, venue: "Amex Stadium", played: false },
    { date: "2027-01-06T21:00:00", competition: "PL", round: 20, home: "Manchester United", away: "Newcastle United", homeScore: null, awayScore: null, venue: "Old Trafford", played: false },
    { date: "2027-01-16T16:00:00", competition: "PL", round: 21, home: "Aston Villa", away: "Manchester United", homeScore: null, awayScore: null, venue: "Villa Park", played: false },
    { date: "2027-01-23T16:00:00", competition: "PL", round: 22, home: "Manchester United", away: "Liverpool", homeScore: null, awayScore: null, venue: "Old Trafford", played: false },
    { date: "2027-01-30T16:00:00", competition: "PL", round: 23, home: "Brentford", away: "Manchester United", homeScore: null, awayScore: null, venue: "Gtech Community Stadium", played: false },
    { date: "2027-02-06T16:00:00", competition: "PL", round: 24, home: "Manchester United", away: "Chelsea", homeScore: null, awayScore: null, venue: "Old Trafford", played: false },
    { date: "2027-02-10T21:00:00", competition: "PL", round: 25, home: "Manchester United", away: "Brighton & Hove Albion", homeScore: null, awayScore: null, venue: "Old Trafford", played: false },
    { date: "2027-02-20T16:00:00", competition: "PL", round: 26, home: "Nottingham Forest", away: "Manchester United", homeScore: null, awayScore: null, venue: "City Ground", played: false },
    { date: "2027-02-27T16:00:00", competition: "PL", round: 27, home: "Manchester United", away: "Arsenal", homeScore: null, awayScore: null, venue: "Old Trafford", played: false },
    { date: "2027-03-03T21:00:00", competition: "PL", round: 28, home: "Sunderland", away: "Manchester United", homeScore: null, awayScore: null, venue: "Stadium of Light", played: false },
    { date: "2027-03-13T16:00:00", competition: "PL", round: 29, home: "Manchester United", away: "Everton", homeScore: null, awayScore: null, venue: "Old Trafford", played: false },
    { date: "2027-03-20T16:00:00", competition: "PL", round: 30, home: "Manchester City", away: "Manchester United", homeScore: null, awayScore: null, venue: "Etihad Stadium", played: false },
    { date: "2027-04-10T16:00:00", competition: "PL", round: 31, home: "Manchester United", away: "Hull City", homeScore: null, awayScore: null, venue: "Old Trafford", played: false },
    { date: "2027-04-17T16:00:00", competition: "PL", round: 32, home: "Ipswich Town", away: "Manchester United", homeScore: null, awayScore: null, venue: "Portman Road", played: false },
    { date: "2027-04-24T16:00:00", competition: "PL", round: 33, home: "Manchester United", away: "Crystal Palace", homeScore: null, awayScore: null, venue: "Old Trafford", played: false },
    { date: "2027-05-01T16:00:00", competition: "PL", round: 34, home: "Coventry City", away: "Manchester United", homeScore: null, awayScore: null, venue: "Coventry Building Society Arena", played: false },
    { date: "2027-05-08T16:00:00", competition: "PL", round: 35, home: "Bournemouth", away: "Manchester United", homeScore: null, awayScore: null, venue: "Vitality Stadium", played: false },
    { date: "2027-05-15T16:00:00", competition: "PL", round: 36, home: "Manchester United", away: "Leeds United", homeScore: null, awayScore: null, venue: "Old Trafford", played: false },
    { date: "2027-05-23T16:00:00", competition: "PL", round: 37, home: "Tottenham Hotspur", away: "Manchester United", homeScore: null, awayScore: null, venue: "Tottenham Hotspur Stadium", played: false },
    { date: "2027-05-30T17:00:00", competition: "PL", round: 38, home: "Manchester United", away: "Fulham", homeScore: null, awayScore: null, venue: "Old Trafford", played: false }
  ],

  /* ---------- 一线队阵容（官方 30 人）---------- */
  squad: [
    // 门将
    { number: 1, name: "Senne Lammens", position: "GK", nation: "比利时", nationCode: "BEL" },
    { number: 12, name: "Karl Darlow", position: "GK", nation: "威尔士", nationCode: "WAL" },
    { number: 22, name: "Tom Heaton", position: "GK", nation: "英格兰", nationCode: "ENG" },
    { number: 45, name: "Dermot Mee", position: "GK", nation: "北爱尔兰", nationCode: "NIR" },
    // 后卫
    { number: 2, name: "Diogo Dalot", position: "DF", nation: "葡萄牙", nationCode: "POR" },
    { number: 3, name: "Noussair Mazraoui", position: "DF", nation: "摩洛哥", nationCode: "MAR" },
    { number: 4, name: "Matthijs de Ligt", position: "DF", nation: "荷兰", nationCode: "NED" },
    { number: 5, name: "Harry Maguire", position: "DF", nation: "英格兰", nationCode: "ENG" },
    { number: 6, name: "Lisandro Martínez", position: "DF", nation: "阿根廷", nationCode: "ARG" },
    { number: 13, name: "Patrick Dorgu", position: "DF", nation: "丹麦", nationCode: "DEN" },
    { number: 15, name: "Leny Yoro", position: "DF", nation: "法国", nationCode: "FRA" },
    { number: 23, name: "Luke Shaw", position: "DF", nation: "英格兰", nationCode: "ENG" },
    { number: 26, name: "Ayden Heaven", position: "DF", nation: "英格兰", nationCode: "ENG" },
    { number: 41, name: "Harry Amass", position: "DF", nation: "英格兰", nationCode: "ENG" },
    // 中场
    { number: 7, name: "Mason Mount", position: "MF", nation: "英格兰", nationCode: "ENG" },
    { number: 8, name: "Bruno Fernandes", position: "MF", nation: "葡萄牙", nationCode: "POR", captain: true },
    { number: 17, name: "Andrey Santos", position: "MF", nation: "巴西", nationCode: "BRA" },
    { number: 18, name: "Youri Tielemans", position: "MF", nation: "比利时", nationCode: "BEL" },
    { number: 20, name: "Carlos Baleba", position: "MF", nation: "喀麦隆", nationCode: "CMR" },
    { number: 25, name: "Manuel Ugarte", position: "MF", nation: "乌拉圭", nationCode: "URU" },
    { number: 37, name: "Kobbie Mainoo", position: "MF", nation: "英格兰", nationCode: "ENG" },
    { number: 38, name: "Jack Fletcher", position: "MF", nation: "英格兰", nationCode: "ENG" },
    { number: 39, name: "Tyler Fletcher", position: "MF", nation: "苏格兰", nationCode: "SCO" },
    // 前锋
    { number: 9, name: "Marcus Rashford", position: "FW", nation: "英格兰", nationCode: "ENG" },
    { number: 10, name: "Matheus Cunha", position: "FW", nation: "巴西", nationCode: "BRA" },
    { number: 11, name: "Joshua Zirkzee", position: "FW", nation: "荷兰", nationCode: "NED" },
    { number: 16, name: "Amad Diallo", position: "FW", nation: "科特迪瓦", nationCode: "CIV" },
    { number: 19, name: "Bryan Mbeumo", position: "FW", nation: "喀麦隆", nationCode: "CMR" },
    { number: 30, name: "Benjamin Šeško", position: "FW", nation: "斯洛文尼亚", nationCode: "SVN" },
    { number: 31, name: "Shea Lacey", position: "FW", nation: "英格兰", nationCode: "ENG" }
  ],

  /* ---------- 荣誉墙（官方公开数据）---------- */
  honours: [
    { name: "英格兰顶级联赛冠军", count: 20, note: "历史纪录", years: "1908 – 2013 共 20 次" },
    { name: "足总杯", count: 12, note: "历史纪录", years: "1909 – 2024 共 12 次" },
    { name: "欧洲冠军联赛 / 冠军杯", count: 3, note: "1968 · 1999 · 2008", years: "英格兰首批登顶欧洲的俱乐部之一" },
    { name: "欧联杯", count: 1, note: "2017", years: "由此集齐欧冠、欧联、优胜者杯三大欧洲锦标" },
    { name: "欧洲优胜者杯", count: 1, note: "1991", years: "欧洲超级杯同年加冕" },
    { name: "世俱杯 / 丰田杯", count: 1, note: "2008", years: "1999 丰田杯、2008 世俱杯" }
  ],

  /* ---------- 队史时间线 ---------- */
  timeline: [
    { year: 1878, title: "牛顿希斯成立", text: "兰开夏与约克郡铁路公司的工人组建 Newton Heath LYR，这是曼联的起点。" },
    { year: 1902, title: "更名曼彻斯特联", text: "俱乐部濒临破产后获救，正式改名为 Manchester United，红色成为主色。" },
    { year: 1910, title: "迁入老特拉福德", text: "“梦想剧场”启用，此后一百多年一直是曼联的主场。" },
    { year: 1958, title: "慕尼黑空难", text: "2 月 6 日，巴斯比宝贝的班机在慕尼黑雪地里失事，8 名球员罹难，俱乐部历史上最黑暗的一天。" },
    { year: 1968, title: "首夺欧洲冠军杯", text: "温布利球场 4–1 击败本菲卡，博比·查尔顿与乔治·贝斯特领军，成为第一支捧起欧冠的英格兰球队。" },
    { year: 1986, title: "弗格森上任", text: "阿历克斯·弗格森接过教鞭，开启长达 27 年的红色王朝。" },
    { year: 1999, title: "三冠王", text: "诺坎普欧冠决赛补时连入两球 2–1 逆转拜仁，加上英超与足总杯，成就英格兰史上第一个三冠王。" },
    { year: 2008, title: "第三座欧冠", text: "莫斯科雨夜点球击败切尔西，范德萨扑出阿内尔卡的点球，红魔再次站上欧洲之巅。" },
    { year: 2017, title: "欧联杯登顶", text: "拿下欧联杯，成为少数集齐欧洲三大杯的俱乐部。" }
  ],

  /* ---------- 队史传奇 ---------- */
  legends: [
    { name: "Bobby Charlton", cn: "博比·查尔顿", era: "1956–1973", position: "前锋/中场", text: "慕尼黑空难幸存者，1966 年世界杯冠军，1968 年欧冠队长，绅士与重炮的代名词，长期保持队史进球纪录。" },
    { name: "George Best", cn: "乔治·贝斯特", era: "1963–1974", position: "边锋", text: "1968 年金球奖，华丽到被称为“第五个披头士”，天赋与不羁同样传奇。" },
    { name: "Denis Law", cn: "丹尼斯·劳", era: "1962–1973", position: "前锋", text: "“国王”丹尼斯·劳，与查尔顿、贝斯特组成神圣三圣，倒钩与抢点是招牌。" },
    { name: "Peter Schmeichel", cn: "舒梅切尔", era: "1991–1999", position: "门将", text: "公认的史上最伟大门将之一，1999 年以队长身份捧起欧冠，门前一道不可逾越的墙。" },
    { name: "Eric Cantona", cn: "坎通纳", era: "1992–1997", position: "前锋", text: "竖起衣领的“国王埃里克”，是弗格森王朝的精神开关，气场与技术同样拉满。" },
    { name: "Roy Keane", cn: "罗伊·基恩", era: "1993–2005", position: "中场", text: "三冠王的铁血队长，拼抢、传球与求胜欲都到了极致，中场绝对的硬骨头。" },
    { name: "Ryan Giggs", cn: "吉格斯", era: "1990–2014", position: "边锋", text: "963 次出场列队史第一，13 座英超冠军，边路奔袭了整整一代人的青春。" },
    { name: "Paul Scholes", cn: "斯科尔斯", era: "1993–2013", position: "中场", text: "低调的中场大师，一脚长传和后插上远射堪称教科书，连对手都想学他踢球。" },
    { name: "David Beckham", cn: "贝克汉姆", era: "1992–2003", position: "中场", text: "贝氏弧线与无尽奔跑，1999 年三冠王的重要拼图，红魔青训的金字招牌。" },
    { name: "Wayne Rooney", cn: "鲁尼", era: "2004–2017", position: "前锋", text: "250 粒进球列队史射手王，能传能射能回防，把巅峰全部留给了红魔。" },
    { name: "Cristiano Ronaldo", cn: "C 罗", era: "2003–2009", position: "边锋/前锋", text: "在老特拉福德从天才少年成长为 2008 年金球先生，带队拿下第三座欧冠。" },
    { name: "Nemanja Vidić", cn: "维迪奇", era: "2006–2014", position: "中后卫", text: "铁血中卫，头球与铲抢凶悍，与费迪南德组成让对手绝望的中卫搭档。" },
    { name: "Edwin van der Sar", cn: "范德萨", era: "2005–2011", position: "门将", text: "2008 年莫斯科雨夜扑出关键点球，冷静优雅的门神，高龄仍是定海神针。" },
    { name: "Ole Gunnar Solskjær", cn: "索尔斯克亚", era: "1996–2007", position: "前锋", text: "1999 年欧冠决赛补时绝杀的“超级替补”，后来又以主帅身份回到梦剧场。" }
  ]
};

/* 工具函数：判断某场比赛曼联是否主场 */
RDS.isUnitedHome = function (m) {
  return m.home === "Manchester United";
};
