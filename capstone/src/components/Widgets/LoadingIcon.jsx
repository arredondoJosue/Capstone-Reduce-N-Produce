import React from "react";
import "../../styles/LoadingIcon.scss";

export default function LoadingIcon() {
  return (
    <div className="App-header" id="loading-container">
      <App />
    </div>
  );
}

class Spinner extends React.Component {
  render() {
    return (
      <div className="Spinner SpinnerDots">
        <div className="spinner-dot" />
        <div className="spinner-dot" />
        <div className="spinner-dot" />
      </div>
    );
  }
}

class SpinnerDotsScale extends React.Component {
  render() {
    return (
      <div className="Spinner SpinnerDotsScale">
        <div className="spinner-dot" />
        <div className="spinner-dot" />
        <div className="spinner-dot" />
      </div>
    );
  }
}

class SpinnerCircle extends React.Component {
  render() {
    return (
      <div className="Spinner SpinnerCircle">
        <div className="spinner-dot" />
        <div className="spinner-dot" />
        <div className="spinner-dot" />
      </div>
    );
  }
}

/// DEMONSTRATIONAL CONTENT
const spinners = [Spinner, SpinnerCircle, SpinnerDotsScale];

class App extends React.Component {
  state = {
    inverted: true,
    spinner: 2,
  };

  invert() {
    this.setState({ inverted: !this.state.inverted });
  }

  next() {
    let spinner = this.state.spinner;
    spinner++;
    if (spinner >= spinners.length) {
      spinner = 0;
    }
    this.setState({ spinner });
  }

  render() {
    const { spinner, inverted } = this.state;
    const SpinnerSelected = spinners[spinner];
    return (
      <div className={`App ${inverted && "inverted"}`}>
        {/* <button onClick={this.invert.bind(this)}> INVERT </button> */}
        <div onClick={this.next.bind(this)}>
          <SpinnerSelected />
        </div>
      </div>
    );
  }
}

// ReactDOM.render(<App />, document.getElementById("root"));
