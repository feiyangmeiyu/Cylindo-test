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
      // height: 0,
      // width: 0,
      insideShot: false,
      resizeDirect: "none",
      dragStartX: 0,
      dragStartY: 0,
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleInside = this.handleInside.bind(this);
    this.handleEdge = this.handleEdge.bind(this);
    this.cancelDefault = this.cancelDefault.bind(this);
  }

  // y1-y2
  // x1-x2
  render() {
    return (
      <div className="furniture">
        <div
          className="overlay"
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.cancelDefault}
        >
          <DetailShot
            top={this.state.startY}
            left={this.state.startX}
            height={this.state.endY - this.state.startY}
            width={this.state.endX - this.state.startX}
            handleInside={this.handleInside}
            handleEdge={this.handleEdge}
          />
          {/* <div
            style={{ backgroundColor: "red", width: "10px", height: "10px" }}
          ></div> */}
        </div>
      </div>
    );
  }

  handleMouseDown(e) {
    e.persist();
    const { startX, startY, endX, endY } = this.state;

    if (
      //If the place chosen is not in the detail shot area, then set the start coord again
      (e.clientX < startX || e.clientX > endX) &&
      (e.clientY < startY || e.clientX > endY)
    ) {
      this.setState({
        startX: e.clientX,
        startY: e.clientY,
        endX: e.clientX,
        endY: e.clientY,
      });
    }
  }

  handleMouseUp(e) {
    e.persist();
    e.preventDefault();

    if (this.state.insideShot) {
      // if the mouse is released when doing dragging
      const dragX = e.clientX - this.state.dragStartX;
      const dragY = e.clientY - this.state.dragStartY;
      this.handleDrag(dragX, dragY);
    } else if (this.state.resizeDirect !== "none") {
      // if the mouse is released when doing resizing

      this.handleResize(e.clientX, e.clientY);
      this.setState({ resizeDirect: "none" });
    } else {
      // if the mouse is released when at fisrt choosing the short area

      const width = e.clientX - this.state.startX;
      const height = e.clientY - this.state.startY;

      if (width > 0 && height > 0) {
        this.setState({ endX: e.clientX, endY: e.clientY });
      }
    }
  }

  handleDrag(dragX, dragY) {
    this.setState({
      startX: this.state.startX + dragX,
      endX: this.state.endX + dragX,
      startY: this.state.startY + dragY,
      endY: this.state.endY + dragY,

      // Go back to initialization
      insideShot: false,
      dragStartX: 0,
      dragStartY: 0,
    });
  }

  handleInside(dragStartX, dragStartY) {
    this.setState({
      dragStartX: dragStartX,
      dragStartY: dragStartY,
      insideShot: true,
    });
  }

  handleEdge(direct) {
    this.setState({ resizeDirect: direct });
  }

  handleResize(X, Y) {
    switch (this.state.resizeDirect) {
      case "rightTop":
        this.setState({ endX: X, startY: Y });
        break;
      case "rightBottom":
        this.setState({ endX: X, endY: Y });
        break;
      case "leftTop":
        this.setState({ startX: X, startY: Y });
        break;
      case "leftBottom":
        this.setState({ startX: X, endY: Y });
        break;
      default:
        break;
    }
  }

  // Cancel the extra movement when mouse move, ensure mouseup could work
  cancelDefault(e) {
    e = e || window.event;

    // IE9 do not support
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    if (e.preventDefault) {
      e.preventDefault();
    }
    // Google support, firefox do not support
    e.cancelBubble = true;
    e.returnValue = false;
  }
}

export default App;
