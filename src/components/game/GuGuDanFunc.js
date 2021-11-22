import React, { useState, useRef } from "react";
import { Space } from "antd";
// import Styles from "./FunctionComponentStyles";




export const GuGuDanFunc = () => {
    //useState는 함수 안에 존재 해야 한다. 함수 밖으로 빼면 안됨.
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();

        if (parseInt(value) === first * second) {        
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');

            //setResult(`정답: ${first} 곱하기 ${second} = ${value}`)
            //이전 value 값을 취하기 위해 함수를 넣고 return 한다.
            setResult((prevResult) => {
               console.log(prevResult)
               return `정답: ${first} 곱하기 ${second} = ${value}`
            });
        } else {
            setValue('');
            setResult("땡");
        }
        inputRef.current.focus();
      
    }
  
    const onChange = (e) => {
        setValue(e.target.value);
    }


    return (

        <div>
           <h1>구구단 : useState(Hooks)를 이용하기, useRef를 이용한 참조</h1>
              <div>{first}곱하기{second}은?</div>
              <form onSubmit={onSubmit}>
                  <Space>
                    <input type="number" ref={inputRef} onChange={onChange} value={value} />
                    <button className="ant-btn">입력</button>
                  </Space>
              </form>
              <div>{result}</div>
        </div>
    );
}


export default GuGuDanFunc;
