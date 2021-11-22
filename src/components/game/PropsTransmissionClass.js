import React from 'react';
import PropsClass from '../piece/PropsClass'

//class LifeCycleClass extends React.PureComponent {
class PropsTransmissionClass extends React.Component {
    state = {
        counter : true,
        text : "what??",
    }  

    render() {
        return (
            <div>
                <h1>부모자식 컴포넌트간 props 전달, 자식요소에서 props 변경</h1>
                <p className="fwb">부모요소</p>
                <div>counter : {this.state.counter.toString()}, text: {this.state.text}</div>
                <PropsClass text={this.state.text} counter={this.state.counter} />
            </div>
        )
    }

}



export default PropsTransmissionClass;
