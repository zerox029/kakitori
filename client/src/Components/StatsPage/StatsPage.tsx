import React, { useEffect, useState } from "react";
import { isConstTypeReference } from "typescript";
import { IScore } from "../Interfaces";

import ScoreCard from "./ScoreCard";

const StatsPage: React.FC = () => {
  const [userScores, setUserScores] = useState<Array<IScore>>([]);

  useEffect(() => {
    getAllUserScores();
  }, [])

  useEffect(() => {
    console.log(userScores)
  }, [userScores])

  const getAllUserScores = async () => {
    const url = "http://localhost:5000/user/score/all";
    const res = await fetch(url);
    const data = await res.json();

    orderScores(data);

    setUserScores(data);

    return data;
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