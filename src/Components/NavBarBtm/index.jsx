import React, {Component} from 'react';

import Cookies from 'js-cookie';

import './index.css';

class Index extends Component {
  constructor(props) {
    super(props);

  }

  call = () => {
    window.location.href = 'tel:15818105420'
  }

  render() {

    let vdom

    if (Cookies.get('yiheng')) {
      vdom = (
        <p onClick={() => window.location.href = '/#/user'}><i className="fa fa-user"></i>个人中心</p>
      )
    }else{
      vdom = (
        <p onClick={() => window.location.href = '/#/login'}>登陆/注册</p>
      )
    }

    return (
      <div>
        <div className="nav-btm">
          <div className='red'>
            <p onClick={this.call}><i className="fa fa-volume-control-phone"></i>财富热线</p>
          </div>
          <div className='pink'>
            {vdom}
          </div>
          {/*<Link className='pink' to='/login'>登录/注册</Link>*/}
          <div className='hotpink' onClick={()=>window.location.href = '/#/reserve'}><i className="fa fa-commenting-o"></i>预约咨询</div>
        </div>
      </div>
    );
  }

}

export default Index;