import React from 'react';
import Styles from "./ReactionRateStyles";

class ReactionRateClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            state: 'waiting',

            msg: '클릭해서 시작하세요',
            result: [],
        }
    }

    timeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const { state, msg, result } = this.state;
        if(state === 'waiting') {
            this.setState({
                state: 'ready',
                msg: '초록색이 되면 클릭하세요.',
            })
            this.timeout = setTimeout(()=>{
                this.setState({
                    state: 'now',
                    msg: '지금 클릭하세요.',
                })  



            }, Math.floor(Math.random()*1000) + 2000) // 2~3초 랜덤
            this.startTime = new Date();
        } else if (state === 'ready') { // 성급하게 클릭
            clearTimeout(this.timeout)
            this.setState({
                state: 'waiting',
                msg: '성급하시군요, 초록색이 된 후에 클릭하세요',
            })  
        } else if (state === 'now') { // 반응속도 체크
            this.endTime = new Date();
            this.setState((prevState)=>{
                return {
                    state: 'waiting',
                    msg: '클릭해서 시작하세요',
                    result: [...prevState.result, this.endTime - this.startTime],
                }
            })  
        }

    }



    onReset = () => {
        this.setState((prevState)=>{
            return {
                result: [],
            }
        })  
    }

    renderAverage = () => {
        const { result } = this.state;
        return result.length === 0 
        ? null
        : <div>평균시간: {result.reduce((a, c) => a + c) / result.length}ms <button onClick={this.onReset} className="ant-btn">리셋</button></div>
            
    }
    
    render() {
        return (
           <Styles>
                <h1>반응속도 : 조건문, 변경할 클래스를 state에 정의, setTimeout, clearTimeout</h1>
                <p className="mb10">render의 return(), 즉 jsx 안에서 for문과 if문을 사용하지 않는다. 사용은 가능하나 코드가 지저분해짐. <br />map과 삼항연산자, 보호연산자를 주로 쓴다..</p>
                <div 
                    id="screen"
                    className={this.state.state}
                    onClick={this.onClickScreen}
                >{this.state.msg}
                </div>
                {/* 삼항연산자. */}
                {/* {
                    this.state.result.length === 0 



                    ?  null 
                    : <div>평균시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
                } */}
                {/* 보호연산자 (조건 && 실행) */}
                {/* {
                    this.state.result.length !== 0 
                    && <div>평균시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
                } */}
                {/* 메서드로 분리 */}
                {this.renderAverage()}
                {/* 자바스크립트 내에서 if 문 사용 */}
                {/* { }를 열고 함수를 넣은 뒤 내부에 if문을 넣는다. 그리고 ()()로 감싸 즉시 실행 함수로 만든다. */}
                {/* {(() => {
                    if(this.state.result.length === 0) {
                        return null;
                    } else {
                        <div>평균시간: {result.reduce((a, c) => a + c) / result.length}ms <button onClick={this.onReset} className="ant-btn">리셋</button></div>



                    }
                })()}
                 */}
           </Styles>
        );
    }
}

export default ReactionRateClass;
