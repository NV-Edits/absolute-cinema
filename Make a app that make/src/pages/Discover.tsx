import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { List, LayoutGrid } from 'lucide-react';
import MediaGrid from '../components/ui/MediaGrid';
import MediaFilter from '../components/ui/MediaFilter';
import { fetchDiscover, fetchGenres } from '../lib/api';
import { Media, MediaType, SortOption, GenreOption } from '../types';

const Discover: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get('type') as MediaType | null;
  const sortParam = searchParams.get('sort') as SortOption | null;
  const genreParam = searchParams.get('genre') ? parseInt(searchParams.get('genre')!) : undefined;
  const yearParam = searchParams.get('year') ? parseInt(searchParams.get('year')!) : undefined;

  const [media, setMedia] = useState<Media[]>([]);
  const [genres, setGenres] = useState<GenreOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const activeFilters = {
    mediaType: typeParam || undefined,
    sortBy: sortParam || undefined,
    genre: genreParam,
    year: yearParam,
  };

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const allGenres = await fetchGenres();
        setGenres(allGenres);
      } catch (error) {
        console.error('Error loading genres:', error);
      }
    };

    loadGenres();
  }, []);

  useEffect(() => {
    const loadMedia = async () => {
      setIsLoading(true);
      try {
        const results = await fetchDiscover({
          mediaType: typeParam || undefined,
          sortBy: sortParam || undefined,
          genre: genreParam,
          year: yearParam,
        });
        setMedia(results);
      } catch (error) {
        console.error('Error loading discover data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMedia();
  }, [typeParam, sortParam, genreParam, yearParam]);

  const handleFilterChange = (filters: {
    mediaType?: MediaType;
    sortBy?: SortOption;
    genre?: number;
    year?: number;
  }) => {
    const newParams = new URLSearchParams();
    
    if (filters.mediaType) {
      newParams.set('type', filters.mediaType);
    }
    
    if (filters.sortBy) {
      newParams.set('sort', filters.sortBy);
    }
    
    if (filters.genre) {
      newParams.set('genre', filters.genre.toString());
    }
    
    if (filters.year) {
      newParams.set('year', filters.year.toString());
    }
    
    setSearchParams(newParams);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold md:text-3xl">Discover</h1>
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
          <MediaFilter
            onFilterChange={handleFilterChange}
            genres={genres}
            activeFilters={activeFilters}
          />
        </div>
      </div>

      <MediaGrid
        items={media}
        layout={viewMode}
        isLoading={isLoading}
        emptyMessage="No results found. Try adjusting your filters."
      />
    </div>
  );
};

export default Discover;