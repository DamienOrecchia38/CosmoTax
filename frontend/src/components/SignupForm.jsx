import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaEnvelope, FaLock, FaUser, FaHome, FaPhone, FaCreditCard, FaKey, FaCalendarAlt } from 'react-icons/fa';
import LoginForm from './LoginForm';
import Confetti from 'react-dom-confetti';
import { Stars } from './StarsButton';

export default function SignUpForm() {
  
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [starsVisible, setStarsVisible] = useState(false);

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

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      address: '',
      phone: '',
      card_number: '',
      cryptogram: '',
      expiration_date: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Adresse mail invalide').required('L\'adresse mail est requise'),
      password: Yup.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').required('Le mot de passe est requis'),
      firstname: Yup.string().required('Le prénom est requis'),
      lastname: Yup.string().required('Le nom est requis'),
      address: Yup.string().required('L\'adresse est requise'),
      phone: Yup.string().required('Le téléphone est requis'),
      card_number: Yup.string().required('Le numéro de carte bancaire est requis'),
      cryptogram: Yup.string().required('Le cryptogramme est requis'),
      expiration_date: Yup.date().required('La date d\'expiration est requise'),
    }),
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const response = await fetch('http://localhost:8000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/ld+json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          formik.resetForm();
          setStarsVisible(true);
          setConfettiActive(true);
          setTimeout(() => {
            setConfettiActive(false);
            setStarsVisible(false);
            setShowProgressBar(true);
            setTimeout(() => {
              setShowProgressBar(false);
              setShowLoginForm(true);
            }, 10000);
          }, 3000);
        } else {
          const errorData = await response.json();
          setErrors({ _error: errorData['hydra:description'] });
        }
      } catch (error) {
        console.error('Erreur:', error);
      }

      setSubmitting(false);
    },
  });



  return (
    <>
      {showLoginForm ? (
        <LoginForm />
      ) : (    
    <form onSubmit={formik.handleSubmit} className="max-w-4xl px-4 pt-8 pb-10 mx-auto mb-6 text-center bg-white shadow-lg bg-opacity-20 backdrop-blur-sm rounded-2xl sm:px-8 md:px-16">

      {showProgressBar ? (
        <div className="flex flex-col items-center justify-center">
          <div className="w-full mb-4 bg-white rounded-full">
            <div className="w-full rounded-full progress-bar"></div>
          </div>
          <script src="https://cdn.lordicon.com/lordicon.js"></script>
          <lord-icon src="https://cdn.lordicon.com/tltikfri.json" trigger="loop" stroke="bold" colors="primary:#e83a30,secondary:#ffd700" style={{ width: '75px', height: '75px' }}></lord-icon>
          <p className="flex items-center justify-center mt-4 mb-4 text-4xl italic font-bold text-transparent bg-gradient-to-r from-yellow-400 to-green-600 bg-clip-text">Envoie de vos données à la galaxie d'Andromède...</p>
        </div>
      ) : (
        <>

      <h2 className="flex items-center justify-center mb-10 text-5xl font-bold text-transparent bg-gradient-anim bg-clip-text animate-gradientX">Inscription</h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">

        <div className="relative mb-4 text-left">
          <FaEnvelope className="absolute text-black transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="email"
            id="email"
            placeholder="Adresse mail intergalactique"
            {...formik.getFieldProps('email')}
            className={`pl-10 shadow-inner appearance-none border rounded-2xl w-full py-4 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
          />
          {formik.touched.email && formik.errors.email && (<p className="text-xs italic text-red-500">{formik.errors.email}</p>)}
        </div>

        <div className="relative mb-4 text-left">
          <FaLock className="absolute text-black transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="password"
            id="password"
            placeholder="Mot de passe"
            {...formik.getFieldProps('password')}
            className={`pl-10 shadow-inner appearance-none border rounded-2xl w-full py-4 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
          />
          {formik.touched.password && formik.errors.password && (<p className="text-xs italic text-red-500">{formik.errors.password}</p>)}
        </div>

        <div className="relative mb-4 text-left">
          <FaUser className="absolute text-black transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            id="firstname"
            placeholder="Prénom"
            {...formik.getFieldProps('firstname')}
            className={`pl-10 shadow-inner appearance-none border rounded-2xl w-full py-4 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg ${formik.touched.firstname && formik.errors.firstname ? 'border-red-500' : ''}`}
          />
          {formik.touched.firstname && formik.errors.firstname && (<p className="text-xs italic text-red-500">{formik.errors.firstname}</p>)}
        </div>

        <div className="relative mb-4 text-left">
          <FaUser className="absolute text-black transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            id="lastname"
            placeholder="Nom"
            {...formik.getFieldProps('lastname')}
            className={`pl-10 shadow-inner appearance-none border rounded-2xl w-full py-4 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg ${formik.touched.lastname && formik.errors.lastname ? 'border-red-500' : ''}`}
          />
          {formik.touched.lastname && formik.errors.lastname && (<p className="text-xs italic text-red-500">{formik.errors.lastname}</p>)}
        </div>

        <div className="relative mb-4 text-left">
          <FaHome className="absolute text-black transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            id="address"
            placeholder="Adresse de votre planète"
            {...formik.getFieldProps('address')}
            className={`pl-10 shadow-inner appearance-none border rounded-2xl w-full py-4 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg ${formik.touched.address && formik.errors.address ? 'border-red-500' : ''}`}
          />
          {formik.touched.address && formik.errors.address && (<p className="text-xs italic text-red-500">{formik.errors.address}</p>)}
        </div>

        <div className="relative mb-4 text-left">
          <FaPhone className="absolute text-black transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="tel"
            id="phone"
            placeholder="Téléphone cosmic"
            {...formik.getFieldProps('phone')}
            className={`pl-10 shadow-inner appearance-none border rounded-2xl w-full py-4 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : ''}`}
          />
          {formik.touched.phone && formik.errors.phone && (<p className="text-xs italic text-red-500">{formik.errors.phone}</p>)}
        </div>

        <div className="relative mb-4 text-left">
          <FaCreditCard className="absolute text-black transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="tel"
            id="card_number"
            placeholder="Numéro de carte bancaire"
            {...formik.getFieldProps('card_number')}
            className={`pl-10 shadow-inner appearance-none border rounded-2xl w-full py-4 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg ${formik.touched.card_number && formik.errors.card_number ? 'border-red-500' : ''}`}
          />
          {formik.touched.card_number && formik.errors.card_number && (<p className="text-xs italic text-red-500">{formik.errors.card_number}</p>)}
        </div>

        <div className="relative mb-4 text-left">
          <FaKey className="absolute text-black transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            id="cryptogram"
            placeholder="Cryptogramme"
            {...formik.getFieldProps('cryptogram')}
            className={`pl-10 shadow-inner appearance-none border rounded-2xl w-full py-4 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg ${formik.touched.cryptogram && formik.errors.cryptogram ? 'border-red-500' : ''}`}
          />
          {formik.touched.cryptogram && formik.errors.cryptogram && (<p className="text-xs italic text-red-500">{formik.errors.cryptogram}</p>)}
        </div>

        <div className="relative mb-4 text-left">
          <FaCalendarAlt className="absolute text-black transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="date"
            id="expiration_date"
            {...formik.getFieldProps('expiration_date')}
            className={`pl-10 shadow-inner appearance-none border rounded-2xl w-full py-4 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg ${formik.touched.expiration_date && formik.errors.expiration_date ? 'border-red-500' : ''}`}
          />
          {formik.touched.expiration_date && formik.errors.expiration_date && (<p className="text-xs italic text-red-500">{formik.errors.expiration_date}</p>)}
        </div>

      </div>

      <button 
        type="submit"
        disabled={formik.isSubmitting}
        className="px-10 py-5 mt-4 text-xl font-bold text-white bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-500 hover:to-yellow-700 rounded-3xl focus:outline-none focus:shadow-outline"
      >
        <div style={{ position: 'relative', display: 'inline-block' }}>
          Let's go !
          <Stars visible={starsVisible} />
        </div>
        <Confetti active={confettiActive} config={ config }/>
      </button>

            </>
          )}
        </form>
      )}
    </>
  );
}
