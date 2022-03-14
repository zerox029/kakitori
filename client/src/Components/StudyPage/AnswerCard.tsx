import { Button, Paper, Typography } from "@mui/material";

import styles from './Card.module.css';

interface Props {
  word: string;
  reading: string;
  clickHandler: (state: boolean) => void;
}

const AnswerCard = ({word, reading, clickHandler}: Props): JSX.Element => {
  return (
    <Paper className={styles.studyCard} elevation={3}>
      <Typography variant="h3" sx={{margin: "auto"}}>
        <ruby style={{ rubyPosition: "over" }}>{word}<rt>{reading}</rt></ruby>
      </Typography>
      <div className={styles.buttonArea}>
        <Button sx={{ width: "20%" }} className={styles.cardBtn} variant="contained" color="success" onClick={() => clickHandler(false)}>Correct</Button>
        <Button sx={{ width: "20%" }} className={styles.cardBtn} variant="contained" color="error" onClick={() => clickHandler(false)}>Wrong</Button>
      </div>
    </Paper>
  )
}

export default AnswerCard;