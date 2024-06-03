import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar({ onLoginClick, onSignUpClick }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    if (token) {
      fetchUserProfile();
    }
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
        setFirstName(data.firstName);
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white bg-opacity-40">

      <div className="flex items-center ml-4">
        <img src="/alien_navbar.png" alt="Logo" className="w-20 h-20 mr-2" />
        <div className="bg-gradient-to-r from-yellow-400 to-green-600 text-transparent bg-clip-text font-['Bangers'] text-5xl font-bold">CosmoTax</div>
      </div>

      <div className="container mx-auto flex items-center justify-end px-4 space-x-8">

      <script src="https://cdn.lordicon.com/lordicon.js"></script>

        {!isLoggedIn && (
          <div className="flex items-center space-x-2">
            <lord-icon src="https://cdn.lordicon.com/fygyhyze.json" trigger="loop-on-hover" stroke="bold" colors="primary:#e83a30,secondary:#ffd700" style={{ width: '40px', height: '40px' }}></lord-icon>
            <button className="mr-4 px-6 py-3 bg-gradient-to-r from-yellow-300 to-yellow-500 text-gray-100 text-xl font-bold rounded-3xl hover:bg-yellow-500 ripple" onClick={onLoginClick}>Connexion</button>
          </div>
        )}

        {!isLoggedIn && (
          <div className="flex items-center space-x-2">
            <lord-icon src="https://cdn.lordicon.com/igljtrxq.json" trigger="loop-on-hover" stroke="bold" colors="primary:#e83a30,secondary:#ffd700" style={{ width: '40px', height: '40px' }}></lord-icon>
            <button className="px-6 py-3 bg-gradient-to-r from-yellow-300 to-yellow-500 text-gray-100 text-xl font-bold rounded-3xl hover:bg-yellow-500 ripple" onClick={onSignUpClick}>Inscription</button>
          </div>
        )}

        {isLoggedIn && (
          <div className="flex items-center space-x-2">
            <lord-icon src="https://cdn.lordicon.com/xfzuyvam.json" trigger="loop-on-hover" stroke="bold" colors="primary:#e83a30,secondary:#ffd700" style={{ width: '40px', height: '40px' }}></lord-icon>
            <Link href="/profile">
              <button className="px-6 py-3 bg-gradient-to-r from-yellow-300 to-yellow-500 text-gray-100 text-xl font-bold rounded-3xl hover:bg-yellow-500 ripple">{firstName ? firstName : 'Profil'}</button>
            </Link>        
          </div>
        )}

        {isLoggedIn && (
          <div className="flex items-center space-x-2">
            <lord-icon src="https://cdn.lordicon.com/fhszghjk.json" trigger="loop-on-hover" stroke="bold" colors="primary:#e83a30,secondary:#ffd700" style={{ width: '40px', height: '40px' }}></lord-icon>
            <Link href="payment/payment">
              <button className="px-6 py-3 bg-gradient-to-r from-yellow-300 to-yellow-500 text-gray-100 text-xl font-bold rounded-3xl hover:bg-yellow-500 ripple">Paiement</button>
            </Link>
          </div>
        )}

      </div>

    </nav>
  );
}