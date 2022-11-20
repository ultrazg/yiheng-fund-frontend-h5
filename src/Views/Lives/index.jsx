import React, {Component} from 'react';

import './index.css';
import Footer from '../../Components/Footer';
import {ActivityIndicator, Icon, NavBar, Carousel} from "antd-mobile";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animating: false,
      data: [
        'https://static.simuwang.com/Uploads/luyan/2020/06/20200623110414896.jpg',
        'https://static.simuwang.com/Uploads/luyan/2020/06/20200623110414896.jpg',
        'https://static.simuwang.com/Uploads/luyan/2020/06/20200623110414896.jpg'
      ],
      imgHeight: 176,
      lives: [
        {
          pic: 'https://static.simuwang.com/Uploads/luyan/2020/07/20200717184434939.jpg',
          title: '长牛行情，投资中最重要的事',
          mtitle: '林园投资'
        },
        {
          pic: 'https://static.simuwang.com/Uploads/luyan/2020/08/20200828142037299.jpg',
          title: '大变局的“注册牛”',
          mtitle: '神农投资'
        }
      ]
    }
  }

  render() {

    let vLiveListsDom = (
      this.state.lives.map((item, index) => (
        <div className="list" key={index} onClick={() => window.location.href = '/#/liveroom'}>
          <div className="top">
            <img src={item.pic} alt=""/>
          </div>
          <div className="bottom">
            <p>{item.title}</p>
            <p>{item.mtitle}</p>
          </div>
        </div>
      ))
    )

    return (
      <div>

        <NavBar
          mode="light"
          style={{background: '#094182', color: 'white'}}
          icon={<Icon type="left"/>}
          onLeftClick={() => this.props.history.go(-1)}
        >更多路演</NavBar>

        <div className="lives-layout">

          <Carousel
            autoplay={true}
            infinite
          >
            {this.state.data.map((item, index) => (
              <a
                key={index}
                href="http://www.alipay.com"
                style={{display: 'inline-block', width: '100%', height: this.state.imgHeight}}
              >
                <img
                  src={item}
                  alt=""
                  style={{width: '100%', verticalAlign: 'top'}}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({imgHeight: 'auto'});
                  }}
                />
              </a>
            ))}
          </Carousel>

          <div className="lists">

            {vLiveListsDom}

          </div>

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