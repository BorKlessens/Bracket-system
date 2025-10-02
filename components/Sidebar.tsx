'use client';

import React, { useState } from 'react';
import { BracketSettings, Team, BracketState } from './types';
import Scoreboard from './Scoreboard';
import ExportButton from './ExportButton';

interface SidebarProps {
  settings: BracketSettings;
  onSettingsChange: (settings: BracketSettings) => void;
  onResetBracket: () => void;
  isDarkTheme: boolean;
  bracketState?: BracketState;
}

export default function Sidebar({ 
  settings, 
  onSettingsChange, 
  onResetBracket, 
  isDarkTheme,
  bracketState 
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const updateSetting = <K extends keyof BracketSettings>(
    key: K, 
    value: BracketSettings[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const updateTeamName = (index: number, name: string) => {
    const newTeams = [...settings.teams];
    newTeams[index] = { ...newTeams[index], name };
    updateSetting('teams', newTeams);
  };

  const addTeam = () => {
    if (settings.teams.length < settings.numberOfTeams) {
      const newTeam: Team = {
        id: `team-${Date.now()}`,
        name: `Team ${settings.teams.length + 1}`,
        seed: settings.teams.length + 1
      };
      updateSetting('teams', [...settings.teams, newTeam]);
    }
  };

  const removeTeam = (index: number) => {
    const newTeams = settings.teams.filter((_, i) => i !== index);
    updateSetting('teams', newTeams);
  };

  const generateDefaultTeams = () => {
    const teamCount = settings.numberOfTeams;
    const defaultTeams: Team[] = [];
    
    for (let i = 0; i < teamCount; i++) {
      defaultTeams.push({
        id: `team-${i + 1}`,
        name: `Team ${i + 1}`,
        seed: i + 1
      });
    }
    
    updateSetting('teams', defaultTeams);
  };

  const sidebarContent = (
    <div className={`h-full overflow-y-auto ${
      isDarkTheme ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            Tournament Settings
          </h2>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`lg:hidden p-2 rounded ${
              isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <span className={`text-lg ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
              {isCollapsed ? '→' : '←'}
            </span>
          </button>
        </div>

        {/* Tournament Title */}
        <div className="mb-6">
          <label className={`block text-sm font-medium mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
            Tournament Title
          </label>
          <input
            type="text"
            value={settings.tournamentTitle}
            onChange={(e) => updateSetting('tournamentTitle', e.target.value)}
            className={`w-full px-3 py-2 rounded-lg border ${
              isDarkTheme 
                ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500' 
                : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            placeholder="Enter tournament title"
          />
        </div>

        {/* Number of Teams */}
        <div className="mb-6">
          <label className={`block text-sm font-medium mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
            Number of Teams
          </label>
          <select
            value={settings.numberOfTeams}
            onChange={(e) => updateSetting('numberOfTeams', parseInt(e.target.value) as 4 | 8 | 16 | 32)}
            className={`w-full px-3 py-2 rounded-lg border ${
              isDarkTheme 
                ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500' 
                : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
          >
            <option value={4}>4 Teams</option>
            <option value={8}>8 Teams</option>
            <option value={16}>16 Teams</option>
            <option value={32}>32 Teams</option>
          </select>
        </div>

        {/* Theme Toggle */}
        <div className="mb-6">
          <label className={`block text-sm font-medium mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
            Theme
          </label>
          <button
            onClick={() => updateSetting('isDarkTheme', !settings.isDarkTheme)}
            className={`w-full px-3 py-2 rounded-lg border transition-colors ${
              settings.isDarkTheme
                ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600'
                : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {settings.isDarkTheme ? '🌙 Dark Theme' : '☀️ Light Theme'}
          </button>
        </div>

        {/* Color Settings */}
        <div className="mb-6">
          <h3 className={`text-lg font-semibold mb-3 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            Colors
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                Primary Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => updateSetting('primaryColor', e.target.value)}
                  className="w-8 h-8 rounded border border-gray-300"
                />
                <input
                  type="text"
                  value={settings.primaryColor}
                  onChange={(e) => updateSetting('primaryColor', e.target.value)}
                  className={`flex-1 px-2 py-1 rounded border ${
                    isDarkTheme 
                      ? 'bg-gray-700 text-white border-gray-600' 
                      : 'bg-white text-gray-900 border-gray-300'
                  }`}
                />
              </div>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                Secondary Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={settings.secondaryColor}
                  onChange={(e) => updateSetting('secondaryColor', e.target.value)}
                  className="w-8 h-8 rounded border border-gray-300"
                />
                <input
                  type="text"
                  value={settings.secondaryColor}
                  onChange={(e) => updateSetting('secondaryColor', e.target.value)}
                  className={`flex-1 px-2 py-1 rounded border ${
                    isDarkTheme 
                      ? 'bg-gray-700 text-white border-gray-600' 
                      : 'bg-white text-gray-900 border-gray-300'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Teams Management */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-lg font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
              Teams ({settings.teams.length}/{settings.numberOfTeams})
            </h3>
            <button
              onClick={generateDefaultTeams}
              className={`px-3 py-1 text-sm rounded ${
                isDarkTheme 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Generate
            </button>
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {settings.teams.map((team, index) => (
              <div key={team.id} className="flex gap-2">
                <input
                  type="text"
                  value={team.name}
                  onChange={(e) => updateTeamName(index, e.target.value)}
                  className={`flex-1 px-2 py-1 rounded border ${
                    isDarkTheme 
                      ? 'bg-gray-700 text-white border-gray-600' 
                      : 'bg-white text-gray-900 border-gray-300'
                  }`}
                />
                <button
                  onClick={() => removeTeam(index)}
                  className={`px-2 py-1 text-sm rounded ${
                    isDarkTheme 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  ×
                </button>
              </div>
            ))}
            
            {settings.teams.length < settings.numberOfTeams && (
              <button
                onClick={addTeam}
                className={`w-full px-3 py-2 rounded border-2 border-dashed ${
                  isDarkTheme 
                    ? 'border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300' 
                    : 'border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600'
                }`}
              >
                + Add Team
              </button>
            )}
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={onResetBracket}
          className={`w-full px-4 py-3 rounded-lg font-medium transition-colors mb-6 ${
            isDarkTheme 
              ? 'bg-red-600 text-white hover:bg-red-700' 
              : 'bg-red-500 text-white hover:bg-red-600'
          }`}
        >
          Reset Bracket
        </button>

        {/* Export Button */}
        {bracketState && (
          <ExportButton bracketState={bracketState} isDarkTheme={isDarkTheme} />
        )}

        {/* Scoreboard Widget */}
        <Scoreboard isDarkTheme={isDarkTheme} />
      </div>
    </div>
  );

  return (
    <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} border-r ${
      isDarkTheme ? 'border-gray-700' : 'border-gray-200'
    }`}>
      {/* Mobile toggle button */}
      <div className="lg:hidden">
        {isCollapsed ? (
          <button
            onClick={() => setIsCollapsed(false)}
            className={`fixed top-4 left-4 z-50 p-3 rounded-lg shadow-lg ${
              isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
          >
            ⚙️
          </button>
        ) : (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsCollapsed(true)}>
            <div className="w-80 h-full" onClick={(e) => e.stopPropagation()}>
              {sidebarContent}
            </div>
          </div>
        )}
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-80 h-full">
        {sidebarContent}
      </div>
    </div>
  );
}
