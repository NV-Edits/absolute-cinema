import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Media, MediaType } from '../types';

interface StoreState {
  watchlist: Media[];
  favorites: Media[];
  searchTerm: string;
  searchResults: Media[];
  addToWatchlist: (media: Media) => void;
  removeFromWatchlist: (id: number, mediaType: MediaType) => void;
  addToFavorites: (media: Media) => void;
  removeFromFavorites: (id: number, mediaType: MediaType) => void;
  isInWatchlist: (id: number, mediaType: MediaType) => boolean;
  isInFavorites: (id: number, mediaType: MediaType) => boolean;
  setSearchTerm: (term: string) => void;
  setSearchResults: (results: Media[]) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      watchlist: [],
      favorites: [],
      searchTerm: '',
      searchResults: [],

      addToWatchlist: (media) => {
        const { watchlist } = get();
        const exists = watchlist.some(
          (item) => item.id === media.id && item.mediaType === media.mediaType
        );

        if (!exists) {
          set({ watchlist: [...watchlist, media] });
        }
      },

      removeFromWatchlist: (id, mediaType) => {
        const { watchlist } = get();
        set({
          watchlist: watchlist.filter(
            (item) => !(item.id === id && item.mediaType === mediaType)
          ),
        });
      },

      addToFavorites: (media) => {
        const { favorites } = get();
        const exists = favorites.some(
          (item) => item.id === media.id && item.mediaType === media.mediaType
        );

        if (!exists) {
          set({ favorites: [...favorites, media] });
        }
      },

      removeFromFavorites: (id, mediaType) => {
        const { favorites } = get();
        set({
          favorites: favorites.filter(
            (item) => !(item.id === id && item.mediaType === mediaType)
          ),
        });
      },

      isInWatchlist: (id, mediaType) => {
        const { watchlist } = get();
        return watchlist.some((item) => item.id === id && item.mediaType === mediaType);
      },

      isInFavorites: (id, mediaType) => {
        const { favorites } = get();
        return favorites.some((item) => item.id === id && item.mediaType === mediaType);
      },

      setSearchTerm: (term) => {
        set({ searchTerm: term });
      },

      setSearchResults: (results) => {
        set({ searchResults: results });
      },
    }),
    {
      name: 'absolute-cinema-storage',
    }
  )
);