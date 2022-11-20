import React, { Component } from 'react';
import './index.css';
import { NavBar, Icon, ActivityIndicator } from 'antd-mobile';

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      content: '',
    }
  }

  onChangeHandle = e => {
    this.setState({
      content: e.target.value
    })
  }

  clearHandle = () => {
    this.setState({
      content: ''
    })
  }

  submit = () => {
    const content = this.state.content
    console.log(content)
  }

  render() {
    return (
      <div>

        <NavBar
          mode="light"
          style={{ background: '#094182', color: 'white' }}
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
        >Feedback</NavBar>

        <div className="feedback-layout">
          对我们有什么意见或者建议，请告诉我们（140字内）：
          <textarea cols="30" rows="10" maxLength="140" onChange={this.onChangeHandle} value={this.state.content}></textarea>
          <div className='btn btn1' onClick={this.clearHandle}>清空</div>
          <div className='btn btn2' onClick={this.submit}>提交</div>
        </div>

      </div>
    );
  }
}

export default index;
