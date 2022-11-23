import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log("error has occured", error, info);
  }

  componentWillUnmount = () => { };

  render() {
    // console.log("ERror boundary was called");
    if (this.state.hasError) {
      return (
        <div className="">
          <h2>Oops! Something went wrong.</h2>
        </div>
      );
    }
    return this.props.children;
  }
}
