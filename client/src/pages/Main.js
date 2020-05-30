import React from "react";
import { Link } from "react-router-dom";


const Main = () => {
  // create a room button
  // join a room text box

  return(
    <div>
      <h1>Main</h1>
      <Link to="/create-room">Create Room</Link>
      
      <form >
        <label>
          Join a room:
          <input
            type="text"
          />
        </label>
        <Link to='/player'>Join</Link>
      </form>
    </div>
  );
};

export default Main;
