import React, {Component} from 'react';
import './index.css';
import Footer from '../../Components/Footer';
import {ActivityIndicator, Icon, NavBar} from "antd-mobile";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animating: false
    }
  }

  render() {
    return (
      <div>

        <NavBar
          mode="light"
          style={{background: '#094182', color: 'white'}}
          icon={<Icon type="left"/>}
          onLeftClick={() => this.props.history.go(-1)}
        >详情</NavBar>

        <div className="newsdetails-layout">
          NewsDetail Page
        </div>

        <Footer/>

        <ActivityIndicator
          toast
          text="正在加载"
          animating={this.state.animating}
        />
      </div>
    );
  }
}

export default Index;