import React, {Component} from 'react';
import './logo.less';

class Logo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"logo-container"}>
        <img src="/assets/job.png" alt="logo"/>
      </div>
    )
  }
}

export default Logo;
