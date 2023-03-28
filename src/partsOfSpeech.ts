import { PartOfSpeech, PartOfSpeechChar } from './interfaces/PartOfSpeech';

const partsOfSpeech: Record<PartOfSpeechChar, PartOfSpeech> = {
  n: 'noun',
  v: 'verb',
  a: 'adjective',
  r: 'adverb',
};
export default partsOfSpeech;
