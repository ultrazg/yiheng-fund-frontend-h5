import React, {Component} from 'react';
import {NavBar} from "antd-mobile";

const publicPath = process.env.PUBLIC_URL;

class Index extends Component {
  render() {
    return (
      <div>
        <NavBar
          mode="dark"
          style={{background: '#094182'}}
          onLeftClick={() => window.location.href = '/'}
          leftContent={
            <img src={`${publicPath}/Images/logo.png`} alt=""/>
          }
        ></NavBar>
      </div>
    );
  }
}

export default Index;