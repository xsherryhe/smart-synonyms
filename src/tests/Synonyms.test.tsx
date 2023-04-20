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
    // renders header
    // when fetcher returns synset data
    //--renders h1 with synset words
    //--renders h2 with synset definition
    //--renders synonym synsets with definitions
    //--renders a regenerate button
  });

  describe('events', () => {
    // when regenerate button is clicked (do a second mock return value with different data)
    //--calls fetcher with synset route using word, pos, and posOffset from params again
    //--renders synonym synsets from new fetcher call
  });
});
