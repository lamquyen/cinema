import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Login from "./components/Login/Login.jsx";
import Dashboard from "./components/Admin/Dashboard.jsx";
import Users from "./components/Admin/Users.jsx";
import ProtectedRoute from "./components/Admin/ProtectedRoute";
import MovieList from "./components/Admin/MovieList.jsx";
import Cinema from "./components/Admin/Cinema.jsx";
import Booking from "./components/Admin/Booking.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Movie-List"
            element={
              <ProtectedRoute>
                <MovieList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Cinema"
            element={
              <ProtectedRoute>
                <Cinema />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Booking"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
