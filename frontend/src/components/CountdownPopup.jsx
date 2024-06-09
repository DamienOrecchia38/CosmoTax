import { useState, useEffect } from 'react';

export default function CountdownPopup() {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg">
      <p className="text-lg font-bold">Attention !</p>
      <p>Entrez immédiatement votre code unique pour éviter une attaque extraterrestre !</p>
      <div className="text-4xl font-bold mt-2">{countdown}</div>
    </div>
  );
}