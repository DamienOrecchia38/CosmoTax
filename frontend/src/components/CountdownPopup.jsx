import { useState, useEffect } from 'react';

export default function CountdownPopup() {
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white bg-opacity-90 p-4 rounded-lg shadow-lg flex items-center">
      <script src="https://cdn.lordicon.com/lordicon.js"></script>
      <lord-icon src="https://cdn.lordicon.com/lzgqzxrq.json" trigger="loop" stroke="bold" colors="primary:#3a3347,secondary:#ebe6ef,tertiary:#c71f16,quaternary:#f24c00" style={{ width: '100px', height: '100px', marginRight: '8px' }}></lord-icon>
      <div className="text-8xl font-bold ml-4">{countdown}</div>
      <div className="flex flex-col items-center ml-8">
        <p className="text-2xl font-bold mb-4">Attention !</p>
        <p className="text-xl font-bold">Entrez immédiatement votre code pour éviter une attaque extraterrestre !</p>
      </div>
    </div>
  );
}