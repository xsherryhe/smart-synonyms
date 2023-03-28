import { PartOfSpeechChar } from './PartOfSpeech';

interface Synset {
  pos_offset: number;
  gloss: string;
}

interface Gloss {
  id: string;
  word: string;
  pos: PartOfSpeechChar;
  synsets: Synset[];
}

type GlossesType = Gloss[];
export default GlossesType;
