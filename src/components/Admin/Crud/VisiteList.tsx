import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Plus, MapPin, Calendar } from 'lucide-react';
import { Visite } from '../../../types';
import { mockVisites } from '../../../data/mockData';
import { useAuth } from '../../../hooks/useAuth';
import ActionButtons from '../../Common/ActionButtons';
import axios from 'axios';

interface VisitesListProps {
  onEdit: (visite: Visite) => void;
  onAdd: () => void;
  onDelete: (id: number) => void;
}

const VisitesList: React.FC<VisitesListProps> = ({ onEdit, onAdd, onDelete }) => {
  const [visites,setVisite] = useState<Visite[]>(mockVisites);
  const { isAdmin } = useAuth();

const getVisite = async () =>{
  const res = await axios.get("http://localhost:4005/visite/")
  if (res.data)
  {
    console.log(res.data)
    setVisite(res.data)
  }else{
    console.log("erreur visite")
  }
}

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4005/visite/${id}`);
      // Mettre à jour l'état local après la suppression
      setVisite(visites.filter(h => h.id !== id));
      // Appeler la prop onDelete si nécessaire
      onDelete(id);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'hébergement:", error);
    }
  };


useEffect(() =>{
  getVisite()
},[])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Visites</h1>
        {isAdmin && (
          <ActionButtons
            onAdd={onAdd}
            showEdit={false}
            showDelete={false}
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visites.map((visite) => (
          <div key={visite.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <MapPin className="w-6 h-6 text-blue-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">
                {visite.ville}
              </h3>
            </div>
            
            <div className="flex items-center mb-4 text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {new Date(visite.dateVisite).toLocaleDateString('fr-FR')}
              </span>
            </div>

            <div className="mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Ordre: {visite.ordreVisite}
              </span>
            </div>
           <div className="mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {visite.offreId}
              </span>
            </div>
            {isAdmin && (
              <div className="flex space-x-2 pt-4 border-t">
                <button
                  onClick={() => onEdit(visite)}
                  className="flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(visite.id)}
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

export default VisitesList;