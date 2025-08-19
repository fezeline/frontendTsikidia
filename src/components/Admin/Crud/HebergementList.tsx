import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Plus, Star } from 'lucide-react';
import { Hebergement } from '../../../types';
import { mockHebergements } from '../../../data/mockData';
import { useAuth } from '../../../hooks/useAuth';
import ActionButtons from '../../Common/ActionButtons';
import axios from 'axios';

interface HebergementsListProps {
  onEdit: (hebergement: Hebergement) => void;
  onAdd: () => void;
  onDelete: (id: number) => void;
}

const HebergementsList: React.FC<HebergementsListProps> = ({ onEdit, onAdd, onDelete }) => {
  const [hebergements, setHebergement] = useState<Hebergement[]>(mockHebergements);
  const { isAdmin } = useAuth();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const calculerTotalFrais = (hebergement: Hebergement) => {
    const nuits = hebergement.nombreNuit ?? 0;
    return hebergement.fraisParNuit * nuits;
  };


const getHebergement = async () =>{
  const res = await axios.get("http://localhost:4005/hebergement/")
  if (res.data)
  {
    console.log(res.data)
    setHebergement(res.data)
  }else{
    console.log("erreur hebergement")
  }
}

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4005/hebergement/${id}`);
      // Mettre à jour l'état local après la suppression
      setHebergement(hebergements.filter(h => h.id !== id));
      // Appeler la prop onDelete si nécessaire
      onDelete(id);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'hébergement:", error);
    }
  };

useEffect(() =>{
 getHebergement()
},[]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Hébergements</h1>
        {isAdmin && (
          <ActionButtons
            onAdd={onAdd}
            showEdit={false}
            showDelete={false}
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hebergements.map((hebergement) => (
          <div key={hebergement.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {hebergement.nom}
                </h3>
                <div className="flex items-center">
                  {renderStars(hebergement.etoile)}
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">
                {hebergement.adresse}
              </p>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-blue-600">
                  {hebergement.fraisParNuit}€
                </span>
                <span className="text-sm text-gray-500">par nuit</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-700">
                  {hebergement.nombreNuit ?? '—'} nuit(s)
                </span>
                <span className="text-lg font-semibold text-green-600">
                  {calculerTotalFrais(hebergement) > 0
                    ? `${calculerTotalFrais(hebergement)} €`
                    : '—'}
                </span>
              </div>
              
             {/*affichage la liste de visite associée*/}
              <div className="flex justify-between items-center mb-4">
               <span className="text-2xl font-bold text-blue-600">
                  {hebergement.visiteId}
                </span>
              </div>

              {isAdmin && (
                <div className="flex space-x-2 pt-4 border-t">
                  <button
                    onClick={() => onEdit(hebergement)}
                    className="flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(hebergement.id)}
                    className="flex items-center px-3 py-1.5 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HebergementsList;