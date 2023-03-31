import { Box, Container, Modal, Typography, Grid, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { Dispatch, SetStateAction } from 'react';

import styles from "./SettingsModal.module.css";

interface Props {
  isOpen: boolean,
  handleClose: () => void,

  vocabLevel: string[],
  setVocabLevel: Dispatch<SetStateAction<string[]>>,
  kanjiLevel: string[],
  setKanjiLevel: Dispatch<SetStateAction<string[]>>
}

const SettingsModal = ({isOpen, handleClose, vocabLevel, kanjiLevel, setVocabLevel, setKanjiLevel}: Props): JSX.Element => {
  const handleVocabLevelChange = (
    event: React.MouseEvent<HTMLElement>,
    newVocabLevel: string[],
  ) => {
    if(newVocabLevel.length)
    {
      setVocabLevel(newVocabLevel);
    }
  };

  const handleKanjiLevelChange = (
    event: React.MouseEvent<HTMLElement>,
    newKanjiLevel: string[],
  ) => {
    if(newKanjiLevel.length)
    {
      setKanjiLevel(newKanjiLevel);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.modalWindow}>
        <Grid container>
          <Grid item xs={6} className={styles.modalColumn}>
            <Typography variant="h3">語彙レベル</Typography>
            <ToggleButtonGroup
              color="primary"
              value={vocabLevel}
              onChange={handleVocabLevelChange}
              aria-label="Platform"
              orientation="vertical"
            >
              <ToggleButton value="5">JLPT N5</ToggleButton>
              <ToggleButton value="4">JLPT N4</ToggleButton>
              <ToggleButton value="3">JLPT N4</ToggleButton>
              <ToggleButton value="2">JLPT N2</ToggleButton>
              <ToggleButton value="1">JLPT N1</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={6} className={styles.modalColumn}>
            <Typography variant="h3">漢字レベル</Typography>
            <Container>
              <ToggleButtonGroup
                color="primary"
                value={kanjiLevel}
                onChange={handleKanjiLevelChange}
                aria-label="Platform"
                orientation="vertical"
              >
                <ToggleButton value="12">漢検10級</ToggleButton>
                <ToggleButton value="11">漢検9級</ToggleButton>
                <ToggleButton value="10">漢検8級</ToggleButton>
                <ToggleButton value="9">漢検7級</ToggleButton>
                <ToggleButton value="8">漢検6級</ToggleButton>
                <ToggleButton value="7">漢検5級</ToggleButton>
              </ToggleButtonGroup>
              
              <ToggleButtonGroup
                color="primary"
                value={kanjiLevel}
                onChange={handleKanjiLevelChange}
                aria-label="Platform"
                orientation="vertical"
              >
              <ToggleButton value="6">漢検4級</ToggleButton>
                <ToggleButton value="5">漢検3級</ToggleButton>
                <ToggleButton value="4">漢検准２級</ToggleButton>
                <ToggleButton value="3">漢検2級</ToggleButton>
                <ToggleButton value="2">漢検准1級</ToggleButton>
                <ToggleButton value="1">漢検1級</ToggleButton>
              </ToggleButtonGroup>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}
  
export default SettingsModal;