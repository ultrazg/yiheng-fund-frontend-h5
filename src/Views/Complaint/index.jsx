import React, {Component} from 'react';
import './index.css';
import {Icon, NavBar} from "antd-mobile";

const publicPath = process.env.PUBLIC_URL;

const wechat_qrcode = `${publicPath}/Images/wechat_qrcode.png`

class Index extends Component {
  render() {
    return (
      <div>

        <NavBar
          mode="light"
          style={{background: '#094182',color:'white'}}
          icon={<Icon type="left"/>}
          onLeftClick={() => this.props.history.go(-1)}
        >投诉建议</NavBar>

        <div className="complaint-layout">
          <div className="content">
            <p>
              尊敬的投资者：
            </p>
            <p>
              基金投资人可以通过拨打本公司客户服务中心电话或以书信、微信客服号、电子邮件等方式，对毅恒基金公司或销售网点所提供的服务提出建议或投诉。
            </p>


            <p>
              （1）客服热线
            </p>

            <p>
              您可拨打毅恒毅恒基金客服热线<a href='tel:15818105420'>158-1810-5420</a>（周一至周五 9:00至18:00，法定节假日除外），转人工服务进行投诉或建议。
            </p>

            <p>
              （2）电子邮件
            </p>

            <p>
              您可发送电子邮件至毅恒基金客户投诉邮箱：2358271945@qq.com，邮件标题请注明"投诉与建议" 。
            </p>

            <p>
              （3）邮寄书信
            </p>

            <p>
              您可邮寄书信至“香港轩尼诗道253-261号依时商业大厦1902室”，书信标题请注明"投诉与建议" 。
            </p>

            <p>
              （4）微信客服号
            </p>

            <p>
              您可以添加我司客服微信客服号：<strong>IPOHKEx</strong>
            </p>

            <img src={wechat_qrcode} alt=""/>

            <p className='pull-right'>
              <span>毅恒基金平台</span>
            </p>
          </div>
        </div>

      </div>
    );
  }
}

export default Index;