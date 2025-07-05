import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { MediaType, SortOption, GenreOption } from '../../types';

interface MediaFilterProps {
  onFilterChange: (filters: {
    mediaType?: MediaType;
    sortBy?: SortOption;
    genre?: number;
    year?: number;
  }) => void;
  genres: GenreOption[];
  activeFilters: {
    mediaType?: MediaType;
    sortBy?: SortOption;
    genre?: number;
    year?: number;
  };
}

const MediaFilter: React.FC<MediaFilterProps> = ({ onFilterChange, genres, activeFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(activeFilters);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleFilterChange = (
    key: 'mediaType' | 'sortBy' | 'genre' | 'year',
    value: MediaType | SortOption | number | undefined
  ) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handleApply = () => {
    onFilterChange(localFilters);
    setIsOpen(false);
  };

  const handleReset = () => {
    const resetFilters = {};
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'popularity.desc', label: 'Popularity (High to Low)' },
    { value: 'popularity.asc', label: 'Popularity (Low to High)' },
    { value: 'vote_average.desc', label: 'Rating (High to Low)' },
    { value: 'vote_average.asc', label: 'Rating (Low to High)' },
    { value: 'release_date.desc', label: 'Release Date (Newest)' },
    { value: 'release_date.asc', label: 'Release Date (Oldest)' },
  ];

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className={`btn flex items-center ${
          Object.keys(activeFilters).length > 0
            ? 'bg-primary text-white'
            : 'bg-card text-text-secondary hover:bg-card/80'
        }`}
      >
        <Filter className="mr-2 h-4 w-4" />
        Filters
        {Object.keys(activeFilters).length > 0 && (
          <span className="ml-2 rounded-full bg-white px-1.5 py-0.5 text-xs text-primary">
            {Object.keys(activeFilters).length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-card shadow-lg">
            <div className="flex items-center justify-between border-b border-gray-800 p-4">
              <h3 className="text-lg font-medium">Filter Media</h3>
              <button
                onClick={handleClose}
                className="rounded-full p-1 text-text-secondary hover:bg-background"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-4">
              <div className="mb-4">
                <h4 className="mb-2 font-medium">Media Type</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleFilterChange('mediaType', undefined)}
                    className={`rounded-full px-3 py-1 text-sm ${
                      !localFilters.mediaType
                        ? 'bg-primary text-white'
                        : 'bg-background text-text-secondary hover:bg-background/80'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => handleFilterChange('mediaType', 'movie')}
                    className={`rounded-full px-3 py-1 text-sm ${
                      localFilters.mediaType === 'movie'
                        ? 'bg-primary text-white'
                        : 'bg-background text-text-secondary hover:bg-background/80'
                    }`}
                  >
                    Movies
                  </button>
                  <button
                    onClick={() => handleFilterChange('mediaType', 'tv')}
                    className={`rounded-full px-3 py-1 text-sm ${
                      localFilters.mediaType === 'tv'
                        ? 'bg-primary text-white'
                        : 'bg-background text-text-secondary hover:bg-background/80'
                    }`}
                  >
                    TV Series
                  </button>
                  <button
                    onClick={() => handleFilterChange('mediaType', 'anime')}
                    className={`rounded-full px-3 py-1 text-sm ${
                      localFilters.mediaType === 'anime'
                        ? 'bg-primary text-white'
                        : 'bg-background text-text-secondary hover:bg-background/80'
                    }`}
                  >
                    Anime
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="mb-2 font-medium">Sort By</h4>
                <select
                  value={localFilters.sortBy || ''}
                  onChange={(e) =>
                    handleFilterChange(
                      'sortBy',
                      e.target.value ? (e.target.value as SortOption) : undefined
                    )
                  }
                  className="w-full rounded-md border border-gray-700 bg-background px-3 py-2 text-sm text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Default</option>
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <h4 className="mb-2 font-medium">Genre</h4>
                <select
                  value={localFilters.genre || ''}
                  onChange={(e) =>
                    handleFilterChange(
                      'genre',
                      e.target.value ? parseInt(e.target.value) : undefined
                    )
                  }
                  className="w-full rounded-md border border-gray-700 bg-background px-3 py-2 text-sm text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">All Genres</option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <h4 className="mb-2 font-medium">Release Year</h4>
                <select
                  value={localFilters.year || ''}
                  onChange={(e) =>
                    handleFilterChange(
                      'year',
                      e.target.value ? parseInt(e.target.value) : undefined
                    )
                  }
                  className="w-full rounded-md border border-gray-700 bg-background px-3 py-2 text-sm text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">All Years</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-800 p-4">
              <button
                onClick={handleReset}
                className="rounded-md px-4 py-2 text-sm text-text-secondary hover:text-text"
              >
                Reset All
              </button>
              <button onClick={handleApply} className="btn btn-primary">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaFilter;