require("dotenv").config({ path: "./config.env" });

const fs = require("fs");
const data = JSON.parse(fs.readFileSync('../data/dict.json'));
const dbo = require("../db/conn");

const pushKanjiData = () => {
  const dbConnect = dbo.getDb();
  const kanjiData = data["kanji"];

  const formatedData = [];
  for(const [key, value] of Object.entries(kanjiData)) {
    for(let i = 0; i < value.length; i++) {
      const kanjiLevelObject = { kanji: value[i], level: key };
      formatedData.push(kanjiLevelObject);
    }
  }

  dbConnect.collection("kanji").insertMany(formatedData, (err, res) => {
    if(err) throw err;

    console.log(`Inserted ${res.insertedCount} documents`);
  })
}

const pushVocabData = () => {
  const dbConnect = dbo.getDb();
  const vocabData = data["vocab"];

  const formatedData = [];
  for(const [key, value] of Object.entries(vocabData)) {
    for(let i = 0; i < value.length; i++) {
      const vocabObject = { word: value[i][0], reading: value[i][1], translation: value[i][2], level: key }
      formatedData.push(vocabObject)
    }
  }

  dbConnect.collection("vocab").insertMany(formatedData, (err, res) => {
    if(err) throw err;

    console.log(`Inserted ${res.insertedCount} documents`);
  })
}

dbo.connectToServer((err) => {
  if (err) {
    console.error(err);
    process.exit();
  }

  pushKanjiData();
  pushVocabData();
});