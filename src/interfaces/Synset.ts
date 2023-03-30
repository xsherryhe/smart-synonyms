interface Synset {
  words: string[];
  definition: string;
}

export default interface SynsetWithSynonyms extends Synset {
  synonyms: Synset[];
}
