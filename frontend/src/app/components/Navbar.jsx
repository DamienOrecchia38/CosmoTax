export default function Navbar({ onLoginClick, onSignUpClick }) {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100">
      <div className="text-xl font-bold">CosmoTax</div>
      <div>
        <button 
          className="mr-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={onLoginClick}
        >
          Connexion
        </button>
        <button 
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={onSignUpClick}
        >
          Inscription
        </button>
      </div>
    </nav>
  );
}