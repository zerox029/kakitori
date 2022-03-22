import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, SelectChangeEvent, MenuItem, FormControlLabel, Checkbox, Button } from "@mui/material";
import ScoreCard from "./ScoreCard";

import { IScore } from "../Interfaces";
import { BreakfastDiningOutlined } from "@mui/icons-material";

const StatsPage = (): JSX.Element => {
  const [userScores, setUserScores] = useState<Array<IScore>>([]);
  const [sortType, setSortType] = useState<string>("0");
  const [orderDescending, setOrderDescending] = useState<boolean>(false);

  const handleSortSelectChange = (event: SelectChangeEvent) => {
    setSortType(event.target.value.toString());
  };

  const handleOrderCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderDescending(event.target.checked);
  }

  const handleApplyButtonClick = () => {
    switch(sortType) {
      case "0":
        orderScores((a: IScore, b: IScore) => (a.correctCount / (a.correctCount + a.incorrectCount)) > ((b.correctCount / (b.correctCount + b.incorrectCount))) ? -1 : 1);
        break;
      case "1":
        orderScores((a: IScore, b: IScore) => a.correctCount + a.incorrectCount > b.correctCount + b.incorrectCount ? -1 : 1);
        break;
      case "2":
        orderScores((a: IScore, b: IScore) => a.seenCount > b.seenCount ? -1 : 1);
        break;
    }
  }

  useEffect(() => {
    getAllUserScores();
  }, [])

  /**
   * Gets every user scores for the current logged in user from the database
   */
  const getAllUserScores = async () => {
    const url = "http://localhost:5000/user/score/all";
    const res = await fetch(url);
    const data = await res.json();

    setUserScores(data);
  }

  /**
   * Orders the scores in the userScores state according to
   */
  const orderScores = async (sortingCondition: (a: IScore, b: IScore) => number) => {
    const scores = [...userScores];
    scores.sort(sortingCondition);
    
    setUserScores(scores);
  }

  return (
    <div>
      <FormControl sx={{m: 2}}>
        <InputLabel id="sortSelectLabel">Sort by</InputLabel>
        <Select
          labelId="sortSelectLabel"
          id="sortSelect"
          value={sortType}
          label="Sort"
          onChange={handleSortSelectChange}
        >
          <MenuItem value={0}>Mastery</MenuItem>
          <MenuItem value={1}>Seen count</MenuItem>
          <MenuItem value={2}>Kanken level</MenuItem>
        </Select>

        <FormControlLabel control={<Checkbox onChange={handleOrderCheckboxChange} />} label="Order by descending" />
        <Button variant="contained" onClick={handleApplyButtonClick}>Apply</Button>
      </FormControl>
      <div style={{display: "flex", flexFlow: "row wrap", justifyContent: "space-evenly"}}>
        { userScores.map((score: IScore) => <ScoreCard key={score._id} score={score} />) }
      </div>
    </div>
  )
}

export default StatsPage;