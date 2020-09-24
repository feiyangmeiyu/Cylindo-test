import React, { Component } from "react";

class DetailShot extends Component {
  constructor(props) {
    super(props);
    this.state = { startX: 0, startY: 0, endX: 0, endY: 0 };
    this.getStartCoor = this.getStartCoor.bind(this);
    this.getEndCoor = this.getEndCoor.bind(this);
  }
  componentDidUpdate() {}

  render() {
    const { top, left, height, width } = this.props;
    console.log(height, width);
    return (
      <div
        className="detail-rec"
        style={{ height: height, width: width, top: top, left: left }}
        onMouseDown={this.getStartCoor}
        onMouseUp={this.getEndCoor}
      ></div>
    );
  }

  getStartCoor(e) {
    e.stopPropagation();
    this.setState({ startX: e.clientX, startY: e.clientY });
    this.props.handleInside(e.clientX, e.clientY);
  }

  getEndCoor(e) {
    this.props.handleInside();
  }
}

export default DetailShot;
