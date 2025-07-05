import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Plus, Star, Calendar, Clock, Film, Tv, PlayCircle } from 'lucide-react';
import CategorySlider from '../components/ui/CategorySlider';
import { fetchMediaDetails, fetchSimilarMedia } from '../lib/api';
import { Media, MediaType, MediaDetails as MediaDetailsType } from '../types';
import { useStore } from '../store/store';
import { getMediaTypeLabel } from '../lib/utils';

const MediaDetails: React.FC = () => {
  const { mediaType, id } = useParams<{ mediaType: string; id: string }>();
  const [details, setDetails] = useState<MediaDetailsType | null>(null);
  const [similarMedia, setSimilarMedia] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { addToWatchlist, addToFavorites, isInWatchlist, isInFavorites } = useStore();

  useEffect(() => {
    const loadData = async () => {
      if (!mediaType || !id) return;
      
      setIsLoading(true);
      try {
        const [mediaDetails, similar] = await Promise.all([
          fetchMediaDetails(mediaType as MediaType, parseInt(id)),
          fetchSimilarMedia(mediaType as MediaType, parseInt(id)),
        ]);
        
        setDetails(mediaDetails);
        setSimilarMedia(similar);
      } catch (error) {
        console.error('Error loading media details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [mediaType, id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddToWatchlist = () => {
    if (details) {
      addToWatchlist({
        id: details.id,
        mediaType: mediaType as MediaType,
        title: details.title,
        posterPath: details.posterPath,
        backdropPath: details.backdropPath,
        overview: details.overview,
        voteAverage: details.voteAverage,
        releaseDate: details.releaseDate,
      });
    }
  };

  const handleAddToFavorites = () => {
    if (details) {
      addToFavorites({
        id: details.id,
        mediaType: mediaType as MediaType,
        title: details.title,
        posterPath: details.posterPath,
        backdropPath: details.backdropPath,
        overview: details.overview,
        voteAverage: details.voteAverage,
        releaseDate: details.releaseDate,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="relative mb-8 h-[40vh] min-h-[300px] w-full rounded-xl bg-card"></div>
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="mb-6 h-[300px] w-[200px] rounded-lg bg-card md:mb-0"></div>
          <div className="flex-1">
            <div className="mb-4 h-8 w-3/4 rounded bg-card"></div>
            <div className="mb-6 h-4 w-1/2 rounded bg-card"></div>
            <div className="mb-8 space-y-2">
              <div className="h-4 w-full rounded bg-card"></div>
              <div className="h-4 w-full rounded bg-card"></div>
              <div className="h-4 w-3/4 rounded bg-card"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-gray-800 bg-card py-12 text-center">
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
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="mb-2 text-xl font-medium">Media Not Found</h2>
        <p className="text-text-secondary">
          The requested media could not be found or is unavailable.
        </p>
        <button
          onClick={handleBack}
          className="mt-4 flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </button>
      </div>
    );
  }

  const mediaTypeIcon = {
    movie: <Film className="h-5 w-5" />,
    tv: <Tv className="h-5 w-5" />,
    anime: <PlayCircle className="h-5 w-5" />,
  }[mediaType as MediaType];

  return (
    <div>
      <button
        onClick={handleBack}
        className="mb-4 flex items-center rounded-md bg-card px-3 py-1.5 text-sm text-text-secondary hover:bg-card/80 hover:text-text"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back
      </button>

      <div
        className="relative mb-8 h-[40vh] min-h-[300px] w-full overflow-hidden rounded-xl bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${details.backdropPath})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="mb-6 md:mb-0">
          <div className="relative h-[300px] w-[200px] overflow-hidden rounded-lg shadow-lg">
            {details.posterPath ? (
              <img
                src={`https://image.tmdb.org/t/p/w342${details.posterPath}`}
                alt={details.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-secondary text-white">
                No Image
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <h1 className="mb-2 text-3xl font-bold">{details.title}</h1>
          
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-text-secondary">
            {details.releaseDate && (
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                <span>{new Date(details.releaseDate).getFullYear()}</span>
              </div>
            )}
            
            {details.runtime && (
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                <span>
                  {Math.floor(details.runtime / 60)}h {details.runtime % 60}m
                </span>
              </div>
            )}
            
            {details.voteAverage && (
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 text-yellow-400" />
                <span>{details.voteAverage.toFixed(1)}</span>
              </div>
            )}
            
            {mediaType && (
              <div className="flex items-center rounded bg-primary/20 px-2 py-0.5 text-xs font-medium uppercase text-primary">
                {mediaTypeIcon}
                <span className="ml-1">{getMediaTypeLabel(mediaType as MediaType)}</span>
              </div>
            )}
          </div>

          <div className="mb-6 flex space-x-3">
            <button
              onClick={handleAddToWatchlist}
              className={`flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                isInWatchlist(details.id, mediaType as MediaType)
                  ? 'bg-primary text-white'
                  : 'bg-card text-text-secondary hover:bg-card/80 hover:text-text'
              }`}
            >
              <Plus className="mr-2 h-4 w-4" />
              {isInWatchlist(details.id, mediaType as MediaType)
                ? 'In Watchlist'
                : 'Add to Watchlist'}
            </button>
            <button
              onClick={handleAddToFavorites}
              className={`flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                isInFavorites(details.id, mediaType as MediaType)
                  ? 'bg-primary text-white'
                  : 'bg-card text-text-secondary hover:bg-card/80 hover:text-text'
              }`}
            >
              <Heart className="mr-2 h-4 w-4" />
              {isInFavorites(details.id, mediaType as MediaType) ? 'Favorited' : 'Add to Favorites'}
            </button>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-xl font-medium">Overview</h2>
            <p className="text-text-secondary">{details.overview}</p>
          </div>

          {details.genres && details.genres.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-2 text-xl font-medium">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {details.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full bg-card px-3 py-1 text-sm text-text-secondary"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {details.cast && details.cast.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-2 text-xl font-medium">Cast</h2>
              <div className="flex flex-wrap gap-2">
                {details.cast.slice(0, 5).map((person) => (
                  <span
                    key={person.id}
                    className="rounded-full bg-card px-3 py-1 text-sm text-text-secondary"
                  >
                    {person.name}
                  </span>
                ))}
                {details.cast.length > 5 && (
                  <span className="rounded-full bg-card px-3 py-1 text-sm text-text-secondary">
                    +{details.cast.length - 5} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {similarMedia.length > 0 && (
        <div className="mt-12">
          <CategorySlider title="Similar Titles" items={similarMedia} />
        </div>
      )}
    </div>
  );
};

export default MediaDetails;