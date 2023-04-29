import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetcher from '../fetcher';

import Synonyms from '../components/Synonyms';
import { SynsetWithSynonyms } from '../interfaces/Synset';
import { createRef } from 'react';

jest.mock('react-router-dom', () => ({
  useParams: () => ({
    word: 'foo',
    pos: 'n',
    posOffset: '1',
  }),
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

jest.mock('../fetcher');

jest.mock(
  '../components/Header',
  () =>
    ({ searchWord }: { searchWord: string }) =>
      <header>{searchWord}</header>
);

describe('Synonyms', () => {
  const mockSynsetData: SynsetWithSynonyms = {
    pos_offset: 1,
    words: ['foo!', 'bar'],
    definition: 'just a word used for testing',
    examples: ['engineers love using the word foo!'],
    synonyms: [
      {
        pos_offset: 2,
        words: ['hello', 'world'],
        definition: 'more words used for testing',
        examples: ['well hello there'],
      },
    ],
  };

  beforeEach(() => {
    (fetcher as jest.Mock).mockReturnValue({
      type: 'success',
      data: mockSynsetData,
    });
  });

  describe('effects', () => {
    it('calls fetcher with synset route using word, pos, and posOffset from params', async () => {
      render(<Synonyms />);

      await waitFor(() =>
        expect(fetcher).toHaveBeenCalledWith('synsets/n/1', {
          query: 'word=foo',
        })
      );
    });

    it('resets focus to h1 with synset words if fetcher returns synset data and reset focus ref is passed in', async () => {
      const ref = createRef<HTMLElement>();
      render(<Synonyms resetFocusRef={ref} />);

      const heading = await screen.findByRole('heading', { level: 1 });
      await waitFor(() => expect(heading).toHaveFocus());
    });
  });

  describe('structure', () => {
    it('renders a header with the searched word passed in', async () => {
      render(<Synonyms />);
      await waitFor(() => expect(fetcher).toHaveBeenCalled());

      const header = screen.getByRole('banner');
      expect(header).toHaveTextContent('foo');
    });

    it('renders a link back to glosses page', async () => {
      render(<Synonyms />);
      await waitFor(() => expect(fetcher).toHaveBeenCalled());

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/foo');
    });

    describe('when fetcher returns synset data', () => {
      it('renders an h1 with the synset words', async () => {
        render(<Synonyms />);

        const words = await screen.findByRole('heading', { level: 1 });
        expect(words).toHaveTextContent('foo! bar');
      });

      it('renders an h2 with the synset definition', async () => {
        render(<Synonyms />);

        const definition = await screen.findByRole('heading', { level: 2 });
        expect(definition).toHaveTextContent('just a word used for testing');
      });

      it('renders synonym synsets with definitions', async () => {
        render(<Synonyms />);

        const synonymWords = await screen.findByText('hello world');
        expect(synonymWords).toBeInTheDocument();

        const synonymDefinition = screen.getByText(
          'more words used for testing'
        );
        expect(synonymDefinition).toBeInTheDocument();
      });

      it('renders a regenerate button', async () => {
        render(<Synonyms />);

        const button = await screen.findByRole('button', {
          name: 'Regenerate',
        });
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe('events', () => {
    describe('when regenerate button is clicked', () => {
      beforeEach(() => {
        const mockSynsetData2: SynsetWithSynonyms = {
          pos_offset: 1,
          words: ['foo!', 'bar'],
          definition: 'just a word used for testing',
          examples: ['engineers love using the word foo!'],
          synonyms: [
            {
              pos_offset: 3,
              words: ['goodbye', 'globe'],
              definition: 'a third set of testing words',
              examples: ['around the globe'],
            },
          ],
        };

        (fetcher as jest.Mock)
          .mockReturnValueOnce({ type: 'success', data: mockSynsetData })
          .mockReturnValueOnce({ type: 'success', data: mockSynsetData2 });
      });

      it('calls fetcher again with synset route using word, pos, and posOffset from params', async () => {
        render(<Synonyms />);
        await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1));

        const button = await screen.findByRole('button', {
          name: 'Regenerate',
        });
        userEvent.click(button);

        await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(2));
        expect(fetcher).toHaveBeenLastCalledWith('synsets/n/1', {
          query: 'word=foo',
        });
      });

      it('updates synonym synsets with result from new fetcher call', async () => {
        render(<Synonyms />);

        const button = await screen.findByRole('button', {
          name: 'Regenerate',
        });
        userEvent.click(button);

        const synonymWords = await screen.findByText('goodbye globe');
        expect(synonymWords).toBeInTheDocument();

        const oldSynonymWords = screen.queryByText('hello world');
        expect(oldSynonymWords).not.toBeInTheDocument();

        const synonymDefinition = screen.getByText(
          'a third set of testing words'
        );
        expect(synonymDefinition).toBeInTheDocument();

        const oldSynonymDefinition = screen.queryByText(
          'more words used for testing'
        );
        expect(oldSynonymDefinition).not.toBeInTheDocument();
      });
    });
  });
});
