import { Media, MediaType, SortOption, MediaDetails, GenreOption } from '../types';

// Mock data for development - in a real app, this would be API calls to TMDB or similar
const MOCK_DELAY = 500; // Simulate network delay

// Sample data
const sampleMovies: Media[] = [
  {
    id: 1,
    mediaType: 'movie',
    title: 'Inception',
    overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    posterPath: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    backdropPath: '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
    voteAverage: 8.4,
    releaseDate: '2010-07-16',
  },
  {
    id: 2,
    mediaType: 'movie',
    title: 'The Shawshank Redemption',
    overview: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    posterPath: '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    backdropPath: '/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
    voteAverage: 8.7,
    releaseDate: '1994-09-23',
  },
  {
    id: 3,
    mediaType: 'movie',
    title: 'The Dark Knight',
    overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    posterPath: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdropPath: '/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg',
    voteAverage: 8.5,
    releaseDate: '2008-07-16',
  },
  {
    id: 4,
    mediaType: 'movie',
    title: 'Pulp Fiction',
    overview: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    posterPath: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    backdropPath: '/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg',
    voteAverage: 8.5,
    releaseDate: '1994-09-10',
  },
  {
    id: 5,
    mediaType: 'movie',
    title: 'Interstellar',
    overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    posterPath: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdropPath: '/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
    voteAverage: 8.4,
    releaseDate: '2014-11-05',
  },
  {
    id: 6,
    mediaType: 'movie',
    title: 'The Matrix',
    overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    posterPath: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    backdropPath: '/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg',
    voteAverage: 8.2,
    releaseDate: '1999-03-30',
  },
];

const sampleTVShows: Media[] = [
  {
    id: 101,
    mediaType: 'tv',
    title: 'Breaking Bad',
    overview: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
    posterPath: '/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
    backdropPath: '/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
    voteAverage: 8.7,
    releaseDate: '2008-01-20',
  },
  {
    id: 102,
    mediaType: 'tv',
    title: 'Game of Thrones',
    overview: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
    posterPath: '/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg',
    backdropPath: '/suopoADq0k8YZr4dQXcU6pToj6s.jpg',
    voteAverage: 8.4,
    releaseDate: '2011-04-17',
  },
  {
    id: 103,
    mediaType: 'tv',
    title: 'Stranger Things',
    overview: 'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.',
    posterPath: '/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    backdropPath: '/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
    voteAverage: 8.5,
    releaseDate: '2016-07-15',
  },
  {
    id: 104,
    mediaType: 'tv',
    title: 'The Mandalorian',
    overview: 'After the fall of the Galactic Empire, a lone gunfighter makes his way through the lawless galaxy.',
    posterPath: '/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg',
    backdropPath: '/9ijMGlJKqcslswWUzTEwScm82Gs.jpg',
    voteAverage: 8.5,
    releaseDate: '2019-11-12',
  },
  {
    id: 105,
    mediaType: 'tv',
    title: 'The Witcher',
    overview: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
    posterPath: '/7vjaCdMw15FEbXyLQTVa04URsPm.jpg',
    backdropPath: '/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg',
    voteAverage: 8.0,
    releaseDate: '2019-12-20',
  },
  {
    id: 106,
    mediaType: 'tv',
    title: 'The Office',
    overview: 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.',
    posterPath: '/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg',
    backdropPath: '/vNpuAxGTl9HsUbHqam3E9CzqCvX.jpg',
    voteAverage: 8.5,
    releaseDate: '2005-03-24',
  },
];

const sampleAnime: Media[] = [
  {
    id: 201,
    mediaType: 'anime',
    title: 'Attack on Titan',
    overview: 'In a world where humanity lives within cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason, a young boy vows to exterminate them after a Titan causes the destruction of his hometown and the death of his mother.',
    posterPath: '/aiy35Evcofzl7hNzFdvECN0wWLz.jpg',
    backdropPath: '/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg',
    voteAverage: 8.6,
    releaseDate: '2013-04-07',
  },
  {
    id: 202,
    mediaType: 'anime',
    title: 'Demon Slayer',
    overview: 'A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.',
    posterPath: '/wrCVHdkBlBWdJUZPvnJWcBRuhSY.jpg',
    backdropPath: '/nTvM4mhqNlHIvUkI1gVnW6XP7GG.jpg',
    voteAverage: 8.7,
    releaseDate: '2019-04-06',
  },
  {
    id: 203,
    mediaType: 'anime',
    title: 'My Hero Academia',
    overview: 'In a world where people with superpowers (known as "Quirks") are the norm, a boy without powers dreams of becoming a superhero himself.',
    posterPath: '/ivOLM47yJt90P19RH1NvJrAJz9F.jpg',
    backdropPath: '/9zcbqSxegVHR00HTiSBdp0e5Zd7.jpg',
    voteAverage: 8.4,
    releaseDate: '2016-04-03',
  },
  {
    id: 204,
    mediaType: 'anime',
    title: 'One Piece',
    overview: 'Follows the adventures of Monkey D. Luffy and his pirate crew in order to find the greatest treasure ever left by the legendary Pirate, Gold Roger. The famous mystery treasure named "One Piece".',
    posterPath: '/e3NBGiAifW9Xt8xD5tpARskjccO.jpg',
    backdropPath: '/mBxsapX4DNhH1XkOlLp15He5sxL.jpg',
    voteAverage: 8.7,
    releaseDate: '1999-10-20',
  },
  {
    id: 205,
    mediaType: 'anime',
    title: 'Jujutsu Kaisen',
    overview: 'Yuji Itadori is a boy with tremendous physical strength, though he lives a completely ordinary high school life. One day, to save a classmate who has been attacked by curses, he eats the finger of Ryomen Sukuna, taking the curse into his own soul.',
    posterPath: '/hJfI6AGrmr4uSHRccfJuSsapvOb.jpg',
    backdropPath: '/8bRIfPGDnmWgdy65LO8xtdcFmFP.jpg',
    voteAverage: 8.6,
    releaseDate: '2020-10-03',
  },
  {
    id: 206,
    mediaType: 'anime',
    title: 'Fullmetal Alchemist: Brotherhood',
    overview: 'After a horrific alchemy experiment goes wrong in the Elric household, brothers Edward and Alphonse are left in a catastrophic new reality.',
    posterPath: '/5ZFUEOULaVml7pQuXxhpR2SmVUw.jpg',
    backdropPath: '/2XK4CiF0eCM8xgK3xRQNJNVK6fa.jpg',
    voteAverage: 8.8,
    releaseDate: '2009-04-05',
  },
];

const allMedia = [...sampleMovies, ...sampleTVShows, ...sampleAnime];

const genres: GenreOption[] = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

// API functions
export async function fetchTrending(): Promise<Media[]> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  // Return a mix of all media types
  return shuffleArray([...allMedia]).slice(0, 10);
}

export async function fetchPopular(mediaType: MediaType): Promise<Media[]> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  let results: Media[];
  switch (mediaType) {
    case 'movie':
      results = sampleMovies;
      break;
    case 'tv':
      results = sampleTVShows;
      break;
    case 'anime':
      results = sampleAnime;
      break;
    default:
      results = allMedia;
  }
  
  return shuffleArray([...results]).slice(0, 10);
}

export async function fetchTopRated(mediaType: MediaType): Promise<Media[]> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  let results: Media[];
  switch (mediaType) {
    case 'movie':
      results = sampleMovies;
      break;
    case 'tv':
      results = sampleTVShows;
      break;
    case 'anime':
      results = sampleAnime;
      break;
    default:
      results = allMedia;
  }
  
  // Sort by rating
  return [...results].sort((a, b) => b.voteAverage - a.voteAverage).slice(0, 10);
}

export async function fetchDiscover(params: {
  mediaType?: MediaType;
  sortBy?: SortOption;
  genre?: number;
  year?: number;
}): Promise<Media[]> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  let results = [...allMedia];
  
  // Filter by media type
  if (params.mediaType) {
    results = results.filter(item => item.mediaType === params.mediaType);
  }
  
  // Filter by year
  if (params.year) {
    results = results.filter(item => {
      if (!item.releaseDate) return false;
      const releaseYear = new Date(item.releaseDate).getFullYear();
      return releaseYear === params.year;
    });
  }
  
  // Sort by option
  if (params.sortBy) {
    const [sortField, sortDirection] = params.sortBy.split('.');
    
    results = [...results].sort((a, b) => {
      let valueA: any;
      let valueB: any;
      
      switch (sortField) {
        case 'popularity':
          // Simulate popularity with vote average for mock data
          valueA = a.voteAverage;
          valueB = b.voteAverage;
          break;
        case 'vote_average':
          valueA = a.voteAverage;
          valueB = b.voteAverage;
          break;
        case 'release_date':
          valueA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
          valueB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
          break;
        default:
          return 0;
      }
      
      return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
    });
  }
  
  return results;
}

export async function searchMedia(query: string): Promise<Media[]> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  if (!query.trim()) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return allMedia.filter(item => 
    item.title.toLowerCase().includes(normalizedQuery) || 
    (item.overview && item.overview.toLowerCase().includes(normalizedQuery))
  );
}

export async function fetchMediaDetails(mediaType: MediaType, id: number): Promise<MediaDetailsType> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  const media = allMedia.find(item => item.mediaType === mediaType && item.id === id);
  
  if (!media) {
    throw new Error('Media not found');
  }
  
  // Add additional details for the media
  return {
    ...media,
    runtime: mediaType === 'movie' ? Math.floor(Math.random() * 60) + 90 : undefined, // Random runtime for movies
    genres: getRandomGenres(),
    cast: getRandomCast(),
  };
}

export async function fetchSimilarMedia(mediaType: MediaType, id: number): Promise<Media[]> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  // Get media of the same type, excluding the current one
  const similarMedia = allMedia.filter(item => item.mediaType === mediaType && item.id !== id);
  
  return shuffleArray(similarMedia).slice(0, 6);
}

export async function fetchRecommendations(items: { id: number; mediaType: MediaType }[]): Promise<Media[]> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  // For mock data, just return random media
  return shuffleArray([...allMedia]).slice(0, 10);
}

export async function fetchGenres(): Promise<GenreOption[]> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  return genres;
}

// Helper functions
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function getRandomGenres(): { id: number; name: string }[] {
  const numGenres = Math.floor(Math.random() * 3) + 1; // 1-3 genres
  return shuffleArray([...genres]).slice(0, numGenres);
}

function getRandomCast(): { id: number; name: string; character: string }[] {
  const castNames = [
    'Robert Downey Jr.',
    'Scarlett Johansson',
    'Chris Evans',
    'Tom Holland',
    'Chris Hemsworth',
    'Mark Ruffalo',
    'Samuel L. Jackson',
    'Elizabeth Olsen',
    'Tom Hiddleston',
    'Benedict Cumberbatch',
  ];
  
  const numCast = Math.floor(Math.random() * 5) + 3; // 3-7 cast members
  
  return shuffleArray(castNames).slice(0, numCast).map((name, index) => ({
    id: 1000 + index,
    name,
    character: `Character ${index + 1}`,
  }));
}