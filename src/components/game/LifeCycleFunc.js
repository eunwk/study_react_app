import React, { useState } from "react";


//class LifeCycleClass extends React.PureComponent {
const LifeCycleFunc = () => {
    const [counter, setCounter] = useState(true);

    const onClick1 = () => {
       
        setCounter((prevState) => {
            console.log("prevState : ", typeof prevState);
            return !prevState
        }) // 렌더링됨.
            
        //setCounter(!counter) // 렌더링됨.
    }

    const onClick2 = () => {
        // setCounter를 할 필요가 없음.
    }

    console.log("렌더링", counter);
        return (



            <div>
             <h1>성능향상 : Hooks와 성능향상</h1>
            <p>- <span className="fc-red">react dev tool</span>의 설정 &gt; Highlight updates when components render. 를 체크해 두면 state가 바뀔 때 렌더링이 일어나는 요소를 체크할 수 있다.</p>
            <p>- Class Component의 <span className="fc-red">shouldComponentUpdate</span>와 다르게 function Component의 hooks는 변경된 사항이 없으면 setState를 할 필요도 없다.</p>
            <p className="mb10">- 자식 컴포넌트에 <span className="fc-red">memo</span>를 적용하면 변경될 렌더 호출시 마다 자식컴포넌트가 모두 렌더링 되는 현상을 막을 수 있다. 야구게임의 BaseballFunc_Try 참고</p>
            <button className="ant-btn" onClick={onClick1}>state 변경이 있을 때</button>
            <button className="ant-btn" onClick={onClick2}>state 변경이 없을 때는 setState를 할 필요가 없으므로 패쓰</button>
        </div>
        )
}


export default LifeCycleFunc;
