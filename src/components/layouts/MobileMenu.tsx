import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { X, Home, List, Compass, Film, Tv, PlayCircle, Heart, Clock, Settings } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden">
      <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-card shadow-lg">
        <div className="flex h-16 items-center justify-between px-6">
          <span className="text-xl font-bold text-primary">Absolute Cinema</span>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-text-secondary hover:bg-background"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex h-[calc(100%-4rem)] flex-col overflow-y-auto p-4">
          <nav className="space-y-6">
            <div>
              <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Menu
              </h3>
              <ul className="space-y-1">
                <li>
                  <NavLink
                    to="/"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-secondary hover:bg-background hover:text-text'
                      }`
                    }
                  >
                    <Home className="mr-3 h-5 w-5" />
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/discover"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-secondary hover:bg-background hover:text-text'
                      }`
                    }
                  >
                    <Compass className="mr-3 h-5 w-5" />
                    Discover
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/watchlist"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-secondary hover:bg-background hover:text-text'
                      }`
                    }
                  >
                    <List className="mr-3 h-5 w-5" />
                    Watchlist
                  </NavLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Categories
              </h3>
              <ul className="space-y-1">
                <li>
                  <NavLink
                    to="/discover?type=movie"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-secondary hover:bg-background hover:text-text'
                      }`
                    }
                  >
                    <Film className="mr-3 h-5 w-5" />
                    Movies
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/discover?type=tv"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-secondary hover:bg-background hover:text-text'
                      }`
                    }
                  >
                    <Tv className="mr-3 h-5 w-5" />
                    TV Series
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/discover?type=anime"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-secondary hover:bg-background hover:text-text'
                      }`
                    }
                  >
                    <PlayCircle className="mr-3 h-5 w-5" />
                    Anime
                  </NavLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Library
              </h3>
              <ul className="space-y-1">
                <li>
                  <NavLink
                    to="/watchlist?filter=favorites"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-secondary hover:bg-background hover:text-text'
                      }`
                    }
                  >
                    <Heart className="mr-3 h-5 w-5" />
                    Favorites
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/watchlist?filter=watchlater"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-secondary hover:bg-background hover:text-text'
                      }`
                    }
                  >
                    <Clock className="mr-3 h-5 w-5" />
                    Watch Later
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>

          <div className="mt-auto border-t border-gray-800 pt-4">
            <NavLink
              to="/settings"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:bg-background hover:text-text'
                }`
              }
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;