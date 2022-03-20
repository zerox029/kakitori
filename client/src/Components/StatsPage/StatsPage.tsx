import React, { useEffect, useState } from "react";
import { IScore, IKanji } from "../Interfaces";

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

    setUserScores(data);

    return data;
  }

  return (
    <div style={{display: "flex", flexFlow: "row wrap", justifyContent: "space-evenly"}}>
      { userScores.map((score: IScore) => <ScoreCard key={score._id} score={score} />) }
    </div>
  )
}

export default StatsPage;