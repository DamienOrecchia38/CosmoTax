export default function LoginForm() {
    return (
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Connexion</h2>
        <div className="mb-4 text-left">
          <label htmlFor="email" className="block text-gray-700 text-lg font-bold mb-2">
            Adresse mail
          </label>
          <input 
            type="email"
            id="email"
            name="email"
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6 text-left">
          <label htmlFor="password" className="block text-gray-700 text-lg font-bold mb-2">
            Mot de passe  
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button 
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
        >
          Se connecter
        </button>
      </form>
    );
  }