import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Plus, CheckCircle, XCircle } from 'lucide-react';
import { Reservation } from '../../../types';
import { mockReservations, mockOffres } from '../../../data/mockData';
import { useAuth } from '../../../hooks/useAuth';
import ActionButtons from '../../Common/ActionButtons';
import axios from 'axios';

interface ReservationsListProps {
  onEdit: (reservation: Reservation) => void;
  onAdd: () => void;
  onDelete: (id: number) => void;
}

const ReservationsList: React.FC<ReservationsListProps> = ({ onEdit, onAdd, onDelete }) => {
  const [reservations, setReservation] = useState<Reservation[]>(mockReservations);
  const { isAdmin, user } = useAuth();

  // Filter reservations based on user role
  const filteredReservations = isAdmin 
    ? reservations 
    : reservations.filter(r => r.utilisateurId === user?.id);

  const getOffreTitre = (offreId: number) => {
    const offre = mockOffres.find(o => o.id === offreId);
    return offre?.titreOffre || 'Offre inconnue';
  };

const getReservation = async () =>{
  const res = await axios.get("http://localhost:4005/reservation/")
  if (res.data)
  {
    console.log(res.data)
    setReservation(res.data)
  }else{
    console.log("erreur reservation")
  }

}

useEffect(() =>{
 getReservation();
}, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {isAdmin ? 'Gestion des Réservations' : 'Mes Réservations'}
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
                Offre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
               Utilisateur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                NombrePersonne
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date de réservation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                prixParPersonne
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReservations.map((reservation) => (
              <tr key={reservation.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  #{reservation.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {getOffreTitre(reservation.offreId)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {reservation.utilisateur? `ID: ${reservation.utilisateur.id} — ${reservation.utilisateur.email}`: "Utilisateur inconnu"}
                 </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {reservation.nombrePers}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(reservation.dateReservation).toLocaleDateString('fr-FR')}
                </td>
               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {Number(reservation.prixParPersonne)}€
               </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    reservation.isConfirme
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {reservation.isConfirme ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Confirmé
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3 mr-1" />
                        En attente
                      </>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(reservation)}
                      className="text-blue-600 hover:text-blue-900 flex items-center"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Modifier
                    </button>
                    <button
                      onClick={() => onDelete(reservation.id)}
                      className="text-red-600 hover:text-red-900 flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredReservations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucune réservation trouvée</p>
            <button
              onClick={onAdd}
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Créer ma première réservation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationsList;