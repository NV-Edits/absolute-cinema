import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-6 text-6xl font-bold text-primary">404</div>
      <h1 className="mb-4 text-3xl font-bold">Page Not Found</h1>
      <p className="mb-8 max-w-md text-text-secondary">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="flex items-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
      >
        <Home className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;