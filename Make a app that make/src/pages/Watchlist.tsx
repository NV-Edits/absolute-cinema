import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { List, LayoutGrid, Trash2 } from 'lucide-react';
import MediaGrid from '../components/ui/MediaGrid';
import WatchlistTabs from '../components/ui/WatchlistTabs';
import { useStore } from '../store/store';
import { Media, MediaType } from '../types';

const Watchlist: React.FC = () => {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter') || 'all';
  const [activeTab, setActiveTab] = useState<MediaType | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { watchlist, favorites, removeFromWatchlist, removeFromFavorites } = useStore();

  const items = filter === 'favorites' ? favorites : watchlist;

  const filteredItems = activeTab === 'all' 
    ? items 
    : items.filter(item => item.mediaType === activeTab);

  const counts = {
    all: items.length,
    movie: items.filter(item => item.mediaType === 'movie').length,
    tv: items.filter(item => item.mediaType === 'tv').length,
    anime: items.filter(item => item.mediaType === 'anime').length,
  };

  const handleTabChange = (tab: MediaType | 'all') => {
    setActiveTab(tab);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all items from your watchlist?')) {
      if (filter === 'favorites') {
        // Clear all favorites
        items.forEach(item => removeFromFavorites(item.id, item.mediaType));
      } else {
        // Clear all watchlist items
        items.forEach(item => removeFromWatchlist(item.id, item.mediaType));
      }
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold md:text-3xl">
          {filter === 'favorites' ? 'My Favorites' : 'My Watchlist'}
        </h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`rounded-md p-2 ${
              viewMode === 'grid'
                ? 'bg-primary text-white'
                : 'bg-card text-text-secondary hover:bg-card/80'
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`rounded-md p-2 ${
              viewMode === 'list'
                ? 'bg-primary text-white'
                : 'bg-card text-text-secondary hover:bg-card/80'
            }`}
            aria-label="List view"
          >
            <List className="h-5 w-5" />
          </button>
          {items.length > 0 && (
            <button
              onClick={handleClearAll}
              className="ml-2 flex items-center rounded-md bg-red-600/20 px-3 py-2 text-sm text-red-500 hover:bg-red-600/30"
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Clear All
            </button>
          )}
        </div>
      </div>

      <WatchlistTabs onTabChange={handleTabChange} activeTab={activeTab} counts={counts} />

      <MediaGrid
        items={filteredItems}
        layout={viewMode}
        emptyMessage={
          filter === 'favorites'
            ? "You haven't added any favorites yet"
            : "You haven't added anything to your watchlist yet"
        }
      />
    </div>
  );
};

export default Watchlist;