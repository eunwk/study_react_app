import React from 'react';
import Styles from "./LottoStyles";
import Ball from "../piece/BallClass";


function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v,i) => i+1);  // 배열에 1부터 ~ 45까지 숫자 넣기
   // console.log(candidate);
    const shuffle = [];
    while(candidate.length > 0) {
        // splice는 배열을 반환하므로 배열의 값을 꺼내기 위해 [0]을 붙여줌.
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    // console.log(shuffle); // 랜덤한 순서로 candidate의 숫자가 들어었는 배열
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((a, b) => a - b);
    return [...winNumbers, bonusNumber];

}


class LottoClass extends React.Component {
    state = {
        winNumbers: getWinNumbers(), // 당첨숫자들 [4, 7, 20, 21, 36, 44, 5]
        winBalls: [],
        bonus : null,
        redo : false,
    }

    timeouts = [];

    runTimeouts = () => {
        const { winNumbers } = this.state;
        for (let i = 0; i < this.state.winNumbers.length -1; i++) {
            this.timeouts[i] = setTimeout(()=>{
                this.setState((prevState) => {
                    console.log("prevState", prevState.winBalls);  // 배열상태 [4,2]
                    console.log("prevState", ...prevState.winBalls); // 배열이 풀린 상태 4, 2



                    // console.log("...prevState", [...prevState]);
                    return {
                        winBalls : [...prevState.winBalls, winNumbers[i]],
                    };
                });
            }, (i + 1) * 1000) //볼이 1, 2, 3, 4.. 초에 각 하나씩 등장.
        }

        this.timeouts[6] = setTimeout(()=>{
            this.setState({
                bonus: winNumbers[6],
                redo: true,
            });
        }, 7000)
    }

    componentDidMount() {
        this.runTimeouts();

    }

    componentDidUpdate(prevProps, prevState) {
        // 바뀐값 인식 방법1 .state 바뀐값 바로 체크
        // if(this.state.winBalls.length === 0 ) {
        //     this.runTimeouts(); 
        // }

       // 이전 state와 현재 state 비교
       if(prevState.winNumbers !== this.state.winNumbers) {
            this.runTimeouts(); 
       }
    }

    componentWillUnmount() {
        //setTimeout이 실행되지 않았는데 컴포넌트가 unmount 되었을 때 불필요한 timeout 제거
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        })
    }


   

onClickRedo = () => {
        this.setState({
            winNumbers: getWinNumbers(), 
            winBalls: [],
            bonus : null,
            redo : false,
        });
        this.timeouts = [];
    }

    render() {
        const { winBalls, bonus, redo } = this.state;
        
        return (
           <Styles>
              <h1>Lotto: setTimeout 여러번 사용하기, setTimeout과 clearTimeout,  배열을 리턴하는 함수, Array(45).fill().map,  배열(Splice, Slice)</h1>
              <p>shuffle: 숫자를 중복되지 않게 랜덤으로 뽑아내기</p>
              <p className="mb10">onClick에 조건문 넣기</p>


              {/* <p>{num.join(", ")}</p> */}
              <p>당첨숫자</p>
              <div id="결과창" className="mb10">
                  {
                    winBalls.map((v) => <Ball key={v} number={v} />)
                  }
              </div>
              <p>보너스</p>
              <div className="mb10">
                  { bonus && <Ball number={bonus} /> }
              </div>
              {
                  redo && <button className="ant-btn" onClick={this.onClickRedo}>한번더!</button>
              }
              
           </Styles>
        );
    }
}

export default LottoClass;
