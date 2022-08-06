import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

it('Initial load to login page', () => {
  render(<App />);
  expect(screen.getByText('Please login below!'));
});

it('click Forget password button', () => {
  render(<App />);
  const forgotButton = screen.getByRole('link', { name: /Forgot password?/i });
  fireEvent.click(forgotButton);
});
