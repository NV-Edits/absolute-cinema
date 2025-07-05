import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/store';
import { searchMedia } from '../../lib/api';
import { MediaSearchResult } from '../../types';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<MediaSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { addToWatchlist } = useStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (inputValue.trim().length >= 2) {
        setIsLoading(true);
        try {
          const results = await searchMedia(inputValue);
          setSearchResults(results.slice(0, 5));
          onSearch(inputValue);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, onSearch]);

  const handleClear = () => {
    setInputValue('');
    setSearchResults([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleItemClick = (item: MediaSearchResult) => {
    navigate(`/details/${item.mediaType}/${item.id}`);
    setIsFocused(false);
  };

  const handleAddToWatchlist = (e: React.MouseEvent, item: MediaSearchResult) => {
    e.stopPropagation();
    addToWatchlist(item);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-text-secondary" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search for movies, anime, or TV series..."
          className="w-full rounded-full border border-gray-700 bg-background py-2 pl-10 pr-10 text-sm text-text placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            aria-label="Clear search"
          >
            <X className="h-5 w-5 text-text-secondary hover:text-text" />
          </button>
        )}
      </div>

      {isFocused && (searchResults.length > 0 || isLoading) && (
        <div
          ref={resultsRef}
          className="absolute z-10 mt-2 w-full rounded-md border border-gray-700 bg-card shadow-lg"
        >
          {isLoading ? (
            <div className="p-4 text-center text-text-secondary">
              <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <ul className="max-h-96 overflow-auto py-1">
              {searchResults.map((item) => (
                <li
                  key={`${item.mediaType}-${item.id}`}
                  onClick={() => handleItemClick(item)}
                  className="cursor-pointer px-4 py-2 hover:bg-background"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {item.posterPath ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${item.posterPath}`}
                          alt={item.title}
                          className="mr-3 h-12 w-8 rounded object-cover"
                        />
                      ) : (
                        <div className="mr-3 flex h-12 w-8 items-center justify-center rounded bg-secondary text-xs">
                          No img
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-text">{item.title}</p>
                        <div className="flex items-center text-xs text-text-secondary">
                          <span className="capitalize">{item.mediaType}</span>
                          {item.releaseDate && (
                            <>
                              <span className="mx-1">•</span>
                              <span>{new Date(item.releaseDate).getFullYear()}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleAddToWatchlist(e, item)}
                      className="rounded-full p-1 text-text-secondary hover:bg-primary hover:text-white"
                      aria-label="Add to watchlist"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;