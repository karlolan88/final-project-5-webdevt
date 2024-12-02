import React from "react";
import MovieManagement from "./MovieManagement";
import ShowtimeManagement from "./ShowtimeManagement";
import TicketBooking from "./TicketBooking";

const AdminDashboard = ({ users, movies, setMovies, showtimes, setShowtimes, bookings, setBookings }) => {
        const adminUsers = users.filter((user) => user.role === "admin");
      
        return (
          <div>
            <h2>Admin Dashboard</h2>
            {adminUsers.length > 0 ? (
              <div>
                <h3>Admin Tools</h3>
                {/* Admin features: Movie Management */}
                <MovieManagement movies={movies} setMovies={setMovies} />
                {/* Admin features: Showtime Management */}
                <ShowtimeManagement movies={movies} showtimes={showtimes} setShowtimes={setShowtimes} />
                {/* Admin features: Booking Management */}
                <TicketBooking bookings={bookings} setBookings={setBookings} />
                {/* Additional admin-specific functionalities can be added here */}
              </div>
            ) : (
              <p>No admins are currently registered. Add an admin user to enable this section.</p>
            )}
          </div>
        );
      };
      

export default AdminDashboard;
