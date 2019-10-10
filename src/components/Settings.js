import React, { Component } from "react";

export default class Settings extends Component {
  state = {
    isToggleOn: true
  }

  handleClick() {
    var currentState = this.state.isToggleOn;
    this.setState({
    isToggleOn: !currentState
    });
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6 text-right m-auto">Rule Engine</div>
          <div className="col-lg-6 text-left m-auto">
            <button onClick={this.handleClick.bind(this)} className={this.state.isToggleOn ? "btn btn-success" : "btn btn-dark"}>
              {this.state.isToggleOn ? "ON" : "OFF"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
