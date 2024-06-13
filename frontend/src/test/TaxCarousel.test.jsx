import { render, screen } from '@testing-library/react';
import TaxCarousel from '../components/TaxCarousel';

test('renders TaxCarousel', () => {
  render(<TaxCarousel />);
  const linkElement = screen.getByText(/Chargement galactique en cours.../i);
  expect(linkElement).toBeInTheDocument();
});