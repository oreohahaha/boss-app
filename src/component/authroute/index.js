import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadData } from './../../redux/user/redux';

import axios from 'axios';

class AuthRoute extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props.isAuth);
    const publicList = ['/login', '/register'];
    const pathname = this.props.location.pathname;
    if (publicList.indexOf(pathname) > -1) {
      return null
    }
    // 获取用户信息
    axios.get('/user/info').then(res =>{
      if (res.status === 200) {
        if (res.data.code === 0) {
          // 有登录信息
          let data = res.data.result;
          this.props.dispatch(loadData(data));
        } else {
          // 没有登录信息
          this.props.history.push('/login');
        }
        // console.log(res.data);
      }
    })

    // 是否登录

    // 现在的url地址

    // 用户的type 是boss还是牛人

    // 用户是否完善信息（选择头像 个人简介）

  }

  render() {
    return null;
  }
}
const mapStateToProps = state => {
  return {
    isAuth: state.user.isAuth
  }
};

export default connect(mapStateToProps)(withRouter(AuthRoute));
