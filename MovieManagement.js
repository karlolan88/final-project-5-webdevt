import React, { useState } from "react";

const MovieManagement = ({ movies, setMovies }) => {
  const [newMovie, setNewMovie] = useState({ title: "", genre: "", duration: "", language: "", rating: "", showtimes: [] });

  const handleAddMovie = () => {
    setMovies([...movies, { ...newMovie, id: Date.now() }]);
    setNewMovie({ title: "", genre: "", duration: "", language: "", rating: "", showtimes: [] });
  };

  const handleDeleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <div>
      <h2>Movie Management</h2>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newMovie.title}
          onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Genre"
          value={newMovie.genre}
          onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Duration"
          value={newMovie.duration}
          onChange={(e) => setNewMovie({ ...newMovie, duration: e.target.value })}
        />
        <input
          type="text"
          placeholder="Language"
          value={newMovie.language}
          onChange={(e) => setNewMovie({ ...newMovie, language: e.target.value })}
        />
        <input
          type="text"
          placeholder="Rating"
          value={newMovie.rating}
          onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })}
        />
        <button onClick={handleAddMovie}>Add Movie</button>
      </div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} - {movie.genre}
            <button onClick={() => handleDeleteMovie(movie.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieManagement;
