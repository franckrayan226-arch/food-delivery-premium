import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Bell, ShoppingCart, ShoppingBag } from 'lucide-react';
import Footer from '../components/Footer';
import RestaurantCard from '../components/RestaurantCard';
import HeroBanner from '../components/HeroBanner';
import { restaurants } from '../services/data';
import useCartStore from '../store/cartStore';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  const categories = ['all', 'Fast Food', 'Poulet Frit', 'Cuisine Internationale'];

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterRestaurants(query, selectedCategory);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterRestaurants(searchQuery, category);
  };

  const filterRestaurants = (query, category) => {
    let filtered = restaurants;

    if (category !== 'all') {
      filtered = filtered.filter((r) => r.cuisineType === category);
    }

    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(lowerQuery) ||
          r.description.toLowerCase().includes(lowerQuery) ||
          r.cuisineType.toLowerCase().includes(lowerQuery)
      );
    }

    setFilteredRestaurants(filtered);
  };

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background-primary border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <svg
                style={{ width: '40px', height: '40px' }}
                viewBox="0 0 140 140"
                fill="none"
              >
                <ellipse cx="70" cy="70" rx="44" ry="52" stroke="#C1652E" strokeWidth="2" fill="none"/>
                <path d="M38 50 Q70 22 102 50" stroke="#C1652E" strokeWidth="1.5" fill="none" opacity="0.6"/>
                <line x1="70" y1="22" x2="70" y2="38" stroke="#C1652E" strokeWidth="1" opacity="0.4"/>
                <path d="M50 62 Q58 56 66 62 Q58 68 50 62Z" fill="#C1652E" opacity="0.85"/>
                <path d="M74 62 Q82 56 90 62 Q82 68 74 62Z" fill="#C1652E" opacity="0.85"/>
                <path d="M70 62 L64 84 L76 84 Z" fill="#8B7355" opacity="0.7"/>
                <path d="M56 96 Q70 104 84 96" stroke="#C1652E" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <line x1="46" y1="78" x2="54" y2="78" stroke="#C1652E" strokeWidth="0.8" opacity="0.3"/>
                <line x1="86" y1="78" x2="94" y2="78" stroke="#C1652E" strokeWidth="0.8" opacity="0.3"/>
                <circle cx="70" cy="70" r="3" fill="#C1652E" opacity="0.2"/>
              </svg>
              <div className="flex flex-col">
                <p className="text-xs text-text-secondary flex items-center gap-1.5 mt-0.5">
                  <MapPin size={11} strokeWidth={1.5} />
                  Ouagadougou
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" size={15} strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder="Rechercher un plat, un restaurant..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-background-secondary border-0 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-2">
              <button className="p-2.5 hover:bg-background-secondary transition-colors">
                <Bell size={18} className="text-text-primary" strokeWidth={1.5} />
              </button>
              <button onClick={() => navigate('/cart')} className="p-2.5 hover:bg-background-secondary transition-colors">
                <ShoppingBag size={18} className="text-text-primary" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-5 flex gap-1 overflow-x-auto pb-1">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className="px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors border-b-2"
                  style={{
                    color: isActive ? '#C1652E' : '#8C8275',
                    borderColor: isActive ? '#C1652E' : 'transparent'
                  }}
                >
                  {category === 'all' ? 'Tous' : category}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <HeroBanner />
      </section>

      {/* Restaurant List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h3 className="text-sm font-medium text-text-secondary mb-6">Restaurants</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onClick={() => navigate(`/restaurant/${restaurant.id}`)}
            />
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-secondary text-sm">Aucun restaurant trouvé</p>
            <button
              className="mt-4 px-4 py-2 text-sm font-medium border border-border-light text-text-secondary hover:border-accent-primary hover:text-accent-primary transition-colors"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setFilteredRestaurants(restaurants);
              }}
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
