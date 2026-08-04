import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Phone, Heart, ArrowLeft, LogOut, Settings, Bell, CreditCard } from 'lucide-react';
import Footer from '../components/Footer';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    phone: '+226 70 00 00 00',
    address: 'Patte d Oie, Ouagadougou',
  });

  const favoriteItems = [
    {
      id: 1,
      name: 'Cesar Burger',
      restaurant: 'Cesar',
      image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400',
      price: 4000,
    },
    {
      id: 2,
      name: '8 Wings',
      restaurant: 'BelChiken',
      image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400',
      price: 5000,
    },
  ];

  const menuItems = [
    { icon: MapPin, label: 'Adresses de livraison', action: () => {} },
    { icon: CreditCard, label: 'Modes de paiement', action: () => {} },
    { icon: Bell, label: 'Notifications', action: () => {} },
    { icon: Settings, label: 'Paramètres', action: () => {} },
    { icon: LogOut, label: 'Déconnexion', action: () => {}, variant: 'danger' },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Save profile data
  };

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background-primary border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-background-secondary transition-colors"
            >
              <ArrowLeft size={18} className="text-text-primary" strokeWidth={1.5} />
            </button>
            <h1 className="text-lg font-display font-bold text-text-primary">Mon Profil</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Profile Card */}
          <div className="border border-border-light p-4">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-background-secondary flex items-center justify-center">
                  <User size={24} className="text-text-secondary" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-base font-medium text-text-primary">{formData.name}</h2>
                  <p className="text-text-secondary text-sm">{formData.email}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs text-text-secondary hover:text-text-primary transition-colors"
              >
                {isEditing ? 'Annuler' : 'Modifier'}
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-text-secondary mb-2">Nom complet</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-background-secondary border-0 text-sm text-text-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-secondary mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-background-secondary border-0 text-sm text-text-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-secondary mb-2">Téléphone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-background-secondary border-0 text-sm text-text-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-secondary mb-2">Adresse</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 bg-background-secondary border-0 text-sm text-text-primary focus:outline-none transition-colors"
                  />
                </div>
                <button onClick={handleSave} className="w-full px-4 py-3 text-sm font-medium text-white transition-colors" style={{ backgroundColor: '#C1652E' }}>
                  Enregistrer
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <Phone size={16} className="text-text-secondary" strokeWidth={1.5} />
                  <span>{formData.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <MapPin size={16} className="text-text-secondary" strokeWidth={1.5} />
                  <span>{formData.address}</span>
                </div>
              </div>
            )}
          </div>

          {/* Favorites */}
          <div className="border border-border-light p-4">
            <div className="flex items-center gap-2 mb-6">
              <Heart size={16} className="text-accent-primary" strokeWidth={1.5} />
              <h2 className="text-sm font-medium text-text-secondary">Favoris</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favoriteItems.map((item) => (
                <div key={item.id} className="relative group cursor-pointer">
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-photo transition-transform duration-300 group-hover:scale-105"
                    />
                    <button className="absolute top-2 right-2 p-2 bg-background-secondary/90 backdrop-blur-sm text-error">
                      <Heart size={14} className="fill-current" strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="mt-2">
                    <h3 className="font-medium text-text-primary text-sm">{item.name}</h3>
                    <p className="text-xs text-text-secondary">{item.restaurant}</p>
                    <p className="font-mono text-sm mt-1" style={{ color: '#C1652E' }}>
                      {item.price.toLocaleString()} FCFA
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {favoriteItems.length === 0 && (
              <div className="text-center py-8">
                <Heart size={32} className="mx-auto text-text-secondary mb-4" strokeWidth={1.5} />
                <p className="text-text-secondary text-sm">Aucun favori pour le moment</p>
              </div>
            )}
          </div>

          {/* Menu Items */}
          <div className="border border-border-light">
            <div className="divide-y divide-border-light">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isDanger = item.variant === 'danger';

                return (
                  <button
                    key={index}
                    onClick={item.action}
                    className={`w-full flex items-center gap-4 p-4 transition-colors ${
                      isDanger
                        ? 'hover:bg-error/10 text-error'
                        : 'hover:bg-background-secondary text-text-primary'
                    }`}
                  >
                    <Icon size={16} strokeWidth={1.5} />
                    <span className="flex-1 text-left font-medium text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/order-history')}
              className="px-4 py-3 text-sm font-medium border border-border-light text-text-secondary hover:border-accent-primary hover:text-accent-primary transition-colors"
            >
              Mes commandes
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-3 text-sm font-medium border border-border-light text-text-secondary hover:border-accent-primary hover:text-accent-primary transition-colors"
            >
              Commander
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
