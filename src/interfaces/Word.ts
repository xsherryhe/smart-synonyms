import { PartOfSpeechChar } from './PartOfSpeech';
import { Synset } from './Synset';

interface Gloss {
  id: string;
  pos: PartOfSpeechChar;
  synsets: Synset[];
}

interface Word {
  word: string;
  glosses: Gloss[];
}
export default Word;
