import React, { useState } from "react";

const ShowtimeManagement = ({ movies, showtimes, setShowtimes }) => {
  const [newShowtime, setNewShowtime] = useState({ movieId: "", date: "", time: "", availableSeats: "" });

  const handleAddShowtime = () => {
    setShowtimes([...showtimes, { ...newShowtime, id: Date.now() }]);
    setNewShowtime({ movieId: "", date: "", time: "", availableSeats: "" });
  };

  const handleDeleteShowtime = (id) => {
    setShowtimes(showtimes.filter((showtime) => showtime.id !== id));
  };

  return (
    <div>
      <h2>Showtime Management</h2>
      <div>
        <select
          value={newShowtime.movieId}
          onChange={(e) => setNewShowtime({ ...newShowtime, movieId: e.target.value })}
        >
          <option value="">Select Movie</option>
          {movies.map((movie) => (
            <option key={movie.id} value={movie.id}>
              {movie.title}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={newShowtime.date}
          onChange={(e) => setNewShowtime({ ...newShowtime, date: e.target.value })}
        />
        <input
          type="time"
          value={newShowtime.time}
          onChange={(e) => setNewShowtime({ ...newShowtime, time: e.target.value })}
        />
        <input
          type="number"
          placeholder="Available Seats"
          value={newShowtime.availableSeats}
          onChange={(e) => setNewShowtime({ ...newShowtime, availableSeats: e.target.value })}
        />
        <button onClick={handleAddShowtime}>Add Showtime</button>
      </div>
      <ul>
        {showtimes.map((showtime) => (
          <li key={showtime.id}>
            {movies.find((movie) => movie.id === showtime.movieId)?.title || "Unknown Movie"} - {showtime.date} {showtime.time}
            <button onClick={() => handleDeleteShowtime(showtime.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowtimeManagement;
