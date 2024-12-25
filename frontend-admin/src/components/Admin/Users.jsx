import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./SideBar";
import "./Admin.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <h2 className="subtitle">All Users</h2>
        {isLoading ? (
          <p>Loading movies...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>FULL NAME</th>
                <th>EMAIL</th>
                <th>PHONE</th>
                <th>SEX</th>
                <th>DATE OF BIRTH</th>
                {/* <th>ACTIONS</th> */}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.sex}</td>
                  <td>
                    {new Date(user.dateOfBirth).toLocaleDateString("en-GB")}
                  </td>
                  {/* <td>
                    <button className="btn edit">
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button className="btn delete">
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default Users;
