import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';

export default function Navbar({ onLoginClick, onSignUpClick, onHomeClick }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unpaidTaxes, setUnpaidTaxes] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    if (token) {
      fetchUserProfile();
      fetchUnpaidTaxes();
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

  const fetchUnpaidTaxes = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/taxes', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        const unpaid = data['hydra:member'].filter(tax => !tax.paid).length;
        setUnpaidTaxes(unpaid);
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 flex flex-col items-center justify-between p-4 bg-white md:flex-row bg-opacity-40">
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link href="/" className="flex items-center ml-4" onClick={onHomeClick}>
          <img src="/images/navbar/alien_navbar.png" alt="Alien logo" className="w-10 h-10 mr-2 sm:w-18 sm:h-18" />
          <div className="font-['Bangers'] text-3xl sm:text-5xl font-bold bg-gradient-anim text-transparent bg-clip-text animate-gradientX">CosmoTax</div>
        </Link>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FaBars className="w-8 h-8 text-orange-400" />
        </button>
      </div>

      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:flex flex-col md:flex-row items-center justify-end w-full md:w-auto mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-8`}>
        <div className="flex flex-col items-center justify-end w-full space-y-4 md:flex-row md:w-auto md:space-y-0 md:space-x-8">
          <script src="https://cdn.lordicon.com/lordicon.js"></script>

          {!isLoggedIn && (
            <>
              <button className="flex items-center justify-center w-full px-5 py-1 text-xl font-bold text-gray-100 md:w-auto bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-2xl hover:bg-yellow-500 ripple" onClick={onSignUpClick}>
                <lord-icon src="https://cdn.lordicon.com/igljtrxq.json" trigger="loop-on-hover" stroke="bold" colors="primary:#c7c116,secondary:#c76f16" style={{ width: '30px', height: '30px', marginRight: '8px' }}></lord-icon>
                Inscription
              </button>

              <button className="flex items-center justify-center w-full px-5 py-1 text-xl font-bold text-gray-100 md:w-auto bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-2xl hover:bg-yellow-500 ripple" onClick={onLoginClick}>
                <lord-icon src="https://cdn.lordicon.com/fygyhyze.json" trigger="loop-on-hover" stroke="bold" colors="primary:#c7c116,secondary:#c76f16" style={{ width: '30px', height: '30px', marginRight: '8px' }}></lord-icon>
                Connexion
              </button>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link href="/profile">
                <button className="relative flex items-center justify-center w-full px-5 py-1 text-xl font-bold text-gray-100 md:w-auto bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-2xl hover:bg-yellow-500 ripple">
                  <lord-icon src="https://cdn.lordicon.com/xfzuyvam.json" trigger="loop-on-hover" stroke="bold" colors="primary:#c7c116,secondary:#c76f16" style={{ width: '30px', height: '30px', marginRight: '8px' }}></lord-icon>
                  {firstName ? firstName : 'Profil'}
                  {unpaidTaxes > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      {unpaidTaxes}
                    </span>
                  )}
                </button>
              </Link>

              <Link href="/payment">
                <button className="flex items-center justify-center w-full px-5 py-1 text-xl font-bold text-gray-100 md:w-auto bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-2xl hover:bg-yellow-500 ripple">
                  <lord-icon src="https://cdn.lordicon.com/fhszghjk.json" trigger="loop-on-hover" stroke="bold" colors="primary:#c7c116,secondary:#c76f16" style={{ width: '30px', height: '30px', marginRight: '8px' }}></lord-icon>
                  Paiement
                </button>
              </Link>

              <Link href="/">
                <button className="flex items-center justify-center w-full px-5 py-1 text-xl font-bold text-gray-100 md:w-auto bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-2xl hover:bg-yellow-500 ripple" onClick={() => {localStorage.removeItem("token"); setIsLoggedIn(false);}}>
                  <lord-icon src="https://cdn.lordicon.com/peeuicbd.json" trigger="loop-on-hover" stroke="bold" colors="primary:#c7c116,secondary:#c76f16" style={{ width: '30px', height: '30px', marginRight: '8px' }}></lord-icon>
                  Déconnexion
                </button>
              </Link>
            </>
          )}
            
          </div>
        </div>
      </nav>
  );
}