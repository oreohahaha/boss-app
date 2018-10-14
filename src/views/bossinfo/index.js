import React, {Component} from 'react';
import { NavBar, Button, InputItem, TextareaItem } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { update } from './../../redux/user/redux';
import AvatarSelector from './../../component/avatarselector';

class BossInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      company: '',
      money: '',
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
        <NavBar mode="dark">BOSS完善信息页面</NavBar>
        <AvatarSelector selectAvatar={this.selectAvatar}/>
        <InputItem
          onChange={(v) => this.onChange("company", v)}
        >公司名称</InputItem>
        <InputItem
          onChange={(v) => this.onChange("title", v)}
        >招聘职位</InputItem>
        <InputItem
          onChange={(v) => this.onChange("money", v)}
        >职位薪资</InputItem>
        <TextareaItem
          title={"职位要求"}
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
export default connect(mapStateToProps)(BossInfo);
