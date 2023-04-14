import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetcher from '../fetcher';
import Word from '../interfaces/Word';
import {
  withErrorHandling,
  WithErrorHandlingProps,
} from './higher-order/withErrorHandling';
import Header from './Header';
import GlossesMain from './GlossesMain';

interface GlossesBaseProps extends WithErrorHandlingProps {}

function GlossesBase({ handleErrors }: GlossesBaseProps) {
  const { word } = useParams() as { word: string };
  const [wordData, setWordData] = useState<Word | false | null>(null);

  const resetFocusRef = useRef<HTMLDivElement | HTMLHeadingElement | null>(
    null
  );

  useEffect(() => {
    async function getGlosses() {
      const response = await fetcher(`words/${word}`);
      if (response.type === 'success')
        setWordData(response.data as Word | false);
      else handleErrors(response);
    }
    getGlosses();
  }, [word, handleErrors]);

  useEffect(() => {
    if (resetFocusRef.current) resetFocusRef.current.focus();
  }, [wordData]);

  let main;
  if (wordData === null) main = <div>Loading...</div>;
  else if (wordData === false)
    main = (
      <div className="outline-none" tabIndex={-1} ref={resetFocusRef}>
        Word not found!
      </div>
    );
  else
    main = (
      <GlossesMain
        word={word}
        wordData={wordData}
        resetFocusRef={resetFocusRef}
      />
    );
  return (
    <>
      <Header searchWord={word} />
      {main}
    </>
  );
}

const Glosses = withErrorHandling(GlossesBase);
export default Glosses;
