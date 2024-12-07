<<<<<<< Updated upstream
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
=======
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
>>>>>>> Stashed changes
  );
}

export default App;
