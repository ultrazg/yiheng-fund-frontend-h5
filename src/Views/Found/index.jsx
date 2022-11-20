import React, {Component} from 'react';

import './index.css';
import NavBar from '../../Components/NavBar';

import {Button, Toast} from "antd-mobile";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      new_password: '',
      verifyCode: '',
      isDisabled: true,
      time: 60,
      btn_text: '发送短信验证码'
    }
  }

  showToast = (text,cb) => {
    Toast.info(text, 2,cb)
  }

  onChangeHandle = e => {
    this.setState({
      [e.target.name]: e.target.value
    })

    if (e.target.name == 'phone') {
      if (e.target.value.length == 11) {
        this.setState({
          isDisabled: false
        })
      } else {
        this.setState({
          isDisabled: true
        })
      }
    }

  }

  sendMsg = () => {
    const {phone} = this.state
    const _this = this

    fetch('http://admin.ipoinchina.com/api/member.login/goSms', {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      method: 'POST',
      body: new URLSearchParams([['phone', phone]]).toString()
    }).then(function (response) {
      return response.json();
    })
      .then(function (data) {
        if (data.code === 1) {
          _this.showToast(data.msg)
          _this.count()
        } else {
          _this.showToast(data.msg)
        }
      });
  }

  changePsw = () => {
    const {phone, password, new_password, verifyCode} = this.state
    const that = this

    if (phone == '' || password == '' || new_password == '' || verifyCode == '') {
      this.showToast('请填写完整！')

      return;
    }

    if (password != new_password) {
      this.showToast('两次输入密码不一致！');

      return;
    }

    fetch('http://admin.ipoinchina.com/api/member.login/found', {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      method: 'POST',
      body: new URLSearchParams([['phone', phone], ['new_password', new_password], ['password', password], ['verify', verifyCode]]).toString()
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.data) {

          that.showToast(data.code,()=>{window.location.href = '/#/login'})

        } else {
          that.showToast(data.code)
        }
      });
  }

  count = () => {
    let siv = setInterval(() => {
      this.setState({
        time: this.state.time - 1,
        btn_text: this.state.time + ` 秒后重新获取`,
        isDisabled: true
      }, () => {
        if (this.state.time == 1) {
          clearInterval(siv);
          this.setState({
            time: 60,
            btn_text: '发送短信验证码',
            isDisabled: false
          })
        }
      });
    }, 1000);
  }

  render() {
    return (
      <div>
        <NavBar/>
        <div className="found-layout">
          <p>找回毅恒账户</p>

          <div>
            <label>手机号</label>
            <input type="text" onChange={this.onChangeHandle} name='phone' value={this.state.phone}/>
            {/*<i className="fa fa-mobile" aria-hidden="true"></i>*/}
          </div>

          <div>
            <label>新密码</label>
            <input type="password" onChange={this.onChangeHandle} name='password' value={this.state.password}/>
            {/*<i className="fa fa-mobile" aria-hidden="true"></i>*/}
          </div>

          <div>
            <label>确认密码</label>
            <input type="password" onChange={this.onChangeHandle} name='new_password' value={this.state.new_password}/>
            {/*<i className="fa fa-mobile" aria-hidden="true"></i>*/}
          </div>

          <div>
            <label>验证码</label>
            <input type="text" onChange={this.onChangeHandle} name='verifyCode' value={this.state.verifyCode}/>
            {/*<i className="fa fa-mobile" aria-hidden="true"></i>*/}
          </div>

        </div>

        <Button
          disabled={this.state.isDisabled}
          onClick={this.sendMsg}
          className='found_btn'
        >{this.state.btn_text}</Button>

        <Button
          type='primary'
          className='found_btn'
          onClick={this.changePsw}
        >确认修改</Button>

      </div>
    );
  }
}

export default Index;