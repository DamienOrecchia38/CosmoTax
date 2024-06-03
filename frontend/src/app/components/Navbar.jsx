import Link from 'next/link';

export default function Navbar({ onLoginClick, onSignUpClick }) {
  return (
    <nav className="flex justify-between items-center p-4 bg-white bg-opacity-40">

      <div className="flex items-center ml-4">
        <img src="/alien_navbar.png" alt="Logo" className="w-20 h-20 mr-2" />
        <div className="bg-gradient-to-r from-yellow-400 to-green-600 text-transparent bg-clip-text font-['Bangers'] text-5xl font-bold">CosmoTax</div>
      </div>

      <div className="container mx-auto flex items-center justify-end px-4 space-x-8">

        <div className="flex items-center space-x-2">
          <script src="https://cdn.lordicon.com/lordicon.js"></script>
          <lord-icon src="https://cdn.lordicon.com/fygyhyze.json" trigger="loop-on-hover" stroke="bold" colors="primary:#e83a30,secondary:#ffd700" style={{ width: '40px', height: '40px' }}></lord-icon>
          <button className="mr-4 px-6 py-3 bg-gradient-to-r from-yellow-300 to-yellow-500 text-gray-100 text-xl font-bold rounded-3xl hover:bg-yellow-500 ripple" onClick={onLoginClick}>Connexion</button>
        </div>

        <div className="flex items-center space-x-2">
          <lord-icon src="https://cdn.lordicon.com/igljtrxq.json" trigger="loop-on-hover" stroke="bold" colors="primary:#e83a30,secondary:#ffd700" style={{ width: '40px', height: '40px' }}></lord-icon>
          <button className="px-6 py-3 bg-gradient-to-r from-yellow-300 to-yellow-500 text-gray-100 text-xl font-bold rounded-3xl hover:bg-yellow-500 ripple" onClick={onSignUpClick}>Inscription</button>
        </div>

        <div className="flex items-center space-x-2">
          <lord-icon src="https://cdn.lordicon.com/xfzuyvam.json" trigger="loop-on-hover" stroke="bold" colors="primary:#e83a30,secondary:#ffd700" style={{ width: '40px', height: '40px' }}></lord-icon>
          <Link href="/profile/profile">
            <button className="px-6 py-3 bg-gradient-to-r from-yellow-300 to-yellow-500 text-gray-100 text-xl font-bold rounded-3xl hover:bg-yellow-500 ripple">Profil</button>
          </Link>        
        </div>

        <div className="flex items-center space-x-2">
          <lord-icon src="https://cdn.lordicon.com/fhszghjk.json" trigger="loop-on-hover" stroke="bold" colors="primary:#e83a30,secondary:#ffd700" style={{ width: '40px', height: '40px' }}></lord-icon>
          <Link href="payment/payment">
            <button className="px-6 py-3 bg-gradient-to-r from-yellow-300 to-yellow-500 text-gray-100 text-xl font-bold rounded-3xl hover:bg-yellow-500 ripple">Paiement</button>
          </Link>
        </div>

      </div>

    </nav>
  );
}