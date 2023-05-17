import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  const deleteMovieHandler = async () => {
    try {
      const response = await fetch(
        `https://react-https-dd3c8-default-rtdb.firebaseio.com/movies/${props.id}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete movie.");
      }

      props.onDeleteMovie(props.id); // Update UI by removing the movie from the state
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button style={{ backgroundColor: "aqua" }} onClick={deleteMovieHandler}>
        Delete
      </button>
    </li>
  );
};

export default Movie;
