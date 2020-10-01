import React, { Component } from "react";

class DetailShot extends Component {
  constructor(props) {
    super(props);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.startResizeTopR = this.startResizeTopR.bind(this);
    this.startResizeTopL = this.startResizeTopL.bind(this);
    this.startResizeBottomR = this.startResizeBottomR.bind(this);
    this.startResizeBottomL = this.startResizeBottomL.bind(this);
  }

  render() {
    const { top, left, height, width } = this.props;

    return (
      <div
        className="detail-rec"
        style={{ height: height, width: width, top: top, left: left }}
        onMouseDown={this.handleMouseDown}
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

    this.props.handleInside(e.pageX, e.pageY);
  }

  startResizeTopL(e) {
    e.stopPropagation();

    this.props.handleEdge("leftTop");
  }

  startResizeTopR(e) {
    e.stopPropagation();

    this.props.handleEdge("rightTop");
  }

  startResizeBottomL(e) {
    e.stopPropagation();

    this.props.handleEdge("leftBottom");
  }

  startResizeBottomR(e) {
    e.stopPropagation();

    this.props.handleEdge("rightBottom");
  }
}

export default DetailShot;
