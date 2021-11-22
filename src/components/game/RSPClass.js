/*RSPClass.js*/
import React from "react";
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

// 클래스 컴포넌트
//-> constructor -> render -> ref -> componentDidMount
// setState, props 바뀔 때 -> shuldComponentUpdate -> render => componentDidUpdate
// 컴포넌트가 사라질 때  -> componentWillUnmount -> 소멸
class RSPClass extends React.Component {
  state = {
    result: "",
    imgCoord: "0",
    score: 0
  };

  interval;

  componentDidMount() {
    console.log("componentDidMount : 컴포넌트 첫 렌더링");
    // const { imgCoord } = this.state; 밖에 두면 interval 안에서 해당 값을 참조할 수 없다.
    // 비동기 요청 많이 함. setInterval
    // return this.interval = setInterval(this.changeHand, 100);

  }

  shuldComponentUpdate() {
    //  console.log("shuldComponentUpdate : 컴포넌트 업데이트(렌더링) 전");
    return (this.interval = setInterval(this.changeHand, 100));
    // retrun ture 일 경우에만 리렌더링 됨. false이면 리렌더링 되지 않음.
  }

  componentDidUpdate() {
    //   console.log("componentDidUpdate : 컴포넌트 업데이트(렌더링) 후. 최초 렌더링에서는 호출되지 않음.");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount : 컴포넌트 제거되기 직전");
    // 비동기 요청 제거 많이 함. clearInterval
    // 제거해주지 않으면 컴포넌트가 unmount 되어 화면에 나타나지 않아도 계속 setInterval이 발행함.
    clearInterval(this.interval);
  }


  start = () => {
    this.interval = setInterval(this.changeHand, 100);
  };

  changeHand = () => {
    // 비동기 함수(Interval)안에서 imgCoord 바깥 변수를 참조할 수 없다. 클로저 문제
    const { imgCoord } = this.state;
    // console.log("imgCoord", imgCoord)
    // console.log("repCoords.바위", repCoords.바위)
    if (imgCoord === repCoords.바위) {
      this.setState({
        imgCoord: repCoords.가위
      });
    } else if (imgCoord === repCoords.가위) {
      //가위
      this.setState({
        imgCoord: repCoords.보
      });
    } else if (imgCoord === repCoords.보) {

      //보
      this.setState({
        imgCoord: repCoords.바위
      });
    }
  };

  onClickBtn = (choice) => {
    const { imgCoord } = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    console.log(myScore);

    if (diff === 0) {
      this.setState({
        result: "비겼습니다."
      });

    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: "이겼습니다....",
          score: prevState.score + 1
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: "졌습니다...",
          score: prevState.score - 1
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 100);
    }, 1000);
  };

  render() {
    // console.log("가위바위보 렌더")


    const { result, imgCoord, score } = this.state;
    return (
      <Styles>
        <h1>
          가위바위보: LifeCycle / setInterval, clearInterval, setTimeout 과
          컴포넌트 생애주기.
        </h1>
        <p>
          <span className="fc-blue">비동기 요청(setInterval)</span> 등은 주로
          <span className="fc-red"> componentDidMount</span>에서 지정하고
          <span className="fc-red"> componentWillUnmount</span>에서
          clearInterval한다.
        </p>
        <p>
          componentDidMount, shuldComponentUpdate, componentDidUpdate,
          componentWillUnmount는 클래스 내 다른 메서드와 다르게 화살표 함수 없이
          다음과 같이 사용된다.
          <br /> componentWillUnmount() &#123; ... &#125;
        </p>
        <div
          id="computer"
          style={{
            background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`
          }}
        />
        <div>
          <button className="ant-btn" onClick={this.start}>
            스타트
          </button>
          <button
            id="rock"
            className="ant-btn"
            onClick={() => this.onClickBtn("바위")}
          >
            바위
          </button>
          <button
            id="scissor"
            className="ant-btn"


            onClick={() => this.onClickBtn("가위")}
          >
            가위
          </button>
          <button
            id="paper"
            className="ant-btn"
            onClick={() => this.onClickBtn("보")}
          >
            보
          </button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </Styles>
    );
  }
}

export default RSPClass;