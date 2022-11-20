import React, {Component} from 'react';

import Footer from '../../Components/Footer';
import {Icon, NavBar,Toast} from "antd-mobile";
import './index.css';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phone: ''
    }
  }

  changeHandle = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  showToast = text => {
    Toast.info(text, 2);
  }

  goSubmit = () => {
    // TODO
    const {user, phone} = this.state

    if (!user || !phone) {
      console.log(false)
      this.showToast('请完善信息！')
    } else {
      console.log(true)
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
        >预约咨询</NavBar>

        <div className="reserve-layout">

          <p>预约服务</p>

          <p>我们将在 15 分钟内给您回电</p>

          <div className="inp-box">
            <i className="fa fa-user" aria-hidden="true"></i>
            <input type="text" name='name' value={this.state.name} onChange={this.changeHandle} placeholder='姓名'/>
          </div>

          <div className="inp-box">
            <i className="fa fa-phone" aria-hidden="true"></i>
            <input type="text" name='phone' value={this.state.phone} onChange={this.changeHandle} placeholder='联系方式'/>
          </div>

          <div className="sub-btn" onClick={this.goSubmit}>提交</div>

        </div>

        <Footer/>

      </div>
    );
  }
}

export default Index;