'use client';

import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { FaUserEdit, FaSave, FaTimes } from 'react-icons/fa';

export default function ProfilePage() {
  
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [taxes, setTaxes] = useState([]);
  const [visibleTaxes, setVisibleTaxes] = useState(6);
  const [showModal, setShowModal] = useState(false);
  const [uniqueCode, setUniqueCode] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);
  
  useEffect(() => {
    if (user) {
      fetchUserTaxes();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setEditedUser(data);
      } else {
        console.error('Erreur lors de la récupération du profil');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        setUser(editedUser);
        setIsEditing(false);
      } else {
        console.error('Erreur lors de la mise à jour du profil');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const fetchUserTaxes = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/taxes`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setTaxes(data['hydra:member']);
      } else {
        console.error('Erreur lors de la récupération des taxes');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const generateUniqueCode = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const firstLetter = alphabet[Math.floor(Math.random() * 25)];
    const secondLetter = alphabet[Math.floor(Math.random() * (alphabet.indexOf(firstLetter)))];
    const currentYear = new Date().getFullYear();
    let num1 = Math.floor(Math.random() * 99) + 1;
    let num2 = 100 - num1;
    const code = `${firstLetter}${secondLetter}${currentYear}_${num1}_${num2}`;
    setUniqueCode(code);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto">

      <Navbar />

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-80"></div>
          <div className="relative bg-white w-3/4 p-12 rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-4xl"
              onClick={() => setShowModal(false)}
            >
              <FaTimes />
            </button>
            <h2 className="text-3xl font-bold mb-6">Votre code unique :</h2>
            <p className="text-xl">{uniqueCode}</p>
          </div>
        </div>
      )}

      <div className="bg-white shadow-lg backdrop-blur-sm rounded-lg p-10 mt-20 mx-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-5xl font-bold font-['Bangers'] mb-10 bg-gradient-to-r from-green-500 to-green-600 text-transparent bg-clip-text tracking-wider">Votre profil</h1>
          <button
            className="bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-500 hover:to-yellow-700 text-white text-xl font-bold py-2 px-5 rounded-3xl flex items-center"
            onClick={() => setIsEditing(!isEditing)}
          >
            <FaUserEdit className="mr-2" />
            {isEditing ? 'Annuler' : 'Modifier'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-bold mb-3">Email intergalactique :</label>
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 rounded-lg ${
                isEditing
                  ? 'bg-gray-200 focus:bg-white'
                  : 'bg-gray-100 cursor-not-allowed'
              }`}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Prénom :</label>
            <input
              type="text"
              name="firstName"
              value={editedUser.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 rounded-lg ${
                isEditing
                  ? 'bg-gray-200 focus:bg-white'
                  : 'bg-gray-100 cursor-not-allowed'
              }`}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Nom :</label>
            <input
              type="text"
              name="lastName"
              value={editedUser.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 rounded-lg ${
                isEditing
                  ? 'bg-gray-200 focus:bg-white'
                  : 'bg-gray-100 cursor-not-allowed'
              }`}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Adresse de votre planète :</label>
            <input
              type="text"
              name="address"
              value={editedUser.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 rounded-lg ${
                isEditing
                  ? 'bg-gray-200 focus:bg-white'
                  : 'bg-gray-100 cursor-not-allowed'
              }`}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Téléphone cosmique :</label>
            <input
              type="tel"
              name="phone"
              value={editedUser.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 rounded-lg ${
                isEditing
                  ? 'bg-gray-200 focus:bg-white'
                  : 'bg-gray-100 cursor-not-allowed'
              }`}
            />
          </div>

        </div>
        {isEditing && (
          <div className="flex justify-end mt-6">
            <button
              className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-700 text-white text-xl font-bold py-2 px-5 rounded-3xl flex items-center"
              onClick={handleSaveChanges}
            >
              <FaSave className="mr-2" />
              Enregistrer
            </button>
          </div>
        )}
      </div>

      <div className="bg-white shadow-lg backdrop-blur-sm rounded-lg p-10 mt-20 mx-20">
        <h2 className="text-5xl font-bold font-['Bangers'] mb-10 bg-gradient-to-r from-green-500 to-green-600 text-transparent bg-clip-text tracking-wider">Vos taxes restantes à payer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {taxes.length > 0 ? (
            taxes.slice(0, visibleTaxes).map((tax) => (
              <div key={tax.id} className="bg-gradient-to-r from-green-100 to-green-100 bg-opacity-30 rounded-xl p-4">
                <img src={`/images/taxes/${tax.title.replace(/\s+/g, '_').toLowerCase()}.jpg`} alt={tax.title} className="w-full h-[30rem] object-cover mb-4 rounded-t-xl" />
                <p className="text-xl font-bold mb-4">{tax.title}</p>
                <p className="mb-4">{tax.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold">{tax.amount} €</p>
                  <button onClick={generateUniqueCode} className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-700 text-white text-xl font-bold py-2 px-4 rounded-3xl">
                    Générer le code unique
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Aucune taxe restante</p>
          )}
        </div>
        {visibleTaxes < taxes.length && (
          <div className="flex justify-center mt-8">
            <button onClick={() => setVisibleTaxes(visibleTaxes + 6)} className="bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-500 hover:to-yellow-700 text-white text-xl font-bold py-2 px-5 rounded-3xl">Voir plus</button>
          </div>
        )}
      </div>

      <div className="bg-white shadow-lg backdrop-blur-sm rounded-lg p-10 mt-20 mb-20 mx-20">
        <h2 className="text-5xl font-bold font-['Bangers'] mb-10 bg-gradient-to-r from-green-500 to-green-600 text-transparent bg-clip-text tracking-wider">Historique des paiements</h2>
      </div>
    </div>
  );
}