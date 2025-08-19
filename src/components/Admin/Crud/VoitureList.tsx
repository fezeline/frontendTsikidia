import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Car, Users } from 'lucide-react';
import { Voiture } from '../../../types';
import { mockVoitures } from '../../../data/mockData';
import { useAuth } from '../../../hooks/useAuth';
import ActionButtons from '../../Common/ActionButtons';
import axios from 'axios';

interface VoituresListProps {
  onEdit: (voiture: Voiture) => void;
  onAdd: () => void;
  onDelete: (id: number) => void;
}

const VoituresList: React.FC<VoituresListProps> = ({ onEdit, onAdd, onDelete }) => {
 const [voitures, setVoiture] = useState<Voiture[]>([]);
  const { isAdmin } = useAuth();

  const calculerCoutTotal = (voiture: Voiture) => {
    const jours = voiture.nombreJours ?? 0;
    return voiture.coutParJours * jours;
  };


const getVoiture = async () => {
  try {
    const res = await axios.get("http://localhost:4005/voiture/");
    console.log("Réponse brute :", res.data);
    if (Array.isArray(res.data)) {
      setVoiture(res.data);
    } else if (Array.isArray(res.data.voitures)) {
      setVoiture(res.data.voitures);
    } else {
      console.error("Format inattendu :", res.data);
    }
  } catch (error) {
    console.error("Erreur API :", error);
  }
};

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4005/voiture/${id}`);
      // Mettre à jour l'état local après la suppression
      setVoiture(voitures.filter(h => h.id !== id));
      // Appeler la prop onDelete si nécessaire
      onDelete(id);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'hébergement:", error);
    }
  };

useEffect(() => {
  console.log("Chargement des voitures depuis l'API...");
  getVoiture();
}, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Voitures</h1>
        {isAdmin && (
          <ActionButtons
            onAdd={onAdd}
            showEdit={false}
            showDelete={false}
          />
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Immatriculation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Modele
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Marque
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Capacité
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coût/jour
              </th>
              {/* Nouvelle colonne */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre de jours
              </th>
              {/* Nouvelle colonne pour l'ID de l'offre */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                   ID Offre
              </th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coût total
              </th>
          
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
             {voitures.map((voiture) => (
          <tr key={voiture.id} className="hover:bg-gray-50">
            {/* ID */}
           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
               {voiture.id}
           </td>

            {/* Immatriculation */}
           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {voiture.immatriculation}
           </td>

             {/* Modèle */}
           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
               {voiture.modele}
           </td>

              {/* Marque */}
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
               {voiture.marque}
            </td>

              {/* Capacité */}
            <td className="px-6 py-4 whitespace-nowrap">
             <div className="flex items-center text-sm text-gray-900">
               <Users className="w-4 h-4 mr-1" />
               {voiture.capacite} personnes
              </div>
            </td>

                {/* Coût/jour */}
             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                 {voiture.coutParJours} €
              </td>

                {/* Nombre de jours */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {voiture.nombreJours ?? '—'}
              </td>
        {/* Nouvelle cellule pour l'ID de l'offre */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {voiture.offreId || '—'}
              </td>
                {/* Coût total */}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {calculerCoutTotal(voiture) > 0
                      ? `${calculerCoutTotal(voiture)} €`
                      : '—'}
               </td>
     
                {/* Actions */}
               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div className="flex space-x-2">
              <button
               onClick={() => onEdit(voiture)}
               className="text-blue-600 hover:text-blue-900 flex items-center"
              >
               <Edit className="w-4 h-4 mr-1" />
                Modifier
              </button>
              <button
               onClick={() => handleDelete(voiture.id)}
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
      </div>
    </div>
  );
};

export default VoituresList;
