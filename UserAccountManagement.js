import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserAccountManagement = ({ users, setUsers, setLoggedInUser }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "", role: "regular" });
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
  };

  return (
    <div>
      <h2>User Account Management</h2>

      {/* Login Section */}
      <h3>Log In</h3>
      <input
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button onClick={handleLogin}>Log In</button>

      {/* Signup Section */}
      <h3>Sign Up</h3>
      <input
        placeholder="Username"
        value={newUser.username}
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
      />
      <input
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <select
        value={newUser.role}
        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
      >
        <option value="regular">Regular User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default UserAccountManagement;
