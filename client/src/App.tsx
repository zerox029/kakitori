import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StudyPage from "./Components/StudyPage/StudyPage";

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<StudyPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;