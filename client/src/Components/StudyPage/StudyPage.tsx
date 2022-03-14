import React, { useState } from "react";
import { Box } from "@mui/material";

import QuestionCard from "./QuestionCard";
import AnswerCard from "./AnswerCard";

const StudyPage: React.FC = () => {
  const [hasAnswered, setHasAnswered] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {hasAnswered ? 
        <AnswerCard word="言葉" reading="ことば" clickHandler={setHasAnswered} /> :
        <QuestionCard reading="ことば" translation="word" clickHandler={setHasAnswered} />
      }  
    </Box>
  )
}

export default StudyPage;