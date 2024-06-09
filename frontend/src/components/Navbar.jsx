import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';

export default function Navbar({ onLoginClick, onSignUpClick, onHomeClick }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <nav className="flex items-center justify-between p-4 bg-white bg-opacity-40">

        <Link href="/" className="flex items-center ml-4" onClick={onHomeClick}>
          <img src="/alien_navbar.png" alt="Alien logo" className="w-10 h-10 mr-2 sm:w-18 sm:h-18" />
          <div className="font-['Bangers'] text-3xl sm:text-5xl font-bold bg-gradient-anim text-transparent bg-clip-text animate-gradientX">CosmoTax</div>
        </Link>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FaBars className="w-8 h-8 text-orange-400" />
        </button>

        <div className={`md:flex items-center justify-end px-4 space-x-8 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="container flex items-center justify-end px-4 mx-auto space-x-8">
            <script src="https://cdn.lordicon.com/lordicon.js"></script>

            {!isLoggedIn && (
              <div className="flex items-center space-x-2">
                <button className="flex items-center px-5 py-2 text-xl font-bold text-gray-100 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-3xl hover:bg-yellow-500 ripple" onClick={onSignUpClick}>
                  <lord-icon src="https://cdn.lordicon.com/igljtrxq.json" trigger="loop-on-hover" stroke="bold" colors="primary:#c7c116,secondary:#c76f16" style={{ width: '30px', height: '30px', marginRight: '8px' }}></lord-icon>
                  Inscription
                </button>
              </div>
            )}  

            {!isLoggedIn && (
              <div className="flex items-center space-x-2">
                <button className="flex items-center px-5 py-2 mr-4 text-xl font-bold text-gray-100 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-3xl hover:bg-yellow-500 ripple" onClick={onLoginClick}>
                  <lord-icon src="https://cdn.lordicon.com/fygyhyze.json" trigger="loop-on-hover" stroke="bold" colors="primary:#c7c116,secondary:#c76f16" style={{ width: '30px', height: '30px', marginRight: '8px' }}></lord-icon>
                  Connexion
                </button>
              </div>
            )}

            {isLoggedIn && (
              <div className="flex items-center space-x-2">
                <Link href="/profile">
                  <button className="flex items-center px-5 py-2 text-xl font-bold text-gray-100 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-3xl hover:bg-yellow-500 ripple">
                    <lord-icon src="https://cdn.lordicon.com/xfzuyvam.json" trigger="loop-on-hover" stroke="bold" colors="primary:#c7c116,secondary:#c76f16" style={{ width: '30px', height: '30px', marginRight: '8px' }}></lord-icon>
                    {firstName ? firstName : 'Profil'}
                  </button>
                </Link>        
              </div>
            )}

            {isLoggedIn && (
              <div className="flex items-center space-x-2">
                <Link href="/payment">
                  <button className="flex items-center px-5 py-2 text-xl font-bold text-gray-100 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-3xl hover:bg-yellow-500 ripple">
                    <lord-icon src="https://cdn.lordicon.com/fhszghjk.json" trigger="loop-on-hover" stroke="bold" colors="primary:#c7c116,secondary:#c76f16" style={{ width: '30px', height: '30px', marginRight: '8px' }}></lord-icon>
                    Paiement
                  </button>
                </Link>
              </div>
            )}

            {isLoggedIn && (
              <div className="flex items-center space-x-2">
                <Link href="/">
                  <button className="flex items-center px-5 py-2 text-xl font-bold text-gray-100 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-3xl hover:bg-yellow-500 ripple" onClick={() => {localStorage.removeItem("token"); setIsLoggedIn(false);}}>
                    <lord-icon src="https://cdn.lordicon.com/peeuicbd.json" trigger="loop-on-hover" stroke="bold" colors="primary:#c7c116,secondary:#c76f16" style={{ width: '30px', height: '30px', marginRight: '8px' }}></lord-icon>
                    Déconnexion
                  </button>
                </Link>
              </div>
            )}
            
          </div>
        </div>
      </nav>
  );
}