import { render, screen } from '@testing-library/react';
import { BrowserRouterProps, RouteProps, RoutesProps } from 'react-router-dom';
import App from '../App';

jest.mock('react', () => {
  const originalModule = jest.requireActual('react');
  return {
    __esModule: true,
    ...originalModule,
    useRef: () => 'ref',
  };
});

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: BrowserRouterProps) => <div>{children}</div>,
  Routes: ({ children }: RoutesProps) => <div>{children}</div>,
  Route: ({ path, element }: RouteProps) => (
    <div>
      <div>{path},</div>
      <div>{element}</div>
    </div>
  ),
}));

jest.mock(
  '../components/Home',
  () =>
    ({ resetFocusRef }: { resetFocusRef: string }) =>
      <div>Home,{resetFocusRef}</div>
);

jest.mock(
  '../components/Glosses',
  () =>
    ({ resetFocusRef }: { resetFocusRef: string }) =>
      <div>Glosses,{resetFocusRef}</div>
);

jest.mock(
  '../components/Synonyms',
  () =>
    ({ resetFocusRef }: { resetFocusRef: string }) =>
      <div>Synonyms,{resetFocusRef}</div>
);

describe('App', () => {
  describe('structure', () => {
    it('renders a root route with a reset focus ref passed in', () => {
      render(<App />);
      const home = screen.getByText(
        (_, element) => element?.textContent === '/,Home,ref'
      );
      expect(home).toBeInTheDocument();
    });

    it('renders a home route with a reset focus ref passed in', () => {
      render(<App />);
      const home = screen.getByText(
        (_, element) => element?.textContent === '/home,Home,ref'
      );
      expect(home).toBeInTheDocument();
    });

    it('renders a glosses route with a reset focus ref passed in', () => {
      render(<App />);
      const glosses = screen.getByText(
        (_, element) => element?.textContent === '/:word,Glosses,ref'
      );
      expect(glosses).toBeInTheDocument();
    });

    it('renders a synonyms route with a reset focus ref passed in', () => {
      render(<App />);
      const synonyms = screen.getByText(
        (_, element) =>
          element?.textContent ===
          '/:word/:pos/:posOffset/synonyms,Synonyms,ref'
      );
      expect(synonyms).toBeInTheDocument();
    });
  });
});
