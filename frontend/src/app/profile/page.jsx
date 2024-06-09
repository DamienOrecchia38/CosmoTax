'use client';

import { useEffect, useState} from 'react';
import Navbar from '../../components/Navbar';
import AlienAnimation from '../../components/AlienAnimation';
import { FaUserEdit, FaSave, FaTimes, FaCopy, FaCheck } from 'react-icons/fa';
import { DNA, MagnifyingGlass } from 'react-loader-spinner';
import Confetti from 'react-dom-confetti';
import { Stars } from '../../components/StarsButton';

export default function ProfilePage() {
  
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [taxes, setTaxes] = useState([]);
  const [visibleTaxes, setVisibleTaxes] = useState(6);
  const [showModal, setShowModal] = useState(false);
  const [uniqueCode, setUniqueCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [starsVisible, setStarsVisible] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

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

  const config = {
    angle: 90,
    spread: 45,
    startVelocity: 45,
    elementCount: 300,
    dragFriction: 0.1,
    duration: 3000,
    stagger: 0,
    width: "10px",
    height: "10px",
    colors: ["yellow", "orange", "lightgreen", "darkgreen", "white"]
  };

  const generateUniqueCode = (taxId) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const firstLetter = alphabet[Math.floor(Math.random() * 25)];
    const secondLetter = alphabet[Math.floor(Math.random() * (alphabet.indexOf(firstLetter)))];
    const currentYear = new Date().getFullYear();
    let num1 = Math.floor(Math.random() * 99) + 1;
    let num2 = 100 - num1;
    const code = `${firstLetter}${secondLetter}${currentYear}_${num1}_${num2}`;
    setActiveButton(taxId);
    setStarsVisible(true);
    setTimeout(() => {
      setStarsVisible(false);
    }, 500);
    setUniqueCode(code);
    setIsCopied(false);
    setTimeout(() => {
      setShowModal(true);
    }, 800); 
  };

  return (
    <div className="container mx-auto">

      <Navbar />

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-80"></div>
          <div className="relative w-full p-4 rounded-lg shadow-lg bg-gradient-to-r from-yellow-200 to-green-200 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 sm:p-8 md:p-12">
            <button className="absolute text-4xl text-gray-600 top-2 right-2 hover:text-gray-800" onClick={() => setShowModal(false)}>
              <FaTimes />
            </button>
            <div className="relative w-full h-64 mb-4 sm:mb-8 md:mb-12 lg:mb-16">
              <AlienAnimation />
            </div>
            <h2 className="mb-6 text-xl font-bold sm:text-3xl md:text-4xl">Votre code unique</h2>
            <div className="flex items-center">
              <p className="mr-4 text-sm sm:text-2xl">{uniqueCode}</p>
              <button
                className={`bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white text-xl font-bold py-2 px-4 rounded-3xl flex items-center ${isCopied ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => {
                  navigator.clipboard.writeText(uniqueCode);
                  setIsCopied(true);
                }}
                disabled={isCopied}
              >
              {isCopied ? <FaCheck className="mr-2" /> : <FaCopy className="mr-2" />}
              {isCopied ? 'Copié' : 'Copier'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-10 mx-20 mt-20 bg-white rounded-lg shadow-lg backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-5xl font-bold font-['Bangers'] mb-10 bg-gradient-to-r from-green-500 to-green-600 text-transparent bg-clip-text tracking-wider flex items-center">
            <DNA height="50" width="80" />
            Votre profil
          </h1>          
          <button
            className="flex items-center px-5 py-2 text-xl font-bold text-white bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-500 hover:to-yellow-700 rounded-3xl"
            onClick={() => setIsEditing(!isEditing)}
          >
            <FaUserEdit className="mr-2" />
            {isEditing ? 'Annuler' : 'Modifier'}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-3 font-bold text-gray-700">Email intergalactique :</label>
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
            <label className="block mb-2 font-bold text-gray-700">Prénom :</label>
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
            <label className="block mb-2 font-bold text-gray-700">Nom :</label>
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
            <label className="block mb-2 font-bold text-gray-700">Adresse de votre planète :</label>
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
            <label className="block mb-2 font-bold text-gray-700">Téléphone cosmique :</label>
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
              className="flex items-center px-5 py-2 text-xl font-bold text-white bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-700 rounded-3xl"
              onClick={handleSaveChanges}
            >
              <FaSave className="mr-2" />
              Enregistrer
            </button>
          </div>
        )}
      </div>

      <div className="p-10 mx-20 mt-20 bg-white rounded-lg shadow-lg backdrop-blur-sm">
        <h2 className="text-5xl font-bold font-['Bangers'] mb-10 bg-gradient-to-r from-green-500 to-green-600 text-transparent bg-clip-text tracking-wider flex items-center">
          <MagnifyingGlass height="50" width="80" glassColor="#FFFFE0" color="#00FF00"/>
          Vos taxes restantes à payer
        </h2>        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {taxes.length > 0 ? (
            taxes.slice(0, visibleTaxes).map((tax) => (
              <div key={tax.id} className="p-4 bg-gradient-to-r from-green-100 to-green-100 bg-opacity-30 rounded-xl">
                <img src={`/images/taxes/${tax.title.replace(/\s+/g, '_').toLowerCase()}.jpg`} alt={tax.title} className="w-full h-[30rem] object-cover mb-4 rounded-t-xl" />
                <p className="mb-4 text-xl font-bold">{tax.title}</p>
                <p className="mb-4">{tax.description}</p>
                <div className="flex flex-col items-center justify-between">
                  <p className="mb-4 text-2xl font-bold">{tax.amount} €</p>
                  <button
                    onClick={() => generateUniqueCode(tax.id)}
                    className="px-6 py-2 mb-4 text-xl font-bold text-white transition-all duration-500 ease-in-out transform shadow-md rounded-3xl bg-gradient-to-r from-green-400 via-green-500 to-yellow-500 hover:scale-105 hover:from-green-500 hover:to-yellow-500 hover:shadow-xl backdrop-filter backdrop-brightness-150"
                  >
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      Générer le code unique
                      {activeButton === tax.id && <Stars visible={starsVisible} />}
                    </div>
                    <Confetti active={ activeButton === tax.id } config={ config }/>
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
            <button onClick={() => setVisibleTaxes(visibleTaxes + 6)} className="px-5 py-2 text-xl font-bold text-white bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-500 hover:to-yellow-700 rounded-3xl">Voir plus</button>
          </div>
        )}
      </div>

      <div className="p-10 mx-20 mt-20 mb-20 bg-white rounded-lg shadow-lg backdrop-blur-sm">
        <h2 className="text-5xl font-bold font-['Bangers'] mb-10 bg-gradient-to-r from-green-500 to-green-600 text-transparent bg-clip-text tracking-wider">Historique des paiements</h2>
      </div>
    </div>
  );
}