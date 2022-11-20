import React, { Component } from 'react';

import './index.css';
import { ActivityIndicator, Icon, NavBar, List, Toast, Badge } from "antd-mobile";

import HEADICON from '../../Images/logo.jpg';
import ICON1 from '../../Images/icon1.png';
import ICON2 from '../../Images/icon2.png';
import ICON3 from '../../Images/icon3.png';
import ICON4 from '../../Images/icon4.png';
import ICON5 from '../../Images/icon5.png';
import ICON6 from '../../Images/icon6.png';

import Cookies from 'js-cookie';
import { Link } from "react-router-dom";

const Item = List.Item

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      userid: '',
      phone: '',
      token: '',
      // isDisabled: true,
      // isShow: false,
      // page: 1,
      // order: [],
      count_num: '',
      animating: true
    }
  }

  showToast = text => {
    Toast.info(text, 2);
  }

  // prePage = () => {
  //   const {userid, token} = this.state;

  //   this.setState({
  //     page: this.state.page - 1
  //   }, () => {

  //     this.getPageData(token, userid, this.state.page);

  //   })
  // }

  // nextPage = () => {
  //   const {userid, token} = this.state;

  //   this.setState({
  //     page: this.state.page + 1
  //   }, () => {

  //     this.getPageData(token, userid, this.state.page);

  //   })
  // }

  logout = () => {
    this.showToast('正在退出账号')
    Cookies.remove('yiheng');

    this.timer = setTimeout(
      () => { window.location.href = '/#/login' },
      2000
    );
  }

  // getPageData = (token, userid, page) => {
  //   // const {token,userid} = this.state

  //   this.setState({
  //     animating: true
  //   })

  // fetch('/api/member.member/getOrder', {
  //   method: 'POST',
  //   mode: 'cors',
  //   // redentials: 'include',
  //   headers: new Headers({
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     'Authorization': token,
  //   }),
  //   body: new URLSearchParams([['uid', userid], ['page', page]]).toString()
  // })
  //   .then(response => {
  //     return response.json();
  //   })
  //   .then(data => {
  //     console.log(data);

  //     if (data.list) {
  //       this.setState({
  //         order: data.list,
  //         count_num: data.count_num,
  //         animating: false
  //       })
  //     }else{
  //       this.setState({
  //         animating:false
  //       })
  //       this.showToast(data.msg)
  //     }

  //   });
  // }

  componentDidMount() {
    let token
    let userid
    if (Cookies.get('yiheng')) {
      let data = JSON.parse(Cookies.get('yiheng'));
      let username = data.username;
      userid = data.id;
      let phone = data.phone;
      token = data.t;

      this.setState({
        username: username,
        userid: userid,
        phone: phone.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2"),
        token: token
      })
    }
    // this.getPageData(token, userid, 1)
    fetch('http://admin.ipoinchina.com/api/member.member/getOrder', {
      method: 'POST',
      mode: 'cors',
      // redentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token,
      }),
      body: new URLSearchParams([['uid', userid], ['page', 1]]).toString()
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);

        if (data.list) {
          this.setState({
            // order: data.list,
            count_num: data.count_num,
            animating: false
          })
        } else {
          this.setState({
            animating: false
          })
          // this.showToast(data.msg)
        }

      });
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {

    return (
      <div>

        <NavBar
          mode="light"
          style={{ background: '#094182', color: 'white' }}
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
        >User</NavBar>

        <div className="user-layout">
          <div className="top">
            <img src={HEADICON} alt="" />
            <p>{this.state.username}</p>
            <p>{this.state.phone}</p>
          </div>
          <div className="bottom">
            <List>
              <Item
                thumb={ICON1}
                arrow="horizontal"
                extra={<Badge text={this.state.count_num} />}
                onClick={() => window.location.href = '/#/user/info'}
              >我的订单</Item>
              <Item
                thumb={ICON2}
                onClick={() => window.location.href = '/#/faq'}
                arrow="horizontal"
              >常见问题</Item>
              <Item
                thumb={ICON3}
                onClick={() => window.location.href = '/#/about'}
                arrow="horizontal"
              >关于毅恒</Item>
              <Item
                thumb={ICON4}
                onClick={() => window.location.href = '/#/feedback'}
                arrow="horizontal"
              >意见反馈</Item>
              <Item
                thumb={ICON5}
                onClick={() => window.location.href = '/#/found'}
                arrow="horizontal"
              >修改密码</Item>
              <Item
                thumb={ICON6}
                onClick={() => this.logout()}
                arrow="horizontal"
              >退出登录</Item>
            </List>
          </div>
          {/* <div className="user-info">

            <div className="left">
              <p>用户名：{this.state.username}</p>
              <p>手机号：{this.state.phone}</p>
            </div>
            <div className="right">
              <span onClick={this.logout}><i className="fa fa-sign-out" aria-hidden="true"></i>退出登录</span>
            </div>

          </div>

          <div className="orders-info">
            <p>我的订单（共 {this.state.count_num} 条记录）</p>

            {
              this.state.order.map((item,index)=>(
                <div className="goods-body" key={index}>
                  <p className='fund-name'>{item.fund_name}</p>
                  <ul className='fund-de'>
                    <li>交易时间<p>{item.add_time}</p></li>
                    <li>订单编号<p>{item.order_id}</p></li>
                  </ul>
                  <ul className='fund-de'>
                    <li>用户名<p>{item.user_name}</p></li>
                    <li>联系方式<p>{item.phone}</p></li>
                  </ul>
                  <ul className='fund-de'>
                    <li>证件号<p>{item.idcard}</p></li>
                    <li>交易码<p>{item.tradingCode}</p></li>
                  </ul>
                  <ul className='fund-de'>
                    <li>交易金额<p>{item.price}</p></li>
                  </ul>
                  <div onClick={() => window.location.href = '/market'}>加购</div>
                </div>
              ))
            }

          </div>

          <div className="pager">
            <Pagination total={Math.ceil(this.state.count_num / 3)}
                        className="custom-pagination-with-icon"
                        current={this.state.page}
                        locale={{
                          prevText: (
                            <span className="arrow-align" onClick={this.prePage}><Icon type="left"/>上一页</span>),
                          nextText: (
                            <span className="arrow-align" onClick={this.nextPage}>下一页<Icon type="right"/></span>),
                        }}
            />
          </div> */}

        </div>
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