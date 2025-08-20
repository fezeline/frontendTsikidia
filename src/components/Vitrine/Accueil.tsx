import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Users, Calendar, ArrowRight, Phone, Mail } from 'lucide-react';

const Accueil: React.FC = () => {
  const destinations = [
    {
      id: 1,
      nom: "Paris",
      image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg",
      prix: "À partir de 299€",
      description: "Découvrez la ville lumière"
    },
    {
      id: 2,
      nom: "Côte d'Azur",
      image: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg",
      prix: "À partir de 450€",
      description: "Soleil et plages de rêve"
    },
    {
      id: 3,
      nom: "Provence",
      image: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg",
      prix: "À partir de 199€",
      description: "Lavande et villages authentiques"
    }
  ];

  const services = [
    {
      icon: MapPin,
      titre: "Circuits Organisés",
      description: "Des itinéraires soigneusement planifiés pour découvrir les plus beaux sites"
    },
    {
      icon: Users,
      titre: "Guides Experts",
      description: "Des guides locaux passionnés pour enrichir votre expérience"
    },
    {
      icon: Calendar,
      titre: "Réservation Facile",
      description: "Système de réservation en ligne simple et sécurisé"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Explorez le Monde
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Découvrez des destinations extraordinaires avec nos circuits sur mesure
          </p>
          <div className="space-x-4">
            <Link
              to="/destinations"
              className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
            >
              Découvrir nos destinations
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold rounded-lg transition-colors"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une expérience de voyage complète avec des services de qualité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {service.titre}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Destinations Populaires */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Destinations Populaires
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez nos destinations les plus prisées
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <div key={destination.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={destination.image}
                  alt={destination.nom}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {destination.nom}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {destination.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {destination.prix}
                    </span>
                    <Link
                      to="/destinations"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Voir plus
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos clients
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Une expérience inoubliable ! L'organisation était parfaite et les guides très professionnels."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">Marie Dupont</p>
                    <p className="text-sm text-gray-500">Cliente satisfaite</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Prêt pour votre prochaine aventure ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des milliers de voyageurs satisfaits
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
          >
            S'inscrire maintenant
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Accueil;