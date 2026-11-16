import React, { useState } from "react";
import "./App.css";

const initialMovies = [
  { id: 1, title: "Dune", rating: 5, review: "Big, bold, and unforgettable." },
  { id: 2, title: "Spider-Man: Into the Spider-Verse", rating: 4, review: "Creative animation and great energy." },
];

export default function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [formData, setFormData] = useState({
    title: "",
    rating: 5,
    review: "",
  });

  const averageRating =
    movies.length > 0
      ? (movies.reduce((sum, movie) => sum + Number(movie.rating), 0) / movies.length).toFixed(1)
      : "0.0";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const addMovie = (event) => {
    event.preventDefault();

    const title = formData.title.trim();
    if (!title) return;

    const newMovie = {
      id: Date.now(),
      title,
      rating: Number(formData.rating),
      review: formData.review.trim(),
    };

    setMovies((currentMovies) => [newMovie, ...currentMovies]);
    setFormData({ title: "", rating: 5, review: "" });
  };

  const removeMovie = (id) => {
    setMovies((currentMovies) => currentMovies.filter((movie) => movie.id !== id));
  };

  return (
    <main className="app">
      <div className="container">
        <h1>Movie Watchlist</h1>
        <p className="subtitle">Keep track of the movies you watched and how much you liked them.</p>

        <div className="stats-bar">
          <div className="stat-box">
            <span className="stat-label">Movies</span>
            <strong>{movies.length}</strong>
          </div>
          <div className="stat-box">
            <span className="stat-label">Average rating</span>
            <strong>{averageRating} / 5</strong>
          </div>
        </div>

        <form className="movie-form" onSubmit={addMovie}>
          <h2>Add a movie</h2>

          <label>
            Movie title
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter movie name"
            />
          </label>

          <label>
            Rating
            <select name="rating" value={formData.rating} onChange={handleChange}>
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>
                  {value} star{value > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </label>

          <label>
            Review
            <textarea
              name="review"
              value={formData.review}
              onChange={handleChange}
              placeholder="What did you think?"
            />
          </label>

          <button type="submit" className="add-button">
            Add movie
          </button>
        </form>

        <section className="movie-list-section">
          <div className="list-header">
            <h2>My movies</h2>
          </div>

          {movies.length === 0 ? (
            <p className="empty-state">No movies yet. Add the first one above.</p>
          ) : (
            <ul className="movie-list">
              {movies.map((movie) => (
                <li key={movie.id} className="movie-card">
                  <div className="movie-top">
                    <h3>{movie.title}</h3>
                    <button type="button" className="remove-button" onClick={() => removeMovie(movie.id)}>
                      Remove
                    </button>
                  </div>

                  <div className="stars" aria-label={`${movie.rating} out of 5 stars`}>
                    {"★".repeat(movie.rating)}
                    {"☆".repeat(5 - movie.rating)}
                  </div>

                  {movie.review ? <p className="review">“{movie.review}”</p> : <p className="review empty-review">No review added.</p>}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
