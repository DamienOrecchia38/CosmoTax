import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomerTestimonials from '.../components/CustomerTestimonials';

jest.useFakeTimers();

test('renders CustomerTestimonials component and cycles through testimonials', async () => {
  render(<CustomerTestimonials />);

  // Vérifie que le 1er témoignage est affiché
  expect(screen.getByText(/Grâce à CosmoTax, conquérir la galaxie n'a jamais été aussi simple !/i)).toBeInTheDocument();
  expect(screen.getByText(/Alien diabolique/i)).toBeInTheDocument();

  // Avance le temps de 5 sec pour passer au témoignage suivant
  jest.advanceTimersByTime(5000);

  await waitFor(() => {
    // Vérifie que le deuxième témoignage est affiché
    expect(screen.getByText(/Je s'appelle Groot. Je s'appelle Groot. CosmoTax, je s'appelle Groot !/i)).toBeInTheDocument();
    expect(screen.getByText(/Groot/i)).toBeInTheDocument();
  });

  // Avance le temps de 5 sec pour passer au témoignage suivant
  jest.advanceTimersByTime(5000);

  await waitFor(() => {
    // Vérifie que le 3ème témoignage est affiché
    expect(screen.getByText(/CosmoTax a littéralement changé ma vie./i)).toBeInTheDocument();
    expect(screen.getByText(/L'avare interstellaire/i)).toBeInTheDocument();
  });

  // Avance le temps de 5 sec pour passer au témoignage suivant
  jest.advanceTimersByTime(5000);

  await waitFor(() => {
    // Vérifie que le 4ème témoignage est affiché
    expect(screen.getByText(/CosmoTax, c'est une dinguerie ! Je suis devenu complètement addict aux taxes !/i)).toBeInTheDocument();
    expect(screen.getByText(/Le radin cosmique/i)).toBeInTheDocument();
  });
});