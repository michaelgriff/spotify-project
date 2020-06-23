import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

const Main = () => {
  // create a room button
  // join a room text box
  const [query, setQuery] = useState("");
  const [submit, setSubmit] = useState();

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    setSubmit(1);
    event.preventDefault();
  };

  return (
    <div>
      <h1>Main</h1>
      <Link to="/create-room">Create Room</Link>

      <form onSubmit={handleSubmit}>
        <label>
          Join a Room:
          <input type="text" value={query} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {submit ? <Redirect to="/player" /> : null}
    </div>
  );
};

export default Main;
