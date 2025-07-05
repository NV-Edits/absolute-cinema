export type MediaType = 'movie' | 'tv' | 'anime';

export type SortOption = 
  | 'popularity.desc' 
  | 'popularity.asc' 
  | 'vote_average.desc' 
  | 'vote_average.asc' 
  | 'release_date.desc' 
  | 'release_date.asc';

export interface Media {
  id: number;
  mediaType: MediaType;
  title: string;
  overview?: string;
  posterPath?: string;
  backdropPath?: string;
  voteAverage?: number;
  releaseDate?: string;
}

export interface MediaSearchResult extends Media {
  // Additional fields specific to search results
}

export interface MediaDetails extends Media {
  runtime?: number; // in minutes, for movies
  genres?: { id: number; name: string }[];
  cast?: { id: number; name: string; character: string }[];
}

export interface GenreOption {
  id: number;
  name: string;
}