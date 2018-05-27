import React from "react";
import logo from './react-logo.svg';
import Canvas from "../Canvas/Canvas";

class Home extends React.Component {


  render() {
    return (
      <div className="container">
        <div className="header">
          <h1>Nikolas Mouzourides | Full stack developer</h1>
        </div>
        <div className="content" id="content">
          <Canvas/>
        </div>
        <div className="footer">
          Made with React
          <img src={logo} className="react-logo" alt="logo" />
        </div>
      </div>
    );
  }
}

export default Home;
