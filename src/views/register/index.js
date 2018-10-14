import React, { Component } from 'react';
import { List, Radio, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from './../../redux/user/redux';

import Logo from './../../component/logo';
const RadioItem = Radio.RadioItem;

class Register extends Component{
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      re_password: '',
      type: 'genius'
    };
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(key, value) {
    this.setState({
      [key]: value
    })
  }


  handleRegister() {
    console.log(this.state);
    this.props.dispatch(register(this.state));
  }

  render() {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo/>
        <WingBlank>
          {this.props.msg ? <p className={"error-msg"}>{ this.props.msg }</p> : null}
          <List>
            <InputItem
              onChange={v => this.handleChange('user', v)}
            >用户名</InputItem>
            <WhiteSpace size="lg" />
            <InputItem
              type={"password"}
              onChange={v => this.handleChange('password', v)}
            >密码</InputItem>
            <WhiteSpace/>
            <InputItem
              type={"password"}
              onChange={v => this.handleChange('re_password', v)}
            >确认密码</InputItem>
            <WhiteSpace/>
            <RadioItem
              checked={this.state.type==='genius'}
              onChange={() => this.handleChange('type', 'genius')}
            >牛人</RadioItem>
            <RadioItem
              checked={this.state.type==='boss'}
              onChange={() => this.handleChange('type', 'boss')}
            >boss</RadioItem>
          </List>
        </WingBlank>
        <WingBlank>
          <WhiteSpace size={"lg"}/>
          <Button onClick={this.handleRegister} type={"primary"}>Register</Button>
        </WingBlank>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    msg: state.user.msg,
    redirectTo: state.user.redirectTo
  };
};

// const mapDispatchToProps = (dispatch) => {
//   handleRegister: () => dispatch(register())
// };

export default connect(mapStateToProps)(Register);
