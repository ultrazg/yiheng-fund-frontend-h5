import React, {Component} from 'react';

import {Icon, NavBar, Button, ActivityIndicator, List, Toast, Modal, Checkbox} from "antd-mobile";

import Cookies from 'js-cookie';

import './index.css';

const AgreeItem = Checkbox.AgreeItem;
// const Item = List.Item;
// const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
// let moneyKeyboardWrapProps;
// if (isIPhone) {
//   moneyKeyboardWrapProps = {
//     onTouchStart: e => e.preventDefault(),
//   };
// }

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fund_name: this.props.location.state.n,
      user_name: '',
      phone: '',
      user_id: '',
      idcard: '',
      price: '',
      order_id: '',
      tradingCode: '',
      codeimg: '',
      token: '',
      checkTarget: 0,
      isChecked1: false,
      isChecked2: false,
      isChecked3: false,
      isChecked4: false,

      contract: '',
      count_img: '',
      desc_video: '',
      source_img: '',
      source_name: '',
      desc_video_name: '',
      count_name: '',
      contract_name: '',

      visible: false,
      modal_title: '',
      modal_button: '',
      modal_content: '',

      countData: [],
      animating: true
    }
  }

  changeCheckHandle = e => {
    const {name} = e.target

    this.setState({
      [name]: true
    })
  }

  changeHandle = e => {
    const {name, value} = e.target
    // console.log(e)

    this.setState({
      [name]: value
    })
  }

  showToast = (text, callback) => {
    Toast.info(text, 2, callback);
  }

  go = () => {
    this.getRandomOrderId()

    const {fund_name, user_name, user_id, phone, price, idcard, tradingCode, codeimg, order_id} = this.state;

    console.log(order_id);

    return;
    const that = this

    if (fund_name == '' || user_name == '' || phone == '' || price == '' || idcard == '') {
      this.showToast('请完善信息！')

      return
    }

    if (!this.state.isChecked1 || !this.state.isChecked2 || !this.state.isChecked3 || !this.state.isChecked4) {
      this.showToast('请仔细阅读并勾选条款')

      return
    }

    if (codeimg == '' && tradingCode == '') {
      Toast.info('请上传交易截图或者填写银行回单号！')

      return
    }

    fetch('http://admin.ipoinchina.com/api/fund_data/tobuyfund', {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': this.state.token,
      }),
      mode: 'cors',
      method: 'POST',
      body: new URLSearchParams([
        ['phone', phone],
        ['fund_name', fund_name],
        ['user_name', user_name],
        ['user_id', user_id],
        ['price', price],
        ['idcard', idcard],
        ['tradingCode', tradingCode],
        ['codeimg', codeimg],
        ['order_id', order_id]
      ]).toString()
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

        if (data.status == 200) {

          that.showToast(data.msg, () => {
            window.location.href = '/#/user'
          })

        } else {
          that.showToast(data.msg)
        }
      });
  }

  showModal = type => {
    if (type == 1) {
      this.setState({
        modal_title: this.state.source_name,
        modal_button: '我已阅读基金交易要素表',
        visible: true,
        checkTarget: type,
        modal_content: `<img style="display:block;width:100%;" src='${this.state.source_img}'></img>`
        // modal_content: '<Image width="100%" src={this.state.source_img}/>'
        //modal_content: `<object data="${this.state.source_img}" type="application/pdf" width="600" height="200"></object>`
      })
    } else if (type == 2) {
      this.setState({
        modal_title: this.state.desc_video_name,
        modal_button: '我已阅读基金募集说明',
        visible: true,
        checkTarget: type,
        modal_content: `<video style="display: block;width: 100%" autoplay controls src='${this.state.desc_video}'></video>`
      })
    } else if (type == 3) {
      // this.setState({
      //   modal_title: this.state.contract_name,
      //   modal_button: '我已阅读基金合同',
      //   visible: true,
      //   checkTarget: type,
      //   modal_content: `<embed src='${this.state.contract}' width="100%" height="600px"></embed>`
      // })
      window.location.href = `${this.state.contract}`
    } else {
      this.setState({
        modal_title: this.state.count_name,
        modal_button: '我已阅读基金募集账户',
        visible: true,
        checkTarget: type,
        modal_content: `<img style="display:block;width:100%;" src='${this.state.count_img}'></img>`
      })
    }
  }

  getRandomOrderId = () => {
    let date = new Date()
    let YY = date.getFullYear()
    let mm = date.getMonth() + 1
    let dd = date.getDate()

    if (mm < 10) {
      mm = `0${mm}`
    }

    if (dd < 10) {
      dd = `0${mm}`
    }

    let random = Math.floor(Math.random() * 999)

    if (random < 10) {
      random = `0${random}`
    }

    let order_id = `${YY}${mm}${dd}${random}`

    this.setState({
      order_id
    })
  }

  onClose = () => {
    const c = this.state.checkTarget

    this.setState({
      visible: false,
    });

    if (c == 1) {
      this.setState({
        isChecked1: true
      }, () => {
        this.setState({
          checkTarget: 0
        })
      })
    } else if (c == 2) {
      this.setState({
        isChecked2: true
      }, () => {
        this.setState({
          checkTarget: 0
        })
      })
    } else if (c == 3) {
      this.setState({
        isChecked3: true
      }, () => {
        this.setState({
          checkTarget: 0
        })
      })
    } else {
      this.setState({
        isChecked4: true
      }, () => {
        this.setState({
          checkTarget: 0
        })
      })
    }
  };

  onFile = e => {
    const file = e.target.files[0];
    const fr = new FileReader();

    fr.readAsDataURL(file);

    let fileContent = null;

    fr.onload = () => {
      fileContent = fr.result;
    };

    setTimeout(() => {
      this.setState({
        codeimg: fileContent
      });
    }, 500);
  }

  componentDidMount() {
    let token, id

    const that = this

    this.getRandomOrderId()

    if (Cookies.get('yiheng')) {
      let data = JSON.parse(Cookies.get('yiheng'));
      let username = data.username;
      id = data.id;
      let phone = data.phone;
      token = data.t

      this.setState({
        user_name: username,
        user_id: id,
        phone: phone,
        token: token
      })

      fetch(`http://admin.ipoinchina.com/api/fund_data/toFundDetail/${this.props.location.state.id}`, {
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': token,
        }),
        mode: 'cors',
        method: 'POST',
        body: new URLSearchParams([
          ['user_id', id],
        ]).toString()
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {

          let {contract, count_img, desc_video, source_img, source_name, desc_video_name, count_name, contract_name} = data.list
          let countData = data.countData

          that.setState({
            contract,
            count_img,
            desc_video,
            source_img,
            source_name,
            desc_video_name,
            count_name,
            contract_name,
            countData,
            animating: false
          })

        });
    }
  }

  render() {
    let vdom = (

      <List>
        {/*<InputItem*/}
        {/*  clear*/}
        {/*  editable={false}*/}
        {/*  placeholder={this.props.location.state.id}*/}
        {/*>产品编号</InputItem>*/}

        {/*<InputItem*/}
        {/*  clear*/}
        {/*  defaultValue={this.state.user_name}*/}
        {/*  value={this.state.user_name}*/}
        {/*  name='user_name'*/}
        {/*  onChange={this.changeHandle}*/}
        {/*>姓名</InputItem>*/}

        <div className='f'>
          <span className='chunk1'>订单编号</span>
          <span className='chunk2'> <input type="text" value={this.state.order_id} readOnly/></span>
        </div>

        <div className='f'>
          <span className='chunk1'>姓名</span>
          <span className='chunk2'> <input type="text" name='user_name' value={this.state.user_name} onChange={this.changeHandle}/></span>
        </div>

        <div className='f'>
          <span className='chunk1'>身份证号码</span>
          <span className='chunk2'> <input type="text" name='idcard' value={this.state.idcard} placeholder='请填写正确的证件号' onChange={this.changeHandle}/></span>
        </div>

        <div className='f'>
          <span className='chunk1'>认购金额</span>
          <span className='chunk2'> <input type="text" name='price' value={this.state.price} placeholder='单位：元' onChange={this.changeHandle}/></span>
        </div>

        <div className='f'>
          <span className='chunk1'>联系电话</span>
          <span className='chunk2'> <input type="text" name='phone' value={this.state.phone} onChange={this.changeHandle}/></span>
        </div>
        {/*<InputItem*/}
        {/*  clear*/}
        {/*  placeholder='必填'*/}
        {/*  maxLength={18}*/}
        {/*  value={this.state.idcard}*/}
        {/*  name={'idcard'}*/}
        {/*  onChange={this.changeHandle}*/}
        {/*>身份证号码</InputItem>*/}

        {/*<InputItem*/}
        {/*  type="money"*/}
        {/*  placeholder="必填"*/}
        {/*  clear*/}
        {/*  moneyKeyboardAlign="left"*/}
        {/*  moneyKeyboardWrapProps={moneyKeyboardWrapProps}*/}
        {/*  value={this.state.price}*/}
        {/*  name='price'*/}
        {/*  onChange={this.changeHandle}*/}
        {/*>认购金额</InputItem>*/}

        {/*<InputItem*/}
        {/*  clear*/}
        {/*  value={this.state.phone}*/}
        {/*  defaultValue={this.state.phone}*/}
        {/*  name='phone'*/}
        {/*  onChange={this.changeHandle}*/}
        {/*>联系电话</InputItem>*/}

        <AgreeItem data-seed="logId" name='isChecked1' checked={this.state.isChecked1}
                   onChange={this.changeCheckHandle}>
          我已阅读并同意 <a onClick={() => this.showModal(1)}>《{this.props.location.state.n}交易要素表》</a>
        </AgreeItem>

        <AgreeItem data-seed="logId" name='isChecked2' checked={this.state.isChecked2}
                   onChange={this.changeCheckHandle}>
          我已阅读并同意 <a onClick={() => this.showModal(2)}>《{this.props.location.state.n}募集说明》</a>
        </AgreeItem>

        <AgreeItem data-seed="logId" name='isChecked3' checked={this.state.isChecked3}
                   onChange={this.changeCheckHandle}>
          我已阅读并同意
          {/*<a onClick={() => this.showModal(3)}>《{this.props.location.state.n}基金合同》</a>*/}
          <a onClick={() => this.showModal(3)}>《{this.props.location.state.n}基金合同》</a>
        </AgreeItem>

        <AgreeItem data-seed="logId" name='isChecked4' checked={this.state.isChecked4}
                   onChange={this.changeCheckHandle}>
          我已确认打款 <a onClick={() => this.showModal(4)}>《{this.props.location.state.n}基金募集账户》</a>
        </AgreeItem>

        <List renderHeader={() => '上传打款凭证或填写银行回单号'} className="my-list">
            <span><input type="file" style={{marginLeft: "0.5rem"}} name='codeimg' onChange={this.onFile}
                         accept="image/*"/></span>
          <span className='cl'>或</span>
          {/*<span>填写银行回单号</span>*/}
          <span>
            <input
              type="text"
              name='tradingCode'
              style={{width: '100px', border: 'none'}}
              value={this.state.tradingCode}
              placeholder='交易回单号'
              onChange={this.changeHandle}
            /></span>
        </List>
        {
          this.state.countData.map((item, index) => (
            <div className="other-info" key={index}>
              <span>{item.count_key}：</span>
              <span dangerouslySetInnerHTML={{__html: item.count_value}}></span>
            </div>
          ))
        }

        <Button
          type={"primary"}
          onClick={this.go}
          style={{marginTop: '10px'}}
        >提交</Button>

      </List>

    )

    return (
      <div>

        <NavBar
          mode="light"
          style={{background: '#094182', color: 'white'}}
          icon={<Icon type="left"/>}
          onLeftClick={() => this.props.history.go(-1)}
        >{this.props.location.state.n}</NavBar>

        <div className="buy-layout">
          <p>产品认购</p>

          {this.state.animating ? <ActivityIndicator
            toast
            text="正在加载中"
          /> : vdom}
          {/*{vdom}*/}


        </div>

        <Modal
          visible={this.state.visible}
          transparent
          maskClosable={false}
          onClose={() => this.onClose('visible')}
          title={this.state.modal_title}
          platform='android'
          style={{
            width: 387
          }}
          footer={[
            {
              text: `${this.state.modal_button}`, onPress: () => {
                this.onClose('visible');
              }
            }
          ]}
        >
          <div style={{height: '100%', overflow: 'scroll'}}
               dangerouslySetInnerHTML={{__html: this.state.modal_content}}></div>
        </Modal>

      </div>
    );
  }
}

export default Index;