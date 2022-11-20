import React, {Component} from 'react';
import {Icon, NavBar} from "antd-mobile";
import Footer from '../../Components/Footer';
import './index.css';

class Index extends Component {
  render() {
    return (
      <div>

        <NavBar
          mode="light"
          style={{background: '#094182', color: 'white'}}
          icon={<Icon type="left"/>}
          onLeftClick={() => this.props.history.go(-1)}
        >LiveRoom</NavBar>

        <div className="liveroom-layout">
          LiveRoom Page
        </div>

        <Footer/>

      </div>
    );
  }
}

export default Index;