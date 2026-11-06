/* ============================================================
   Red Devils Stand · Data layer
   All fixtures, squad and honours are compiled from public
   information on manutd.com / premierleague.com.
   Static data only — no backend, no database — attached to the
   global RDS object for the pages to read.
   Data correct as of 6 November 2026.
   ============================================================ */

const RDS = {

  /* ---------- Club basics ---------- */
  club: {
    name: "Manchester United",
    nick: "Red Devils",
    founded: 1878,
    originalName: "Newton Heath LYR",
    renamed: 1902,
    stadium: "Old Trafford",
    stadiumSince: 1910,
    capacity: 74310,
    manager: "Michael Carrick (interim)",
    leaguePosition: 16,
    seasonRecord: { played: 9, won: 1, drawn: 4, lost: 4, gf: 10, ga: 13, points: 7 }
  },

  /* ---------- Next match (home countdown) ---------- */
  nextMatch: {
    date: "2026-11-08T16:30:00",
    competition: "Premier League",
    round: "Matchweek 10",
    home: "Manchester United",
    away: "Aston Villa",
    venue: "Old Trafford"
  },

  /* ---------- Fixtures and results ----------
     played: whether the match has taken place; home/away are the
     two teams; homeScore/awayScore are the score (null if not played).
     isUnitedHome tells whether Manchester United are at home. ------ */
  fixtures: [
    // ===== Played (Premier League, matchweeks 1-9) =====
    { date: "2026-08-22T13:30:00", competition: "PL", round: 1, home: "Hull City", away: "Manchester United", homeScore: 2, awayScore: 0, venue: "MKM Stadium", played: true },
    { date: "2026-08-30T17:30:00", competition: "PL", round: 2, home: "Manchester United", away: "Ipswich Town", homeScore: 5, awayScore: 2, venue: "Old Trafford", played: true },
    { date: "2026-09-06T15:00:00", competition: "PL", round: 3, home: "Everton", away: "Manchester United", homeScore: 2, awayScore: 2, venue: "Goodison Park", played: true },
    { date: "2026-09-13T17:30:00", competition: "PL", round: 4, home: "Manchester United", away: "Manchester City", homeScore: 0, awayScore: 1, venue: "Old Trafford", played: true },
    { date: "2026-09-20T17:30:00", competition: "PL", round: 5, home: "Fulham", away: "Manchester United", homeScore: 1, awayScore: 1, venue: "Craven Cottage", played: true },
    { date: "2026-10-10T18:30:00", competition: "PL", round: 6, home: "Manchester United", away: "Tottenham Hotspur", homeScore: 1, awayScore: 1, venue: "Old Trafford", played: true },
    { date: "2026-10-18T15:00:00", competition: "PL", round: 7, home: "Leeds United", away: "Manchester United", homeScore: 1, awayScore: 1, venue: "Elland Road", played: true },
    { date: "2026-10-25T15:00:00", competition: "PL", round: 8, home: "Manchester United", away: "Bournemouth", homeScore: 0, awayScore: 3, venue: "Old Trafford", played: true },
    { date: "2026-10-31T13:30:00", competition: "PL", round: 9, home: "Chelsea", away: "Manchester United", homeScore: 2, awayScore: 0, venue: "Stamford Bridge", played: true },

    // ===== Champions League (known fixtures) =====
    { date: "2026-11-03T20:00:00", competition: "UCL", round: "League phase", home: "Manchester United", away: "Roma", homeScore: null, awayScore: null, venue: "Old Trafford", played: true, pending: true },
    { date: "2026-11-25T20:00:00", competition: "UCL", round: "League phase", home: "Sporting CP", away: "Manchester United", homeScore: null, awayScore: null, venue: "Estádio José Alvalade", played: false },

    // ===== Not yet played (Premier League, matchweeks 10-38, chronological) =====
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

  /* ---------- First-team squad (official 30) ---------- */
  squad: [
    // Goalkeepers
    { number: 1, name: "Senne Lammens", position: "GK", nation: "Belgium", nationCode: "BEL" },
    { number: 12, name: "Karl Darlow", position: "GK", nation: "Wales", nationCode: "WAL" },
    { number: 22, name: "Tom Heaton", position: "GK", nation: "England", nationCode: "ENG" },
    { number: 45, name: "Dermot Mee", position: "GK", nation: "Northern Ireland", nationCode: "NIR" },
    // Defenders
    { number: 2, name: "Diogo Dalot", position: "DF", nation: "Portugal", nationCode: "POR" },
    { number: 3, name: "Noussair Mazraoui", position: "DF", nation: "Morocco", nationCode: "MAR" },
    { number: 4, name: "Matthijs de Ligt", position: "DF", nation: "Netherlands", nationCode: "NED" },
    { number: 5, name: "Harry Maguire", position: "DF", nation: "England", nationCode: "ENG" },
    { number: 6, name: "Lisandro Martínez", position: "DF", nation: "Argentina", nationCode: "ARG" },
    { number: 13, name: "Patrick Dorgu", position: "DF", nation: "Denmark", nationCode: "DEN" },
    { number: 15, name: "Leny Yoro", position: "DF", nation: "France", nationCode: "FRA" },
    { number: 23, name: "Luke Shaw", position: "DF", nation: "England", nationCode: "ENG" },
    { number: 26, name: "Ayden Heaven", position: "DF", nation: "England", nationCode: "ENG" },
    { number: 41, name: "Harry Amass", position: "DF", nation: "England", nationCode: "ENG" },
    // Midfielders
    { number: 7, name: "Mason Mount", position: "MF", nation: "England", nationCode: "ENG" },
    { number: 8, name: "Bruno Fernandes", position: "MF", nation: "Portugal", nationCode: "POR", captain: true },
    { number: 17, name: "Andrey Santos", position: "MF", nation: "Brazil", nationCode: "BRA" },
    { number: 18, name: "Youri Tielemans", position: "MF", nation: "Belgium", nationCode: "BEL" },
    { number: 20, name: "Carlos Baleba", position: "MF", nation: "Cameroon", nationCode: "CMR" },
    { number: 25, name: "Manuel Ugarte", position: "MF", nation: "Uruguay", nationCode: "URU" },
    { number: 37, name: "Kobbie Mainoo", position: "MF", nation: "England", nationCode: "ENG" },
    { number: 38, name: "Jack Fletcher", position: "MF", nation: "England", nationCode: "ENG" },
    { number: 39, name: "Tyler Fletcher", position: "MF", nation: "Scotland", nationCode: "SCO" },
    // Forwards
    { number: 9, name: "Marcus Rashford", position: "FW", nation: "England", nationCode: "ENG" },
    { number: 10, name: "Matheus Cunha", position: "FW", nation: "Brazil", nationCode: "BRA" },
    { number: 11, name: "Joshua Zirkzee", position: "FW", nation: "Netherlands", nationCode: "NED" },
    { number: 16, name: "Amad Diallo", position: "FW", nation: "Ivory Coast", nationCode: "CIV" },
    { number: 19, name: "Bryan Mbeumo", position: "FW", nation: "Cameroon", nationCode: "CMR" },
    { number: 30, name: "Benjamin Šeško", position: "FW", nation: "Slovenia", nationCode: "SVN" },
    { number: 31, name: "Shea Lacey", position: "FW", nation: "England", nationCode: "ENG" }
  ],

  /* ---------- Honours wall (public data) ---------- */
  honours: [
    { name: "English Top-Flight League Titles", count: 20, note: "All-time record", years: "20 titles from 1908 to 2013" },
    { name: "FA Cup", count: 12, note: "All-time record", years: "12 wins from 1909 to 2024" },
    { name: "UEFA Champions League / European Cup", count: 3, note: "1968 · 1999 · 2008", years: "One of England's first European champions" },
    { name: "UEFA Europa League", count: 1, note: "2017", years: "Completed the set of all three major European trophies" },
    { name: "UEFA Cup Winners' Cup", count: 1, note: "1991", years: "Won the European Super Cup the same year" },
    { name: "FIFA Club World Cup / Intercontinental Cup", count: 1, note: "2008", years: "1999 Intercontinental Cup, 2008 Club World Cup" }
  ],

  /* ---------- Club timeline ---------- */
  timeline: [
    { year: 1878, title: "Newton Heath Founded", text: "Workers of the Lancashire and Yorkshire Railway formed Newton Heath LYR — the beginning of Manchester United." },
    { year: 1902, title: "Renamed Manchester United", text: "Saved from near bankruptcy, the club was officially renamed Manchester United, and red became its colour." },
    { year: 1910, title: "Moving to Old Trafford", text: "The 'Theatre of Dreams' opened and has remained United's home for more than a century." },
    { year: 1958, title: "The Munich Air Disaster", text: "On 6 February the plane carrying the Busby Babes crashed in the snow at Munich, killing eight players — the darkest day in the club's history." },
    { year: 1968, title: "First European Cup", text: "Beat Benfica 4–1 at Wembley, led by Bobby Charlton and George Best, becoming the first English club to lift the European Cup." },
    { year: 1986, title: "Ferguson Takes Charge", text: "Alex Ferguson took over and began a 27-year red dynasty." },
    { year: 1999, title: "The Treble", text: "Two stoppage-time goals in the Camp Nou final beat Bayern 2–1; together with the league and FA Cup it made England's first treble." },
    { year: 2008, title: "Third European Cup", text: "Beat Chelsea on penalties in the Moscow rain, with Van der Sar saving Anelka's kick, putting the Reds back on top of Europe." },
    { year: 2017, title: "Europa League Glory", text: "Won the Europa League, becoming one of the few clubs to hold all three major European trophies." }
  ],

  /* ---------- Club legends ---------- */
  legends: [
    { name: "Bobby Charlton", era: "1956–1973", position: "Forward / Midfielder", text: "A Munich survivor, 1966 World Cup winner and 1968 European Cup-winning captain, the gentleman with a thunderous shot who long held the club's scoring record." },
    { name: "George Best", era: "1963–1974", position: "Winger", text: "Ballon d'Or winner in 1968, so dazzling he was called 'the fifth Beatle'; his talent and his wild side were equally legendary." },
    { name: "Denis Law", era: "1962–1973", position: "Forward", text: "'The King' formed the Holy Trinity with Charlton and Best; overhead kicks and predatory finishing were his trademark." },
    { name: "Peter Schmeichel", era: "1991–1999", position: "Goalkeeper", text: "Widely regarded as one of the greatest goalkeepers ever, he lifted the European Cup as captain in 1999 — an unbreakable wall in goal." },
    { name: "Eric Cantona", era: "1992–1997", position: "Forward", text: "The collar-up 'King Eric' was the spiritual switch of the Ferguson era, with presence and skill in equal measure." },
    { name: "Roy Keane", era: "1993–2005", position: "Midfielder", text: "The iron-hearted captain of the Treble side, whose tackling, passing and will to win set the standard — the ultimate hard man in midfield." },
    { name: "Ryan Giggs", era: "1990–2014", position: "Winger", text: "A record 963 appearances and 13 league titles; his wing play ran through an entire generation." },
    { name: "Paul Scholes", era: "1993–2013", position: "Midfielder", text: "A quiet master of midfield whose long passes and late strikes were textbook; even opponents wanted to play like him." },
    { name: "David Beckham", era: "1992–2003", position: "Midfielder", text: "Famous for his curling crosses and endless running, a key piece of the 1999 Treble and a jewel of the United academy." },
    { name: "Wayne Rooney", era: "2004–2017", position: "Forward", text: "Club record scorer with 250 goals, he could pass, shoot and track back, giving his peak years to the Reds." },
    { name: "Cristiano Ronaldo", era: "2003–2009", position: "Winger / Forward", text: "Grew from a gifted teenager into the 2008 Ballon d'Or winner at Old Trafford, leading the side to the third European Cup." },
    { name: "Nemanja Vidić", era: "2006–2014", position: "Centre-back", text: "A fearless defender dominant in the air and in the tackle, forming a despair-inducing partnership with Ferdinand." },
    { name: "Edwin van der Sar", era: "2005–2011", position: "Goalkeeper", text: "Saved the decisive penalty in the 2008 Moscow rain; a calm, elegant keeper who was a rock even late in his career." },
    { name: "Ole Gunnar Solskjær", era: "1996–2007", position: "Forward", text: "The 'super-sub' whose stoppage-time winner sealed the 1999 final, later returning to the Theatre of Dreams as manager." }
  ]
};

/* Utility: whether Manchester United are at home in a given match */
RDS.isUnitedHome = function (m) {
  return m.home === "Manchester United";
};
