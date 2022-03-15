import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import QuestionCard from "./QuestionCard";
import AnswerCard from "./AnswerCard";

interface IWord {
  _id: string;
  word: string;
  reading: string;
  translation: string;
  level: number;
}

const StudyPage: React.FC = () => {
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [wordList, setWordList] = useState<Array<IWord>>([]);
  const [currentWord, setCurrentWord] = useState<IWord>();

  useEffect(() => {
    getWordList();
  }, []);

  useEffect(() => {
    setNewWord();
  }, [wordList]);

  const getWordList = async () => {
    const url = `http://localhost:5000/vocab/level/5`;
    const res = await fetch(url);
    const data = await res.json();

    setWordList(data);
  }

  const setNewWord = () => {
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(word);
  }

  const showAnswer = () => {
    setHasAnswered(true);
  }

  const setAnswer = (answerStatus: boolean) => {
    setNewWord();
    setHasAnswered(false);
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {hasAnswered ? 
        <AnswerCard word={currentWord?.word ?? ""} reading={currentWord?.reading ?? ""} clickHandler={setAnswer} /> :
        <QuestionCard reading={currentWord?.reading ?? ""} translation={currentWord?.translation ?? ""} clickHandler={showAnswer} />
      }  
    </Box>
  )
}

export default StudyPage;