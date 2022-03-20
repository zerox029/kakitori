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