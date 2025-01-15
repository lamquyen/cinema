import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Login from "./components/Login/Login.jsx";
import Dashboard from "./components/Admin/Dashboard.jsx";
import Users from "./components/Admin/Users.jsx";
import ProtectedRoute from "./components/Admin/ProtectedRoute";
import MovieList from "./components/Admin/MovieList.jsx";
import Cinema from "./components/Admin/Cinema.jsx";
import Screening from "./components/Admin/Screening .jsx";
import RevenueAndRoom from "./components/Admin/RevenueAndRoom.jsx";

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
            path="/Screening"
            element={
              <ProtectedRoute>
                <Screening />
              </ProtectedRoute>
            }
          />
          <Route
            path="/RevenueAndRoom"
            element={
              <ProtectedRoute>
                <RevenueAndRoom />
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
