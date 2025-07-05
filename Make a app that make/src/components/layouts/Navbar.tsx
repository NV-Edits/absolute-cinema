import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Bell, User } from 'lucide-react';
import SearchBar from '../ui/SearchBar';
import { useStore } from '../../store/store';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [showSearch, setShowSearch] = useState(false);
  const { searchResults, setSearchTerm } = useStore();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-10 bg-background/80 backdrop-blur-md">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 rounded-full p-2 text-text-secondary hover:bg-card lg:hidden"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">Absolute Cinema</span>
            </Link>
          </div>

          <div className="hidden flex-1 items-center justify-center px-8 md:flex">
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="rounded-full p-2 text-text-secondary hover:bg-card md:hidden"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              className="rounded-full p-2 text-text-secondary hover:bg-card"
              aria-label="Notifications"
            >
              <Bell size={20} />
            </button>
            <button
              className="rounded-full p-2 text-text-secondary hover:bg-card"
              aria-label="User profile"
            >
              <User size={20} />
            </button>
          </div>
        </div>
        {showSearch && (
          <div className="pb-4 md:hidden">
            <SearchBar onSearch={handleSearch} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;