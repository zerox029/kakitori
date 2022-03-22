import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import StudyPage from "./Components/StudyPage/StudyPage";
import StatsPage from "./Components/StatsPage/StatsPage"

import './App.css';
import NavBar from "./Components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/study" element={<StudyPage />} />
          <Route path="/statistics" element={<StatsPage />} />
          <Route path="*" element={<Navigate to="/study" />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;