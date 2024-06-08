import Slider from "react-slick";
import { useEffect, useState } from 'react';

export default function TaxCarousel() {
  const [taxes, setTaxes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/taxes')
    .then(response => response.json())
    .then(data => setTaxes(data['hydra:member'] || []))
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
        <h1 className="bg-gradient-to-r from-yellow-400 to-green-600 text-transparent bg-clip-text text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-['Bangers'] tracking-wider mt-20 mb-20">Payez toutes les taxes de la galaxie au même endroit !</h1>
        <div className="bg-white bg-opacity-30 shadow-lg backdrop-blur-sm">
            <Slider {...settings}>
            {taxes.map(tax => (
                <div key={tax.id} className="text-center mt-20 mb-10 px-4 sm:px-6 lg:px-8">
                    <img src={`/images/taxes/${tax.title.replace(/\s+/g, '_').toLowerCase()}.jpg`} alt={tax.title} className="w-full h-48 sm:h-64 md:h-80 lg:h-[30rem] object-cover mb-4 rounded-xl" />
                    <p className="text-2xl font-bold mb-4">{tax.title}</p>
                    <p className="mb-4">{tax.description}</p>
                    <p className="text-2xl font-bold">{tax.amount} €</p>
                </div>
            ))}
            </Slider>
        </div>
  </div>
);
}