import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import fetcher from '../fetcher';
import partsOfSpeech from '../partsOfSpeech';
import Word from '../interfaces/Word';
import {
  withErrorHandling,
  WithErrorHandlingProps,
} from './higher-order/withErrorHandling';
import Header from './Header';

interface GlossesBaseProps extends WithErrorHandlingProps {}

function GlossesBase({ handleErrors }: GlossesBaseProps) {
  const { word } = useParams() as { word: string };
  const [wordData, setWordData] = useState<Word | null>(null);

  useEffect(() => {
    async function getGlosses() {
      const response = await fetcher(`words/${word}`);
      if (response.type === 'success') setWordData(response.data as Word);
      else handleErrors(response);
    }
    getGlosses();
  }, [word, handleErrors]);

  if (!wordData) return <div>Loading...</div>;
  return (
    <>
      <Header searchWord={word} />
      <h1>{wordData.word}</h1>
      {wordData.glosses.map(({ id, pos, synsets }) => (
        <div key={id}>
          <h2>{partsOfSpeech[pos]}</h2>
          {synsets.map(({ pos_offset: posOffset, definition, examples }) => (
            <Link key={posOffset} to={`/${word}/${pos}/${posOffset}/synonyms`}>
              <button>
                <span>{definition}</span>
                <div>
                  {examples.map((example) => (
                    <span key={example}>{example}</span>
                  ))}
                </div>
              </button>
            </Link>
          ))}
        </div>
      ))}
    </>
  );
}

const Glosses = withErrorHandling(GlossesBase);
export default Glosses;
