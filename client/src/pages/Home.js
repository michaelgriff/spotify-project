import React, { Component } from "react";

import SkipToNext from "../components/SkipButton";

class Home extends Component {
  const MyContext = React.createContext();

  render() {
    return <SkipToNext />;
  }
}

export default Home;
