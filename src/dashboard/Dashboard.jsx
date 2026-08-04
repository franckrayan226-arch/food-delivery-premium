import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Package, ShoppingCart, TrendingUp, Users, Settings, Tag, Menu } from 'lucide-react';
import { restaurants } from '../services/data';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const stats = [
    { label: 'Commandes', value: 24, icon: ShoppingCart, color: 'bg-accent-primary' },
    { label: 'Articles', value: 32, icon: Package, color: 'bg-status-success' },
    { label: 'Chiffre d\'affaires', value: '145 000 FCFA', icon: TrendingUp, color: 'bg-status-info' },
    { label: 'Clients', value: 18, icon: Users, color: 'bg-status-warning' },
  ];

  const recentOrders = [
    { id: '12345', customer: 'Jean Dupont', total: 11400, status: 'preparing', time: '12:30' },
    { id: '12344', customer: 'Marie Kouame', total: 8500, status: 'ready', time: '12:15' },
    { id: '12343', customer: 'Paul Sankara', total: 6700, status: 'delivering', time: '11:45' },
  ];

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { variant: 'warning', label: 'En attente' },
      preparing: { variant: 'info', label: 'En préparation' },
      ready: { variant: 'success', label: 'Prêt' },
      delivering: { variant: 'primary', label: 'En livraison' },
      delivered: { variant: 'default', label: 'Livré' },
    };
    return statusMap[status] || { variant: 'default', label: status };
  };

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setActiveTab('overview');
  };

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="bg-background-card border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Menu size={20} className="text-text-primary" strokeWidth={1.5} />
              <div>
                <h1 className="text-lg font-display font-bold text-text-primary">
                  {selectedRestaurant ? selectedRestaurant.name : 'Dashboard'}
                </h1>
                <p className="text-text-secondary text-xs">
                  {selectedRestaurant ? 'Espace restaurant' : 'Sélectionnez un restaurant'}
                </p>
              </div>
            </div>
            <button className="px-4 py-2 text-sm font-medium border border-border-light text-text-secondary hover:border-accent-primary hover:text-accent-primary transition-colors">
              <LogOut size={14} className="mr-2" strokeWidth={1.5} />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Restaurant Selection */}
      {!selectedRestaurant && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-base font-medium text-text-primary mb-6">Sélectionnez votre restaurant</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="relative">
                <div 
                  className="relative w-64 h-64 mx-auto cursor-pointer"
                  onClick={() => handleRestaurantSelect(restaurant)}
                >
                  <div className="w-full h-full overflow-hidden border-4 border-border-light hover:border-accent-primary transition-colors">
                    <img
                      src={restaurant.coverImage}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                      <img
                        src={restaurant.logo}
                        alt={`${restaurant.name} logo`}
                        className="w-16 h-16 mx-auto mb-3 object-cover rounded-photo border-2 border-accent-primary"
                      />
                      <h3 className="text-base font-medium text-white mb-1">{restaurant.name}</h3>
                      <p className="text-xs text-white/80">{restaurant.tagline}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dashboard Content */}
      {selectedRestaurant && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs */}
          <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: TrendingUp },
              { id: 'menu', label: 'Menu', icon: Package },
              { id: 'orders', label: 'Commandes', icon: ShoppingCart },
              { id: 'settings', label: 'Paramètres', icon: Settings },
              { id: 'promotions', label: 'Promotions', icon: Tag },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'text-text-primary'
                      : 'text-text-secondary'
                  }`}
                  style={{ borderColor: activeTab === tab.id ? '#C1652E' : 'transparent' }}
                >
                  <Icon size={14} strokeWidth={1.5} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                  <div className="border border-border-light p-4" key={stat.label}>
                    <div className={`w-10 h-10 flex items-center justify-center mb-4`} style={{ backgroundColor: '#C1652E' }}>
                      <stat.icon size={18} className="text-white" strokeWidth={1.5} />
                    </div>
                    <p className="text-text-secondary text-xs font-medium">{stat.label}</p>
                    <p className="text-lg font-medium text-text-primary mt-1">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="border border-border-light p-4 mb-8">
                <h2 className="text-sm font-medium text-text-secondary mb-6">Commandes récentes</h2>
                <div className="space-y-4">
                  {recentOrders.map((order) => {
                    const statusBadge = getStatusBadge(order.status);
                    return (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-background-secondary">
                        <div>
                          <p className="font-medium text-text-primary text-sm">#{order.id}</p>
                          <p className="text-xs text-text-secondary">{order.customer}</p>
                          <p className="text-xs text-text-secondary">{order.time}</p>
                        </div>
                        <div className="text-right">
                          <span className="px-2 py-1 bg-background-tertiary text-xs text-text-secondary">{statusBadge.label}</span>
                          <p className="text-base font-medium text-text-primary mt-2">
                            {order.total.toLocaleString()} FCFA
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-border-light p-4 cursor-pointer hover:border-accent-primary transition-colors">
                  <Package size={24} className="text-accent-primary mb-4" strokeWidth={1.5} />
                  <h3 className="font-medium text-text-primary mb-2 text-sm">Gérer le menu</h3>
                  <p className="text-text-secondary text-xs">Modifier les articles et catégories</p>
                </div>
                <div className="border border-border-light p-4 cursor-pointer hover:border-accent-primary transition-colors">
                  <ShoppingCart size={24} className="text-accent-primary mb-4" strokeWidth={1.5} />
                  <h3 className="font-medium text-text-primary mb-2 text-sm">Voir les commandes</h3>
                  <p className="text-text-secondary text-xs">Historique complet des commandes</p>
                </div>
                <div className="border border-border-light p-4 cursor-pointer hover:border-accent-primary transition-colors">
                  <TrendingUp size={24} className="text-accent-primary mb-4" strokeWidth={1.5} />
                  <h3 className="font-medium text-text-primary mb-2 text-sm">Statistiques</h3>
                  <p className="text-text-secondary text-xs">Performances et rapports</p>
                </div>
              </div>
            </>
          )}

          {/* Menu Tab */}
          {activeTab === 'menu' && (
            <div className="border border-border-light p-4">
              <h2 className="text-sm font-medium text-text-secondary mb-6">Gestion du menu</h2>
              <div className="space-y-4">
                {selectedRestaurant.menu.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-background-secondary">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-photo" />
                    <div className="flex-1">
                      <h3 className="font-medium text-text-primary text-sm">{item.name}</h3>
                      <p className="text-xs text-text-secondary">{item.category}</p>
                      <p className="font-mono text-sm" style={{ color: '#C1652E' }}>{item.price.toLocaleString()} FCFA</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 text-xs font-medium border border-border-light text-text-secondary hover:border-accent-primary hover:text-accent-primary transition-colors">Modifier</button>
                      <button className="px-3 py-1.5 text-xs font-medium border border-border-light text-error hover:border-error hover:text-error transition-colors">Supprimer</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="border border-border-light p-4">
              <h2 className="text-sm font-medium text-text-secondary mb-6">Gestion des commandes</h2>
              <div className="space-y-4">
                {recentOrders.map((order) => {
                  const statusBadge = getStatusBadge(order.status);
                  return (
                    <div key={order.id} className="p-4 bg-background-secondary">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-medium text-text-primary text-sm">#{order.id}</p>
                          <p className="text-xs text-text-secondary">{order.customer}</p>
                        </div>
                        <span className="px-2 py-1 bg-background-tertiary text-xs text-text-secondary">{statusBadge.label}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 text-xs font-medium border border-border-light text-text-secondary hover:border-accent-primary hover:text-accent-primary transition-colors">Détails</button>
                        <button className="px-3 py-1.5 text-xs font-medium text-white transition-colors" style={{ backgroundColor: '#C1652E' }}>Mettre à jour</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="border border-border-light p-4">
              <h2 className="text-sm font-medium text-text-secondary mb-6">Paramètres du restaurant</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-text-primary mb-2 text-sm">Informations générales</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-text-secondary mb-2">Nom</label>
                      <input
                        type="text"
                        defaultValue={selectedRestaurant.name}
                        className="w-full px-4 py-3 bg-background-secondary border-0 text-sm text-text-primary focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-secondary mb-2">Description</label>
                      <textarea
                        defaultValue={selectedRestaurant.description}
                        rows={3}
                        className="w-full px-4 py-3 bg-background-secondary border-0 text-sm text-text-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
                <button className="px-6 py-3 text-sm font-medium text-white transition-colors" style={{ backgroundColor: '#C1652E' }}>Enregistrer</button>
              </div>
            </div>
          )}

          {/* Promotions Tab */}
          {activeTab === 'promotions' && (
            <div className="border border-border-light p-4">
              <h2 className="text-sm font-medium text-text-secondary mb-6">Gestion des promotions</h2>
              <div className="text-center py-12">
                <p className="text-text-secondary text-sm">Aucune promotion active</p>
                <button className="mt-4 px-6 py-3 text-sm font-medium text-white transition-colors" style={{ backgroundColor: '#C1652E' }}>Créer une promotion</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
