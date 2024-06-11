import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaLock} from 'react-icons/fa';

export default function LoginForm() {

  const [showProgressBar, setShowProgressBar] = useState(false);

  useEffect(() => {
    if (showProgressBar) {
      const timer = setTimeout(() => {
        setShowProgressBar(false);
        window.location.href = '/profile';
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showProgressBar]);
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
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
          body: JSON.stringify({
            username: values.email,
            password: values.password
          }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          setShowProgressBar(true);
        } else {
          const errorData = await response.json();
          setErrors({ email: 'Email ou mot de passe incorrect' });
          setErrors({ _error: errorData['hydra:description'] });
          
        }
      } catch (error) {
        console.error('Erreur:', error);
      }

      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-4xl px-16 pt-12 mx-auto mb-6 text-center bg-white shadow-lg bg-opacity-20 backdrop-blur-sm rounded-3xl pb-14">
      {showProgressBar ? (
        <div className="flex flex-col items-center justify-center">
          <div className="w-full mt-4 mb-4 bg-white rounded-full">
            <div className="w-full rounded-full progress-bar"></div>
          </div>
          <script src="https://cdn.lordicon.com/lordicon.js"></script>
          <lord-icon src="https://cdn.lordicon.com/osckrizz.json" trigger="loop" stroke="bold" colors="primary:#e83a30,secondary:#ffd700" style={{ width: '65px', height: '65px' }}></lord-icon>
          <p className="flex items-center justify-center mt-4 mb-4 text-4xl italic font-bold text-transparent bg-gradient-to-r from-yellow-400 to-green-600 bg-clip-text">Récupération de vos informations intergalactiques...</p>
        </div>
      ) : (
        <>
          <h2 className="flex items-center justify-center mb-10 text-5xl font-bold text-transparent bg-gradient-anim bg-clip-text animate-gradientX">Connexion</h2>
          
          {formik.errors.email && <p className="text-red-500">{formik.errors.email}</p>}

          <div className="relative mb-8 text-left">
            <FaUser className="absolute text-black transform -translate-y-1/2 left-4 top-1/2" />
            <input 
              type="email"
              id="email"
              placeholder="Adresse mail intergalactique"
              {...formik.getFieldProps('email')}
              className={`pl-12 shadow-inner appearance-none border rounded-2xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
            />
            {formik.touched.email && formik.errors.email && (<p className="text-sm italic text-red-500">{formik.errors.email}</p>)}
          </div>

          <div className="relative mb-10 text-left">
            <FaLock className="absolute text-black transform -translate-y-1/2 left-4 top-1/2" />
            <input
              type="password"
              id="password"
              placeholder="Mot de passe cosmique"
              {...formik.getFieldProps('password')}
              className={`pl-12 shadow-inner appearance-none border rounded-2xl w-full py-5 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-lg ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
            />
            {formik.touched.password && formik.errors.password && (<p className="text-sm italic text-red-500">{formik.errors.password}</p>)}
          </div>

          <button 
            type="submit"
            disabled={formik.isSubmitting}
            className="px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-500 hover:to-yellow-700 rounded-3xl focus:outline-none focus:shadow-outline"
          >
            Se connecter
          </button>
        </>
      )}
    </form>
  );
}