'use client';

import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';

export default function ProfilePage() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

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
      } else {
        console.error('Erreur lors de la récupération du profil');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <Navbar />
      <h1 className="text-4xl font-bold mb-6">Votre profil</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email :</label>
          <p>{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Prénom :</label>
          <p>{user.firstName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Nom :</label>
          <p>{user.lastName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Adresse :</label>
          <p>{user.address}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Téléphone :</label>
          <p>{user.phone}</p>
        </div>
      </div>
    </div>
  );
}