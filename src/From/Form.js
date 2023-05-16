import React, { useState } from "react";
import classes from "./Form.module.css";

const Form = () => {
  const [title, setTitle] = useState("");
  const [openingText, setOpeningText] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  const submitMovieHandler = (event) => {
    event.preventDefault();
    console.log({ title, openingText, releaseDate });
  };

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const openingTextChangeHandler = (event) => {
    setOpeningText(event.target.value);
  };

  const releaseDateChangeHandler = (event) => {
    setReleaseDate(event.target.value);
  };

  return (
    <div className={classes.form}>
      <form onSubmit={submitMovieHandler}>
        <label>Title</label><br/>
        <input type="text" value={title} onChange={titleChangeHandler} /><br/>
        <label>Opening Text</label><br/>
        <input
          type="text"
          value={openingText}
          onChange={openingTextChangeHandler}
        /><br/>
        <label>Release Date</label>
        <input
          type="Date"
          value={releaseDate}
          onChange={releaseDateChangeHandler}
        /><br/>
        <button id="btn">Add Movie</button>
      </form>
    </div>
  );
};

export default Form;
