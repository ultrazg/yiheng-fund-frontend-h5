import React, { Component } from 'react';
import './index.css';
import Cookies from 'js-cookie';
import { ActivityIndicator, NavBar, Icon, Pagination, Toast, Modal } from "antd-mobile";

function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      userid: '',
      phone: '',
      token: '',
      isDisabled: true,
      isShow: false,
      page: 1,
      order: [],
      count_num: '',
      loading: true,
      modal1: false,
      codeimg: ''
    }
  }

  showToast = text => {
    Toast.info(text, 2);
  }

  showModal = text => {
    // e.preventDefault(); // 修复 Android 上点击穿透

    this.setState({
      modal1: true,
      codeimg: text
    });
  }

  onClose = key => () => {
    this.setState({
      [key]: false,
      codeimg: ''
    });
  }

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }

  prePage = () => {
    const { userid, token, count_num } = this.state;

    if (this.state.page == 1) {
      this.showToast('到头了');

      return;
    }

    this.setState({
      page: this.state.page - 1
    }, () => {

      this.getPageData(token, userid, this.state.page);

      if (this.state.page <= Math.ceil(count_num / 3)) {
        this.setState({
          isShow: false
        })
      }

      if (this.state.page <= 1) {
        this.setState({
          isDisabled: true
        })
      }
    })
  }

  nextPage = () => {
    const { userid, token, count_num } = this.state;

    if (this.state.page == Math.ceil(count_num / 3)) {
      this.showToast('到底了');

      return;
    }

    this.setState({
      page: this.state.page + 1
    }, () => {

      this.getPageData(token, userid, this.state.page);

      if (this.state.page == Math.ceil(count_num / 3)) {
        this.setState({
          isShow: true
        })
      }

      if (this.state.page > 1) {
        this.setState({
          isDisabled: false
        })
      }
    })
  }

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
        phone: phone,
        token: token
      })
    }
    this.getPageData(token, userid, 1)
  }

  getPageData = (token, userid, page) => {
    // const {token,userid} = this.state
    this.setState({
      loading: true
    })

    fetch('http://admin.ipoinchina.com/api/member.member/getOrder', {
      method: 'POST',
      mode: 'cors',
      // redentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token,
      }),
      body: new URLSearchParams([['uid', userid], ['page', page]]).toString()
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data);

        if (data.list) {
          this.setState({
            order: data.list,
            count_num: data.count_num,
            loading: false
          })
        }
        // if (data.list.length == 0) {
        //   this.setState({
        //     isShow: 'none'
        //   })
        // } else {
        //   this.setState({
        //     order: data.list,
        //     count_num: data.count_num
        //   });
        // }
      });
  }

  // add_time: "2020-10-28 14:10"
  // class: "ci"
  // codeimg: ""
  // fund_name: "江夏血液IPO打新"
  // id: 23
  // idcard: "440804568645"
  // order_id: "20201028732"
  // phone: "19849017480"
  // price: "12345633"
  // sort: 0
  // status: "待审核"
  // tradingCode: "54685"
  // user_id: 14
  // user_name: "曾祖父"

  render() {
    let vdom = (
      this.state.order.map((item, index) => (
        <div key={index} className='order-lists'>
          <h3>{item.fund_name}</h3>
          <p><span>交易时间</span><span>{item.add_time}</span></p>
          <p><span>订单编号</span><span>{item.order_id}</span></p>
          <p><span>用户名</span><span>{item.user_name}</span></p>
          <p><span>联系方式</span><span>{item.phone}</span></p>
          <p><span>证件号</span><span>{item.idcard}</span></p>
          <p>
            {item.tradingCode ? <><span>交易码</span><span>{item.tradingCode}</span></> : <><span>交易凭证</span><span style={{
              color: '#094182',
              textDecoration: 'underline',
              fontWeight: 600
            }} onClick={() => this.showModal(item.codeimg)}>点击查看</span></>}
          </p>
          <p><span>交易金额</span><span>{item.price}</span></p>
          <p><span>状态</span><span className={item.class}>{item.status}</span></p>
        </div>
      ))
    )

    return (
      <div>

        <NavBar
          mode="light"
          style={{ background: '#094182', color: 'white' }}
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
        >OrderPage</NavBar>

        <div className="user-page-layout">
          我的交易（共 {this.state.count_num} 条记录）

          {/* {
            this.state.count_num > 3 ? <div style={{
              display: this.state.isShow,
              display: 'flex',
              marginTop: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <div className='btns'>
                <button className='btn btn-left' onClick={this.prePage} disabled={this.state.isDisabled}>上一页</button>
              </div>
              <div className='btns' style={{ textAlign: 'right' }}>
                <button className='btn btn-right' onClick={this.nextPage} disabled={this.state.isShow}>下一页</button>
              </div>
            </div> : ''
          } */}

          <Pagination style={{ marginTop: '1rem' }} total={Math.ceil(this.state.count_num / 3)}
            className="custom-pagination-with-icon"
            current={this.state.page}
            locale={{
              prevText: (<span className="arrow-align" onClick={this.prePage}><Icon type="left" />上一页</span>),
              nextText: (<span className="arrow-align" onClick={this.nextPage}>下一页<Icon type="right" /></span>),
            }}
          />

          {vdom}

        </div>

        <ActivityIndicator
          toast
          text="正在获取数据"
          animating={this.state.loading}
        />

        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          title="交易凭证"
          footer={[{ text: '关闭', onPress: () => { this.onClose('modal1')(); } }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <img src={this.state.codeimg} />
        </Modal>

      </div>
    );
  }
}

export default index;
