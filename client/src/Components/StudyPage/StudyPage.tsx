import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import QuestionCard from "./QuestionCard/QuestionCard";
import BottomDrawer from "./BottomDrawer/BottomDrawer";

import styles from './StudyPage.module.css';
import SettingsModal from "./SettingsModal/SettingsModal";

const StudyPage: React.FC = () => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const handleOpenSettingsModal = () => setIsSettingsModalOpen(true);
  const handleCloseSettingsModal = () => setIsSettingsModalOpen(false);

  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);

  return (
    <div className={styles.studyPage}>
      <SettingsModal isOpen={isSettingsModalOpen} handleClose={handleCloseSettingsModal} />
      <QuestionCard isFlipped={isAnswerRevealed} questionWord={"明日"} questionWordReading={"アシタ"} sentence={"$$question$$帰ったら電話します。"} />
      <BottomDrawer handleOpenModal={handleOpenSettingsModal} revealAnswer={setIsAnswerRevealed} isAnswerRevealed={isAnswerRevealed} />
    </div>
  )
}

export default StudyPage;