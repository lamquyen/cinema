import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomeMovie from "./components/HomeMovie/HomeMovie";

function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<HomeMovie />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
