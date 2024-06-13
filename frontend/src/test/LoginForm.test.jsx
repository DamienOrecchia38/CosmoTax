import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginForm from '../components/LoginForm';

describe('LoginForm', () => {
  test('renders the login form', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText('Adresse mail intergalactique')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Mot de passe cosmique')).toBeInTheDocument();
    expect(screen.getByText('Se connecter')).toBeInTheDocument();
  });

  test('shows validation errors on invalid form submission', async () => {
    render(<LoginForm />);
    
    fireEvent.change(screen.getByPlaceholderText('Adresse mail intergalactique'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByPlaceholderText('Mot de passe cosmique'), { target: { value: '123' } });
    fireEvent.click(screen.getByText('Se connecter'));

    await waitFor(() => {
      expect(screen.getByText('Adresse mail invalide')).toBeInTheDocument();
      expect(screen.getByText('Le mot de passe doit contenir au moins 6 caractères')).toBeInTheDocument();
    });
  });

  test('submits the form with valid data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'fake-token' }),
      })
    );

    render(<LoginForm />);
    
    fireEvent.change(screen.getByPlaceholderText('Adresse mail intergalactique'), { target: { value: 'test_damien@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Mot de passe cosmique'), { target: { value: '123456' } });
    fireEvent.click(screen.getByText('Se connecter'));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('fake-token');
      expect(screen.getByText('Récupération de vos informations intergalactiques...')).toBeInTheDocument();
    });

    global.fetch.mockRestore();
  });
});