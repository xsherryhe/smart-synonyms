import { Link } from 'react-router-dom';
import partsOfSpeech from '../partsOfSpeech';
import Word from '../interfaces/Word';
import FocusResetProps from '../interfaces/FocusResetProps';

interface GlossesMainInteface extends FocusResetProps {
  word: string;
  wordData: Word;
}

export default function GlossesMain({
  word,
  wordData,
  resetFocusRef,
}: GlossesMainInteface) {
  return (
    <>
      <h1
        className="mt-3 text-center text-4xl font-black leading-tight text-dark outline-none"
        tabIndex={-1}
        ref={resetFocusRef}
      >
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
              <button tabIndex={-1} className="w-full">
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
