import React from 'react';
import { 
  Package, 
  Home, 
  Car, 
  Activity, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Star, 
  MessageSquare,
  Users
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Offres', value: '24', icon: Package, color: 'bg-blue-500' },
    { label: 'Hébergements', value: '12', icon: Home, color: 'bg-green-500' },
    { label: 'Voitures', value: '8', icon: Car, color: 'bg-yellow-500' },
    { label: 'Activités', value: '35', icon: Activity, color: 'bg-purple-500' },
    { label: 'Réservations', value: '156', icon: Calendar, color: 'bg-red-500' },
    { label: 'Utilisateurs', value: '89', icon: Users, color: 'bg-indigo-500' }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord Administration</h1>
        <p className="text-gray-600 mt-2">Vue d'ensemble de votre système de gestion touristique</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité Récente</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Nouvelle réservation</p>
                <p className="text-xs text-gray-500">Il y a 2 minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Star className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium">Nouveau commentaire</p>
                <p className="text-xs text-gray-500">Il y a 15 minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <CreditCard className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Paiement reçu</p>
                <p className="text-xs text-gray-500">Il y a 1 heure</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Messages Récents</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm font-medium">Question sur le circuit Paris</p>
              <p className="text-xs text-gray-500">client@email.com - Il y a 30 minutes</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-sm font-medium">Demande de modification</p>
              <p className="text-xs text-gray-500">user@example.com - Il y a 1 heure</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <p className="text-sm font-medium">Réclamation hébergement</p>
              <p className="text-xs text-gray-500">contact@client.fr - Il y a 2 heures</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;