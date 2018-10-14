import React, {Component} from 'react';
import { Grid, List } from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const avatarList = ['ava0', 'ava1', 'ava2','ava3','ava4','ava5','ava6','ava7','ava8','ava9','ava10','ava11'];
    let data = avatarList.map(item => ({
      icon: `/assets/${item}.png`,
      text: item
    }));
    const gridHeader = this.state.text
                      ? (<div>
                          <span>{`已经选择：${this.state.text}`}</span>
                          <img style={{ width: 19  }} src={this.state.icon} alt={this.state.text}/>
                        </div>)
                      : (<div>请选择头像</div>);
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid
            data={data}
            activeStyle={false}
            onClick={ele => {
              this.setState(ele);
              this.props.selectAvatar(ele.text)
            }}
          />
        </List>
      </div>
    )
  }
}
AvatarSelector.propTypes = {
  selectAvatar: PropTypes.func.isRequired
};

export default AvatarSelector;
