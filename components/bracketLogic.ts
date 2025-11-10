import { Match, BracketSettings, BracketState } from './types';

export function generateInitialMatches(settings: BracketSettings): Match[] {
  const { numberOfTeams, teams } = settings;
  const matches: Match[] = [];
  
  // Calculate number of rounds needed
  const totalRounds = Math.log2(numberOfTeams);
  
  // Generate first round matches
  const firstRoundMatches = numberOfTeams / 2;
  
  for (let i = 0; i < firstRoundMatches; i++) {
    const team1 = teams[i * 2] || null;
    const team2 = teams[i * 2 + 1] || null;
    
    matches.push({
      id: `match-1-${i + 1}`,
      team1,
      team2,
      score1: 0,
      score2: 0,
      winner: null,
      round: 1,
      matchNumber: i + 1
    });
  }
  
  // Generate subsequent rounds
  for (let round = 2; round <= totalRounds; round++) {
    const matchesInRound = numberOfTeams / Math.pow(2, round);
    
    for (let i = 0; i < matchesInRound; i++) {
      matches.push({
        id: `match-${round}-${i + 1}`,
        team1: null,
        team2: null,
        score1: 0,
        score2: 0,
        winner: null,
        round,
        matchNumber: i + 1
      });
    }
  }
  
  return matches;
}

export function updateMatchScore(
  matches: Match[], 
  matchId: string, 
  teamIndex: 1 | 2, 
  score: number
): Match[] {
  return matches.map(match => {
    if (match.id === matchId) {
      const updatedMatch = { ...match };
      
      if (teamIndex === 1) {
        updatedMatch.score1 = score;
      } else {
        updatedMatch.score2 = score;
      }
      
      // Determine winner
      if (updatedMatch.score1 > updatedMatch.score2) {
        updatedMatch.winner = updatedMatch.team1;
      } else if (updatedMatch.score2 > updatedMatch.score1) {
        updatedMatch.winner = updatedMatch.team2;
      } else {
        updatedMatch.winner = null;
      }
      
      return updatedMatch;
    }
    return match;
  });
}

export function advanceWinners(matches: Match[]): Match[] {
  const updatedMatches = [...matches];
  
  // Group matches by round
  const matchesByRound = updatedMatches.reduce((acc, match) => {
    if (!acc[match.round]) {
      acc[match.round] = [];
    }
    acc[match.round].push(match);
    return acc;
  }, {} as Record<number, Match[]>);
  
  const rounds = Object.keys(matchesByRound).map(Number).sort((a, b) => a - b);
  
  // For each round except the last one
  for (let i = 0; i < rounds.length - 1; i++) {
    const currentRound = rounds[i];
    const nextRound = rounds[i + 1];
    
    const currentMatches = matchesByRound[currentRound];
    const nextMatches = matchesByRound[nextRound];
    
    // Update next round matches with winners from current round
    let winnerIndex = 0;
    for (const currentMatch of currentMatches) {
      if (currentMatch.winner && winnerIndex < nextMatches.length) {
        const nextMatch = nextMatches[winnerIndex];
        const nextMatchIndex = updatedMatches.findIndex(m => m.id === nextMatch.id);
        
        if (nextMatchIndex !== -1) {
          // Determine which team slot to fill
          if (!updatedMatches[nextMatchIndex].team1) {
            updatedMatches[nextMatchIndex].team1 = currentMatch.winner;
          } else if (!updatedMatches[nextMatchIndex].team2) {
            updatedMatches[nextMatchIndex].team2 = currentMatch.winner;
          }
        }
        
        winnerIndex++;
      }
    }
  }
  
  return updatedMatches;
}

export function isBracketComplete(matches: Match[]): boolean {
  const finalMatch = matches[matches.length - 1];
  return finalMatch?.winner !== null;
}

export function getCurrentRound(matches: Match[]): number {
  const incompleteMatches = matches.filter(match => !match.winner);
  if (incompleteMatches.length === 0) {
    return Math.max(...matches.map(m => m.round));
  }
  return Math.min(...incompleteMatches.map(m => m.round));
}

export function createInitialBracketState(settings: BracketSettings): BracketState {
  const matches = generateInitialMatches(settings);
  
  return {
    settings,
    matches,
    currentRound: 1,
    isComplete: false
  };
}

export function resetBracket(settings: BracketSettings): BracketState {
  return createInitialBracketState(settings);
}
