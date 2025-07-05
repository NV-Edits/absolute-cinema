import React, { useEffect, useState } from 'react';
import HeroSlider from '../components/ui/HeroSlider';
import CategorySlider from '../components/ui/CategorySlider';
import { fetchTrending, fetchPopular, fetchTopRated, fetchRecommendations } from '../lib/api';
import { Media } from '../types';
import { useStore } from '../store/store';

const Home: React.FC = () => {
  const [trendingMedia, setTrendingMedia] = useState<Media[]>([]);
  const [popularMovies, setPopularMovies] = useState<Media[]>([]);
  const [popularTvShows, setPopularTvShows] = useState<Media[]>([]);
  const [popularAnime, setPopularAnime] = useState<Media[]>([]);
  const [recommendations, setRecommendations] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { watchlist } = useStore();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [trending, movies, tvShows, anime] = await Promise.all([
          fetchTrending(),
          fetchPopular('movie'),
          fetchPopular('tv'),
          fetchPopular('anime'),
        ]);

        setTrendingMedia(trending);
        setPopularMovies(movies);
        setPopularTvShows(tvShows);
        setPopularAnime(anime);

        // Get recommendations based on watchlist if available
        if (watchlist.length > 0) {
          const recentItems = watchlist.slice(0, 3);
          const recommendedItems = await fetchRecommendations(
            recentItems.map((item) => ({ id: item.id, mediaType: item.mediaType }))
          );
          setRecommendations(recommendedItems);
        }
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [watchlist]);

  return (
    <div>
      <HeroSlider items={trendingMedia} isLoading={isLoading} />

      {recommendations.length > 0 && (
        <CategorySlider
          title="Recommended For You"
          items={recommendations}
          isLoading={isLoading}
          viewAllLink="/discover"
        />
      )}

      <CategorySlider
        title="Popular Movies"
        items={popularMovies}
        isLoading={isLoading}
        viewAllLink="/discover?type=movie"
      />

      <CategorySlider
        title="Popular TV Series"
        items={popularTvShows}
        isLoading={isLoading}
        viewAllLink="/discover?type=tv"
      />

      <CategorySlider
        title="Popular Anime"
        items={popularAnime}
        isLoading={isLoading}
        viewAllLink="/discover?type=anime"
      />
    </div>
  );
};

export default Home;