/* RSPFunc.js */

import React, { useState, useRef, useEffect } from "react";
import Styles from "./RSPStyles";

const repCoords = {
  바위: "0",
  가위: "-142px",
  보: "-284px"
};

const scores = {
  //나 가위일 때.                 주먹일때               보일때
  가위: 1, // 1 - 1  0  비김    0 - 1 = -1 이김        (-1) - 1 = -2  짐
  바위: 0, // 1 - 0  1   짐    0 - 0  = 0 비김         (-1) - 0 = -1 이김
  보: -1 // 1-(-1) = 2  이김  0 - (-1) = 1 짐         (-1)  - (-1)  = 0  비김
};

// 컴퓨터의 현재 손 체크
const computerChoice = (imgCoord) => {
  return Object.entries(repCoords).find(function (v) {
    return v[1] === imgCoord;

  })[0];
};

const RSPFunc = () => {
  const [result, setResult] = useState("");
  const [imgCoord, setImgCoord] = useState(repCoords.바위);
  const [score, setScore] = useState(0);
  const interval = useRef(null);

  // componentDidMount, ComponentDidUpdate
  useEffect(() => {
    // unmount 될 때 clear
    interval.current = setInterval(changeHand, 100);
    // console.log("업데이트 때마다 실행");

    // componentWillUnmount
    return function () {
      clearInterval(interval.current);
      //console.log("업데이트 때마다 계속 clean up : component. unmount");
    };

  }, [imgCoord]);

  const start = () => {
    // 스타트 누르면 실행
  };

  // useEffect(() => {

  // }, [imgCoord]);

  const changeHand = () => {
    if (imgCoord === repCoords.바위) {
      setImgCoord(repCoords.가위);
    } else if (imgCoord === repCoords.가위) {
      //가위
      setImgCoord(repCoords.보);
    } else if (imgCoord === repCoords.보) {
      //보
      setImgCoord(repCoords.바위);
    }
  };

  const onClickBtn = (choice) => () => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;

    if (diff === 0) {
      setResult("비겼습니다.");
    } else if ([-1, 2].includes(diff)) {
      setResult("이겼습니다.");
      setScore((prevScore) => {
        return prevScore + 1;
      });
    } else {
      setResult("졌습니다.");
      setScore((prevScore) => {
        return prevScore - 1;
      });
    }
    setTimeout(() => {

      interval.current = setInterval(changeHand, 100);

    }, 2000);

  };

  return (
    <Styles>
      <h1>
        가위바위보: LifeCycle / setInterval, clearInterval, setTimeout 과
        컴포넌트 생애주기. useEffect, Ref의 또다른 방식 참조
      </h1>

      <div
        id="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`
        }}
      />
      <div>
        <button className="ant-btn" onClick={start}>
          스타트
        </button>
        <button id="rock" className="ant-btn" onClick={onClickBtn("바위")}>
          바위


        </button>
        <button id="scissor" className="ant-btn" onClick={onClickBtn("가위")}>
          가위
        </button>
        <button id="paper" className="ant-btn" onClick={onClickBtn("보")}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </Styles>
  );
};

export default RSPFunc;
