import React, { Component } from "react";

class DetailShot extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { top, left, height, width } = this.props;
    console.log(height, width);
    return (
      <div
        className="detail-rec"
        style={{ height: height, width: width, top: top, left: left }}
      ></div>
    );
  }
}

export default DetailShot;
