import React, {Component} from 'react';
import { NavBar, Button, InputItem, TextareaItem } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { update } from './../../redux/user/redux';
import AvatarSelector from './../../component/avatarselector';

class GeniusInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: '',
      avatar: ''
    };
    this.selectAvatar = this.selectAvatar.bind(this);
  }
  componentWillMount() {

  }

  onChange(k, v) {
    this.setState({
      [k]: v
    })
  }

  selectAvatar(imageName) {
    this.setState({
      avatar: imageName
    })
  }
  handleSubmit() {
    console.log(this.props.redirectTo);
    this.props.dispatch(update(this.state))
  }

  render() {

    return (
      <div>
        {
          this.props.redirectTo
            ? <Redirect to={this.props.redirectTo}></Redirect>
            : <h4>null</h4>
        }
        <NavBar mode="dark">牛人完善信息页面</NavBar>
        <AvatarSelector selectAvatar={this.selectAvatar}/>
        <InputItem
          onChange={(v) => this.onChange("title", v)}
        >求职岗位</InputItem>
        <TextareaItem
          title={"个人简介"}
          onChange={(v) => this.onChange("desc", v)}
          rows={3}
          autoHeight
        />
        <Button
          type={"primary"}
          onClick={() => this.handleSubmit()}
        >保存</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    redirectTo: state.user.redirectTo,
  }
};
export default connect(mapStateToProps)(GeniusInfo);
