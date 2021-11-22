/* WordRelayClass */
import React, { createRef } from "react";
import { Space } from "antd";


class WordRelayClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "박은희",
      value: "",
      result: ""
    };
  }

  inputRef = createRef();

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        word: this.state.value,
        value: "",
        result: "딩동댕"
      });


    } else {
      this.setState({
        value: "",
        result: "땡"
      });
    }
    this.inputRef.current.focus();
  };

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>끝말잇기, createRef를 이용한 참조</h1>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmit}>
          <Space>
            <input
              type="text"


              ref={this.inputRef}
              value={this.state.value}
              onChange={this.onChange}
            />
            <button className="ant-btn">입력</button>
          </Space>
        </form>
        <div>{this.state.result}</div>
      </div>
    );
  }
}

export default WordRelayClass;
