import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaLock, FaStar } from 'react-icons/fa';

export default function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Adresse mail invalide').required('L\'adresse mail est requise'),
      password: Yup.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').required('Le mot de passe est requis'),
    }),
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const response = await fetch('http://localhost:8000/api/login_check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const data = await response.json();
          alert('Connexion réussie');
          // Redirection vers page profil ?!
        } else {
          const errorData = await response.json();
          setErrors({ email: 'Email ou mot de passe incorrect' });
        }
      } catch (error) {
        console.error('Erreur:', error);
      }

      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white bg-opacity-20 shadow-lg backdrop-blur-sm rounded-3xl px-16 pt-12 pb-14 mb-6 mx-auto max-w-4xl text-center">
      
      <h2 className="text-5xl font-bold mb-10 bg-gradient-to-r from-yellow-400 to-green-600 text-transparent bg-clip-text flex items-center justify-center">Connexion</h2>
      
      {formik.errors.email && <p className="text-red-500">{formik.errors.email}</p>}

      <div className="mb-8 text-left relative">
        <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black" />
        <input 
          type="email"
          id="email"
          placeholder="Adresse mail intergalactique"
          {...formik.getFieldProps('email')}
          className={`pl-12 shadow-inner appearance-none border rounded-2xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
        />
        {formik.touched.email && formik.errors.email && (<p className="text-red-500 text-sm italic">{formik.errors.email}</p>)}
      </div>

      <div className="mb-10 text-left relative">
        <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black" />
        <input
          type="password"
          id="password"
          placeholder="Mot de passe cosmic"
          {...formik.getFieldProps('password')}
          className={`pl-12 shadow-inner appearance-none border rounded-2xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
        />
        {formik.touched.password && formik.errors.password && (<p className="text-red-500 text-sm italic">{formik.errors.password}</p>)}
      </div>

      <button 
        type="submit"
        disabled={formik.isSubmitting}
        className="bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-500 hover:to-yellow-700 text-white text-xl font-bold py-5 px-10 rounded-3xl focus:outline-none focus:shadow-outline"
      >
        Se connecter
      </button>
    </form>
  );
}