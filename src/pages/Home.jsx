import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Bell, ShoppingBag } from 'lucide-react';
import Footer from '../components/Footer';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants } from '../services/data';

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
              <div className="flex flex-col">
                <h1 className="text-xl font-display font-bold text-text-primary tracking-tight">FasoFree</h1>
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

      {/* Banner Section with African Pattern */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative h-48 overflow-hidden rounded-photo" style={{
          backgroundColor: '#FAF6EF',
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent 30px,
              rgba(193, 101, 46, 0.06) 30px,
              rgba(193, 101, 46, 0.06) 32px,
              transparent 32px,
              transparent 60px
            ),
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 30px,
              rgba(92, 107, 60, 0.06) 30px,
              rgba(92, 107, 60, 0.06) 32px,
              transparent 32px,
              transparent 60px
            ),
            radial-gradient(circle at 25% 25%, rgba(193, 101, 46, 0.08) 0%, transparent 30%),
            radial-gradient(circle at 75% 75%, rgba(184, 134, 46, 0.08) 0%, transparent 30%)
          `
        }}>
          {/* African geometric triangles */}
          <svg className="absolute inset-0 w-full h-full opacity-6" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="african-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <polygon points="30,5 55,25 45,55 15,55 5,25" fill="none" stroke="rgba(193, 101, 46, 0.15)" strokeWidth="1" />
                <polygon points="30,15 45,25 40,45 20,45 15,25" fill="rgba(92, 107, 60, 0.08)" />
                <circle cx="30" cy="30" r="3" fill="rgba(184, 134, 46, 0.15)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#african-pattern)" />
          </svg>
          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-lg font-display font-bold text-white mb-1">Découvrez nos restaurants</h2>
            <p className="text-white/80 text-sm">Livraison rapide et repas de qualité.</p>
          </div>
        </div>
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
