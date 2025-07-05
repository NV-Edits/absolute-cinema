import React, { useState } from 'react';
import { Film, Tv, PlayCircle } from 'lucide-react';
import { MediaType } from '../../types';

interface WatchlistTabsProps {
  onTabChange: (tab: MediaType | 'all') => void;
  activeTab: MediaType | 'all';
  counts: {
    all: number;
    movie: number;
    tv: number;
    anime: number;
  };
}

const WatchlistTabs: React.FC<WatchlistTabsProps> = ({ onTabChange, activeTab, counts }) => {
  return (
    <div className="mb-6 overflow-x-auto">
      <div className="flex space-x-2 border-b border-gray-800">
        <button
          onClick={() => onTabChange('all')}
          className={`flex min-w-max items-center whitespace-nowrap px-4 py-2 text-sm font-medium ${
            activeTab === 'all'
              ? 'border-b-2 border-primary text-primary'
              : 'text-text-secondary hover:text-text'
          }`}
        >
          All
          <span className="ml-2 rounded-full bg-secondary/30 px-1.5 py-0.5 text-xs">
            {counts.all}
          </span>
        </button>
        <button
          onClick={() => onTabChange('movie')}
          className={`flex min-w-max items-center whitespace-nowrap px-4 py-2 text-sm font-medium ${
            activeTab === 'movie'
              ? 'border-b-2 border-primary text-primary'
              : 'text-text-secondary hover:text-text'
          }`}
        >
          <Film className="mr-2 h-4 w-4" />
          Movies
          <span className="ml-2 rounded-full bg-secondary/30 px-1.5 py-0.5 text-xs">
            {counts.movie}
          </span>
        </button>
        <button
          onClick={() => onTabChange('tv')}
          className={`flex min-w-max items-center whitespace-nowrap px-4 py-2 text-sm font-medium ${
            activeTab === 'tv'
              ? 'border-b-2 border-primary text-primary'
              : 'text-text-secondary hover:text-text'
          }`}
        >
          <Tv className="mr-2 h-4 w-4" />
          TV Series
          <span className="ml-2 rounded-full bg-secondary/30 px-1.5 py-0.5 text-xs">
            {counts.tv}
          </span>
        </button>
        <button
          onClick={() => onTabChange('anime')}
          className={`flex min-w-max items-center whitespace-nowrap px-4 py-2 text-sm font-medium ${
            activeTab === 'anime'
              ? 'border-b-2 border-primary text-primary'
              : 'text-text-secondary hover:text-text'
          }`}
        >
          <PlayCircle className="mr-2 h-4 w-4" />
          Anime
          <span className="ml-2 rounded-full bg-secondary/30 px-1.5 py-0.5 text-xs">
            {counts.anime}
          </span>
        </button>
      </div>
    </div>
  );
};

export default WatchlistTabs;