import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import Search from '../components/Search';

jest.mock('react-router-dom', () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

describe('Search', () => {
  describe('structure', () => {
    it('renders a search input with a label', () => {
      render(<Search />);
      const input = screen.getByLabelText('Search', { selector: 'input' });
      expect(input).toBeInTheDocument();
    });

    it('renders an input with placeholder text passed in', () => {
      render(<Search placeholder="Hello" />);
      const input = screen.getByPlaceholderText('Hello');
      expect(input).toBeInTheDocument();
    });

    it('renders an input with word prop as initial value', () => {
      render(<Search word="Foo" />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input).toHaveValue('Foo');
    });

    it('renders an input with formatted word prop as initial value', () => {
      render(<Search word="apple_tree" />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input).toHaveValue('apple tree');
    });

    it('renders a link with a button and a search icon', () => {
      render(<Search />);
      const link = screen.getByRole('link');
      const button = within(link).getByRole('button');
      const searchIcon = within(button).getByTitle('Search');
      expect(searchIcon).toBeInTheDocument();
    });

    it('renders a link with word prop as initial route value', () => {
      render(<Search word="one" />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/one');
    });
  });

  describe('effects', () => {
    it('resets focus to search input if reset focus ref is passed in', () => {
      const ref = createRef<HTMLElement>();
      render(<Search resetFocusRef={ref} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveFocus();
    });
  });

  describe('events', () => {
    it('updates search button link route when user inputs new value', async () => {
      render(<Search />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/');

      const user = userEvent.setup();
      user.type(input, 'abc');

      await waitFor(() => expect(link).toHaveAttribute('href', '/abc'));
    });
  });
});
