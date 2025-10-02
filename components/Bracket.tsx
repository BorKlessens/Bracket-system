'use client';

import React from 'react';
import { BracketState, Match as MatchType } from './types';
import Match from './Match';

interface BracketProps {
  bracketState: BracketState;
  onScoreChange: (matchId: string, teamIndex: 1 | 2, score: number) => void;
}

export default function Bracket({ bracketState, onScoreChange }: BracketProps) {
  const { settings, matches } = bracketState;
  const { primaryColor, secondaryColor, isDarkTheme, tournamentTitle } = settings;

  // Group matches by round
  const matchesByRound = matches.reduce((acc, match) => {
    if (!acc[match.round]) {
      acc[match.round] = [];
    }
    acc[match.round].push(match);
    return acc;
  }, {} as Record<number, MatchType[]>);

  const rounds = Object.keys(matchesByRound).map(Number).sort((a, b) => a - b);

  const getRoundTitle = (round: number) => {
    const totalRounds = Math.log2(settings.numberOfTeams);
    if (round === totalRounds) return 'Final';
    if (round === totalRounds - 1) return 'Semi-Final';
    if (round === totalRounds - 2) return 'Quarter-Final';
    return `Round ${round}`;
  };

  return (
    <div className={`flex-1 p-6 ${isDarkTheme ? 'esports-gradient' : 'esports-gradient-light'} min-h-screen dark-scrollbar`}>
      {/* Tournament Title */}
      <div className="text-center mb-8">
        <h1 className={`text-4xl font-bold mb-2 ${
          isDarkTheme ? 'text-white neon-glow-blue' : 'text-gray-900'
        }`}>
          {tournamentTitle}
        </h1>
        <div className={`w-32 h-1 mx-auto rounded ${
          isDarkTheme ? 'bg-gradient-to-r from-purple-500 to-blue-500 neon-glow-purple' : 'bg-gradient-to-r from-blue-600 to-purple-600'
        }`}></div>
      </div>

      {/* Bracket Container */}
      <div className="flex justify-center w-full">
        <div className={`flex gap-8 pb-12 py-16 px-8 rounded-2xl w-full max-w-7xl ${
          isDarkTheme ? 'bg-blue-900' : 'bg-gray-100'
        }`} style={{
          backgroundImage: 'url(/bracket-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
          {rounds.map((round, roundIndex) => (
            <React.Fragment key={round}>
              {/* Round Column */}
              <div className={`flex flex-col items-center ${
                round >= rounds.length - 2 ? 'justify-center' : ''
              }`}>
                {/* Round Title */}
                <div className={`text-lg font-bold mb-4 px-4 py-2 rounded-lg hover-lift ${
                  isDarkTheme 
                    ? 'bg-gray-800 text-white border border-gray-700 neon-glow-blue' 
                    : 'bg-white text-gray-900 border border-gray-200 shadow-lg'
                }`}>
                  {getRoundTitle(round)}
                </div>

                {/* Matches in this round */}
                <div className="flex flex-col gap-12">
                  {matchesByRound[round].map((match, matchIndex) => (
                    <div key={match.id}>
                      <Match
                        match={match}
                        onScoreChange={onScoreChange}
                        primaryColor={primaryColor}
                        secondaryColor={secondaryColor}
                        isDarkTheme={isDarkTheme}
                      />
                    </div>
                  ))}
                </div>
              </div>

            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Trophy for final winner */}
      {bracketState.isComplete && (
        <div className="text-center mt-8">
          <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-lg hover-lift ${
            isDarkTheme 
              ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-white neon-glow' 
              : 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-yellow-900 shadow-lg'
          }`}>
            <span className="text-2xl">🏆</span>
            <span className="text-xl font-bold">
              Champion: {matches[matches.length - 1]?.winner?.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
