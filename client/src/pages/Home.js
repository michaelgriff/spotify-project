import React from "react";

import SkipToNext from "../components/SkipButton";
import LoginButton from "../components/LoginButton";
import AddToQueueButton from '../components/AddToQueueButton';

const Home = () => {
  return(
    <div>
      <SkipToNext />
      <LoginButton />
      <AddToQueueButton />
    </div>
  );
}

export default Home;
