import React, { Component } from 'react';
import './index.css';
import { NavBar, Icon, ActivityIndicator } from 'antd-mobile';
import Footer from '../../Components/Footer';

class index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      article_id: this.props.match.params.id,
      article_title: '',
      article_remark: '',
      article_create_at: '',
      article_content: '',
      loading: true
    }
  }

  componentDidMount() {
    let articleUrl = `http://admin.ipoinchina.com/api/article/ArticleDetails/${this.state.article_id}`

    fetch(articleUrl, {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data.content);
        this.setState({
          loading: false,
          article_title: data.title,
          article_create_at: data.create_at,
          article_content: data.content
        });
      });
  }

  render() {

    let articleVDOM = (
      <>
        <div className='article-info'>
          <p>{this.state.article_title}</p>
          <p>{this.state.article_create_at}</p>
        </div>
        <div
          className='article-content'
          dangerouslySetInnerHTML={{ __html: this.state.article_content }}
        ></div>
      </>
    )

    return (
      <div>

        <NavBar
          mode="light"
          style={{ background: '#094182', color: 'white' }}
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
        >文章详情</NavBar>

        <div className="article-layout">

          {articleVDOM}

        </div>

        {/*<Footer />*/}
        <ActivityIndicator
          toast
          text="正在加载..."
          animating={this.state.loading}
        />
      </div>
    );
  }
}

export default index;
