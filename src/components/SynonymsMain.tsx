import { RefObject } from 'react';
import FocusResetProps from '../interfaces/FocusResetProps';
import { SynsetWithSynonyms } from '../interfaces/Synset';
import SynsetWords from './SynsetWords';

interface SynonymsMainProps extends FocusResetProps {
  synset: SynsetWithSynonyms;
  getSynset: () => Promise<void>;
}

export default function SynonymsMain({
  synset,
  getSynset,
  resetFocusRef,
}: SynonymsMainProps) {
  return (
    <>
      <h1
        className="outline-none"
        tabIndex={-1}
        ref={resetFocusRef as RefObject<HTMLHeadingElement>}
      >
        <SynsetWords words={synset.words} />
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
