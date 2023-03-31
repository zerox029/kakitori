import { Button, Container, Grid, Paper,  } from "@mui/material";

import styles from './BottomDrawer.module.css';

interface Props {
  handleOpenModal: () => void
  revealAnswer: (isFlipped: boolean) => void
  isAnswerRevealed: boolean
}

const BottomDrawer = ({handleOpenModal, revealAnswer, isAnswerRevealed}: Props): JSX.Element => {
  const handleRevealAnswerClicked = () => {
    revealAnswer(true);
  }

  const handleAnswerButtonClicked = (answer: boolean) => {
    revealAnswer(false);
  }
  
  return (
    <Grid className={styles.bottomDrawer}>
      <Grid item xs={2}>
        <Button variant="contained" className={styles.settingsButton} onClick={handleOpenModal}>設定</Button>
      </Grid>
      <Grid item xs={8} sx={{alignSelf: 'flex-end', height: '5rem'}}>
        <Paper className={styles.answerButtonsPaper}>
          {
            isAnswerRevealed ? 
              <Container>
                <Button color="success" className={styles.correctButton} variant="contained" onClick={() => {handleAnswerButtonClicked(true)}}>正解</Button>
                <Button color="error" className={styles.incorrectButton} variant="contained" onClick={() => {handleAnswerButtonClicked(false)}}>不正解</Button>
              </Container>   
                :
              <Button className={styles.revealButton} variant="contained" onClick={handleRevealAnswerClicked}>回答を表示</Button>
          }  
        </Paper>
      </Grid>
      <Grid item xs={2}>
        <Container className={styles.accuracyMeter}>
          <Paper>正解率</Paper>
          <Paper>45/67</Paper>
        </Container>
      </Grid>
    </Grid>
  )
}

export default BottomDrawer;