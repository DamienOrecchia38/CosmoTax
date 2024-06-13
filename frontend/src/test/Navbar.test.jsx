import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
  const mockOnLoginClick = jest.fn();
  const mockOnSignUpClick = jest.fn();
  const mockOnHomeClick = jest.fn();

  beforeEach(() => {
    localStorage.clear();
  });

  test('renders Navbar component', () => {
    render(<Navbar onLoginClick={mockOnLoginClick} onSignUpClick={mockOnSignUpClick} onHomeClick={mockOnHomeClick} />);
    expect(screen.getByAltText('Alien logo')).toBeInTheDocument();
    expect(screen.getByText('CosmoTax')).toBeInTheDocument();
  });

  test('shows login and signup buttons when not logged in', () => {
    render(<Navbar onLoginClick={mockOnLoginClick} onSignUpClick={mockOnSignUpClick} onHomeClick={mockOnHomeClick} />);
    expect(screen.getByText('Connexion')).toBeInTheDocument();
    expect(screen.getByText('Inscription')).toBeInTheDocument();
  });

  test('shows profile and payment buttons when logged in', async () => {
    localStorage.setItem('token', 'test-token');
    render(<Navbar onLoginClick={mockOnLoginClick} onSignUpClick={mockOnSignUpClick} onHomeClick={mockOnHomeClick} />);
    
    await screen.findByText('Profil');
    expect(screen.getByText('Profil')).toBeInTheDocument();
    expect(screen.getByText('Paiement')).toBeInTheDocument();
  });

  test('calls onLoginClick when login button is clicked', () => {
    render(<Navbar onLoginClick={mockOnLoginClick} onSignUpClick={mockOnSignUpClick} onHomeClick={mockOnHomeClick} />);
    fireEvent.click(screen.getByText('Connexion'));
    expect(mockOnLoginClick).toHaveBeenCalled();
  });

  test('calls onSignUpClick when signup button is clicked', () => {
    render(<Navbar onLoginClick={mockOnLoginClick} onSignUpClick={mockOnSignUpClick} onHomeClick={mockOnHomeClick} />);
    fireEvent.click(screen.getByText('Inscription'));
    expect(mockOnSignUpClick).toHaveBeenCalled();
  });

  test('toggles menu visibility when menu button is clicked', () => {
    render(<Navbar onLoginClick={mockOnLoginClick} onSignUpClick={mockOnSignUpClick} onHomeClick={mockOnHomeClick} />);
    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);
    expect(screen.getByText('Connexion')).toBeVisible();
    fireEvent.click(menuButton);
    expect(screen.getByText('Connexion')).not.toBeVisible();
  });
});