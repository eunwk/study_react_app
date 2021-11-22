import React, {useState} from "react";

const PropsFunc = (props) => {   
  //  props.text = "hello"; 부모로 받은 props를 직접 바꿀수 없다.
   console.log("props: ", props); 
   const [counter, setCounter] = useState(props.counter);
   const [text, setText] = useState(props.text);
   const onClick = () => {
        setCounter(false);
        setText("변경됐다");
    }      
    return (
        <div>
            <p className="fwb">자식요소</p>
            <div>counter: {counter.toString()}, text: {text}</div>
            <button className="ant-btn" onClick={onClick}>자식 요소의 props 변경</button>
       </div>
    )
}

export default PropsFunc;
