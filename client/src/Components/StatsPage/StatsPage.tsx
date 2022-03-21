import React, { useEffect, useState } from "react";
import ScoreCard from "./ScoreCard";

import { IScore } from "../Interfaces";

const StatsPage = (): JSX.Element => {
  const [userScores, setUserScores] = useState<Array<IScore>>([]);

  useEffect(() => {
    getAllUserScores();
  }, [])

  useEffect(() => {
    console.log(userScores)
  }, [userScores])

  /**
   * Gets every user scores for the current logged in user from the database
   */
  const getAllUserScores = async () => {
    const url = "http://localhost:5000/user/score/all";
    const res = await fetch(url);
    const data = await res.json();

    orderScores(data);

    setUserScores(data);
  }

  const orderScores = async (scores: Array<IScore>) => {
    scores.sort((a: IScore, b: IScore) => (a.correctCount / (a.correctCount + a.incorrectCount)) > ((b.correctCount / (b.correctCount + b.incorrectCount))) ? -1 : 1)
  }

  return (
    <div style={{display: "flex", flexFlow: "row wrap", justifyContent: "space-evenly"}}>
      { userScores.map((score: IScore) => <ScoreCard key={score._id} score={score} />) }
    </div>
  )
}

export default StatsPage;