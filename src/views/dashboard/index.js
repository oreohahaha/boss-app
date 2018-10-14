import React, {Component} from 'react';
import { NavBar, TabBar } from 'antd-mobile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavLinkBar from './../../component/nav-link-bar';


class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }



  componentWillMount() {
    // console.log(this.props)
  }
  render() {
    const type = this.props.type;
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: 'Boss',
        hide: type === 'genius'
      },
      {
        path: '/genius',
        text: '牛人',
        icon: 'job',
        title: 'boss列表',
        component: 'Genius',
        hide: type === 'boss'
      },
      {
        path: '/message',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: 'Msg',
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: 'User',
      }
    ];

    const pathname = this.props.location.pathname;
    return (
      <div>
        <NavBar
          mode="dark"
        >{navList.find(item => item.path === pathname).title}</NavBar>
        {this.props.children}
        <NavLinkBar
          data={navList}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    type: state.user.type
  }
};

export default withRouter(connect(mapStateToProps)(DashBoard))
