import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import fetcher from '../fetcher';
import { SynsetWithSynonyms } from '../interfaces/Synset';
import Header from './Header';
import {
  withErrorHandling,
  WithErrorHandlingProps,
} from './higher-order/withErrorHandling';
import FocusResetProps from '../interfaces/FocusResetProps';
import SynonymsMain from './SynonymsMain';

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

  let main;
  if (!synset) main = <div>Loading...</div>;
  else
    main = (
      <SynonymsMain
        synset={synset}
        getSynset={getSynset}
        resetFocusRef={resetFocusRef}
      />
    );

  return (
    <>
      <Header searchWord={word} />
      <Link to={`/${word}`}>
        <button tabIndex={-1}>all definitions</button>
      </Link>
      <main>{main}</main>
    </>
  );
}

const Synonyms = withErrorHandling(SynonymsBase);
export default Synonyms;
