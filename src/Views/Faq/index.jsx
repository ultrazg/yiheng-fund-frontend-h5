import React, { Component } from 'react';

import Footer from '../../Components/Footer';

import qIcon from '../../Images/q.png';
import aIcon from '../../Images/a.png';

import './index.css';
import { Icon, NavBar, Accordion, ActivityIndicator } from "antd-mobile";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listContent: [],
      animating: true
    }
  }

  componentDidMount() {
    fetch('http://admin.ipoinchina.com/api/article/getNewsContent/常见问题/1', {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data.list)
        this.setState({
          listContent: data.list,
          animating: false
        });
      });
  }

  render() {
    return (
      <div>

        <NavBar
          mode="light"
          style={{ background: '#094182', color: 'white' }}
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
        >常见问题</NavBar>

        <div className="faq-layout">
          <Accordion accordion className="my-accordion">

            {
              this.state.listContent.map((item, index) => (
                <Accordion.Panel
                  key={index}
                  header={<HeaderIcon title={item.title} />}
                >
                  <p style={{ padding: '0.5rem' }}>
                    <img src={aIcon} style={{ marginRight: '10px' }} />{item.remark}
                  </p>
                </Accordion.Panel>
              ))
            }

          </Accordion>
        </div>

        <Footer />
        <ActivityIndicator
          toast
          text="正在加载"
          animating={this.state.animating}
        />
      </div>
    );
  }
}

function HeaderIcon(props) {
  return <><img src={qIcon} style={{ marginRight: '10px' }} />{props.title}</>
}

export default Index;