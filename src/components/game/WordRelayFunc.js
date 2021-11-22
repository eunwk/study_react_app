/* WordRelayFunc.js */
import React, { useRef, useState } from "react";
import { Space } from "antd";
// import Styles from "./ClassComponentStyles";

const WordRelayClass = () => {

  const [word, setWord] = useState("박은희");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setWord(value);
      setValue("");
      setResult("딩동댕");
    } else {
      setValue("");
      setResult("땡");
    }
    inputRef.current.focus();
  };



  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <h1>끝말잇기</h1>
      <div>{word}</div>
      <form onSubmit={onSubmit}>
        <Space>
          <input type="text" ref={inputRef} value={value} onChange={onChange} />
          <button className="ant-btn">입력</button>
        </Space>
      </form>
      <div>{result}</div>
    </div>
  );
};

export default WordRelayClass;
