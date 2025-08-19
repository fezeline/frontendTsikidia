import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Plus, Activity, Clock, MapPin, Calendar} from 'lucide-react';
import { Activite } from '../../../types';
import { mockActivites } from '../../../data/mockData';
import { useAuth } from '../../../hooks/useAuth';
import ActionButtons from '../../Common/ActionButtons';
import axios from 'axios';

interface ActivitesListProps {
  onEdit: (activite: Activite) => void;
  onAdd: () => void;
  onDelete: (id: number) => void;
}

const ActivitesList: React.FC<ActivitesListProps> = ({ onEdit, onAdd, onDelete }) => {
  const [activites, setActivite] = useState<Activite[]>(mockActivites);
  const { isAdmin } = useAuth();

  const getActivite = async () => {
    try {
      const res = await axios.get("http://localhost:4005/activite/");
      if (res.data) {
        console.log(res.data);
        setActivite(res.data);
      } else {
        console.log("Erreur lors du chargement des activités");
      }
    } catch (error) {
      console.error("Erreur API :", error);
    }
  };

    const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4005/activite/${id}`);
      // Mettre à jour l'état local après la suppression
      setActivite(activites.filter(h => h.id !== id));
      // Appeler la prop onDelete si nécessaire
      onDelete(id);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'hébergement:", error);
    }
  };

  // ✅ Hook au bon endroit
  useEffect(() => {
    getActivite();
  }, []);


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Activités</h1>
        {isAdmin && (
          <ActionButtons
            onAdd={onAdd}
            showEdit={false}
            showDelete={false}
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activites.map((activite) => (
          <div key={activite.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <Activity className="w-6 h-6 text-green-500 mr-3" />
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  #{activite.visiteId}
                </span>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {activite.descriptionActivite}
            </h3>

             <div className="space-y-2 mb-4">
               <div className="flex items-center mb-4 text-gray-600">
                   <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                     {new Date(activite.dateActivite).toLocaleDateString('fr-FR')}
                    </span>
                </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{activite.lieuActivite}</span>
              </div>
            </div>

            {isAdmin && (
              <div className="flex space-x-2 pt-4 border-t">
                <button
                  onClick={() => onEdit(activite)}
                  className="flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(activite.id)}
                  className="flex items-center px-3 py-1.5 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Supprimer
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitesList;