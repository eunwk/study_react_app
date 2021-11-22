import React from "react";


//class LifeCycleClass extends React.PureComponent {
class LifeCycleClass extends React.Component {
    state = {
        counter : true,
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps, nextState);
        if(this.state.counter !== nextState.counter) {
            // console.log("바뀜");
            return true; // 렌더링 함.
        }
       // console.log("안바뀜"); 
        return false;  // 렌더링 하지 않음.
    }




    onClick1 = () => {
       // this.setState( {counter : !this.state.counter} ); // 변하는 내용이 있으면 render 실행
        this.setState((prevState) => {
            return {
                counter : !prevState.counter
            }
        })
        
    }

    onClick2 = () => {
         this.setState( {} ); // 변하는 내용이 없으면 render 실행하지 않음.
    }

    render() {
    console.log("렌더링", this.state);
    return (
        <div>
            <h1>성능향상 : PureComponent와 shouldComponentUpdate</h1>
            <p>- <span className="fc-red">react dev tool</span>의 설정 &gt; Highlight updates when components render. 를 체크해 두면 state가 바뀔 때 렌더링이 일어나는 요소를 체크할 수 있다.</p>
            <p>- <span className="fc-red">shouldComponentUpdate</span>를 넣어 렌더링 여부를 지정할 수 있다. shouldComponentUpdate가 있으면 버튼을 클릭해도 render가 실행되지 않는다.</p>


            <p>- 컴포넌트를<span className="fc-red">PureComponent</span>로 변경하면 shouldComponentUpdate가 없어도 변경된 내용이 있을 때만 렌더링 하도록 작동한다.<br />
            단, state 에 배열이나 객체가 있을 경우 내부에 되도록 중첩(객체,배열)을 사용하지 않는다. 내부의 state 까지 변경되지 않으면 render가 일어나지 않는다.</p>
            <p className="mb10">- shouldComponentUpdate 가 필요한 경우 PureComponent가 아닌 일반 Component를 사용한다.</p>
            <button className="ant-btn" onClick={this.onClick1}>state 변경이 있을 때</button>
            <button className="ant-btn" onClick={this.onClick2}>state 변경이 없을 때</button>
        </div>
    )
    }
}


export default LifeCycleClass;
