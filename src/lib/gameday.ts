// ─── Game Day Detection & Data Types ─────────────────────────────────────────
// Uses ESPN's unofficial public API — no key required.
// Washington Commanders team ID: 28

const TEAM_ID = '28';
const BASE    = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl';

export type GamePhase = 'pregame' | 'live' | 'halftime' | 'postgame';

export interface GameTeam {
  id:            string;
  name:          string;         // "Commanders"
  abbreviation:  string;         // "WAS"
  score:         number;
  isHome:        boolean;
  winner:        boolean;
  logo:          string;
  color:         string;
}

export interface GamePlay {
  id:          string;
  text:        string;
  type:        string;
  clock:       string;
  period:      number;
  isScoring:   boolean;
  scoringType: string;           // "TD", "FG", "Safety", ""
  wasScore:    number;
  oppScore:    number;
}

export interface GameSituation {
  down:                  number;
  distance:              number;
  yardLine:              number;
  downDistanceText:      string;  // "2nd & 7"
  possessionTeamId:      string;
  isWashingtonPossession: boolean;
}

export interface GameDayInfo {
  gameId:         string;
  phase:          GamePhase;
  kickoffIso:     string;         // ISO timestamp
  kickoffDisplay: string;         // "4:25 PM ET"
  network:        string;         // "FOX"
  venue:          string;         // "FedExField"
  washington:     GameTeam;
  opponent:       GameTeam;
  period:         number;
  periodDisplay:  string;         // "Q3", "Half", "OT"
  clock:          string;         // "8:42"
  situation:      GameSituation | null;
  recentPlays:    GamePlay[];     // last 10, newest first
  scoringPlays:   GamePlay[];     // all scoring plays
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function fetchJson(url: string, timeoutMs = 8000): Promise<unknown> {
  const ctrl  = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal:  ctrl.signal,
      headers: { 'User-Agent': 'CommandersWire/1.0' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

function safeStr(v: unknown, fb = ''): string {
  return v ? String(v) : fb;
}

function phaseFromStatus(state: string, description: string): GamePhase {
  if (state === 'pre')  return 'pregame';
  if (state === 'post') return 'postgame';
  if (description?.toLowerCase().includes('halftime')) return 'halftime';
  return 'live';
}

function periodDisplay(period: number, phase: GamePhase): string {
  if (phase === 'halftime') return 'Half';
  if (period > 4)           return `OT${period - 4 > 1 ? period - 4 : ''}`;
  return `Q${period}`;
}

function scoringType(typeId: string): string {
  const map: Record<string, string> = {
    '67': 'TD', '68': 'TD', '72': 'TD',   // rushing/passing/return TD
    '59': 'FG', '63': 'FG',               // field goal
    '70': 'Safety',
    '57': 'XP', '58': 'XP',               // PAT
    '69': '2PT',
  };
  return map[typeId] ?? '';
}

function buildPlay(p: any, wasId: string): GamePlay {
  const typeId = safeStr(p?.type?.id);
  return {
    id:          safeStr(p?.id),
    text:        safeStr(p?.text),
    type:        safeStr(p?.type?.text),
    clock:       safeStr(p?.clock?.displayValue, '—'),
    period:      p?.period?.number ?? 0,
    isScoring:   !!p?.scoringPlay,
    scoringType: scoringType(typeId),
    wasScore:    0,  // filled in for scoring plays
    oppScore:    0,
  };
}

// ── Main export ───────────────────────────────────────────────────────────────

export async function detectGameDay(): Promise<GameDayInfo | null> {
  try {
    // 1. Check today's scoreboard for a Washington game
    const board = await fetchJson(`${BASE}/scoreboard`) as any;
    const events: any[] = board?.events ?? [];

    const event = events.find(e =>
      e?.competitions?.[0]?.competitors?.some((c: any) => c?.id === TEAM_ID),
    );
    if (!event) return null;

    const gameId  = safeStr(event.id);
    const comp    = event.competitions[0];
    const status  = comp?.status;
    const state   = safeStr(status?.type?.state, 'pre');
    const desc    = safeStr(status?.type?.description);
    const phase   = phaseFromStatus(state, desc);

    // 2. Parse competitors
    const comps: any[] = comp?.competitors ?? [];
    const wasComp = comps.find((c: any) => c?.id === TEAM_ID);
    const oppComp = comps.find((c: any) => c?.id !== TEAM_ID);

    function buildTeam(c: any): GameTeam {
      return {
        id:           safeStr(c?.id),
        name:         safeStr(c?.team?.shortDisplayName ?? c?.team?.name),
        abbreviation: safeStr(c?.team?.abbreviation),
        score:        parseFloat(safeStr(c?.score, '0')) || 0,
        isHome:       c?.homeAway === 'home',
        winner:       !!c?.winner,
        logo:         safeStr(c?.team?.logo),
        color:        safeStr(c?.team?.color, '5a1414'),
      };
    }

    const washington = buildTeam(wasComp);
    const opponent   = buildTeam(oppComp);

    // 3. Kickoff time + network (from scoreboard)
    const kickoffIso = safeStr(comp?.date ?? event?.date);
    const kickoffDisplay = kickoffIso
      ? new Date(kickoffIso).toLocaleTimeString('en-US', {
          hour: 'numeric', minute: '2-digit', hour12: true,
          timeZone: 'America/New_York',
        }) + ' ET'
      : 'TBD';

    const broadcast  = comp?.broadcasts?.[0];
    const network    = safeStr(broadcast?.names?.[0] ?? broadcast?.market?.type, '');

    // 4. Fetch full game summary for plays + situation
    const summary = await fetchJson(`${BASE}/summary?event=${gameId}`) as any;

    // Venue from gameInfo
    const venueInfo = summary?.gameInfo?.venue;
    const venue     = safeStr(venueInfo?.fullName, '');

    // Network from summary broadcasts if not found above
    const summaryBroadcasts = summary?.header?.competitions?.[0]?.broadcasts ?? [];
    const networkFinal = network ||
      safeStr(summaryBroadcasts?.[0]?.names?.[0] ?? summaryBroadcasts?.[0]?.media?.shortName, 'ESPN');

    // Current period + clock from summary header
    const headerComp = summary?.header?.competitions?.[0];
    const headerStatus = headerComp?.status ?? status;
    const period     = headerStatus?.period ?? status?.period ?? 1;
    const clock      = safeStr(headerStatus?.displayClock ?? status?.displayClock, '0:00');

    // 5. Situation (live only)
    let situation: GameSituation | null = null;
    const sit = comp?.situation ?? summary?.situation;
    if (sit && phase === 'live') {
      situation = {
        down:                   sit.down ?? 0,
        distance:               sit.distance ?? 0,
        yardLine:               sit.yardLine ?? 0,
        downDistanceText:       safeStr(sit.downDistanceText),
        possessionTeamId:       safeStr(sit.possession?.id ?? sit.possessionTeam?.id),
        isWashingtonPossession: safeStr(sit.possession?.id ?? sit.possessionTeam?.id) === TEAM_ID,
      };
    }

    // 6. Collect all plays (current drive + previous drives, newest first)
    const drives = summary?.drives ?? {};
    const allPlays: GamePlay[] = [];

    const currentPlays: any[] = drives?.current?.plays ?? [];
    for (const p of [...currentPlays].reverse()) {
      allPlays.push(buildPlay(p, TEAM_ID));
    }

    const previousDrives: any[] = drives?.previous ?? [];
    for (const drive of [...previousDrives].reverse()) {
      for (const p of [...(drive?.plays ?? [])].reverse()) {
        allPlays.push(buildPlay(p, TEAM_ID));
        if (allPlays.length >= 20) break;
      }
      if (allPlays.length >= 20) break;
    }

    const recentPlays = allPlays.slice(0, 10);

    // 7. Scoring plays (from summary, already in order)
    const rawScoring: any[] = summary?.scoringPlays ?? [];
    const scoringPlays: GamePlay[] = rawScoring.map(p => ({
      ...buildPlay(p, TEAM_ID),
      wasScore: p?.homeScore ?? 0,   // ESPN uses home/away keys
      oppScore: p?.awayScore ?? 0,
    }));

    return {
      gameId,
      phase,
      kickoffIso,
      kickoffDisplay,
      network:       networkFinal,
      venue,
      washington,
      opponent,
      period,
      periodDisplay: periodDisplay(period, phase),
      clock,
      situation,
      recentPlays,
      scoringPlays,
    };
  } catch (err) {
    console.warn('[gameday] detection failed:', err instanceof Error ? err.message : err);
    return null;
  }
}
