import { Paper, Typography } from "@mui/material";
import styles from './QuestionCard.module.css';

import { IKanji, IWord, IQuestion } from "./../../Interfaces";

const wanakana = require("wanakana");
interface Props {
  isFlipped: boolean;
  question: IQuestion;
}

const QuestionCard = ({ isFlipped, question }: Props): JSX.Element => {
  const mergeSentenceAndWord = (word: string, sentence: string) => {
    console.log(sentence)
    let sentenceFragments: string[] = sentence.split("$$")
    
    let domTextFragments: JSX.Element[] = [];
    for(let i = 0; i < sentenceFragments.length; i++)
    {
      if(sentenceFragments[i] === "question")
      {
        domTextFragments[i] = <div key={i} className={styles.questionWord}>{word}</div>
      }
      else if(sentenceFragments[i] !== "")
      {
        domTextFragments[i] = <div key={i}>{sentenceFragments[i]}</div>
      }
    }

    return domTextFragments;
  }

  return (
    <Paper className={styles.questionCard} elevation={3}>
      <Typography variant="h4" sx={{margin: "auto", display: "flex"}}>
        {isFlipped ? mergeSentenceAndWord(question?.word.word, question?.sentence) : mergeSentenceAndWord(wanakana.toKatakana(question?.word.reading), question?.sentence)}
      </Typography>
    </Paper>
  )
}

export default QuestionCard;