'use client';

import React from 'react';
import { BracketState } from './types';

interface ExportButtonProps {
  bracketState: BracketState;
  isDarkTheme: boolean;
}

export default function ExportButton({ bracketState, isDarkTheme }: ExportButtonProps) {
  const exportAsPNG = () => {
    // This would require html2canvas or similar library
    // For now, we'll just show an alert
    alert('PNG export functionality would be implemented here. This requires additional libraries like html2canvas.');
  };

  const exportAsPDF = () => {
    // This would require jsPDF or similar library
    // For now, we'll just show an alert
    alert('PDF export functionality would be implemented here. This requires additional libraries like jsPDF.');
  };

  const exportAsJSON = () => {
    const dataStr = JSON.stringify(bracketState, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `bracket-${bracketState.settings.tournamentTitle.replace(/\s+/g, '-').toLowerCase()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className={`p-4 rounded-lg border mb-4 ${
      isDarkTheme 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-bold mb-3 ${
        isDarkTheme ? 'text-white' : 'text-gray-900'
      }`}>
        📤 Export Bracket
      </h3>
      
      <div className="space-y-2">
        <button
          onClick={exportAsPNG}
          className={`w-full px-3 py-2 rounded text-sm font-medium transition-colors ${
            isDarkTheme 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          📷 Export as PNG
        </button>
        
        <button
          onClick={exportAsPDF}
          className={`w-full px-3 py-2 rounded text-sm font-medium transition-colors ${
            isDarkTheme 
              ? 'bg-red-600 text-white hover:bg-red-700' 
              : 'bg-red-500 text-white hover:bg-red-600'
          }`}
        >
          📄 Export as PDF
        </button>
        
        <button
          onClick={exportAsJSON}
          className={`w-full px-3 py-2 rounded text-sm font-medium transition-colors ${
            isDarkTheme 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          💾 Export as JSON
        </button>
      </div>
    </div>
  );
}
