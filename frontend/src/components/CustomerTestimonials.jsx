import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CustomerTestimonials() {

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Alien diabolique',
      image: '/images/customers/evil_alien.png',
      quote: "« Grâce à CosmoTax, conquérir la galaxie n'a jamais été aussi simple ! »",
    },
    {
      name: 'Groot',
      image: '/images/customers/groot.png', 
      quote: "« Je s'appelle Groot. Je s'appelle Groot. CosmoTax, je s'appelle Groot ! »",
    },
    {
        name: 'L\'avare interstellaire',
        image: '/images/customers/avare_interstellaire.jpg',
        quote: "« CosmoTax a littéralement changé ma vie. »",
      },
      {
        name: 'Le radin cosmique',
        image: '/images/customers/radin_cosmique.png', 
        quote: "« CosmoTax, c'est une dinguerie ! Je suis devenu complètement addict aux taxes ! »",
      },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTestimonial((prevTestimonial) => 
        (prevTestimonial + 1) % testimonials.length
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [testimonials.length]);

  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-sm shadow-xl rounded-xl p-10 my-20 mx-auto max-w-6xl">
      <h2 className="bg-gradient-to-r from-yellow-400 to-green-600 text-transparent bg-clip-text text-5xl font-bold font-['Bangers'] tracking-wider mb-10 text-center">Ce que nos clients intergalactiques disent de nous !</h2>
      <motion.div 
        key={currentTestimonial}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-center justify-center"
      >
        <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].name} className="w-48 h-48 rounded-full mb-6 md:mb-0 md:mr-10" />
        <div>
          <p className="text-xl mb-4 italic">{testimonials[currentTestimonial].quote}</p>
          <p className="text-lg font-bold">{testimonials[currentTestimonial].name}</p>
        </div>
      </motion.div>
    </div>
  );
}