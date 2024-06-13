import React from 'react';
import { render, screen } from '@testing-library/react';
import { Stars } from '../components/Stars';
import '@testing-library/jest-dom/extend-expect';

test('renders stars when visible is true', () => {
  render(<Stars visible={true} />);
  
  // Vérifie que les étoiles sont rendues
  const stars = screen.getAllByRole('img'); // Les SVGs considérés comme images
  expect(stars.length).toBe(20); // Vérifie qu'il y a 20 étoiles
});

test('does not render stars when visible is false', () => {
  render(<Stars visible={false} />);
  
  // Vérifie que les étoiles ne sont pas rendues
  const stars = screen.queryAllByRole('img');
  expect(stars.length).toBe(0);
});