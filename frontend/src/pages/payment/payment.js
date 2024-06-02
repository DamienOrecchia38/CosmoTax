'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function PaymentPage() {
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
      <h1 className="text-4xl font-bold mb-6">Paiement</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* Faut que je rajoute les champs du formulaire de paiement */}
        <button type="submit" className="bg-yellow-500 text-white font-bold py-2 px-4 rounded">
          Payer
        </button>
      </form>
    </div>
  );
}