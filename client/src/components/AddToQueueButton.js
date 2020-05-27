import React, { Component } from "react";

class AddToQueue extends Component {
  remove = () => {
    // client.send(
    //   JSON.stringify({
    //     type: "remove",
    //   })
    // );
    alert("added to next");
  };

  addToQueue = (trackURI) => {
    spotifyWebApi.addToQueue(trackURI).then(() => {
      console.log("success");
    });
  };

  render() {
    return (
      <button
        onClick={() => {
          this.remove();
          //   this.addToQueue(this.state.queue[0].uri);
        }}
      >
        Add To Queue
      </button>
    );
  }
}

export default AddToQueue;
