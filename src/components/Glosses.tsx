import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetcher from '../fetcher';
import GlossesType from '../interfaces/Glosses';
import partsOfSpeech from '../partsOfSpeech';
import {
  withErrorHandling,
  WithErrorHandlingProps,
} from './higher-order/withErrorHandling';

interface GlossesBaseProps extends WithErrorHandlingProps {}

function GlossesBase({ handleErrors }: GlossesBaseProps) {
  const { word } = useParams() as { word: string };
  const [glosses, setGlosses] = useState<GlossesType | null>(null);

  useEffect(() => {
    async function getGlosses() {
      const response = await fetcher(`words/${word}`);
      if (response.type === 'success') setGlosses(response.data as GlossesType);
      else handleErrors(response);
    }
    getGlosses();
  }, [word, handleErrors]);

  if (!glosses) return <div>Loading...</div>;
  return (
    <>
      {glosses.map(({ id, pos, synsets }) => (
        <div key={id}>
          <h2>{partsOfSpeech[pos]}</h2>
          {synsets.map(({ pos_offset: posOffset, gloss }) => (
            <div key={posOffset}>{gloss}</div>
          ))}
        </div>
      ))}
    </>
  );
}

const Glosses = withErrorHandling(GlossesBase);
export default Glosses;
