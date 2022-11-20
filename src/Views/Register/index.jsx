import React, {Component} from 'react';

import NavBar from '../../Components/NavBar';
import Footer from '../../Components/Footer';

import {Toast, Button, Modal} from 'antd-mobile';

import Cookies from 'js-cookie';

import {Link} from 'react-router-dom';

import './index.css';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      phone: '',
      verifyCode: '',
      password: '',
      isDisabled: false,
      isChecked: false,
      modal1: false,
      btn_text: '获取验证码',
      reg_btn_text: '注册',
      time: 60
    }
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

  getVerCode = () => {
    const phone = this.state.phone;
    const _this = this;

    fetch('http://admin.ipoinchina.com/api/member.login/goSms', {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      method: 'POST',
      body: new URLSearchParams([['phone', phone]]).toString()
    })
      .then(function (response) {
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

  submit = () => {
    const {username, phone, password, verifyCode} = this.state
    const _this = this;

    if (!this.state.isChecked) {
      this.showToast('请仔细阅读并勾选《毅恒基金服务协议》')

      return;
    }

    if (username == '' || phone == '' || password == '' || verifyCode == '') {
      this.showToast('请填写完整！')

      return;
    }

    fetch('http://admin.ipoinchina.com/api/member.login/register', {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      method: 'POST',
      body: new URLSearchParams([['phone', phone], ['password', password], ['username', username], ['verify', verifyCode]]).toString()
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.data) {
          _this.showToast(data.code)

          _this.setState({
            reg_btn_text: '请稍等...'
          })

          const {id, phone, username, tokenv} = data.data;

          Cookies.set('yiheng', {
            id,
            phone,
            username,
            't': tokenv
          }, {expires: 0.55});

          window.location.href = '/'

        } else {

          _this.showToast(data.code)

        }
      });

  }

  checkHandle = () => {
    this.setState({isChecked: !this.state.isChecked})
  }

  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }

  showToast = text => {
    Toast.info(text, 2);
  }

  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

  count = () => {
    let siv = setInterval(() => {
      this.setState({
        time: this.state.time - 1,
        btn_text: this.state.time + `秒`,
        isDisabled: true
      }, () => {
        if (this.state.time == 1) {
          clearInterval(siv);
          this.setState({
            time: 60,
            btn_text: '获取验证码',
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
        <div className="register-layout">
          <p>注册毅恒账户</p>

          <div>
            <label>姓名</label>
            <input type="text" className='isd' onChange={this.onChangeHandle} name='username'
                   value={this.state.username}/>
            {/*<i className="fa fa-mobile" aria-hidden="true"></i>*/}
          </div>

          <div>
            <label>手机号</label>
            <input type="text" className='isd' onChange={this.onChangeHandle} name='phone' value={this.state.phone}/>
            {/*<i className="fa fa-mobile" aria-hidden="true"></i>*/}
          </div>

          <div>
            <label>手机验证码</label>
            <input type="text" className='isd' onChange={this.onChangeHandle} name='verifyCode'
                   value={this.state.verifyCode}/>
            {/*<i className="fa fa-mobile" aria-hidden="true"></i>*/}
            <button className='getVer' onClick={this.getVerCode}
                    disabled={this.state.isDisabled}>{this.state.btn_text}</button>
          </div>

          <div>
            <label>登录密码</label>
            <input type="password" className='isd' onChange={this.onChangeHandle} name='password'
                   value={this.state.password}/>
            {/*<i className="fa fa-mobile" aria-hidden="true"></i>*/}
          </div>

        </div>


        <div className="bo">
          <div className="checkBox">
            <input type="checkbox" checked={this.state.isChecked} onChange={this.checkHandle}/><span>我已阅读并同意</span><span
            className='ln' onClick={this.showModal('modal1')}>《毅恒基金服务协议》</span>
          </div>

          <p>
            <span>已有账号？</span>
            <span><Link to='/#/login'>立即登录</Link></span>
          </p>

          <Button type='primary' className='regBtn' onClick={this.submit}>{this.state.reg_btn_text}</Button>
        </div>

        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          title="毅恒基金服务协议"
          platform='android'
          style={{
            width: 387
          }}
          footer={[{
            text: '我已阅读并同意', onPress: () => {
              this.onClose('modal1')();
            }
          }]}
          afterClose={() => this.checkHandle()}
        >
          <div style={{height: 400, overflow: 'scroll'}}>
            <p>毅恒基金谨遵基金协会的《私募投资基金募集行为管理办法》之规定，只向特定的合格投资者宣传推介私募投资基金产品。</p><br/>

            <p>阁下如有进行私募投资基金投资，请承诺符合中国证监会规定的私募基金合格投资者的条件。即具备相应风险识别能力和风险承担能力，投资于单只私募基金的金额不低于100万元，且符合下列相关标准之一：</p><br/>

            <p>一、我承诺符合金融类资产部低于300万元（金融资产包括银行存款、股票、债券、基金份额、资产管理计划、银行理财产品、信托计划、保险产品、期货权益等）;</p><br/>

            <p>二、我承诺符合最近三年个人平均收入不低于50万人民币。</p>
          </div>
        </Modal>
        <Footer/>
      </div>
    );
  }
}

export default Index;