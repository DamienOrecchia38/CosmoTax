'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Confetti from 'react-dom-confetti';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
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
    <div className="container mx-auto">
      <Navbar />
      <AnimatedTitle />
      <AlienAnimation />
      <form onSubmit={formik.handleSubmit}>
        
        <div className="mb-4 text-left relative">
          <label className="block text-gray-700 font-bold mb-2">Numéro de règlement :</label>
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
            <p className="text-red-500 text-xs italic">{formik.errors.paymentId}</p>
          )}
        </div>

        <div className="mb-4 text-left relative">
          <label className="block text-gray-700 font-bold mb-2">Numéro de carte :</label>
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
            <p className="text-red-500 text-xs italic">{formik.errors.cardNumber}</p>
          )}
        </div>

        <div className="mb-4 text-left relative">
          <label className="block text-gray-700 font-bold mb-2">Cryptogramme :</label>
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
            <p className="text-red-500 text-xs italic">{formik.errors.cryptogram}</p>
          )}
        </div>

        <div className="mb-4 text-left relative">
          <label className="block text-gray-700 font-bold mb-2">Date d'expiration :</label>
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
            <p className="text-red-500 text-xs italic">{formik.errors.expirationDate}</p>
          )}
        </div>

        <button type="submit" className="bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-500 hover:to-yellow-700 text-white text-xl font-bold py-5 px-10 rounded-3xl focus:outline-none focus:shadow-outline" onClick={() => setConfettiActive(true)}>Payer</button>
      </form>
      <Confetti active={confettiActive} width={window.innerWidth} height={window.innerHeight} numberOfPieces={800} recycle={false} tweenDuration={10000} gravity={0.05}/>
    </div>
  );
}