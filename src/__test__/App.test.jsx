import { screen, render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App.jsx', () => {
  it('shoudl render without any errors', () => {
    const tree = render(<App />);
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('should render hello world', () => {
    render(<App />);
    expect(screen.queryByText('Rankiq hello')).toBeInTheDocument();
  });
});
