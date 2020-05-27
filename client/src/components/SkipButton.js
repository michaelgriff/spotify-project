import React, { Component } from "react";

class SkipToNext extends Component {
  skipToNext() {
    // spotifyWebApi.skipToNext().then(() => {
    //   console.log("skipped");
    // });
    alert("skipped!");
  }

  render() {
    return <button onClick={this.skipToNext}>Skip To Next</button>;
  }
}

export default SkipToNext;
