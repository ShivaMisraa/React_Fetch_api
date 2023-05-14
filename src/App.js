import React, { useEffect, useState } from "react";
import Loader from "./components/Loader";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryInterval, setRetryInterval] = useState(null);

  useEffect(() => {
    if (retryInterval !== null) {
      setLoading(true);
      const timerId = setInterval(() => {
        fetchMoviesHandler();
      }, 5000);
      return () => clearInterval(timerId);
    }
  }, [retryInterval]);

  async function fetchMoviesHandler() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/film/");

      if (!response.ok) {
        throw new Error("Something went wrong! Retrying...");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseData: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
      setLoading(false);
      setRetryInterval(null);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      setRetryInterval(setTimeout(() => {
        setRetryInterval(true);
      }, 5000));
    }
  }

  let content = <p>Found No Movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = (
      <React.Fragment>
        <p>{error}</p>
        <button onClick={() => setRetryInterval(true)}>Retry</button>
        <button onClick={() => setRetryInterval(null)}>Cancel</button>
      </React.Fragment>
    );
  }

  if (isLoading) {
    content = <Loader />;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={() => setRetryInterval(true)}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
