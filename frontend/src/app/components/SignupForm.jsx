import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaEnvelope, FaLock, FaUser, FaHome, FaPhone, FaCreditCard, FaKey, FaCalendarAlt } from 'react-icons/fa';

export default function SignUpForm() {
  
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
          const data = await response.json();
          formik.resetForm();
          alert(data.message);
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

    <form onSubmit={formik.handleSubmit} className="bg-white bg-opacity-20 shadow-lg backdrop-blur-sm rounded-2xl px-16 pt-8 pb-10 mb-6 mx-auto max-w-4xl text-center">

      <h2 className="text-5xl font-bold mb-10 bg-gradient-to-r from-yellow-400 to-green-600 text-transparent bg-clip-text flex items-center justify-center">Inscription</h2>

      <div className="grid grid-cols-2 gap-8">

        <div className="mb-4 text-left relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
          <input
            type="email"
            id="email"
            placeholder="Adresse mail intergalactique"
            {...formik.getFieldProps('email')}
            className={`pl-10 shadow-inner appearance-none border rounded-2xl w-full py-4 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
          />
          {formik.touched.email && formik.errors.email && (<p className="text-red-500 text-xs italic">{formik.errors.email}</p>)}
        </div>

        <div className="mb-4 text-left relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
          <input
            type="password"
            id="password"
            placeholder="Mot de passe"
            {...formik.getFieldProps('password')}
            className={`pl-10 shadow-inner appearance-none border rounded-2xl w-full py-4 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
          />
          {formik.touched.password && formik.errors.password && (<p className="text-red-500 text-xs italic">{formik.errors.password}</p>)}
        </div>

        <div className="mb-4 text-left relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
          <input
            type="text"
            id="firstname"
            placeholder="Prénom"
            {...formik.getFieldProps('firstname')}
            className={`pl-10 shadow-inner appearance-none border rounded-2xl w-full py-4 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg ${formik.touched.firstname && formik.errors.firstname ? 'border-red-500' : ''}`}
          />
          {formik.touched.firstname && formik.errors.firstname && (<p className="text-red-500 text-xs italic">{formik.errors.firstname}</p>)}
        </div>

        <div className="mb-4 text-left relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
          <input
            type="text"
            id="lastname"
            placeholder="Nom"
            {...formik.getFieldProps('lastname')}
            className={`pl-10 shadow-inner appearance-none border rounded-2xl w-full py-4 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg ${formik.touched.lastname && formik.errors.lastname ? 'border-red-500' : ''}`}
          />
          {formik.touched.lastname && formik.errors.lastname && (<p className="text-red-500 text-xs italic">{formik.errors.lastname}</p>)}
        </div>

        <div className="mb-4 text-left relative">
          <FaHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
          <input
            type="text"
            id="address"
            placeholder="Adresse de votre planète"
            {...formik.getFieldProps('address')}
            className={`pl-10 shadow-inner appearance-none border rounded-2xl w-full py-4 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg ${formik.touched.address && formik.errors.address ? 'border-red-500' : ''}`}
          />
          {formik.touched.address && formik.errors.address && (<p className="text-red-500 text-xs italic">{formik.errors.address}</p>)}
        </div>

        <div className="mb-4 text-left relative">
          <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
          <input
            type="tel"
            id="phone"
            placeholder="Téléphone cosmic"
            {...formik.getFieldProps('phone')}
            className={`pl-10 shadow-inner appearance-none border rounded-2xl w-full py-4 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : ''}`}
          />
          {formik.touched.phone && formik.errors.phone && (<p className="text-red-500 text-xs italic">{formik.errors.phone}</p>)}
        </div>

        <div className="mb-4 text-left relative">
          <FaCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
          <input
            type="tel"
            id="card_number"
            placeholder="Numéro de carte bancaire"
            {...formik.getFieldProps('card_number')}
            className={`pl-10 shadow-inner appearance-none border rounded-2xl w-full py-4 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg ${formik.touched.card_number && formik.errors.card_number ? 'border-red-500' : ''}`}
          />
          {formik.touched.card_number && formik.errors.card_number && (<p className="text-red-500 text-xs italic">{formik.errors.card_number}</p>)}
        </div>

        <div className="mb-4 text-left relative">
          <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
          <input
            type="text"
            id="cryptogram"
            placeholder="Cryptogramme"
            {...formik.getFieldProps('cryptogram')}
            className={`pl-10 shadow-inner appearance-none border rounded-2xl w-full py-4 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg ${formik.touched.cryptogram && formik.errors.cryptogram ? 'border-red-500' : ''}`}
          />
          {formik.touched.cryptogram && formik.errors.cryptogram && (<p className="text-red-500 text-xs italic">{formik.errors.cryptogram}</p>)}
        </div>

        <div className="mb-4 text-left relative">
          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
          <input
            type="date"
            id="expiration_date"
            {...formik.getFieldProps('expiration_date')}
            className={`pl-10 shadow-inner appearance-none border rounded-2xl w-full py-4 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg ${formik.touched.expiration_date && formik.errors.expiration_date ? 'border-red-500' : ''}`}
          />
          {formik.touched.expiration_date && formik.errors.expiration_date && (<p className="text-red-500 text-xs italic">{formik.errors.expiration_date}</p>)}
        </div>

      </div>

      <button 
        type="submit"
        disabled={formik.isSubmitting}
        className="bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-500 hover:to-yellow-700 text-white text-xl font-bold py-5 px-10 rounded-3xl focus:outline-none focus:shadow-outline mt-4"
      >
        Let's go !
      </button>

    </form>
  );
}
