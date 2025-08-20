import React from 'react';
import { Link } from 'react-router-dom';
import Register from './Register';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-full">
        {/* Section gauche - Image */}
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg"
            alt="Voyage"
          />
          <div className="absolute inset-0 bg-purple-600 opacity-75"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-3xl font-bold mb-4">Rejoignez-nous !</h3>
              <p className="text-xl">Créez votre compte et découvrez le monde</p>
            </div>
          </div>
        </div>

        {/* Section droite - Formulaire */}
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Link to="/" className="text-blue-600 hover:text-blue-500">
                ← Retour à l'accueil
              </Link>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Créez votre compte
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Ou{' '}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  connectez-vous à votre compte existant
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <Register />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;