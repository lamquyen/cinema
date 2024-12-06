import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomeMovie from "./components/HomeMovie/HomeMovie";

function App() {
  return (
    <>
      <Route>
        <Router>
        <Route path="/" element={<HomeMovie />} />
        </Router>
      </Route>
    </>
  );
}

export default App;
