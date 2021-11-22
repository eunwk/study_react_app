import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Styles from "./LottoStyles";
import Ball from "../piece/BallFunc";

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


const LottoFunc = () => { 
    // 함수형 컴포넌트는 새로 랜더링이 일어날 때 함수 전체가 다시 실행 된다.
    // getWinNumbers() 를 계속해서 호출하지 않도록 useMemo를 이용해 값을 기억한다. 두번째 인자로 빈 배열을 넣어준다.
    // const [winNumbers, setWinNumbers] = useState(getWinNumbers());
    const lottoNumbers = useMemo(()=> getWinNumbers(), [])
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    const runTimeouts = () => {


        for (let i = 0; i < winNumbers.length -1; i++) {
            timeouts.current[i] = setTimeout(()=>{

                setWinBalls((prevBalls) => {
                    return [...prevBalls, winNumbers[i]]
                })

            }, (i + 1) * 1000) //볼이 1, 2, 3, 4.. 초에 각 하나씩 등장.
        }

        timeouts.current[6] = setTimeout(()=>{
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000)
    }

    //componentDidMount
    useEffect(()=>{


        console.log("useEffect")
       runTimeouts();

        return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            })
        };
    }, [winNumbers])  // 배열에 값이 없으면 componentDidMount, 값이 있으면 componentDidMount + componentDidUpdate

    const onClickRedo = useCallback(() => {
        console.log("useCallback2");
        console.log(winNumbers); // 실행할때마다 변경되지 않고 동일한 값이 나옴. 
        //useCallback을 사용하면 기존 state 값 조차 기억해서 변경되지 않으므로
        //[] 배열안에 변경을 감지한 state를 넣어주어야 한다.
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);


        timeouts.current = [];
    }, [winNumbers])

        
    return (
        <Styles>
            <h1>Lotto: setTimeout 여러번 사용하기, setTimeout과 clearTimeout,  배열을 리턴하는 함수, Array(45).fill().map,  배열(Splice, Slice), useMemo, useCallback</h1>
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
                {/* 자식 컴포넌트에 onClick 이벤트가 있을 때 호출되는 함수는 useCallback을 반드시 사용해야 한다.
                그렇지 않으면 자식 컴포넌트가 생성 될 때마다 함수를 계속 재로드 하게 된다. */}
                { bonus && <Ball number={bonus} onClick={onClickRedo}/> }
            </div>
            {
                redo && <button className="ant-btn" onClick={onClickRedo}>한번더!</button>
            }
            
        </Styles>
    );
}

export default LottoFunc;

