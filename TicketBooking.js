import React, { useState } from "react";

const TicketBooking = ({
  movies = [], // Default to empty array
  showtimes = [],
  bookings = [],
  setBookings,
}) => {
  const [newBooking, setNewBooking] = useState({ showtimeId: "", seats: [] });

  const handleBookSeats = () => {
    if (!newBooking.showtimeId || newBooking.seats.length === 0) {
      alert("Please select a showtime and enter at least one seat.");
      return;
    }
    setBookings([...bookings, { ...newBooking, id: Date.now() }]);
    setNewBooking({ showtimeId: "", seats: [] });
  };

  return (
    <div>
      <h2>Ticket Booking</h2>
      <div>
        {/* Showtime Selection */}
        <select
          value={newBooking.showtimeId}
          onChange={(e) =>
            setNewBooking({ ...newBooking, showtimeId: e.target.value })
          }
        >
          <option value="">Select Showtime</option>
          {showtimes.map((showtime) => {
            const movie = movies.find((movie) => movie.id === showtime.movieId);
            return (
              <option key={showtime.id} value={showtime.id}>
                {movie ? movie.title : "Unknown Movie"} - {showtime.date} {showtime.time}
              </option>
            );
          })}
        </select>

        {/* Seats Input */}
        <input
          type="text"
          placeholder="Seats (comma-separated)"
          value={newBooking.seats.join(",")}
          onChange={(e) =>
            setNewBooking({ ...newBooking, seats: e.target.value.split(",").map((seat) => seat.trim()) })
          }
        />
        <button onClick={handleBookSeats}>Book Tickets</button>
      </div>

      {/* Display Bookings */}
      <ul>
        {bookings.map((booking) => {
          const movie = movies.find(
            (movie) =>
              movie.id ===
              showtimes.find((showtime) => showtime.id === booking.showtimeId)?.movieId
          );
          return (
            <li key={booking.id}>
              Booking ID: {booking.id} - Showtime:{" "}
              {movie ? movie.title : "Unknown Movie"} - Seats:{" "}
              {booking.seats.join(", ")}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TicketBooking;
