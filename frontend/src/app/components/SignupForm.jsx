import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function SignUpForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      address: '',
      phone: '',
      cardNumber: '',
      cryptogram: '',
      expirationDate: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Adresse mail invalide').required('L\'adresse mail est requise'),
      password: Yup.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').required('Le mot de passe est requis'),
      firstname: Yup.string().required('Le prénom est requis'),
      lastname: Yup.string().required('Le nom est requis'),
      address: Yup.string().required('L\'adresse est requise'),
      phone: Yup.string().required('Le téléphone est requis'),
      cardNumber: Yup.string().required('Le numéro de carte bancaire est requis'),
      cryptogram: Yup.string().required('Le cryptogramme est requis'),
      expirationDate: Yup.date().required('La date d\'expiration est requise'),
    }),
    onSubmit: async (values, { setErrors, setSubmitting }) => {
    console.log('Form values:', values); // Log des valeurs du formulaire
      try {
        const response = await fetch('http://localhost:8000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        console.log('API response:', response); // Log de la réponse de l'API

        if (response.ok) {
          const data = await response.json();
          console.log('Success data:', data); // Log des données de succès
          formik.resetForm();
          alert(data.message);

        } else {
          const errorData = await response.json();
          console.log('Error data:', errorData); // Log des données d'erreur
          setErrors({ _error: errorData['hydra:description'] });
        }

      } catch (error) {
        console.error('Erreur:', error);
      }

      setSubmitting(false);
    },
  });

  return (
    
    <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

      <h2 className="text-3xl font-bold mb-6 text-center">Inscription</h2>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Adresse mail
        </label>
        <input
          type="email"
          id="email"
          {...formik.getFieldProps('email')}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            formik.touched.email && formik.errors.email ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          {...formik.getFieldProps('password')}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            formik.touched.password && formik.errors.password ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-xs italic">{formik.errors.password}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="firstname" className="block text-gray-700 font-bold mb-2">
          Prénom
        </label>
        <input
          type="text"
          id="firstname"
          {...formik.getFieldProps('firstname')}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            formik.touched.firstname && formik.errors.firstname ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.firstname && formik.errors.firstname && (
          <p className="text-red-500 text-xs italic">{formik.errors.firstname}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="lastname" className="block text-gray-700 font-bold mb-2">
          Nom
        </label>
        <input
          type="text"
          id="lastname"
          {...formik.getFieldProps('lastname')}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            formik.touched.lastname && formik.errors.lastname ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.lastname && formik.errors.lastname && (
          <p className="text-red-500 text-xs italic">{formik.errors.lastname}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
        Adresse
        </label>
        <input
          type="text"
          id="address"
          {...formik.getFieldProps('address')}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            formik.touched.address && formik.errors.address ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.address && formik.errors.address && (
          <p className="text-red-500 text-xs italic">{formik.errors.address}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
          Téléphone
        </label>
        <input
          type="number"
          id="phone"
          {...formik.getFieldProps('phone')}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            formik.touched.phone && formik.errors.phone ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-red-500 text-xs italic">{formik.errors.phone}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="cardNumber" className="block text-gray-700 font-bold mb-2">
          Numéro de carte bancaire
        </label>
        <input
          type="text"
          id="cardNumber"
          {...formik.getFieldProps('cardNumber')}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            formik.touched.cardNumber && formik.errors.cardNumber ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.cardNumber && formik.errors.cardNumber && (
          <p className="text-red-500 text-xs italic">{formik.errors.cardNumber}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="cryptogram" className="block text-gray-700 font-bold mb-2">
          Cryptogramme
        </label>
        <input
          type="text"
          id="cryptogram"
          {...formik.getFieldProps('cryptogram')}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            formik.touched.cryptogram && formik.errors.cryptogram ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.cryptogram && formik.errors.cryptogram && (
          <p className="text-red-500 text-xs italic">{formik.errors.cryptogram}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="expirationDate" className="block text-gray-700 font-bold mb-2">
          Date d'expiration
        </label>
        <input
          type="date"
          id="expirationDate"
          {...formik.getFieldProps('expirationDate')}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            formik.touched.expirationDate && formik.errors.expirationDate ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.expirationDate && formik.errors.expirationDate && (
          <p className="text-red-500 text-xs italic">{formik.errors.expirationDate}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="bg-green-500 hover:bg-green-700 text-white text-lg font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline text-center w-full"
      >
        S'inscrire
      </button>

      {formik.errors._error && <div>{formik.errors._error}</div>}
    </form>
  );
}