import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserAccountManagement from "./components/UserAccountManagement";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import TicketBooking from "./components/TicketBooking";

const App = () => {
  // State management
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null); // Track the logged-in user

  // Navigation based on role
  const getMenuForRole = () => {
    if (!loggedInUser) {
      return (
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/user-management">Sign Up / Log In</Link></li>
        </ul>
      );
    }

    if (loggedInUser.role === "admin") {
      return (
        <ul>
          <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
        </ul>
      );
    }

    if (loggedInUser.role === "regular") {
      return (
        <ul>
          <li><Link to="/user-dashboard">User Dashboard</Link></li>
          <li><Link to="/ticket-booking">Ticket Booking</Link></li>
          <li><Link to="/user-management">Account Management</Link></li>
        </ul>
      );
    }
  };

  return (
    <Router>
      <div>
        <header>
          <h1>Cinema Booking System</h1>
          <nav>{getMenuForRole()}</nav>
        </header>

        <main>
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<HomePage />} />

            {/* User Account Management */}
            <Route
              path="/user-management"
              element={
                <UserAccountManagement
                  users={users}
                  setUsers={setUsers}
                  setLoggedInUser={setLoggedInUser}
                />
              }
            />

            {/* Admin Dashboard (only accessible to admin users) */}
            {loggedInUser?.role === "admin" && (
              <Route
                path="/admin-dashboard"
                element={
                  <AdminDashboard
                    users={users}
                    movies={movies}
                    setMovies={setMovies}
                    showtimes={showtimes}
                    setShowtimes={setShowtimes}
                    bookings={bookings}
                    setBookings={setBookings}
                  />
                }
              />
            )}

            {/* User Dashboard (only accessible to regular users) */}
            {loggedInUser?.role === "regular" && (
              <Route
                path="/user-dashboard"
                element={
                  <UserDashboard
                    users={users}
                    bookings={bookings}
                    movies={movies}
                    showtimes={showtimes}
                    setBookings={setBookings}
                  />
                }
              />
            )}

            {/* Ticket Booking (only accessible to regular users) */}
            {loggedInUser?.role === "regular" && (
              <Route
                path="/ticket-booking"
                element={
                  <TicketBooking
                    movies={movies}
                    showtimes={showtimes}
                    bookings={bookings}
                    setBookings={setBookings}
                  />
                }
              />
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

// Home Page Component
const HomePage = () => (
  <div>
    <h1>Welcome to the Cinema Booking System</h1>
    <p>Please navigate through the menu to access the features.</p>
  </div>
);

export default App;
