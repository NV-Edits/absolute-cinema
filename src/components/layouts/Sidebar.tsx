import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, List, Compass, Film, Tv, PlayCircle, Heart, Clock, Settings } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-gray-800 bg-card lg:block">
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto p-4 pt-24">
          <nav className="space-y-6">
            <div>
              <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Menu
              </h3>
              <ul className="space-y-1">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-secondary hover:bg-card hover:text-text'
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
                    className={({ isActive }) =>
                      `flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-secondary hover:bg-card hover:text-text'
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
                    className={({ isActive }) =>
                      `flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-secondary hover:bg-card hover:text-text'
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
                    className={({ isActive }) =>
                      `flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-secondary hover:bg-card hover:text-text'
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
                    className={({ isActive }) =>
                      `flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-secondary hover:bg-card hover:text-text'
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
                    className={({ isActive }) =>
                      `flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-secondary hover:bg-card hover:text-text'
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
                    className={({ isActive }) =>
                      `flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-secondary hover:bg-card hover:text-text'
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
                    className={({ isActive }) =>
                      `flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-secondary hover:bg-card hover:text-text'
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
        </div>

        <div className="border-t border-gray-800 p-4">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-secondary hover:bg-card hover:text-text'
              }`
            }
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;