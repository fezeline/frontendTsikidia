import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-full">
        {/* Section gauche - Formulaire */}
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Link to="/" className="text-blue-600 hover:text-blue-500">
                ← Retour à l'accueil
              </Link>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Connectez-vous à votre compte
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Ou{' '}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  créez un nouveau compte
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <LoginForm />
            </div>
          </div>
        </div>

        {/* Section droite - Image */}
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg"
            alt="Voyage"
          />
          <div className="absolute inset-0 bg-blue-600 opacity-75"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-3xl font-bold mb-4">Bienvenue !</h3>
              <p className="text-xl">Accédez à votre espace personnel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;