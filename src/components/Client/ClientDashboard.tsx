import React from 'react';
import { 
  Package, 
  Calendar, 
  CreditCard, 
  Star, 
  MessageSquare,
  Clock
} from 'lucide-react';

const ClientDashboard: React.FC = () => {
  const stats = [
    { label: 'Réservations Actives', value: '3', icon: Calendar, color: 'bg-blue-500' },
    { label: 'Offres Favorites', value: '7', icon: Package, color: 'bg-green-500' },
    { label: 'Commentaires', value: '5', icon: Star, color: 'bg-yellow-500' },
    { label: 'Messages', value: '2', icon: MessageSquare, color: 'bg-purple-500' }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mon Tableau de Bord</h1>
        <p className="text-gray-600 mt-2">Bienvenue dans votre espace personnel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mes Prochaines Réservations</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Circuit découverte Paris</p>
                <p className="text-xs text-gray-500">15 - 18 Mars 2024</p>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Confirmé
              </span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <Clock className="w-5 h-5 text-orange-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Séjour côte d'Azur</p>
                <p className="text-xs text-gray-500">20 - 25 Avril 2024</p>
              </div>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                En attente
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Offres Recommandées</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <img
                src="https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg"
                alt="Offre"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Week-end en Provence</p>
                <p className="text-xs text-gray-500">À partir de 199€</p>
              </div>
              <span className="text-xs text-blue-600 font-medium">Voir plus</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <img
                src="https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg"
                alt="Offre"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Circuit châteaux de la Loire</p>
                <p className="text-xs text-gray-500">À partir de 349€</p>
              </div>
              <span className="text-xs text-blue-600 font-medium">Voir plus</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;