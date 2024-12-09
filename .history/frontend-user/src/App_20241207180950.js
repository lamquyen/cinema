import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomeMovie from "./components/HomeMovie/HomeMovie";
import DetailMovie from "./components/DetailMovie/DetailMovie";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeMovie />} />
          <Route path="/DetailMovie" element={<DetailMovie />} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
