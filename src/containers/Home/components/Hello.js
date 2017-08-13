import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class Hello extends Component {
  state = {
    count: 1,
  };
  addCount = () => {
    this.setState({
      count: this.state.count += 1,
    });
  };

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.addCount}>add count</button>
        <Button color="danger">reactstrap button</Button>

      </div>
    );
  }
}

/* 1. 此專案使用airbnb，會強制檢查語法，不符合時，則會無法存檔  "extends": "airbnb", (package.json)
 * 2. 此專案使用es6的function，要用箭頭方法，例如︰ functionName = () => { 你的code }
 */

