'use client';

import React from 'react';
import { Match as MatchType } from './types';

interface MatchProps {
  match: MatchType;
  onScoreChange: (matchId: string, teamIndex: 1 | 2, score: number) => void;
  primaryColor: string;
  secondaryColor: string;
  isDarkTheme: boolean;
  numberOfTeams: 4 | 8 | 16;
}

export default function Match({ 
  match, 
  onScoreChange, 
  primaryColor, 
  secondaryColor, 
  isDarkTheme,
  numberOfTeams
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

  // Responsive sizes based on number of teams
  const getMatchSize = () => {
    if (numberOfTeams === 4) {
      return {
        container: 'w-[160px] md:w-[200px] h-[85px] md:h-[100px]',
        gap: 'gap-2 md:gap-2',
        teamHeight: 'h-[32px] md:h-[38px]',
        teamPadding: 'p-1.5 md:p-2',
        textSize: 'text-xs md:text-sm',
        inputWidth: 'w-10 md:w-12',
        inputPadding: 'px-1.5 md:px-2',
        inputText: 'text-xs md:text-sm',
        vsSize: 'text-xs md:text-sm',
        winnerSize: 'text-[10px] md:text-xs'
      };
    } else if (numberOfTeams === 8) {
      return {
        container: 'w-[140px] md:w-[180px] h-[75px] md:h-[90px]',
        gap: 'gap-1.5 md:gap-2',
        teamHeight: 'h-[28px] md:h-[34px]',
        teamPadding: 'p-1 md:p-1.5',
        textSize: 'text-[11px] md:text-xs',
        inputWidth: 'w-9 md:w-11',
        inputPadding: 'px-1 md:px-1.5',
        inputText: 'text-[11px] md:text-xs',
        vsSize: 'text-[10px] md:text-xs',
        winnerSize: 'text-[9px] md:text-[10px]'
      };
    } else { // 16 teams
      return {
        container: 'w-[100px] md:w-[140px] h-[55px] md:h-[65px]',
        gap: 'gap-1 md:gap-1',
        teamHeight: 'h-[22px] md:h-[28px]',
        teamPadding: 'p-0.5 md:p-1',
        textSize: 'text-[10px] md:text-xs',
        inputWidth: 'w-7 md:w-9',
        inputPadding: 'px-0.5 md:px-1',
        inputText: 'text-[10px] md:text-xs',
        vsSize: 'text-[8px] md:text-[10px]',
        winnerSize: 'text-[8px] md:text-[10px]'
      };
    }
  };

  const sizes = getMatchSize();

  return (
    <div className={`flex flex-col ${sizes.gap} ${sizes.container}`}>
      {/* Team 1 */}
      <div 
        className={`flex items-center justify-between ${sizes.teamPadding} rounded-lg border-2 transition-all duration-200 hover:shadow-lg hover-lift ${sizes.teamHeight} ${
          isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'
        }`}
        style={{
          backgroundColor: match.team1 ? getTeamBgColor(1) : undefined,
          borderColor: match.team1 ? getTeamBorderColor(1) : undefined,
        }}
      >
        <span className={`${sizes.textSize} font-medium truncate flex-1 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
          {match.team1?.name || 'TBD'}
        </span>
        <input
          type="number"
          min="0"
          value={match.score1}
          onChange={(e) => handleScoreChange(1, e.target.value)}
          className={`${sizes.inputWidth} text-center font-bold rounded ${sizes.inputPadding} py-0.5 border focus-neon ${sizes.inputText} ${
            isDarkTheme 
              ? 'bg-gray-700 text-white border-gray-600' 
              : 'bg-white text-gray-900 border-gray-300'
          }`}
          disabled={!match.team1}
        />
      </div>

      {/* VS Separator */}
      <div className="flex items-center justify-center -my-0.5">
        <div className={`${sizes.vsSize} font-bold ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
          VS
        </div>
      </div>

      {/* Team 2 */}
      <div 
        className={`flex items-center justify-between ${sizes.teamPadding} rounded-lg border-2 transition-all duration-200 hover:shadow-lg hover-lift ${sizes.teamHeight} ${
          isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'
        }`}
        style={{
          backgroundColor: match.team2 ? getTeamBgColor(2) : undefined,
          borderColor: match.team2 ? getTeamBorderColor(2) : undefined,
        }}
      >
        <span className={`${sizes.textSize} font-medium truncate flex-1 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
          {match.team2?.name || 'TBD'}
        </span>
        <input
          type="number"
          min="0"
          value={match.score2}
          onChange={(e) => handleScoreChange(2, e.target.value)}
          className={`${sizes.inputWidth} text-center font-bold rounded ${sizes.inputPadding} py-0.5 border focus-neon ${sizes.inputText} ${
            isDarkTheme 
              ? 'bg-gray-700 text-white border-gray-600' 
              : 'bg-white text-gray-900 border-gray-300'
          }`}
          disabled={!match.team2}
        />
      </div>

      {/* Winner indicator */}
      {match.winner && (
        <div className="text-center -mt-0.5">
          <div className={`${sizes.winnerSize} font-bold px-1 md:px-1.5 py-0.5 rounded ${
            isDarkTheme ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
          }`}>
            Winner: {match.winner.name}
          </div>
        </div>
      )}
    </div>
  );
}
