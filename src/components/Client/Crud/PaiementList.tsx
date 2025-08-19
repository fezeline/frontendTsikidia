import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Plus, CreditCard, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Paiement,Reservation } from '../../../types';
import { mockPaiements, mockReservations } from '../../../data/mockData';
import { useAuth } from '../../../hooks/useAuth';
import ActionButtons from '../../Common/ActionButtons';
import axios from 'axios';

interface PaiementsListProps {
  onEdit: (paiement: Paiement) => void;
  onAdd: () => void;
  onDelete: (id: number) => void;
}

const PaiementsList: React.FC<PaiementsListProps> = ({ onEdit, onAdd, onDelete }) => {
  const [paiements, setPaiement] = useState<Paiement[]>(mockPaiements);
  const { isAdmin, user } = useAuth();

  const getPayement = async () =>{
  const res = await axios.get("http://localhost:4005/payement/")
  if (res.data)
  {
    console.log(res.data)
    setPaiement(res.data)
  }else{
    console.log("erreur paiement")
  }
}

useEffect(() =>{
  getPayement();
}, []);

  // Filter payments based on user role
   const filteredPaiements = isAdmin 
    ? paiements 
    : paiements.filter(p => {
        // Méthode 1: Si les paiements ont directement un utilisateurId
        return p.utilisateurId === user?.id;
      });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Complété';
      case 'failed':
        return 'Échoué';
      default:
        return 'En attente';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };



  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {isAdmin ? 'Gestion des Paiements' : 'Mes Paiements'}
        </h1>
        <ActionButtons
          onAdd={onAdd}
          showEdit={false}
          showDelete={false}
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Réservation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Utilisateur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Montant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mode
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paiements.map((paiement) => (
              <tr key={paiement.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 text-blue-500 mr-3" />
                    {paiement.id} {/* Ajout de l'ID affiché */}
                  </div>
                </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {paiement.reservationId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {paiement.utilisateurId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {paiement.montant}€
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(paiement.date).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {paiement.  modePayement}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {paiement.  description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(paiement.status)}`}>
                    {getStatusIcon(paiement.status)}
                    <span className="ml-1">{getStatusLabel(paiement.status)}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaiementsList;