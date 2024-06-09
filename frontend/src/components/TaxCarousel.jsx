import Slider from "react-slick";
import { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';

export default function TaxCarousel() {
  const [taxes, setTaxes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/taxes')
    .then(response => response.json())
    .then(data => {
        setTaxes(data['hydra:member'] || []);
        setTimeout(() => {
            setLoading(false);
          }, 2000);
        })
    .catch(error => console.error('Erreur:', error));
  }, []);

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="text-center">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen">
        <p className="bg-gradient-anim text-transparent bg-clip-text animate-gradientX text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold italic font-['Bangers'] tracking-wider mt-20 mb-10">Chargement galactique en cours...</p>
        <RotatingLines
          strokeColor="#006400"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
      ) : (
        <>
          <h1 className="bg-gradient-anim text-transparent bg-clip-text animate-gradientX text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-['Bangers'] tracking-wider mt-20 mb-20">Payez toutes les taxes de la galaxie au même endroit !</h1>
          <div className="bg-white shadow-lg bg-opacity-30 backdrop-blur-sm">
            <Slider {...settings}>
              {taxes.map(tax => (
                <div key={tax.id} className="px-4 mt-20 mb-10 text-center sm:px-6 lg:px-8">
                  <img src={`/images/taxes/${tax.title.replace(/\s+/g, '_').toLowerCase()}.jpg`} alt={tax.title} className="w-full h-48 sm:h-64 md:h-80 lg:h-[30rem] object-cover mb-4 rounded-xl" />
                  <p className="mb-4 text-2xl font-bold">{tax.title}</p>
                  <p className="mb-4">{tax.description}</p>
                  <p className="text-2xl font-bold">{tax.amount} €</p>
                </div>
              ))}
            </Slider>
          </div>
        </>
      )}
    </div>
  );
}