import React, {Component} from 'react';
import {ActivityIndicator, Button, Toast} from 'antd-mobile';

import './index.css';

import NavBar from '../../Components/NavBar';

import PLHD from '../../Images/plhd.png';

import Footer from '../../Components/Footer';

// import {Link} from 'react-router-dom';

import Cookies from 'js-cookie';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      phone: '',
      password: '',
      captcha_text: '',
      captcha_url: 'http://admin.ipoinchina.com/api/member.login/captcha',
      uniqid: '',
      captcha_img: PLHD,
      animating: false
    }
  }

  onChangeHandle = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  changeCap = () => {
    fetch(this.state.captcha_url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const image = data.data.image;
        const uniqid = data.data.uniqid;

        this.setState({
          captcha_img: image,
          uniqid
        })
      });
  }

  go = () => {
    const phone = this.state.phone;
    const password = this.state.password;
    const captcha_text = this.state.captcha_text;
    const uniqid = this.state.uniqid;

    const _this = this

    if (phone == '' || password == '' || captcha_text == '') {
      this.showToast('请填写完整')

      return;
    } else {

      this.setState({
        animating: true
      })

      fetch('http://admin.ipoinchina.com/api/member.login/in', {
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        }),
        method: 'POST',
        body: new URLSearchParams([['phone', phone], ['password', password], ['uniqid', uniqid], ['verify', captcha_text]]).toString()
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {

          if (data.data) {
            const {id, phone, username, tokenv} = data.data;

            Cookies.set('yiheng', {
              id,
              phone,
              username,
              't': tokenv
            }, {expires: 0.55});

            window.location.href = '/';

          } else {

            _this.showToast(data.code);
            _this.changeCap();
            _this.setState({
              animating: false
            })

            // window.location.reload();
          }
        });
    }
  }

  showToast = text => {
    Toast.info(text, 2);
  }

  componentDidMount() {
    fetch(this.state.captcha_url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const image = data.data.image;
        const uniqid = data.data.uniqid;

        this.setState({
          captcha_img: image,
          uniqid
        })
      });
  }

  render() {
    return (
      <div>
        <NavBar/>
        <div className="login-layout">
          <p>登录毅恒账户</p>

          <div>
            <label>手机号</label>
            <input type="text" onChange={this.onChangeHandle} name='phone' value={this.state.phone}/>
            {/*<i className="fa fa-mobile" aria-hidden="true"></i>*/}
          </div>

          <div>
            <label>密码</label>
            <input type="password" onChange={this.onChangeHandle} name='password' value={this.state.password}/>
            {/*<i className="fa fa-key" aria-hidden="true"></i>*/}
          </div>

          <div>
            <label>验证码</label>
            <input type="text" onChange={this.onChangeHandle} name='captcha_text' value={this.state.captcha_text}/>
            {/*<i className="fa fa-check" aria-hidden="true"></i>*/}
          </div>

          <img src={this.state.captcha_img} alt="" onClick={this.changeCap}/>

          <span onClick={this.changeCap}>看不清，换一张</span>

          <Button type="primary" onClick={() => this.go()}>登录</Button>

          <div className='u'>
            <p onClick={() => window.location.href = '/#/register'}>立即注册</p>&nbsp;&nbsp;&nbsp;<p
            onClick={() => window.location.href = '/#/found'}>找回密码</p>
          </div>

        </div>
        <ActivityIndicator
          toast
          text="正在登录"
          animating={this.state.animating}
        />
        <Footer/>
      </div>
    );
  }
}

export default Index;