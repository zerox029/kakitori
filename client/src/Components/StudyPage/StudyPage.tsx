import React, { useEffect, useState, useRef } from "react";

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

  const [vocabLevel, setVocabLevel] = useState(['5,4,3,2,1']);
  const [kanjiLevel, setKanjiLevel] = useState(['12']);

  const [vocabList, setVocabList] = useState<Array<IWord>>([]);
  const [kanjiList, setKanjiList] = useState<Array<IKanji>>([]);

  const [currentQuestion, setCurrentQuestion] = useState<IQuestion>({
    kanji: {_id: "...", kanji: "...", level: 1}, 
    word: {_id: "...", word: "...", reading: "...", translation: "...", level: 1}, 
    sentence: "..."
  });
  let nextQuestion = useRef<IQuestion>();

  useEffect(() => {
    retrieveKanjiList();
    retrieveVocabList();
  }, [])

  useEffect(() => {
    if(vocabList.length > 0 && kanjiList.length > 0)
    {
      loadQuestion();
    }
  }, [vocabList])

  useEffect(() => {
    if(vocabList.length > 0 && kanjiList.length > 0)
    {
      loadQuestion();
    }
  }, [kanjiList])

  useEffect(() => {
    if(isAnswerRevealed)
    {
      loadQuestion();
    }
    else
    {
      if(typeof nextQuestion.current !== 'undefined')
      {
        changeQuestion();
      }
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

    console.log(data);

    return data;
  }

  const loadQuestion = async () => {
    let selectedKanji: IKanji;
    let availableWords: IWord[];
    let selectedWord: IWord;
    let selectedSentence: string;

    do {
      selectedKanji = kanjiList[Math.floor(Math.random() * kanjiList.length)];

      console.log(selectedKanji)
      availableWords = vocabList.filter(word => word.word.includes(selectedKanji.kanji));
      console.log(availableWords)
      
    } while(availableWords.length <= 0)
    
    do {
      selectedWord = availableWords[Math.floor(Math.random() * availableWords.length)]
      selectedSentence = await retrieveSentences(selectedWord.word);
    } while(selectedSentence.length <= 0)


    const question: IQuestion = { kanji: selectedKanji, word: selectedWord, sentence: selectedSentence[0] };

    //TODO: fix this ugly
    if(currentQuestion.sentence === "...")
    {
      setCurrentQuestion(question);
      console.log("Next question set to ", question)
      nextQuestion.current = question;
    }
    else
    {
      console.log("Next question set to ", question)
      nextQuestion.current = question;
    }
  }

  const changeQuestion = async () => {
    console.log("Question changed to ", nextQuestion.current)
    setCurrentQuestion(nextQuestion.current!);
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