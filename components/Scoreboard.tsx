'use client';

import React from 'react';

interface ScoreboardProps {
  isDarkTheme: boolean;
}

interface ScoreboardEntry {
  team: string;
  wins: number;
  losses: number;
  points: number;
}

export default function Scoreboard({ isDarkTheme }: ScoreboardProps) {
  // Dummy data for the scoreboard
  const scoreboardData: ScoreboardEntry[] = [
    { team: 'Team Alpha', wins: 3, losses: 1, points: 9 },
    { team: 'Team Beta', wins: 2, losses: 2, points: 6 },
    { team: 'Team Gamma', wins: 2, losses: 1, points: 6 },
    { team: 'Team Delta', wins: 1, losses: 3, points: 3 },
    { team: 'Team Echo', wins: 1, losses: 2, points: 3 },
    { team: 'Team Foxtrot', wins: 0, losses: 3, points: 0 },
  ];

  return (
    <div className={`p-4 rounded-lg border ${
      isDarkTheme 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-bold mb-4 ${
        isDarkTheme ? 'text-white' : 'text-gray-900'
      }`}>
        📊 Live Scoreboard
      </h3>
      
      <div className="space-y-2">
        {scoreboardData.map((entry, index) => (
          <div 
            key={entry.team}
            className={`flex items-center justify-between p-2 rounded hover-lift ${
              isDarkTheme ? 'bg-gray-700' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`text-sm font-bold ${
                isDarkTheme ? 'text-gray-400' : 'text-gray-600'
              }`}>
                #{index + 1}
              </span>
              <span className={`font-medium ${
                isDarkTheme ? 'text-white' : 'text-gray-900'
              }`}>
                {entry.team}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <div className={`text-center ${
                isDarkTheme ? 'text-green-400' : 'text-green-600'
              }`}>
                <div className="font-bold">{entry.wins}</div>
                <div className="text-xs">W</div>
              </div>
              <div className={`text-center ${
                isDarkTheme ? 'text-red-400' : 'text-red-600'
              }`}>
                <div className="font-bold">{entry.losses}</div>
                <div className="text-xs">L</div>
              </div>
              <div className={`text-center font-bold ${
                isDarkTheme ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {entry.points}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className={`mt-4 text-xs text-center ${
        isDarkTheme ? 'text-gray-400' : 'text-gray-500'
      }`}>
        * Dummy data for demonstration
      </div>
    </div>
  );
}
