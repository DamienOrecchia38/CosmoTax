import { render, screen } from '@testing-library/react';
import PaymentPage from '../app/payment/page';

test('renders PaymentPage', () => {
  render(<PaymentPage />);
  const buttonElement = screen.getByText(/Payer/i);
  expect(buttonElement).toBeInTheDocument();
});