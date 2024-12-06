import "./App.css";
import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import HomeMovie from "./components/HomeMovie/HomeMovie.jsx";

function App() {
  return (
    <div className="App">
      <Header />
      <HomeMovie />
      <Footer/>
    </div>
  );
}

export default App;
