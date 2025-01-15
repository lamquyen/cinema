import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./SideBar";
import "./Admin.css";

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/movies/");
        setMovies(response.data);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch movies. Please try again.");
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/");
        setUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch movies. Please try again.");
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container">
      <Sidebar />
      <main className="main">
        <h1 className="title">Dashboard</h1>
        <div className="stats">
          <div className="stat">
            <i className="fas fa-film icon"></i>
            <div>
              <p>Total Movies</p>
              <p className="stat-number">{movies.length}</p>
            </div>
          </div>
          <div className="stat">
            <i className="fas fa-list-alt icon"></i>
            <div>
              <p>Total Categories</p>
              <p className="stat-number">Loading..</p>
            </div>
          </div>
          <div className="stat">
            <i className="fas fa-user icon"></i>
            <div>
              <p>Total Users</p>
              <p className="stat-number">{users.length}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
