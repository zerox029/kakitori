import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import QuestionCard from "./QuestionCard";
import AnswerCard from "./AnswerCard";
import { QuestionAnswerSharp } from "@mui/icons-material";

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
    const url: string = `http://localhost:5000/vocab/level/5`;
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

  const setAnswer = async (answerStatus: boolean) => {
    [...currentWord?.word!].forEach(c => { 
      const regex = /(?!\p{Punctuation})[\p{Script_Extensions=Han}]/u;
      if(regex.test(c))
       postAnswerStatus(answerStatus, c)
    });

    setNewWord();
    setHasAnswered(false);
  }

  const postAnswerStatus = async (answerStatus: boolean, character: string) => {
    const kanjiId = await getIdForKanji(character);
    const url = `http://localhost:5000/user/score/622ff62cf8ab618a182ca1cf/${kanjiId}`;
    
    const body = { 
      "correctCount": Number(answerStatus === true), 
      "incorrectCount": Number(answerStatus === false) 
    }

    const requestParams = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }


    fetch(url, requestParams);
  }

  const getIdForKanji = async (kanji: string) => {
    const url = `http://localhost:5000/kanji/${kanji}`;
    const res = await fetch(url);
    const data = await res.json();

    return data._id;
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