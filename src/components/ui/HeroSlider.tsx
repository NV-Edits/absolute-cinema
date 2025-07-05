import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, Info } from 'lucide-react';
import { Media } from '../../types';
import { useStore } from '../../store/store';

interface HeroSliderProps {
  items: Media[];
  isLoading?: boolean;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ items, isLoading = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { addToWatchlist } = useStore();

  useEffect(() => {
    if (items.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [items.length]);

  const handleNavigate = (mediaType: string, id: number) => {
    navigate(`/details/${mediaType}/${id}`);
  };

  const handleAddToWatchlist = (e: React.MouseEvent, media: Media) => {
    e.stopPropagation();
    addToWatchlist(media);
  };

  if (isLoading) {
    return (
      <div className="relative mb-8 h-[50vh] min-h-[400px] w-full animate-pulse overflow-hidden rounded-xl bg-card md:h-[60vh]"></div>
    );
  }

  if (items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="relative mb-8 h-[50vh] min-h-[400px] w-full overflow-hidden rounded-xl md:h-[60vh]">
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${currentItem.backdropPath})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
        <div className="max-w-2xl">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl lg:text-5xl">{currentItem.title}</h1>
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-text-secondary">
            {currentItem.releaseDate && (
              <span>{new Date(currentItem.releaseDate).getFullYear()}</span>
            )}
            {currentItem.voteAverage && (
              <>
                <span>•</span>
                <div className="flex items-center">
                  <svg
                    className="mr-1 h-4 w-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span>{currentItem.voteAverage.toFixed(1)}</span>
                </div>
              </>
            )}
            {currentItem.mediaType && (
              <>
                <span>•</span>
                <span className="rounded bg-primary/20 px-2 py-0.5 text-xs font-medium uppercase text-primary">
                  {currentItem.mediaType === 'tv'
                    ? 'TV Series'
                    : currentItem.mediaType === 'anime'
                    ? 'Anime'
                    : 'Movie'}
                </span>
              </>
            )}
          </div>
          <p className="mb-6 line-clamp-2 text-sm text-text-secondary md:line-clamp-3 md:text-base">
            {currentItem.overview}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleNavigate(currentItem.mediaType, currentItem.id)}
              className="flex items-center rounded-full bg-primary px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              <Info className="mr-2 h-4 w-4" />
              More Info
            </button>
            <button
              onClick={(e) => handleAddToWatchlist(e, currentItem)}
              className="flex items-center rounded-full bg-white/20 px-6 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add to Watchlist
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {items.slice(0, 5).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;