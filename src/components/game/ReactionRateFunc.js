import React, { useState, useRef } from 'react';
import Styles from "./ReactionRateStyles";

const ReactionRateClass = () => {
    const [state, setState] = useState('waiting');
    const [msg, setMsg] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]);

    // useRef 는 Dom을 컨트롤 할때,



    // state와 다르게 값이 바뀌어도 render가 다시 실행되지 않는다. 화면을 바꾸고 싶지 않은데. 값이 바뀌어야 하는 경우 Ref를 사용
    // timeout이나 interval 등은 Ref에 넣어 사용한다.
    const timeout = useRef(null);
    const startTime = useRef()
    const endTime = useRef()

    const onClickScreen = () => {
        if(state === 'waiting') {
            setState("ready");
            setMsg('초록색이 되면 클릭하세요.');
            timeout.current = setTimeout(()=>{
                setState("now");
                setMsg('지금 클릭하세요');
            }, Math.floor(Math.random()*1000) + 2000) // 2~3초 랜덤
            startTime.current = new Date();
        } else if (state === 'ready') { // 성급하게 클릭
            clearTimeout(timeout.current);
            setState("waiting");
            setMsg('성급하시군요, 초록색이 된 후에 클릭하세요');



        } else if (state === 'now') { // 반응속도 체크
            endTime.current = new Date();
            setState("waiting");
            setMsg('클릭해서 시작하세요');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current]
            });
       
        }
    }

    const onReset = () => {
        setResult([]);
    }

    const renderAverage = () => {
        return result.length === 0 
        ? null
        : <div>평균시간: {result.reduce((a, c) => a + c) / result.length}ms <button onClick={onReset} className="ant-btn">리셋</button></div>
            
    }


    
    return (
        <Styles>
            <h1>반응속도 : 조건문, 변경할 클래스를 state에 정의, setTimeout, clearTimeout, useRef의 또다른 사용</h1>
            <p>render의 return(), 즉 jsx 안에서 for문과 if문을 사용하지 않는다. 사용은 가능하나 코드가 지저분해짐. <br />map과 삼항연산자, 보호연산자를 주로 쓴다..</p>
            <p className="mb10">timeout이나 interval 과 관련된 변수 등은 Ref에 넣어 사용한다.</p>
            <div 
                id="screen"
                className={state}
                onClick={onClickScreen}
            >{msg}
            </div>
            {/* 삼항연산자. */}
            {/* {
                result.length === 0 
                ?  null 



                : <div>평균시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
            } */}
            {/* 보호연산자 (조건 && 실행) */}
            {/* {
                result.length !== 0 
                && <div>평균시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
            } */}
            {/* 메서드로 분리 */}
            {renderAverage()}
            
        </Styles>
    );
}

export default ReactionRateClass;
