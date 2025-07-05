import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import Home from './pages/Home';
import Watchlist from './pages/Watchlist';
import Discover from './pages/Discover';
import MediaDetails from './pages/MediaDetails';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="discover" element={<Discover />} />
        <Route path="details/:mediaType/:id" element={<MediaDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;