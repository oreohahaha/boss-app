import React, { Component } from 'react';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import Logo from './../../component/logo';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from './../../redux/user/redux';


class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: ''
    };
    this.register = this.register.bind(this);
    this.handleLogin = this.handleLogin.bind(this)
  }

  register() {
    this.props.history.push('/register')
  }
  handleChange(k, v) {
    this.setState({
      [k]: v
    })
  }
  handleLogin() {
    this.props.dispatch(login(this.state));
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
              onChange={(v) => this.handleChange("user", v)}
            >用户名</InputItem>
            <InputItem
              type={"password"}
              onChange={(v) => this.handleChange("password", v)}
            >密码</InputItem>
          </List>
          <WhiteSpace/>
          <Button onClick={this.handleLogin} type={"primary"}>Login</Button>
          <WhiteSpace/>
          <Button onClick={this.register} type={"primary"}>Register</Button>
        </WingBlank>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    msg: state.user.msg,
    redirectTo: state.user.redirectTo
  }
};

export default connect(mapStateToProps)(Login);
