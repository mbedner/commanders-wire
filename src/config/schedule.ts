// ─── Schedule & Important Dates ───────────────────────────────────────────────

export const IMPORTANT_DATES = [
  { label: 'Offseason Workouts',   date: '2026-04-20', note: 'Phase 1 begins' },
  { label: 'NFL Draft — Round 1',  date: '2026-04-23', note: 'Pittsburgh, PA — Pick #7' },
  { label: 'Draft — Rounds 2–3',  date: '2026-04-24', note: 'Pittsburgh, PA' },
  { label: 'Draft — Rounds 4–7',  date: '2026-04-25', note: 'Pittsburgh, PA' },
  { label: 'Rookie Minicamp',      date: '2026-05-08', note: 'Estimated' },
  { label: 'OTAs Begin',          date: '2026-05-26', note: 'Estimated' },
  { label: 'Mandatory Minicamp',  date: '2026-06-09', note: 'Estimated' },
  { label: 'Training Camp',       date: '2026-07-22', note: 'Ashburn, VA — est.' },
  { label: 'Preseason Opens',     date: '2026-08-06', note: 'TBD' },
  { label: 'Regular Season',      date: '2026-09-10', note: 'Week 1 — date est.' },
  { label: 'Schedule Release',    date: '2026-05-14', note: 'Estimated — May 2026' },
];

// 2026 regular season opponents — dates/times pending schedule release (est. May 2026)
export const UPCOMING_SCHEDULE = [
  // ── NFC East (home & away) ───────────────────────────────────────────────
  { week: 'W1',  opponent: 'Dallas Cowboys',       date: '2026-09-10', home: true,  tv: 'TBD', time: 'TBD' },
  { week: 'W2',  opponent: 'NY Giants',            date: '2026-09-17', home: false, tv: 'TBD', time: 'TBD' },
  { week: 'W3',  opponent: 'Philadelphia Eagles',  date: '2026-09-24', home: false, tv: 'TBD', time: 'TBD' },
  { week: 'W4',  opponent: 'NY Giants',            date: '2026-10-01', home: true,  tv: 'TBD', time: 'TBD' },
  { week: 'W5',  opponent: 'Dallas Cowboys',       date: '2026-10-08', home: false, tv: 'TBD', time: 'TBD' },
  { week: 'W6',  opponent: 'Philadelphia Eagles',  date: '2026-10-15', home: true,  tv: 'TBD', time: 'TBD' },
  // ── NFC West ─────────────────────────────────────────────────────────────
  { week: 'W7',  opponent: 'LA Rams',              date: '2026-10-22', home: true,  tv: 'TBD', time: 'TBD' },
  { week: 'W8',  opponent: 'Seattle Seahawks',     date: '2026-10-29', home: true,  tv: 'TBD', time: 'TBD' },
  { week: 'W9',  opponent: 'Arizona Cardinals',    date: '2026-11-05', home: false, tv: 'TBD', time: 'TBD' },
  { week: 'W10', opponent: 'San Francisco 49ers',  date: '2026-11-12', home: false, tv: 'TBD', time: 'TBD' },
  // ── AFC South ────────────────────────────────────────────────────────────
  { week: 'W11', opponent: 'Houston Texans',       date: '2026-11-19', home: true,  tv: 'TBD', time: 'TBD' },
  { week: 'W12', opponent: 'Indianapolis Colts',   date: '2026-11-26', home: true,  tv: 'TBD', time: 'TBD' },
  { week: 'W13', opponent: 'Jacksonville Jaguars', date: '2026-12-03', home: false, tv: 'TBD', time: 'TBD' },
  { week: 'W14', opponent: 'Tennessee Titans',     date: '2026-12-10', home: false, tv: 'TBD', time: 'TBD' },
  // ── Crossover / position-based ───────────────────────────────────────────
  { week: 'W15', opponent: 'Atlanta Falcons',      date: '2026-12-17', home: true,  tv: 'TBD', time: 'TBD' },
  { week: 'W16', opponent: 'Cincinnati Bengals',   date: '2026-12-24', home: true,  tv: 'TBD', time: 'TBD' },
  { week: 'W17', opponent: 'Minnesota Vikings',    date: '2026-12-31', home: false, tv: 'TBD', time: 'TBD' },
  { week: 'W18', opponent: 'TBD',                  date: '2027-01-04', home: null,  tv: 'TBD', time: 'TBD' },
];

// ─── 2025 Season Results (final) ──────────────────────────────────────────────
export const LAST_SEASON = {
  year: 2025,
  record: '5-12',
  divisionRecord: '3-3',
  playoffResult: 'Did not qualify',
  draftPick: '#7 overall (2026)',
  games: [
    { week: 'W1',  opponent: 'NY Giants',         home: true,  ws: 21, os: 6,  result: 'W' },
    { week: 'W2',  opponent: 'Green Bay',         home: false, ws: 18, os: 27, result: 'L' },
    { week: 'W3',  opponent: 'Las Vegas',         home: true,  ws: 41, os: 24, result: 'W' },
    { week: 'W4',  opponent: 'Atlanta',           home: false, ws: 27, os: 34, result: 'L' },
    { week: 'W5',  opponent: 'LA Chargers',       home: false, ws: 27, os: 10, result: 'W' },
    { week: 'W6',  opponent: 'Chicago',           home: true,  ws: 24, os: 25, result: 'L' },
    { week: 'W7',  opponent: 'Dallas',            home: false, ws: 22, os: 44, result: 'L' },
    { week: 'W8',  opponent: 'Kansas City',       home: false, ws: 7,  os: 28, result: 'L' },
    { week: 'W9',  opponent: 'Seattle',           home: true,  ws: 14, os: 38, result: 'L' },
    { week: 'W10', opponent: 'Detroit',           home: true,  ws: 22, os: 44, result: 'L' },
    { week: 'W11', opponent: 'Miami ✈',          home: false, ws: 13, os: 16, result: 'L' },
    { week: 'W12', opponent: 'BYE',              home: null,  ws: 0,  os: 0,  result: '—' },
    { week: 'W13', opponent: 'Denver',            home: true,  ws: 26, os: 27, result: 'L' },
    { week: 'W14', opponent: 'Minnesota',         home: false, ws: 0,  os: 31, result: 'L' },
    { week: 'W15', opponent: 'NY Giants',         home: false, ws: 29, os: 21, result: 'W' },
    { week: 'W16', opponent: 'Philadelphia',      home: true,  ws: 18, os: 29, result: 'L' },
    { week: 'W17', opponent: 'Dallas',            home: true,  ws: 23, os: 30, result: 'L' },
    { week: 'W18', opponent: 'Philadelphia',      home: false, ws: 24, os: 17, result: 'W' },
  ],
};

// ─── Team Stats — 2025 Final Season Stats ─────────────────────────────────────
export const TEAM_STATS = {
  season:            '2025',
  record:            '5-12',
  divisionRecord:    '3-3',
  offenseRank:       22,
  defenseRank:       26,
  pointsPerGame:     20.9,
  pointsAllowed:     26.5,
  passYardsPerGame:  204.4,
  rushYardsPerGame:  137.1,
  leaders: {
    passingYards:   { name: 'Marcus Mariota',          stat: '1,695 yds' },
    rushingYards:   { name: 'Jacory Croskey-Merritt',  stat: '805 yds' },
    receivingYards: { name: 'Deebo Samuel',             stat: '727 yds' },
    sacks:          { name: 'Von Miller',               stat: '9.0' },
    interceptions:  { name: 'Mike Sainristil',          stat: '4 INTs' },
    tackles:        { name: 'Bobby Wagner',             stat: '162' },
  },
  lastUpdated: '2025 final',
  source: 'fallback' as const,
};
