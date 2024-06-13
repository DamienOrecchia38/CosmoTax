import React from 'react';
import { render, screen, act } from '@testing-library/react';
import CountdownPopup from '../components/CountdownPopup';

jest.useFakeTimers();

test('renders CountdownPopup and checks countdown', () => {
  render(<CountdownPopup />);

  // Vérifie que le compte à rebours commence à 15
  expect(screen.getByText('15')).toBeInTheDocument();

  // Avance le temps de 1 sec
  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // Vérifie que le compte à rebours est maintenant à 14
  expect(screen.getByText('14')).toBeInTheDocument();

  // Avance le temps de 14 sec
  act(() => {
    jest.advanceTimersByTime(14000);
  });

  // Vérifie que le compte à rebours est maintenant à 0
  expect(screen.getByText('0')).toBeInTheDocument();
});