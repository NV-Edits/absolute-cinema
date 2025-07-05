import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MediaCard from './MediaCard';
import { Media } from '../../types';

interface CategorySliderProps {
  title: string;
  items: Media[];
  isLoading?: boolean;
  viewAllLink?: string;
}

const CategorySlider: React.FC<CategorySliderProps> = ({
  title,
  items,
  isLoading = false,
  viewAllLink,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { current } = sliderRef;
      const scrollAmount = current.clientWidth * 0.75;
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="my-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-medium">{title}</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => scroll('left')}
            className="rounded-full p-1 text-text-secondary hover:bg-card hover:text-text"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="rounded-full p-1 text-text-secondary hover:bg-card hover:text-text"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="card flex-shrink-0 animate-pulse"
                style={{ width: '180px' }}
              >
                <div className="aspect-[2/3] bg-card"></div>
                <div className="p-3">
                  <div className="mb-2 h-4 w-3/4 rounded bg-card"></div>
                  <div className="h-3 w-1/2 rounded bg-card"></div>
                </div>
              </div>
            ))
          : items.map((item) => (
              <div key={`${item.mediaType}-${item.id}`} className="w-[180px] flex-shrink-0">
                <MediaCard media={item} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default CategorySlider;