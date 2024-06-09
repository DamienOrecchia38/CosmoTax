'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import AnimatedTitle from '../../components/AnimatedTitle';
import CountdownPopup from '../../components/CountdownPopup';
import Confetti from 'react-dom-confetti';
import { FaKey } from 'react-icons/fa';

export default function PaymentPage() {

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [showCountdown, setShowCountdown] = useState(true);
  const [alienAttack, setAlienAttack] = useState(false);
  const [alienHeads, setAlienHeads] = useState([]);

  useEffect(() => {
    if (showCountdown) {
      const timer = setTimeout(() => {
        setShowCountdown(false);
        setAlienAttack(true);
        addAlienHead();
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [showCountdown]);

  useEffect(() => {
    if (alienAttack) {
      const interval = setInterval(addAlienHead, 1000);
      return () => clearInterval(interval);
    }
  }, [alienAttack]);

  const addAlienHead = () => {
    const newHead = {
      id: Date.now(),
      top: Math.random() * 80 + 'vh',
      left: Math.random() * 80 + 'vw',
    };
    setAlienHeads((prevHeads) => [...prevHeads, newHead]);
  };

  const uniqueCodeFormik = useFormik({
    initialValues: {
      uniqueCode: '',
    },
    validationSchema: Yup.object({
      uniqueCode: Yup.string().required('Le code unique est requis'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:8000/api/check-unique-code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          setShowPaymentForm(true);
        } else {
          alert('Code unique invalide');
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      paymentId: '',
      cardNumber: '',
      cryptogram: '',
      expirationDate: '',
    },
    validationSchema: Yup.object({
      paymentId: Yup.string().required('Le numéro de règlement est requis'),
      cardNumber: Yup.string().required('Le numéro de carte est requis'),
      cryptogram: Yup.string().required('Le cryptogramme est requis'),
      expirationDate: Yup.string().required('La date d\'expiration est requise'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:8000/api/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          alert('Paiement effectué avec succès');
          setConfettiActive(true);
        } else {
          alert('Erreur lors du paiement');
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    },
  });

  return (
    <div className="container mx-auto">

      <Navbar />
      <AnimatedTitle />

      {showCountdown && <CountdownPopup />}
      
      {alienAttack && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="relative">
            <img 
              src="/images/alien_attack.png" 
              alt="Alien Attack" 
              className="w-screen h-40 object-cover absolute bottom-0 alien-move"
            />
            <audio autoPlay>
              <source src="/sounds/alien_noise.mp3" type="audio/mpeg" />
            </audio>
          </div>
        </div>
      )}

      {alienHeads.map((head) => (
        <div
          key={head.id}
          style={{ top: head.top, left: head.left }}
          className="absolute"
        >
          <img 
            src="/alien_favicon.png"
            alt="Alien Head"
            className="w-16 h-16"
          />
          <audio autoPlay>
            <source src="/sounds/pop.mp3" type="audio/mpeg" />
          </audio>
        </div>
      ))}

      {!showPaymentForm ? (
        <form onSubmit={uniqueCodeFormik.handleSubmit} className="max-w-4xl px-16 pt-12 mx-auto mb-6 text-center bg-white shadow-lg bg-opacity-20 backdrop-blur-sm rounded-3xl pb-14">
          <h2 className="flex items-center justify-center mb-10 text-5xl font-bold text-transparent bg-gradient-anim bg-clip-text animate-gradientX">Veuillez saisir votre code d'identification</h2>
          <div className="relative mb-4 text-left">
            <FaKey className="absolute text-black transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              id="uniqueCode"
              placeholder="Code unique"
              {...uniqueCodeFormik.getFieldProps('uniqueCode')}
              className={`pl-10 shadow-inner appearance-none border rounded-2xl w-full py-4 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg ${uniqueCodeFormik.touched.uniqueCode && uniqueCodeFormik.errors.uniqueCode ? 'border-red-500' : ''}`}
            />
            {uniqueCodeFormik.touched.uniqueCode && uniqueCodeFormik.errors.uniqueCode && (
              <p className="text-xs italic text-red-500">{uniqueCodeFormik.errors.uniqueCode}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={uniqueCodeFormik.isSubmitting}
            className="px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-500 hover:to-yellow-700 rounded-3xl focus:outline-none focus:shadow-outline"
          >
            Valider
          </button>
        </form>
      ) : (  
        <form onSubmit={formik.handleSubmit}>
          <div className="relative mb-4 text-left">
            <label className="block mb-2 font-bold text-gray-700">Numéro de règlement :</label>
            <input
              type="text"
              name="paymentId"
              value={formik.values.paymentId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 rounded-lg ${
                formik.touched.paymentId && formik.errors.paymentId ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formik.touched.paymentId && formik.errors.paymentId && (
              <p className="text-xs italic text-red-500">{formik.errors.paymentId}</p>
            )}
          </div>

          <div className="relative mb-4 text-left">
            <label className="block mb-2 font-bold text-gray-700">Numéro de carte :</label>
            <input
              type="text"
              name="cardNumber"
              value={formik.values.cardNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 rounded-lg ${
                formik.touched.cardNumber && formik.errors.cardNumber ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formik.touched.cardNumber && formik.errors.cardNumber && (
              <p className="text-xs italic text-red-500">{formik.errors.cardNumber}</p>
            )}
          </div>

          <div className="relative mb-4 text-left">
            <label className="block mb-2 font-bold text-gray-700">Cryptogramme :</label>
            <input
              type="text"
              name="cryptogram"
              value={formik.values.cryptogram}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 rounded-lg ${
                formik.touched.cryptogram && formik.errors.cryptogram ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formik.touched.cryptogram && formik.errors.cryptogram && (
              <p className="text-xs italic text-red-500">{formik.errors.cryptogram}</p>
            )}
          </div>

          <div className="relative mb-4 text-left">
            <label className="block mb-2 font-bold text-gray-700">Date d'expiration :</label>
            <input
              type="text"
              name="expirationDate"
              value={formik.values.expirationDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 rounded-lg ${
                formik.touched.expirationDate && formik.errors.expirationDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formik.touched.expirationDate && formik.errors.expirationDate && (
              <p className="text-xs italic text-red-500">{formik.errors.expirationDate}</p>
            )}
          </div>
          
        <button type="submit" className="px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-500 hover:to-yellow-700 rounded-3xl focus:outline-none focus:shadow-outline" onClick={() => setConfettiActive(true)}>Payer</button>
        <Confetti active={confettiActive} width={window.innerWidth} height={window.innerHeight} numberOfPieces={800} recycle={false} tweenDuration={10000} gravity={0.05}/>
        </form>
      )}
    </div>
  );
}