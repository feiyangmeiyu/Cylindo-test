import React, { Component } from "react";

class DetailShot extends Component {
  constructor(props) {
    super(props);
    // this.state = { direction:[0,0,0,0] };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.startResizeTopR = this.startResizeTopR.bind(this);
    this.startResizeTopL = this.startResizeTopL.bind(this);
    this.startResizeBottomR = this.startResizeBottomR.bind(this);
    this.startResizeBottomL = this.startResizeBottomL.bind(this);
  }
  componentDidUpdate() {}

  render() {
    const { top, left, height, width } = this.props;
    // console.log(height, width);
    return (
      <div
        className="detail-rec"
        style={{ height: height, width: width, top: top, left: left }}
        onMouseDown={this.handleMouseDown}
        // onMouseUp={this.getEndCoor}
      >
        <span onMouseDown={this.startResizeTopL}></span>
        <span onMouseDown={this.startResizeTopR}></span>
        <span onMouseDown={this.startResizeBottomR}></span>
        <span onMouseDown={this.startResizeBottomL}></span>
      </div>
    );
  }

  handleMouseDown(e) {
    e.stopPropagation();
    console.log("inside shot");
    // this.setState({ startX: e.clientX, startY: e.clientY });
    this.props.handleInside(e.clientX, e.clientY);
  }

  startResizeTopL(e) {
    e.stopPropagation();
    console.log("TopLeft");
    this.props.handleEdge("leftTop");
  }

  startResizeTopR(e) {
    e.stopPropagation();
    console.log("TopRight");
    this.props.handleEdge("rightTop");
  }

  startResizeBottomL(e) {
    e.stopPropagation();
    console.log("BottomLeft");
    this.props.handleEdge("leftBottom");
  }

  startResizeBottomR(e) {
    e.stopPropagation();
    console.log("BottomRight");
    this.props.handleEdge("rightBottom");
  }
}

export default DetailShot;
