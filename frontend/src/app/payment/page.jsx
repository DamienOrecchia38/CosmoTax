'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Confetti from 'react-dom-confetti';
import { useState } from 'react';
import AlienAnimation from '../../components/AlienAnimation';
import AnimatedTitle from '../../components/AnimatedTitle';

export default function PaymentPage() {

  const [confettiActive, setConfettiActive] = useState(false);

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
    <div className="container mx-auto mt-8">
      <AnimatedTitle />
      <AlienAnimation />
      <form onSubmit={formik.handleSubmit}>
        {/* Faut que je rajoute les champs du formulaire de paiement !!! */}
        <button type="submit" className="bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-500 hover:to-yellow-700 text-white text-xl font-bold py-5 px-10 rounded-3xl focus:outline-none focus:shadow-outline" onClick={() => setConfettiActive(true)}>Payer</button>
      </form>
      <Confetti active={confettiActive} width={window.innerWidth} height={window.innerHeight} numberOfPieces={800} recycle={false} tweenDuration={10000} gravity={0.05}/>
    </div>
  );
}