import { Box, Container, Modal, Typography, Grid, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useState } from 'react';

import styles from "./SettingsModal.module.css";

interface Props {
  isOpen: boolean,
  handleClose: () => void
}

const SettingsModal = ({isOpen, handleClose}: Props): JSX.Element => {
  const [vocabLevel, setVocabLevel] = useState(() => ['N5']);
  const [kanjiLevel, setKanjiLevel] = useState(() => ['10k']);

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
          <Grid xs={6} className={styles.modalColumn}>
            <Typography variant="h3">語彙レベル</Typography>
            <ToggleButtonGroup
              color="primary"
              value={vocabLevel}
              onChange={handleVocabLevelChange}
              aria-label="Platform"
              orientation="vertical"
            >
              <ToggleButton value="N5">JLPT N5</ToggleButton>
              <ToggleButton value="N4">JLPT N4</ToggleButton>
              <ToggleButton value="N3">JLPT N4</ToggleButton>
              <ToggleButton value="N2">JLPT N2</ToggleButton>
              <ToggleButton value="N1">JLPT N1</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid xs={6} className={styles.modalColumn}>
            <Typography variant="h3">漢字レベル</Typography>
            <Container>
              <ToggleButtonGroup
                color="primary"
                value={kanjiLevel}
                onChange={handleKanjiLevelChange}
                aria-label="Platform"
                orientation="vertical"
              >
                <ToggleButton value="10k">漢検10級</ToggleButton>
                <ToggleButton value="9k">漢検9級</ToggleButton>
                <ToggleButton value="8k">漢検8級</ToggleButton>
                <ToggleButton value="7k">漢検7級</ToggleButton>
                <ToggleButton value="6k">漢検6級</ToggleButton>
                <ToggleButton value="5k">漢検5級</ToggleButton>
              </ToggleButtonGroup>
              
              <ToggleButtonGroup
                color="primary"
                value={kanjiLevel}
                onChange={handleKanjiLevelChange}
                aria-label="Platform"
                orientation="vertical"
              >
              <ToggleButton value="4k">漢検4級</ToggleButton>
                <ToggleButton value="3k">漢検3級</ToggleButton>
                <ToggleButton value="j2k">漢検准２級</ToggleButton>
                <ToggleButton value="2k">漢検2級</ToggleButton>
                <ToggleButton value="j1k">漢検准1級</ToggleButton>
                <ToggleButton value="1k">漢検1級</ToggleButton>
              </ToggleButtonGroup>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}
  
export default SettingsModal;