import React, {Component} from 'react';

import NavBar from '../../Components/NavBar';
import NavBarBtm from '../../Components/NavBarBtm';
import Footer from '../../Components/Footer';

import './index.css';

import {ActivityIndicator, Grid, Tabs} from "antd-mobile";
import {Link} from "react-router-dom";

const publicPath = process.env.PUBLIC_URL;

const GuidData = [
  {
    icon: `${publicPath}/Images/icon1.svg`,
    text: '私募排名'
  },
  {
    icon: `${publicPath}/Images/icon2.svg`,
    text: '颁奖专区'
  },
  {
    icon: `${publicPath}/Images/icon3.svg`,
    text: '私募路演'
  },
  {
    icon: `${publicPath}/Images/icon4.svg`,
    text: '基金超市'
  },
  {
    icon: `${publicPath}/Images/icon5.svg`,
    text: '行业新闻'
  },
  {
    icon: `${publicPath}/Images/icon6.svg`,
    text: '基金榜单'
  },
  {
    icon: `${publicPath}/Images/icon7.svg`,
    text: '私募晴雨表'
  },
  {
    icon: `${publicPath}/Images/icon8.svg`,
    text: '旗舰店'
  },
  {
    icon: `${publicPath}/Images/icon9.svg`,
    text: '机构动态'
  },
  {
    icon: `${publicPath}/Images/icon10.svg`,
    text: '精彩点评'
  }
]

const tabs = [
  {title: '热销基金'},
  {title: '热销私募'},
  {title: '热销定增'},
];

const data = GuidData.map((_val, i) => ({
  icon: _val.icon,
  text: _val.text,
}));

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      news: [],
      hots: [],
      animating: true,
      lives: [
        {
          img: 'https://static.simuwang.com/Uploads/luyan/2020/06/20200623110414896.jpg',
          title: '2019年度私募冠军投资报告会——云溪基金',
          name: '杨勇',
          whatch: '55',
          link: 'https://www.baidu.com'
        },
        {
          img: 'https://static.simuwang.com/Uploads/luyan/2020/06/20200623110414896.jpg',
          title: '2019年度私募冠军投资报告会——云溪基金',
          name: '杨勇',
          whatch: '4245',
          link: 'https://www.baidu.com'
        },
        {
          img: 'https://static.simuwang.com/Uploads/luyan/2020/06/20200623110414896.jpg',
          title: '2019年度私募冠军投资报告会——云溪基金',
          name: '杨伟',
          whatch: '545',
          link: 'https://www.baidu.com'
        }
      ]
    }
  }

  componentWillMount() {
    // 判断是否移动设备
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = 'http://www.ipoinchina.com';

      return;
    }
  }

  componentDidMount() {
    fetch('http://admin.ipoinchina.com/api/article/getNewsContent/行业新闻/1', {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data);
        this.setState({
          news: data.list.slice(0, 5)
        });
      });

    fetch('http://admin.ipoinchina.com/api/fund_data/getContent')
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data.list.slice(0, 2));
        this.setState({
          hots: data.list.slice(0, 3),
          animating: false
        });
      });
  }

  //TODO
  goto = index => {
    switch (index) {
      case 3:
        window.location.href = '/#/market'
        break
      case 4:
        window.location.href = '/#/news'
        break
    }
  }

  render() {
    let vNewDom = (
      this.state.news.map((item, index) => (
        <Link to={'/article/' + item.id} key={index}>
          <li>
            <span>{item.title}<p>{item.remark}</p><p>毅恒基金·{item.create_at}</p></span>
            {/* <span><img src={item.logo} alt="" /></span> */}
          </li>
        </Link>
      ))
    )

    let vTab1Dom = (
      this.state.hots.map((item, index) => (
        <div key={index}>
          <Link to={{pathname: '/buy', state: {id: item.id, n: item.title}}}>
            <div className="goods-body">
              <p className='fund-name'>{item.title}</p>
              <ul className='fund-de'>
                <li>募集规模<p>{item.guimo}</p></li>
                <li>投资行业<p>{item.touzi}</p></li>
              </ul>
              <ul className='fund-de'>
                <li>管理人<p>{item.man}</p></li>
                <li>投资期限<p>{item.touzi_date}</p></li>
              </ul>
              <ul className='fund-de'>
                <li>预期收益<p>{item.yuqi}</p></li>
                <li>起购金额<p>{item.price}</p></li>
              </ul>
            </div>
          </Link>
        </div>
      ))
    )

    let vTab2Dom = (
      <div>暂无内容</div>
    )

    let vTab3Dom = (
      <div>暂无内容</div>
    )

    return (
      <div style={{background: "#f1f1f1"}}>

        <NavBar/>

        <div className="index-layout">

          <div className="lists">
            <Grid
              data={data}
              hasLine={false}
              columnNum={5}
              activeStyle={true}
              onClick={(e, i) => this.goto(i)}
            />
          </div>

          <div className="tabs">
            <Tabs
              tabs={tabs}
              animated={false}
              useOnPan={false}
              tabBarUnderlineStyle={{border: '1px solid goldenrod'}}
              tabBarActiveTextColor='goldenrod'
            >

              <div className="tab-hot">
                {vTab1Dom}
              </div>
              <div className="tab-sm">
                {vTab2Dom}
              </div>
              <div className="tab-dz">
                {vTab3Dom}
              </div>

            </Tabs>
            <div className="showmore" onClick={() => window.location.href = '/#/market'}>
              查看更多产品
            </div>
          </div>

          <div className="stars">
            <p>大咖路演</p>

            <div className="lists">

              {
                this.state.lives.map((item, index) => (
                  <div className="list" key={index}>
                    <Link to={item.link}>
                      <div className="top">
                        <img src={item.img} alt=""/>
                      </div>
                      <div className="bottom">
                        <p>{item.title}</p>
                        <span>
                          <p>{item.name}</p>
                          <p><i className="fa fa-eye"></i>{item.whatch}</p>
                        </span>
                      </div>
                    </Link>
                  </div>
                ))
              }

            </div>

            <div className="showmore" onClick={() => window.location.href = '/#/lives'}>
              查看更多路演
            </div>
          </div>

          <div className="news">
            <p>行业新闻</p>

            <ul className="new">

              {vNewDom}

            </ul>
            <div className="showmore" onClick={() => window.location.href = '/#/news'}>
              查看更多内容
            </div>
          </div>

          <Footer/>

        </div>

        <NavBarBtm/>
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