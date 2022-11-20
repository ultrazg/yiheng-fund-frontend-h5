import React, {Component} from 'react';

import Footer from '../../Components/Footer';

import './index.css';
import {Icon, NavBar} from "antd-mobile";

class Index extends Component {
  render() {
    return (
      <div>

        <NavBar
          mode="light"
          style={{background: '#094182', color: 'white'}}
          icon={<Icon type="left"/>}
          onLeftClick={() => this.props.history.go(-1)}
        >联系我们</NavBar>

        <div className="contactus-layout">
          <h3>毅恒宏观机会基金有限公司</h3>
          <p><i className='fa fa-location-arrow'></i>香港轩尼诗道 253-261 号依时商业大厦 1902 室</p>
          <p><i className='fa fa-globe'></i><a
            href='http://w.ipoinchina.com'>http://www.ipoinchina.com</a></p>
          <p><i className='fa fa-phone'></i><a href='tel:15818105420'>15818105420</a></p>
          <p><i className='fa fa-envelope'></i><a href='mailto:2358271945@qq.com'>2358271945@qq.com</a>
            <p><i className='fa fa-wechat'></i>WeChat_id:IPOHKEx</p>
          </p>

          <div className="address">
            <span>广州</span>
            <p><i className='fa fa-location-arrow'></i>广州市天河区富力盈盛广场 1711 室</p>
          </div>
          <div className="address">
            <span>上海</span>
            <p><i className='fa fa-location-arrow'></i>上海市静安区南京西路 580 号仲益大厦 3723 室</p>
          </div>
          <div className="address">
            <span>深圳</span>
            <p><i className='fa fa-location-arrow'></i>深圳市南山区航空航天大厦 2 栋 709</p>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Index;