import React, { Component } from "react";

class CardContainer extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div id="Dashboard" className="dashboard-page main-content">
          <div className="card-container grid">{this.props.children}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default CardContainer;
