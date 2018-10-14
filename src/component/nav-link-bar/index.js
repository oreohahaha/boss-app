import React, {Component} from 'react';
import {TabBar} from 'antd-mobile';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';


class NavLinkBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  componentWillReceiveProps(nextProps) {

  }
  render() {
    const pathname = this.props.location.pathname;
    const navList = this.props.data.filter(item => !item.hide);

    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={this.state.hidden}
        tabBarPosition={"bottom"}
      >
        {navList.map(item => {
          return (
            <TabBar.Item
              title={item.title}
              key={item.path}
              badge={2}
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(/assets/tab-bar/${item.icon}.png) center center /  21px 21px no-repeat`
                }}/>
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(/assets/tab-bar/${item.icon}-active.png) center center /  21px 21px no-repeat`
                }}
                />
              }
              selected={item.path === pathname}
              onPress={() => {
                this.props.history.push(item.path);
              }}
            >
            </TabBar.Item>
          )
        })}
      </TabBar>
    )
  }
}

NavLinkBar.propTypes = {
  data: PropTypes.array.isRequired
};

export default withRouter(NavLinkBar);
