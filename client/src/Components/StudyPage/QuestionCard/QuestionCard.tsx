import { Paper, Typography } from "@mui/material";
import styles from './QuestionCard.module.css';

interface Props {
  isFlipped: boolean;
  questionWord: string;
  questionWordReading: string;
  sentence: string
}

const QuestionCard = ({ isFlipped, questionWord, questionWordReading, sentence }: Props): JSX.Element => {
  const mergeSentenceAndWord = (word: string, sentence: string) => {
    let sentenceFragments: string[] = sentence.split("$$")
    
    let domTextFragments: JSX.Element[] = [];
    for(let i = 0; i < sentenceFragments.length; i++)
    {
      if(sentenceFragments[i] === "question")
      {
        domTextFragments[i] = <div className={styles.questionWord}>{word}</div>
      }
      else if(sentenceFragments[i] !== "")
      {
        domTextFragments[i] = <div>{sentenceFragments[i]}</div>
      }
    }

    return domTextFragments;
  }

  return (
    <Paper className={styles.questionCard} elevation={3}>
      <Typography variant="h4" sx={{margin: "auto", display: "flex"}}>
        {isFlipped ? mergeSentenceAndWord(questionWord, sentence) : mergeSentenceAndWord(questionWordReading, sentence)}
      </Typography>
    </Paper>
  )
}

export default QuestionCard;