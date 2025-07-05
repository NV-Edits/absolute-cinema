import React from 'react';
import MediaCard from './MediaCard';
import { Media } from '../../types';

interface MediaGridProps {
  items: Media[];
  layout?: 'grid' | 'list';
  isLoading?: boolean;
  emptyMessage?: string;
}

const MediaGrid: React.FC<MediaGridProps> = ({
  items,
  layout = 'grid',
  isLoading = false,
  emptyMessage = 'No items found',
}) => {
  if (isLoading) {
    return (
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="card animate-pulse">
            <div className="aspect-[2/3] bg-card"></div>
            <div className="p-3">
              <div className="mb-2 h-4 w-3/4 rounded bg-card"></div>
              <div className="h-3 w-1/2 rounded bg-card"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-gray-800 bg-card py-12 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mb-4 h-16 w-16 text-text-secondary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
          />
        </svg>
        <p className="text-lg font-medium text-text">{emptyMessage}</p>
        <p className="mt-2 text-sm text-text-secondary">
          Try searching for something else or explore our recommendations.
        </p>
      </div>
    );
  }

  if (layout === 'list') {
    return (
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <MediaCard key={`${item.mediaType}-${item.id}`} media={item} layout="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {items.map((item) => (
        <MediaCard key={`${item.mediaType}-${item.id}`} media={item} />
      ))}
    </div>
  );
};

export default MediaGrid;