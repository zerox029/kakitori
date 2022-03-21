import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, LinearProgress } from '@mui/material';
import { IScore, IKanji } from "./../Interfaces";

interface IProps {
  score: IScore
}

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const ScoreCard = ({score}: IProps): JSX.Element => {
  const [kanjiData, setKanjiData] = useState<IKanji | null>();

  useEffect(() => {
    getKanjiData();
  }, []);

  /**
   * Retrieves kanji data from the database from the given ID.
   */
  const getKanjiData = async () => {
    const url = `http://localhost:5000/kanji/id/${score.kanjiId}`;
    const res = await fetch(url);
    const data: IKanji = await res.json();

    setKanjiData(data);
  }

  /**
   * Rescale the level field from the database response (1 to 12) to the official kanken scale (1 to 10).
   * @param level The database level field
   * @returns The kanken level
   */
  const getActualKankenLevel = (level: number): string | number => {
    if(level >= 5) return level - 2;
    else if(level === 4) return "準2";
    else if(level === 3) return 2;
    else if(level === 2) return "準1";
    else return 1;
  }

  /**
   * Gets the "Seen X times" text. Used for pluralization.
   * @param count The amount of times the kanji was seen
   * @returns The full text
   */
  const getSeenText = (count: number): string => {
    return `Seen ${count} ${count === 1 ? "Time" : "Times"}`
  }

  return (
    <Card sx={{ maxWidth: 350, m: 2 }}>
      <CardContent>
        <Typography variant="h2" color="text.primary">
          {kanjiData?.kanji}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          漢検{getActualKankenLevel(kanjiData?.level!)}級
        </Typography>
        <Typography variant="body2">
          {getSeenText(score.correctCount + score.incorrectCount)} {bull} {score.correctCount} Correct {bull} {score.incorrectCount} Incorrect
        </Typography>
      </CardContent>
      <LinearProgress variant="determinate" value={(score.correctCount / (score.correctCount + score.incorrectCount)) * 100} />
    </Card>
  );
}

export default ScoreCard;