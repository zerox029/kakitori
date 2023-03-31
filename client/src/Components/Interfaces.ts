export interface IScore {
  _id: string
  userId: string
  kanjiId: string
  correctCount: number
  incorrectCount: number
  correctRatio: number
  seenCount: number
}

export interface IKanji {
  _id: string
  kanji: string
  level: number
}

export interface IWord {
  _id: string;
  word: string;
  reading: string;
  translation: string;
  level: number;
}

export interface IQuestion {
  kanji: IKanji;
  word: IWord;
  sentence: string;
}