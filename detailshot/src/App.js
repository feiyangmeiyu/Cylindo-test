import React, { Component } from "react";
import "./App.css";

import DetailShot from "./components/DetailShot";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      height: 0,
      width: 0,
      insideShot: false,
      dragStartX: 0,
      dragStartY: 0,
    };

    this.getStartCoor = this.getStartCoor.bind(this);
    this.getEndCoor = this.getEndCoor.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleInside = this.handleInside.bind(this);
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
            height={this.state.endY - this.state.startY}
            width={this.state.endX - this.state.startX}
            handleInside={this.handleInside}
          />
        </div>
      </div>
    );
  }

  getStartCoor(e) {
    e.persist();
    const { startX, startY, endX, endY } = this.state;

    //If the place chosen is not in the detail shot area, then set the start coord again
    if (
      (e.clientX < startX || e.clientX > endX) &&
      (e.clientY < startY || e.clientX > endY)
    ) {
      this.setState({ startX: e.clientX, startY: e.clientY });
    }
  }

  getEndCoor(e) {
    e.persist();
    console.log("father", e.clientX, e.clientY);
    if (!this.state.insideShot) {
      const width = e.clientX - this.state.startX;
      const height = e.clientY - this.state.startY;

      if (width > 0 && height > 0) {
        this.setState({ endX: e.clientX, endY: e.clientY });
      }
    } else {
      const dragX = e.clientX - this.state.dragStartX;
      const dragY = e.clientY - this.state.dragStartY;
      this.handleDrag(dragX, dragY);
    }
  }

  handleDrag(dragX, dragY) {
    this.setState({
      startX: this.state.startX + dragX,
      endX: this.state.endX + dragX,
      startY: this.state.startY + dragY,
      endY: this.state.endY + dragY,
      insideShot: false,
    });
  }

  handleInside(dragStartX, dragStartY) {
    this.setState({
      dragStartX: dragStartX,
      dragStartY: dragStartY,
      insideShot: true,
    });
  }
}

export default App;
