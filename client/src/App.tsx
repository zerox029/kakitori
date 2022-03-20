import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StudyPage from "./Components/StudyPage/StudyPage";
import StatsPage from "./Components/StatsPage/StatsPage"

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<StudyPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;