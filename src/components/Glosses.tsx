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
      <h1 className="mt-3 text-center text-4xl font-black leading-tight text-dark">
        {wordData.word}
      </h1>
      <h2 className="mb-3 text-center italic leading-tight text-gray">
        tap to select definition
      </h2>
      {wordData.glosses.map(({ id, pos, synsets }) => (
        <div
          key={id}
          className="relative mx-2 mb-4 mt-6 flex flex-col gap-2.5 rounded-md border-2 border-solid border-light px-2 py-4"
        >
          <h3 className="absolute -top-4 left-6 bg-white px-2 font-bold text-dark">
            {partsOfSpeech[pos]}
          </h3>
          {synsets.map(({ pos_offset: posOffset, definition, examples }) => (
            <Link
              key={posOffset}
              to={`/${word}/${pos}/${posOffset}/synonyms`}
              className="rounded-sm bg-dark text-white hover:bg-dark-highlight"
            >
              <button tabIndex={-1}>
                <div className="m-2 font-semibold">{definition}</div>
                <div className="m-1 text-sm italic">{examples.join(' • ')}</div>
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
