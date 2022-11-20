import React, {Component} from 'react';

import './index.css';

import {Icon, NavBar, ActivityIndicator} from "antd-mobile";

import {Link} from 'react-router-dom';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      funds: [],
      animating: true
    }
  }

  componentDidMount() {
    fetch('http://admin.ipoinchina.com/api/fund_data/getFundList')
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(Object.entries(data));
        this.setState({
          funds: Object.entries(data),
          animating: false
        });
      });
  }

  render() {

    return (
      <div style={{background: '#f1f1f1'}}>

        <NavBar
          mode="light"
          style={{background: '#094182', color: 'white'}}
          icon={<Icon type="left"/>}
          onLeftClick={() => this.props.history.go(-1)}
        >基金超市</NavBar>

        <div className="market-layout">

          {
            this.state.funds.map((item, index) => (
              <>
                <p className='title' key={index}>{item[0]}</p>
                {
                  item[1].map((item1, index1) => (
                    <Link to={{pathname: '/buy', state: {id: item1.id, n: item1.title}}}>
                      <div className="goods-body" key={index1}>
                        <p className='fund-name'>{item1.title}</p>
                        <ul className='fund-de'>
                          <li>募集规模<p>{item1.guimo}</p></li>
                          <li>投资行业<p>{item1.touzi}</p></li>
                        </ul>
                        <ul className='fund-de'>
                          <li>管理人<p>{item1.man}</p></li>
                          <li>投资期限<p>{item1.touzi_date}</p></li>
                        </ul>
                        <ul className='fund-de'>
                          <li>预期收益<p>{item1.yuqi}</p></li>
                          <li>起购金额<p>{item1.price}</p></li>
                        </ul>
                      </div>
                    </Link>
                  ))
                }
              </>
            ))
          }

        </div>
        <ActivityIndicator
          toast
          text="正在加载中"
          animating={this.state.animating}
        />
      </div>
    );
  }
}

export default Index;