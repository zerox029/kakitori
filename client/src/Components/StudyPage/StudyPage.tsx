import React, { useEffect, useState } from "react";

import QuestionCard from "./QuestionCard/QuestionCard";
import BottomDrawer from "./BottomDrawer/BottomDrawer";

import styles from './StudyPage.module.css';
import SettingsModal from "./SettingsModal/SettingsModal";
import { IKanji, IWord, IQuestion } from "../Interfaces";

const StudyPage: React.FC = () => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const handleOpenSettingsModal = () => setIsSettingsModalOpen(true);
  const handleCloseSettingsModal = () => setIsSettingsModalOpen(false);

  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);

  const [vocabLevel, setVocabLevel] = useState(['5']);
  const [kanjiLevel, setKanjiLevel] = useState(['12']);

  const [vocabList, setVocabList] = useState<Array<IWord>>([]);
  const [kanjiList, setKanjiList] = useState<Array<IKanji>>([]);

  const [currentQuestion, setCurrentQuestion] = useState<IQuestion>({
    kanji: {_id: "...", kanji: "...", level: 1}, 
    word: {_id: "...", word: "...", reading: "...", translation: "...", level: 1}, 
    sentence: "..."
  });

  useEffect(() => {
    retrieveKanjiList();
    retrieveVocabList();
  }, [])

  useEffect(() => {
    if(vocabList.length > 0 && kanjiList.length > 0)
    {
      selectQuestion();
    }
  }, [vocabList])

  useEffect(() => {
    if(vocabList.length > 0 && kanjiList.length > 0)
    {
      selectQuestion();
    }
  }, [kanjiList])

  useEffect(() => {
    if(isAnswerRevealed)
    {
      selectQuestion();
    }
  }, [isAnswerRevealed])

  const retrieveKanjiList = async () => {
    const url: string = `http://localhost:5000/kanji?levels=${encodeURIComponent(kanjiLevel.toString())}`;
    const res = await fetch(url);
    const data = await res.json();

    setKanjiList(data);
  }

  const retrieveVocabList = async () => {
    const url: string = `http://localhost:5000/vocab?levels=${encodeURIComponent(vocabLevel.toString())}`;
    const res = await fetch(url);
    const data = await res.json();

    setVocabList(data);
  }

  const retrieveSentences = async (word: string) => {
    const url: string = `http://localhost:5000/sentence?word=${encodeURIComponent(word)}`;
    const res = await fetch(url);
    const data = await res.json();

    return data;
  }

  const selectQuestion = async () => {
    //TODO: Fix issue where sometimes words cannot be found for the given kanji
    const selectedKanji = kanjiList[Math.floor(Math.random() * kanjiList.length)];
    
    const availableWords = vocabList.filter(word => word.word.includes(selectedKanji.kanji));
    const selectedWord = availableWords[Math.floor(Math.random() * availableWords.length)]

    const selectedSentence = await retrieveSentences(selectedWord.word);

    const question: IQuestion = { kanji: selectedKanji, word: selectedWord, sentence: selectedSentence[0] };
    setCurrentQuestion(question);
  }

  return (
    <div className={styles.studyPage}>
      <SettingsModal 
        isOpen={isSettingsModalOpen} 
        handleClose={handleCloseSettingsModal} 
        vocabLevel={vocabLevel} 
        kanjiLevel={kanjiLevel} 
        setVocabLevel={setVocabLevel} 
        setKanjiLevel={setKanjiLevel} />
      <QuestionCard 
        isFlipped={isAnswerRevealed} 
        question={currentQuestion!} />
      <BottomDrawer 
        handleOpenModal={handleOpenSettingsModal} 
        revealAnswer={setIsAnswerRevealed} 
        isAnswerRevealed={isAnswerRevealed} />
    </div>
  )
}

export default StudyPage;