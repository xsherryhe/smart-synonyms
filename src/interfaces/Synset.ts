export interface Synset {
  pos_offset: number;
  words: string[];
  definition: string;
  examples: string[];
}

export interface SynsetWithSynonyms extends Synset {
  synonyms: Synset[];
}
