import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomeMovie from "./components/HomeMovie/HomeMovie";
import DetailMovie from "./components/DetailMovie/DetailMovie";
import Profile from "./components/ProfileUser/ProfileUser";
import Cinema from "./components/Cinema/Cinema";
import Booking from "./components/DetailMovie/Booking.jsx";



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeMovie />} />
          <Route path="/DetailMovie/:id" element={<DetailMovie />} />

          <Route path="/Profile" element={<Profile />} />
          <Route path="/rap-phim/:location" element={<Cinema />} />
          <Route path="/Booking/:id-and-:times" element={<Booking />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;