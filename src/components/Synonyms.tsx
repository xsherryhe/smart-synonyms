import { RefObject, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetcher from '../fetcher';
import { SynsetWithSynonyms } from '../interfaces/Synset';
import Header from './Header';
import {
  withErrorHandling,
  WithErrorHandlingProps,
} from './higher-order/withErrorHandling';
import FocusResetProps from '../interfaces/FocusResetProps';

interface SynonymsBaseProps extends WithErrorHandlingProps, FocusResetProps {}

function SynonymsBase({ handleErrors, resetFocusRef }: SynonymsBaseProps) {
  const { word, pos, posOffset } = useParams() as {
    word: string;
    pos: string;
    posOffset: string;
  };
  const [synset, setSynset] = useState<SynsetWithSynonyms | null>(null);

  const getSynset = useCallback(async () => {
    setSynset(null);
    const response = await fetcher(`synsets/${pos}/${posOffset}`, {
      query: `word=${word}`,
    });
    if (response.type === 'success')
      setSynset(response.data as SynsetWithSynonyms);
    else handleErrors(response);
  }, [word, pos, posOffset, handleErrors]);

  useEffect(() => {
    getSynset();
  }, [getSynset]);

  useEffect(() => {
    if (resetFocusRef?.current) resetFocusRef.current.focus();
  }, [resetFocusRef, synset]);

  if (!synset) return <div>Loading...</div>;
  return (
    <>
      <Header searchWord={word} />
      <h1
        className="outline-none"
        tabIndex={-1}
        ref={resetFocusRef as RefObject<HTMLHeadingElement>}
      >
        {synset.words.join(' ')}
      </h1>
      <h2>{synset.definition}</h2>
      {synset.synonyms.map(({ pos_offset: posOffset, words, definition }) => (
        <div key={posOffset}>
          <h3>{words.join(' ')}</h3>
          <p>{definition}</p>
        </div>
      ))}
      <button
        onClick={getSynset}
        className="rounded-sm bg-dark text-white hover:bg-dark-highlight"
      >
        Regenerate
      </button>
    </>
  );
}

const Synonyms = withErrorHandling(SynonymsBase);
export default Synonyms;
