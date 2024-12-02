import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'; // Importing the global styles

const UserAccountManagement = ({ users, setUsers, setLoggedInUser }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "", role: "regular" });
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and signup
  const navigate = useNavigate();

  // Handle login
  const handleLogin = () => {
    const user = users.find(
      (user) =>
        user.username === credentials.username && user.password === credentials.password
    );

    if (user) {
      setLoggedInUser(user);
      // Redirect based on role
      navigate(user.role === "admin" ? "/admin-dashboard" : "/user-dashboard");
    } else {
      alert("Invalid username or password.");
    }
  };

  // Handle signup
  const handleSignUp = () => {
    if (!newUser.email.includes("@")) {
      alert("Invalid email format.");
      return;
    }

    setUsers([...users, { ...newUser, id: Date.now() }]);
    setNewUser({ username: "", email: "", password: "", role: "regular" });
    alert("User registered successfully!");
    setIsSignUp(false); // Go back to login after successful signup
  };

  return (
    <div className="account-management-container">
      <h2>User Account Management</h2>
      {isSignUp ? (
        <>
          <h3 className="form-header">Sign Up</h3>
          <input
            className="input-field"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <select
            className="input-field"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="regular">Regular User</option>
            <option value="admin">Admin</option>
          </select>
          <button className="action-button" onClick={handleSignUp}>Sign Up</button>
          <p className="switch-text">
            Already have an account?{" "}
            <span className="link" onClick={() => setIsSignUp(false)}>
              Log In
            </span>
          </p>
        </>
      ) : (
        <>
          <h3 className="form-header">Log In</h3>
          <input
            className="input-field"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
          <button className="action-button" onClick={handleLogin}>Log In</button>
          <p className="switch-text">
            No account yet?{" "}
            <span className="link" onClick={() => setIsSignUp(true)}>
              Sign Up
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default UserAccountManagement;
