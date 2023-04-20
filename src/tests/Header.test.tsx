import { render, screen, within } from '@testing-library/react';
import Header from '../components/Header';

jest.mock('react-router-dom', () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

jest.mock('../components/Search', () => ({ word }: { word: string }) => (
  <div>{word}</div>
));

describe('Header', () => {
  describe('structure', () => {
    it('renders a link with a home icon', () => {
      render(<Header />);
      const link = screen.getByRole('link');
      const icon = within(link).getByTitle('Home');
      expect(icon).toBeInTheDocument();
    });

    it('renders a link with a route to root/home page', () => {
      render(<Header />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/');
    });

    it('renders a search bar with search word passed in', () => {
      render(<Header searchWord="hello" />);
      const search = screen.getByText('hello');
      expect(search).toBeInTheDocument();
    });
  });
});
