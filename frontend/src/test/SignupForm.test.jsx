import { render, screen } from '@testing-library/react';
import SignUpForm from '../components/SignupForm';

test('renders SignUpForm', () => {
  render(<SignUpForm />);
  const headingElement = screen.getByText(/Inscription/i);
  expect(headingElement).toBeInTheDocument();
});