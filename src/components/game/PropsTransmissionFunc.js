import React from "react";
import PropsFunc from '../piece/PropsFunc'

//class LifeCycleClass extends React.PureComponent {
const PropsTransmissionFunc = () => {

    const counter = true;
    const text = "what?"

    return (
        <div>
            <h1>부모자식 컴포넌트간 props 전달, 자식요소에서 props 변경</h1>
            <p className="fwb">부모요소</p>


            <div>counter : {counter.toString()}, text: {text}</div>
            <PropsFunc text={text} counter={counter} />
        </div>
    )
}


export default PropsTransmissionFunc;
