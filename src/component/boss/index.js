import React, {Component} from 'react';
import axios from 'axios';

class Boss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    console.log("hhh")
    axios.get('/user/list?type=genius').then(res => {
      if (res.data.code === 0) {
        this.setState({
          data:res.data.result
        })
      }
    })
  }

  render() {
    return (
      <div>boss</div>
    )
  }
}

export default Boss;
