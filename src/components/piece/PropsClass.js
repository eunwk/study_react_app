import React from "react";

class PropsClass extends React.PureComponent {
    
  constructor(props) {   
      super(props);
      console.log("this.props: ", this.props);
      // constructor를 사용하면 constructor를 자체가 함수이므로 내부에서 다른 작업을 할 수 있다.
      this.state = {
          counter : this.props.counter,
          text : this.props.text,
      }
  }  
    onClick1 = () => {
        this.setState({
            counter : false,

            text : "변경됐다."
        })
    }

    render() {
        
        return (
            <div>
                <p className="fwb">자식요소</p>
                <div>counter: {this.state.counter.toString()}, text: {this.state.text}</div>
                <button className="ant-btn" onClick={this.onClick1}>자식요소의 props 변경</button>
             </div>
        )
    }
}

export default PropsClass;
