import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from '@fortawesome/free-solid-svg-icons';

interface SynsetWordsProps {
  words: string[];
}

export default function SynsetWords({ words }: SynsetWordsProps) {
  const [currWord, setCurrWord] = useState<number>(0);

  function changeWord(dir: -1 | 1) {
    return function () {
      setCurrWord((currWord) => (currWord + dir + words.length) % words.length);
    };
  }

  if (words.length === 0) return null;
  if (words.length === 1) return <span>{words[0]}</span>;

  return (
    <>
      <button onClick={changeWord(-1)}>
        <FontAwesomeIcon icon={faCircleChevronLeft} />
      </button>
      <span>{words[currWord]}</span>
      <button onClick={changeWord(1)}>
        <FontAwesomeIcon icon={faCircleChevronRight} />
      </button>
    </>
  );
}
