import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, CreditCard } from 'lucide-react';
import Footer from '../components/Footer';
import { WaveLogo, OrangeMoneyLogo, MoovMoneyLogo, TelecelMoneyLogo, VisaLogo, MastercardLogo } from '../components/PaymentLogos';
import useCartStore from '../store/cartStore';
import { getRestaurantById } from '../services/data';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, restaurantId, clearCart } = useCartStore();
  const restaurant = restaurantId ? getRestaurantById(restaurantId) : null;
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = restaurant ? restaurant.deliveryFee : 0;
  const finalTotal = total + deliveryFee;

  const paymentMethods = [
    { id: 'wave', name: 'Wave', Logo: WaveLogo, color: '#00A651' },
    { id: 'orange', name: 'Orange Money', Logo: OrangeMoneyLogo, color: '#FF7900' },
    { id: 'moov', name: 'Moov Money', Logo: MoovMoneyLogo, color: '#E6007E' },
    { id: 'telecel', name: 'Telecel Money', Logo: TelecelMoneyLogo, color: '#00AEEF' },
    { id: 'visa', name: 'Visa', Logo: VisaLogo, color: '#1A1F71' },
    { id: 'mastercard', name: 'Mastercard', Logo: MastercardLogo, color: '#EB001B' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const paymentMethod = e.target.payment?.value || 'Orange Money';
    console.log('Order submitted:', { formData, items, total });
    navigate('/receipt', {
      state: {
        items,
        total,
        paymentMethod
      }
    });
  };

  const handleGetCurrentLocation = () => {
    setUseCurrentLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            address: 'Position actuelle (GPS)',
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Impossible de récupérer votre position');
        }
      );
    }
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
            <h1 className="text-lg font-display font-bold text-text-primary">Commander</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Delivery Address */}
              <div className="p-4 mb-6 border border-border-light">
                <h2 className="text-sm font-medium text-text-secondary mb-6 flex items-center gap-2">
                  <MapPin size={16} className="text-accent-primary" strokeWidth={1.5} />
                  Adresse de livraison
                </h2>

                <button
                  className="w-full mb-4 px-4 py-3 text-sm font-medium border border-border-light text-text-secondary hover:border-accent-primary hover:text-accent-primary transition-colors"
                  onClick={handleGetCurrentLocation}
                >
                  Utiliser ma position actuelle
                </button>

                <div className="mb-4">
                  <label className="block text-xs text-text-secondary mb-2">Adresse complète</label>
                  <input
                    type="text"
                    placeholder="Quartier, rue, numéro..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-background-secondary border-0 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-text-secondary mb-2">Instructions de livraison (optionnel)</label>
                  <input
                    type="text"
                    placeholder="Ex: Sonnette en panne, code d'accès..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 bg-background-secondary border-0 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="p-4 mb-6 border border-border-light">
                <h2 className="text-sm font-medium text-text-secondary mb-6 flex items-center gap-2">
                  <Phone size={16} className="text-accent-primary" strokeWidth={1.5} />
                  Informations de contact
                </h2>

                <div className="mb-4">
                  <label className="block text-xs text-text-secondary mb-2">Nom complet</label>
                  <input
                    type="text"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-background-secondary border-0 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-text-secondary mb-2">Numéro de téléphone</label>
                  <input
                    type="text"
                    placeholder="+226 XX XX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-background-secondary border-0 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="p-4 mb-6 border border-border-light">
                <h2 className="text-sm font-medium text-text-secondary mb-6 flex items-center gap-2">
                  <CreditCard size={16} className="text-accent-primary" strokeWidth={1.5} />
                  Mode de paiement
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className="relative cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        className="sr-only peer"
                        required
                      />
                      <div className="relative p-4 bg-background-secondary border-2 border-transparent peer-checked:border-accent-primary transition-all hover:shadow-md">
                        <method.Logo className="w-full h-10" />
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full mt-6 px-4 py-3 text-sm font-medium text-white transition-colors" style={{ backgroundColor: '#C1652E' }}>
                Confirmer la commande
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-4 border border-border-light">
              <h2 className="text-sm font-medium text-text-secondary mb-6">Récapitulatif</h2>

              {restaurant && (
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border-light">
                  <img
                    src={restaurant.logo}
                    alt={restaurant.name}
                    className="w-10 h-10 object-cover rounded-photo"
                  />
                  <div>
                    <h3 className="font-medium text-text-primary text-sm">{restaurant.name}</h3>
                    <p className="text-xs text-text-secondary">{restaurant.deliveryTime}</p>
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-text-secondary">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-mono text-text-primary">
                      {(item.price * item.quantity).toLocaleString()} FCFA
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border-light pt-3 space-y-3">
                <div className="flex justify-between text-sm text-text-secondary">
                  <span>Sous-total</span>
                  <span className="font-mono text-text-primary">{total.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-sm text-text-secondary">
                  <span>Frais de livraison</span>
                  <span className="font-mono text-text-primary">{deliveryFee.toLocaleString()} FCFA</span>
                </div>
                <div className="border-t border-border-light pt-3 flex justify-between text-base font-medium text-text-primary">
                  <span>Total</span>
                  <span className="font-mono text-text-primary">{finalTotal.toLocaleString()} FCFA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
