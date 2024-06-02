import { useFormik } from 'formik';
import * as Yup from 'yup';

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
          // Redirection vers page profil
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
    <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto max-w-sm text-center">
      <h2 className="text-3xl font-bold mb-6">Connexion</h2>
      {formik.errors.email && <p className="text-red-500">{formik.errors.email}</p>}
      <div className="mb-4 text-left">
        <label htmlFor="email" className="block text-gray-700 text-lg font-bold mb-2">Adresse mail</label>
        <input 
          type="email"
          id="email"
          {...formik.getFieldProps('email')}
          className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            formik.touched.email && formik.errors.email ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
        )}
      </div>
      <div className="mb-6 text-left">
        <label htmlFor="password" className="block text-gray-700 text-lg font-bold mb-2">Mot de passe</label>
        <input
          type="password"
          id="password"
          {...formik.getFieldProps('password')}
          className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            formik.touched.password && formik.errors.password ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-xs italic">{formik.errors.password}</p>
        )}
      </div>
      <button 
        type="submit"
        disabled={formik.isSubmitting}
        className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
      >
        Se connecter
      </button>
    </form>
  );
}