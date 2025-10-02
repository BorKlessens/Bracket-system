'use client';

import React from 'react';
import { Match as MatchType, Team } from './types';

interface MatchProps {
  match: MatchType;
  onScoreChange: (matchId: string, teamIndex: 1 | 2, score: number) => void;
  primaryColor: string;
  secondaryColor: string;
  isDarkTheme: boolean;
}

export default function Match({ 
  match, 
  onScoreChange, 
  primaryColor, 
  secondaryColor, 
  isDarkTheme 
}: MatchProps) {
  const handleScoreChange = (teamIndex: 1 | 2, value: string) => {
    const score = parseInt(value) || 0;
    onScoreChange(match.id, teamIndex, score);
  };

  const getTeamColor = (teamIndex: 1 | 2) => {
    return teamIndex === 1 ? primaryColor : secondaryColor;
  };

  const getTeamBgColor = (teamIndex: 1 | 2) => {
    const color = getTeamColor(teamIndex);
    return isDarkTheme 
      ? `${color}20` // 20% opacity for dark theme
      : `${color}10`; // 10% opacity for light theme
  };

  const getTeamBorderColor = (teamIndex: 1 | 2) => {
    const color = getTeamColor(teamIndex);
    return isDarkTheme 
      ? `${color}60` // 60% opacity for dark theme
      : `${color}40`; // 40% opacity for light theme
  };

  return (
    <div className="flex flex-col gap-2 w-[200px] h-[100px]">
      {/* Team 1 */}
      <div 
        className={`flex items-center justify-between p-2 rounded-lg border-2 transition-all duration-200 hover:shadow-lg hover-lift h-[46px] ${
          isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'
        }`}
        style={{
          backgroundColor: match.team1 ? getTeamBgColor(1) : undefined,
          borderColor: match.team1 ? getTeamBorderColor(1) : undefined,
        }}
      >
        <span className={`font-medium ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
          {match.team1?.name || 'TBD'}
        </span>
        <input
          type="number"
          min="0"
          value={match.score1}
          onChange={(e) => handleScoreChange(1, e.target.value)}
          className={`w-12 text-center font-bold rounded px-2 py-1 border focus-neon ${
            isDarkTheme 
              ? 'bg-gray-700 text-white border-gray-600' 
              : 'bg-white text-gray-900 border-gray-300'
          }`}
          style={{
            focusRingColor: getTeamColor(1),
          }}
          disabled={!match.team1}
        />
      </div>

      {/* VS Separator */}
      <div className="flex items-center justify-center">
        <div className={`text-xs font-bold ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
          VS
        </div>
      </div>

      {/* Team 2 */}
      <div 
        className={`flex items-center justify-between p-2 rounded-lg border-2 transition-all duration-200 hover:shadow-lg hover-lift h-[46px] ${
          isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'
        }`}
        style={{
          backgroundColor: match.team2 ? getTeamBgColor(2) : undefined,
          borderColor: match.team2 ? getTeamBorderColor(2) : undefined,
        }}
      >
        <span className={`font-medium ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
          {match.team2?.name || 'TBD'}
        </span>
        <input
          type="number"
          min="0"
          value={match.score2}
          onChange={(e) => handleScoreChange(2, e.target.value)}
          className={`w-12 text-center font-bold rounded px-2 py-1 border focus-neon ${
            isDarkTheme 
              ? 'bg-gray-700 text-white border-gray-600' 
              : 'bg-white text-gray-900 border-gray-300'
          }`}
          style={{
            focusRingColor: getTeamColor(2),
          }}
          disabled={!match.team2}
        />
      </div>

      {/* Winner indicator */}
      {match.winner && (
        <div className="text-center">
          <div className={`text-xs font-bold px-2 py-1 rounded ${
            isDarkTheme ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
          }`}>
            Winner: {match.winner.name}
          </div>
        </div>
      )}
    </div>
  );
}
