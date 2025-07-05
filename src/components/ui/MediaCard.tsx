import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Plus, Star } from 'lucide-react';
import { useStore } from '../../store/store';
import { Media } from '../../types';
import { getMediaTypeLabel } from '../../lib/utils';

interface MediaCardProps {
  media: Media;
  layout?: 'grid' | 'list';
}

const MediaCard: React.FC<MediaCardProps> = ({ media, layout = 'grid' }) => {
  const navigate = useNavigate();
  const { addToWatchlist, addToFavorites, isInWatchlist, isInFavorites } = useStore();

  const handleCardClick = () => {
    navigate(`/details/${media.mediaType}/${media.id}`);
  };

  const handleAddToWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToWatchlist(media);
  };

  const handleAddToFavorites = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToFavorites(media);
  };

  if (layout === 'list') {
    return (
      <div
        onClick={handleCardClick}
        className="card flex cursor-pointer transition-transform hover:-translate-y-1"
      >
        <div className="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-l-lg">
          {media.posterPath ? (
            <img
              src={`https://image.tmdb.org/t/p/w185${media.posterPath}`}
              alt={media.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-secondary text-xs text-white">
              No Image
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1">
            <div className="flex items-center justify-center text-xs">
              <Star className="mr-1 h-3 w-3 text-yellow-400" />
              <span>{media.voteAverage?.toFixed(1) || 'N/A'}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between p-3">
          <div>
            <h3 className="mb-1 line-clamp-1 text-sm font-medium">{media.title}</h3>
            <div className="flex items-center text-xs text-text-secondary">
              <span className="rounded bg-secondary/30 px-1.5 py-0.5 capitalize">
                {getMediaTypeLabel(media.mediaType)}
              </span>
              {media.releaseDate && (
                <span className="ml-2">{new Date(media.releaseDate).getFullYear()}</span>
              )}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-end space-x-2">
            <button
              onClick={handleAddToWatchlist}
              className={`rounded-full p-1.5 ${
                isInWatchlist(media.id, media.mediaType)
                  ? 'bg-primary text-white'
                  : 'bg-card text-text-secondary hover:bg-primary/20 hover:text-primary'
              }`}
              aria-label="Add to watchlist"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              onClick={handleAddToFavorites}
              className={`rounded-full p-1.5 ${
                isInFavorites(media.id, media.mediaType)
                  ? 'bg-primary text-white'
                  : 'bg-card text-text-secondary hover:bg-primary/20 hover:text-primary'
              }`}
              aria-label="Add to favorites"
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleCardClick}
      className="card cursor-pointer overflow-hidden transition-transform hover:-translate-y-1"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        {media.posterPath ? (
          <img
            src={`https://image.tmdb.org/t/p/w342${media.posterPath}`}
            alt={media.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary text-sm text-white">
            No Image
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center rounded bg-black/50 px-1.5 py-0.5 text-xs">
              <Star className="mr-1 h-3 w-3 text-yellow-400" />
              <span>{media.voteAverage?.toFixed(1) || 'N/A'}</span>
            </div>
            <div className="flex space-x-1">
              <button
                onClick={handleAddToWatchlist}
                className={`rounded-full p-1.5 ${
                  isInWatchlist(media.id, media.mediaType)
                    ? 'bg-primary text-white'
                    : 'bg-black/50 text-white hover:bg-primary/80'
                }`}
                aria-label="Add to watchlist"
              >
                <Plus className="h-3 w-3" />
              </button>
              <button
                onClick={handleAddToFavorites}
                className={`rounded-full p-1.5 ${
                  isInFavorites(media.id, media.mediaType)
                    ? 'bg-primary text-white'
                    : 'bg-black/50 text-white hover:bg-primary/80'
                }`}
                aria-label="Add to favorites"
              >
                <Heart className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <h3 className="line-clamp-1 text-sm font-medium">{media.title}</h3>
        <div className="mt-1 flex items-center text-xs text-text-secondary">
          <span className="rounded bg-secondary/30 px-1.5 py-0.5 capitalize">
            {getMediaTypeLabel(media.mediaType)}
          </span>
          {media.releaseDate && (
            <span className="ml-2">{new Date(media.releaseDate).getFullYear()}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaCard;