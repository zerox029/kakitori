import { useEffect } from "react";

import { Button, Paper, Typography } from "@mui/material";
import styles from './Card.module.css';

interface Props {
  word: string;
  reading: string;
  clickHandler: (state: boolean) => void;
}

const AnswerCard = ({word, reading, clickHandler}: Props): JSX.Element => {
  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
  }, [])

  /**
   * Used to answer the card when the user presses 1 or 2
   * @param e The even object
   */
  const keyDownHandler = (e: KeyboardEvent) => {
    if(!e.repeat) {
      if(e.code === "Digit1" || e.code === "Numpad1")
        clickHandler(false);
      else if(e.code === "Digit2" || e.code === "Numpad2")
        clickHandler(true);
    }
  }

  return (
    <Paper className={styles.studyCard} elevation={3}>
      <Typography variant="h3" sx={{margin: "auto"}}>
        <ruby style={{ rubyPosition: "over" }}>{word}<rt>{reading}</rt></ruby>
      </Typography>
      <div className={styles.buttonArea}>
        <Button sx={{ width: "20%" }} className={styles.cardBtn} variant="contained" color="error" onClick={() => clickHandler(false)}>Wrong</Button>
        <Button sx={{ width: "20%" }} className={styles.cardBtn} variant="contained" color="success" onClick={() => clickHandler(true)}>Correct</Button>
      </div>
    </Paper>
  )
}

export default AnswerCard;