import React, { Component } from "react";
import "./App.css";

import DetailShot from "./components/DetailShot";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { startX: 0, startY: 0, detailHeight: 0, detailWidth: 0 };

    this.getStartCoor = this.getStartCoor.bind(this);
    this.getEndCoor = this.getEndCoor.bind(this);
  }

  // y1-y2
  // x1-x2
  render() {
    return (
      <div className="furniture">
        <div
          className="overlay"
          onMouseDown={this.getStartCoor}
          onMouseUp={this.getEndCoor}
        >
          <DetailShot
            top={this.state.startY}
            left={this.state.startX}
            height={this.state.detailHeight}
            width={this.state.detailWidth}
          />
        </div>
      </div>
    );
  }

  getStartCoor(e) {
    e.persist();

    this.setState({ startX: e.clientX, startY: e.clientY });
  }

  getEndCoor(e) {
    e.persist();

    const width = e.clientX - this.state.startX;
    const height = e.clientY - this.state.startY;

    if (width > 0 && height > 0) {
      this.setState({ detailWidth: width, detailHeight: height });
    }
  }
}

export default App;
