import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomeMovie from "./components/HomeMovie/HomeMovie";
import DetailMovie from "./components/DetailMovie/DetailMovie";
import Profile from "./components/ProfileUser/ProfileUser";
import Cinema from "./components/Cinema/Cinema";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeMovie />} />
          <Route path="/DetailMovie/:id" element={<DetailMovie />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Rap-phim" element={<Cinema />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;