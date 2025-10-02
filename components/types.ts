export interface Team {
  id: string;
  name: string;
  seed?: number;
}

export interface Match {
  id: string;
  team1: Team | null;
  team2: Team | null;
  score1: number;
  score2: number;
  winner: Team | null;
  round: number;
  matchNumber: number;
}

export interface BracketSettings {
  numberOfTeams: 4 | 8 | 16 | 32;
  teams: Team[];
  primaryColor: string;
  secondaryColor: string;
  isDarkTheme: boolean;
  tournamentTitle: string;
}

export interface BracketState {
  settings: BracketSettings;
  matches: Match[];
  currentRound: number;
  isComplete: boolean;
}
