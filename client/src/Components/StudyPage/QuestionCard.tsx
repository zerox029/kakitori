import { Button, Paper, Typography } from "@mui/material";

import styles from './Card.module.css';

interface Props {
  reading: string;
  translation: string;
  clickHandler: () => void;
}

const QuestionCard = ({reading, translation, clickHandler}: Props): JSX.Element => {
  return (
    <Paper className={styles.studyCard} elevation={3}>
      <Typography variant="h3" sx={{margin: "auto"}}>
        <ruby style={{ rubyPosition: "under" }}>{reading}<rt>{translation}</rt></ruby>
      </Typography>
      <div className={styles.buttonArea}>
        <Button sx={{ width: "30%", margin: "0 10px" }} variant="contained" onClick={() => clickHandler()}>Reveal Answer</Button>
      </div>
    </Paper>
  )
}

export default QuestionCard;