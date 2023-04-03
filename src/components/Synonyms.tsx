import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetcher from '../fetcher';
import { SynsetWithSynonyms } from '../interfaces/Synset';
import Header from './Header';
import {
  withErrorHandling,
  WithErrorHandlingProps,
} from './higher-order/withErrorHandling';

interface SynonymsBaseProps extends WithErrorHandlingProps {}

function SynonymsBase({ handleErrors }: SynonymsBaseProps) {
  const { word, pos, posOffset } = useParams() as {
    word: string;
    pos: string;
    posOffset: string;
  };
  const [synset, setSynset] = useState<SynsetWithSynonyms | null>(null);

  useEffect(() => {
    async function getSynset() {
      const response = await fetcher(`synsets/${pos}/${posOffset}`, {
        query: `word=${word}`,
      });
      if (response.type === 'success')
        setSynset(response.data as SynsetWithSynonyms);
      else handleErrors(response);
    }
    getSynset();
  }, [word, pos, posOffset, handleErrors]);

  if (!synset) return <div>Loading...</div>;
  return (
    <>
      <Header searchWord={word} />
      <h1>{synset.words.join(' ')}</h1>
      <h2>{synset.definition}</h2>
      {synset.synonyms.map(({ words, definition }) => (
        <div key={words.join(' ')}>
          <h3>{words.join(' ')}</h3>
          <p>{definition}</p>
        </div>
      ))}
    </>
  );
}

const Synonyms = withErrorHandling(SynonymsBase);
export default Synonyms;
