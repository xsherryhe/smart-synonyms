import { render, screen, waitFor } from '@testing-library/react';
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
}));

jest.mock('../fetcher');

jest.mock(
  '../components/Header',
  () =>
    ({ searchWord }: { searchWord: string }) =>
      <header>{searchWord}</header>
);

describe('Synonyms', () => {
  beforeEach(() => {
    const mockSynsetData: SynsetWithSynonyms = {
      pos_offset: 1,
      words: ['foo', 'bar'],
      definition: 'just a word used for testing',
      examples: ['engineers love using the word foo'],
      synonyms: [
        {
          pos_offset: 2,
          words: ['hello', 'world'],
          definition: 'more words used for testing',
          examples: ['well hello there'],
        },
      ],
    };

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

    describe('when fetcher returns synset data', () => {
      it('renders an h1 with the synset words', async () => {
        render(<Synonyms />);

        const words = await screen.findByRole('heading', { level: 1 });
        expect(words).toHaveTextContent('foo bar');
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

        const button = await screen.findByRole('button');
        expect(button).toHaveTextContent('Regenerate');
      });
    });
  });

  describe('events', () => {
    // when regenerate button is clicked (do a second mock return value with different data)
    //--calls fetcher with synset route using word, pos, and posOffset from params again
    //--renders synonym synsets from new fetcher call
  });
});
