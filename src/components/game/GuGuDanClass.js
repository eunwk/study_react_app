import React from "react";
import { Space } from "antd";
// import Styles from "./ClassComponentStyles";



class GuGuDanClass extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
        first: Math.ceil(Math.random() * 9),
        second: Math.ceil(Math.random() * 9),
        value: '',
        result: '',
    };
}


  onSubmit = (e) => {
      e.preventDefault();
      if (parseInt(this.state.value) === this.state.first * this.state.second) {
          // this.setState({
          //     first: Math.ceil(Math.random() * 9),
          //     second: Math.ceil(Math.random() * 9),
          //     value: '',
          //     result: '정답',
          // })

          this.setState((prevState) => {
              return {

                  first: Math.ceil(Math.random() * 9),
                  second: Math.ceil(Math.random() * 9),
                  value: '',
                  result: `정답: ${prevState.first} 곱하기 ${prevState.second} = ${prevState.value}`,
              }
          })

      } else {
          this.setState({
              value: '',
              result: '떙',
          })
      }
      this.input.focus();
  }

  onChange = (e) => {
      this.setState({ value: e.target.value })
  }

  //변수 선언. const input으로 선언하면 에러가 남.
  input; 

  onRefInput = (e) => { this.input = e }

  render() {
      return (
          <div>
            <h1>구구단 : setState를 이용해 이전 State 값 얻기, Ref를 이용한 참조</h1>
              <div>{this.state.first}곱하기{this.state.second}은?</div>
              <form onSubmit={this.onSubmit}>
                  <Space>
                    <input type="number" ref={this.onRefInput} name="num" value={this.state.value} onChange={this.onChange} />
                    <button className="ant-btn">입력</button>
                  </Space>
              </form>
              <div>{this.state.result}</div>
          </div>
      )
  }
}

export default GuGuDanClass;
