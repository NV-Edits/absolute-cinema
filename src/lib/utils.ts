import { MediaType } from '../types';

export function getMediaTypeLabel(mediaType: MediaType | string): string {
  switch (mediaType) {
    case 'movie':
      return 'Movie';
    case 'tv':
      return 'TV Series';
    case 'anime':
      return 'Anime';
    default:
      return mediaType;
  }
}

export function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'Unknown';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}