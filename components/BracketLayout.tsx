'use client';

import React, { useState, useEffect } from 'react';
import { BracketSettings, BracketState } from './types';
import { 
  createInitialBracketState, 
  updateMatchScore, 
  advanceWinners, 
  isBracketComplete,
  getCurrentRound,
  resetBracket 
} from './bracketLogic';
import Sidebar from './Sidebar';
import Bracket from './Bracket';

const defaultSettings: BracketSettings = {
  numberOfTeams: 8,
  teams: [
    { id: 'team-1', name: 'Team Alpha', seed: 1 },
    { id: 'team-2', name: 'Team Beta', seed: 2 },
    { id: 'team-3', name: 'Team Gamma', seed: 3 },
    { id: 'team-4', name: 'Team Delta', seed: 4 },
    { id: 'team-5', name: 'Team Echo', seed: 5 },
    { id: 'team-6', name: 'Team Foxtrot', seed: 6 },
    { id: 'team-7', name: 'Team Golf', seed: 7 },
    { id: 'team-8', name: 'Team Hotel', seed: 8 },
  ],
  primaryColor: '#3B82F6', // Blue
  secondaryColor: '#EF4444', // Red
  isDarkTheme: true,
  tournamentTitle: 'CS:GO Summer Cup 2025',
  bracketBackgroundColor: '#1e40af',
  bracketBackgroundSecondary: '#3b82f6',
  bracketBackgroundPattern: 'gradient'
};

export default function BracketLayout() {
  const [bracketState, setBracketState] = useState<BracketState>(() => 
    createInitialBracketState(defaultSettings)
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Helper function to merge saved settings with defaults
  const mergeSettingsWithDefaults = (saved: any): BracketSettings => {
    return {
      ...defaultSettings,
      ...saved,
      // Ensure required fields are present
      bracketBackgroundColor: saved.bracketBackgroundColor || defaultSettings.bracketBackgroundColor,
      bracketBackgroundSecondary: saved.bracketBackgroundSecondary || defaultSettings.bracketBackgroundSecondary,
      bracketBackgroundPattern: saved.bracketBackgroundPattern || defaultSettings.bracketBackgroundPattern,
    };
  };

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('bracket-settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        const mergedSettings = mergeSettingsWithDefaults(parsedSettings);
        setBracketState(createInitialBracketState(mergedSettings));
      } catch (error) {
        console.error('Failed to parse saved settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bracket-settings', JSON.stringify(bracketState.settings));
  }, [bracketState.settings]);

  const handleSettingsChange = (newSettings: BracketSettings) => {
    setBracketState(createInitialBracketState(newSettings));
  };

  const handleScoreChange = (matchId: string, teamIndex: 1 | 2, score: number) => {
    setBracketState(prevState => {
      const updatedMatches = updateMatchScore(prevState.matches, matchId, teamIndex, score);
      const advancedMatches = advanceWinners(updatedMatches);
      const isComplete = isBracketComplete(advancedMatches);
      const currentRound = getCurrentRound(advancedMatches);

      return {
        ...prevState,
        matches: advancedMatches,
        currentRound,
        isComplete
      };
    });
  };

  const handleResetBracket = () => {
    setBracketState(resetBracket(bracketState.settings));
  };

  return (
    <div className={`min-h-screen flex ${
      bracketState.settings.isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      {/* Sidebar */}
      <div className={`flex-shrink-0 transition-all duration-300 ${
        sidebarCollapsed ? 'w-12' : 'w-80'
      }`}>
        <Sidebar
          settings={bracketState.settings}
          onSettingsChange={handleSettingsChange}
          onResetBracket={handleResetBracket}
          isDarkTheme={bracketState.settings.isDarkTheme}
          bracketState={bracketState}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <Bracket
          bracketState={bracketState}
          onScoreChange={handleScoreChange}
        />
      </div>
    </div>
  );
}
