import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Icon, NavBar, ActivityIndicator, PullToRefresh} from "antd-mobile";
import {Link} from 'react-router-dom';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      news: [],
      animating: true,
      page: 0,

      refreshing: false,
      height: document.documentElement.clientHeight,
      data: [],
    }
  }

  genData = () => {
    const nextPage = this.state.page + 1

    fetch('http://admin.ipoinchina.com/api/article/getNewsContent/行业新闻/' + nextPage, {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        let oldArr = this.state.news
        let dataArr = data.list

        this.setState({
          news: oldArr.concat(dataArr),
          animating: false,
          page: nextPage
        });
        // return data.list
      });
  }

  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(() => this.setState({
      height: hei,
      data: this.genData(),
    }), 0);

    // fetch('/api/article/getNewsContent/行业新闻/1', {
    //   headers: new Headers({
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }),
    // })
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(data => {
    //     // console.log(data);
    //     this.setState({
    //       news: data.list,
    //       animating: false
    //     });
    //   });
  }

  render() {

    let vNewDom = (
      this.state.news.map((item, index) => (
        <Link to={'/article/' + item.id} key={index}>
          <li>
            <span>
              {item.title}
              <p>{item.remark}</p>
              <p>{item.create_at}</p>
            </span>
            <span><img src={item.logo} alt=""/></span>
          </li>
        </Link>
      ))
    )

    return (
      <div>

        <NavBar
          mode="light"
          style={{background: '#094182', color: 'white'}}
          icon={<Icon type="left"/>}
          onLeftClick={() => this.props.history.go(-1)}
        >行业新闻</NavBar>

        <PullToRefresh
          damping={60}
          ref={el => this.ptr = el}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
          direction='up'
          refreshing={this.state.refreshing}
          onRefresh={() => {
            this.setState({
              refreshing: true,
              animating: true
            });
            setTimeout(() => {
              this.genData()
              this.setState({
                refreshing: false,
                animating: false
              });
            }, 1000);
          }}
        >
          <div className="news-layout">
            <ul className="new">
              {vNewDom}
            </ul>
          </div>
        </PullToRefresh>

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