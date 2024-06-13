import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AnimatedTitle from '../components/AnimatedTitle';
import { motion } from 'framer-motion';

test('renders AnimatedTitle component', () => {
  const { getByText } = render(<AnimatedTitle />);
  const titleElement = getByText(/Payez ou mourrez !/i);
  expect(titleElement).toBeInTheDocument();
  expect(titleElement).toHaveClass('text-8xl font-extrabold text-center my-20 bg-gradient-to-r from-red-500 to-yellow-500 text-transparent bg-clip-text font-[\'Bangers\'] tracking-widest');
});