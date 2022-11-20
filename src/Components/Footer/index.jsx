import React, {Component} from 'react';

import {Link} from 'react-router-dom';

import './index.css';

class Index extends Component {
  render() {
    return (
      <div>

        <ul className="website-footer">
          <li><Link to='/about'>关于我们</Link></li>
          <label>|</label>
          <li><Link to='/contactus'>联系我们</Link></li>
          <label>|</label>
          <li><Link to='/risk'>风险揭示书</Link></li>
          <label>|</label>
          <li><Link to='/privacy'>隐私条款</Link></li>
          <label>|</label>
          <li><Link to='/complaint'>投诉建议</Link></li>
          <label>|</label>
          <li><Link to='/faq'>常见问题</Link></li>
        </ul>

        <div className="copyright">
          <p>版权所有 © 2006-2020 毅恒宏观机会基金有限公司</p>
          <p>投资有风险&nbsp;&nbsp;入市需谨慎</p>
          <p>备案号：粤ICP备20052211号</p>
          <p>v201115</p>
        </div>

      </div>
    );
  }
}

export default Index;