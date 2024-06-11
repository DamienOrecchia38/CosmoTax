'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import AnimatedTitle from '../../components/AnimatedTitle';
import CountdownPopup from '../../components/CountdownPopup';
import Confetti from 'react-dom-confetti';
import { FaKey, FaSpinner, FaCheck } from 'react-icons/fa';

export default function PaymentPage() {

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [showCountdown, setShowCountdown] = useState(true);
  const [alienAttack, setAlienAttack] = useState(false);
  const [alienHeads, setAlienHeads] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [tax, setTax] = useState(null);
  const [showPaymentProcessing, setShowPaymentProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (showCountdown) {
      const timer = setTimeout(() => {
        setShowCountdown(false);
        setAlienAttack(true);
        addAlienHead();
        setTimeout(() => {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 10000);
        }, 10000);
      }, 15000);

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

  const paymentSteps = [
    "Vérification de l'existence de votre compte bancaire au sein de la galaxie...",
    "Négociation avec les extraterrestres pour obtenir un accord...",
    "Validation du paiement auprès de la Banque Intergalactique...",
    "Envoi d'une confirmation de paiement par télépathie..."
  ];

  const processPayment = async () => {
    setShowPaymentProcessing(true);
    
    for (let i = 0; i < paymentSteps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    const paymentSucceeded = true;
    setPaymentSuccess(paymentSucceeded);
  }

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
          const taxData = await response.json();
          setTax(taxData);
          setAlienAttack(false);
          setShowAlert(false);
          setShowCountdown(false);
          setShowPaymentForm(true);
        } else {
          alert('Code d\'identification invalide');
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      cardNumber: '',
      cryptogram: '',
      expirationDate: '',
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string().required('Le numéro de carte est requis'),
      cryptogram: Yup.string().required('Le cryptogramme est requis'),
      expirationDate: Yup.string().required('La date d\'expiration est requise'),
    }),

    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:8000/api/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/ld+json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(values),
        });
  
        if (response.ok) {
          await processPayment();
          setConfettiActive(true);
        } else {
          const data = await response.json();
          if (data.error) {
            alert(data.error);
          } else {
            alert('Erreur lors du paiement');
          }
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors du paiement');
      }
    },
  });

  return (
    <div className="container mx-auto">

      <Navbar />
      <AnimatedTitle />

      {showCountdown && <CountdownPopup />}
      
      {alienAttack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative">
            <img src="/alien_attack.png" alt="Alien Attack" className="absolute bottom-0 object-cover w-screen h-40 alien-move"/>
            <audio autoPlay><source src="/sounds/alien_scream.mp3" type="audio/mpeg" /></audio>
          </div>
        </div>
      )}

      {alienHeads.map((head) => (
        <div key={head.id} style={{ top: head.top, left: head.left }} className="absolute">
          <img src="/alien_favicon.png" alt="Alien Head" className="w-16 h-16"/>
          <audio autoPlay><source src="/sounds/pop.mp3" type="audio/mpeg" /></audio>
        </div>
      ))}

      {showAlert && !showPaymentForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center text-5xl font-bold text-white bg-red-500 animate-pulse">
                Attaque extraterrestre en cours, rafraichissez la fenêtre pour vous évader !
              </div>
      )}

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
        <>
        <form onSubmit={formik.handleSubmit} className="max-w-4xl px-4 pt-8 pb-10 mx-auto mb-6 text-center bg-white shadow-lg bg-opacity-20 backdrop-blur-sm rounded-2xl sm:px-8 md:px-16">

          {tax && (
              <div className="flex flex-col items-center justify-center mb-8">
                <h2 className="mb-4 text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-500">{tax.title}</h2>
                <p className="text-5xl font-bold text-yellow-500">{tax.amount} €</p>
              </div>
          )}

          <div className="relative mb-4 text-left">
            <label className="block mb-2 font-bold text-gray-700">Numéro de carte bancaire :</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="&#x1F4B3; Numéro de carte"
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
              placeholder="&#x1F512; Cryptogramme"
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
              placeholder="&#x1F4C5; MM/AA"
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
          
        <button type="submit" className="px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-500 hover:to-yellow-700 rounded-3xl focus:outline-none focus:shadow-outline">Payer</button>
        <Confetti active={confettiActive} width={window.innerWidth} height={window.innerHeight} numberOfPieces={1000} recycle={false} tweenDuration={10000} gravity={0.05}/>
        </form>
        </>
      )}

      {showPaymentProcessing ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white shadow-lg bg-opacity-20 backdrop-blur-sm rounded-3xl">
              <div className="p-8 text-center bg-white rounded-lg shadow-lg">
                <h2 className="mb-4 text-2xl font-bold">Traitement du paiement en cours...</h2>
                <div className="space-y-4">
                  {paymentSteps.map((step, index) => (
                    <div key={index} className="flex items-center">
                      {index === currentStep ? (
                        <FaSpinner className="w-5 h-5 mr-2 text-blue-500 animate-spin" />
                      ) : index < currentStep ? (
                        <FaCheck className="w-5 h-5 mr-2 text-green-500" />
                      ) : (
                        <div className="w-5 h-5 mr-2"></div>
                      )}
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : paymentSuccess ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="p-8 text-center bg-white rounded-lg shadow-lg">
                <FaCheck className="w-20 h-20 mx-auto mb-4 text-green-500" />
                <h2 className="text-4xl font-bold">Paiement effectué !</h2>
              </div>
            </div>
          ) : null}
    </div>
  );
}