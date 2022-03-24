import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import QuestionCard from "./QuestionCard";
import AnswerCard from "./AnswerCard";

import { IWord, IKanji } from "../Interfaces";

const StudyPage: React.FC = () => {
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [wordList, setWordList] = useState<Array<IWord>>([]);
  const [kanjiList, setKanjiList] = useState<Array<IKanji>>([]);
  const [currentWord, setCurrentWord] = useState<IWord>();

  const jlptLevel = 1;
  const kankenLevel = 10;

  useEffect(() => {
    getWordList();
    getKanjiList();
  }, []);

  useEffect(() => {
    setNewCurrentWord();
  }, [wordList]);

  /**
   * Gets the list of words to study from the database
   */
  const getWordList = async () => {
    const url: string = `http://localhost:5000/vocab/level/${jlptLevel}`;
    const res = await fetch(url);
    const data = await res.json();

    setWordList(data);
  }

  /**
   * Gets the list of kanji available to study
   */
  const getKanjiList = async () => {
    const url: string = `http://localhost:5000/kanji/level/cumulative/${kankenLevel}`;
    const res = await fetch(url);
    const data = await res.json();

    setKanjiList(data);
  }

  /**
   * Gets a random word from the word list and assigns it to currentWord
   */
  const setNewCurrentWord = () => {
    if(wordList.length === 0) return;

    let word;
    let isValidWord = false;
    do {
      word = wordList[Math.floor(Math.random() * wordList.length)];
      isValidWord = checkIfWordHasOnlyValidKanji(word.word);
    } while(!isValidWord)

    setCurrentWord(word);
  }

  const checkIfWordHasOnlyValidKanji = (word: string) => {
    for(let i = 0; i < word.length; i++) {
      if (kanjiList.filter(e => e.kanji === word[i]).length === 0) {
        return false;
      }
    }

    return true;
  }

  /**
   * Updates the database and sets the new current word when the user answers a card
   * @param {boolean} answerStatus Whether the answer was correct or not
   */
  const setAnswer = async (answerStatus: boolean) => {
    [...currentWord?.word!].forEach(c => { 
      const regex = /(?!\p{Punctuation})[\p{Script_Extensions=Han}]/u;
      if(regex.test(c))
       postAnswerStatus(answerStatus, c)
    });

    setNewCurrentWord();
    setHasAnswered(false);
  }

  /**
   * Updates the database userScore table with the new answer data
   * @param {boolean} answerStatus Whether the answer was right or wrong
   * @param {string} character Which character the question was for
   */
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

  /**
   * Gets the ID for a specified kanji from the database
   * @param {string} kanji The kanji we need the id for
   * @returns The id
   */
  const getIdForKanji = async (kanji: string) => {
    const url = `http://localhost:5000/kanji/${kanji}`;
    const res = await fetch(url);
    const data = await res.json();

    return data._id;
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', height: '91vh' }}>
      {hasAnswered ? 
        <AnswerCard word={currentWord?.word ?? ""} reading={currentWord?.reading ?? ""} clickHandler={setAnswer} /> :
        <QuestionCard reading={currentWord?.reading ?? ""} translation={currentWord?.translation ?? ""} clickHandler={() => { setHasAnswered(true) }} />
      }  
    </Box>
  )
}

export default StudyPage;