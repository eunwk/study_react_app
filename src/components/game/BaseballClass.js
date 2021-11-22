import React from "react";
import { Space } from "antd";
// import Styles from "./ClassComponentStyles";
import Baseball_Try from '../piece/BaseballClass_Try';



//숫자 네개를 겹치지 않고 랜덤하게 뽑는 함수
function getNumbers() {
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i = 0; i < 4; i++) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        // console.log(chosen, candidate);
        // 9 (8) [1, 2, 3, 4, 5, 6, 7, 8]
        // 4 (7) [1, 2, 3, 5, 6, 7, 8]
        // 3 (6) [1, 2, 5, 6, 7, 8]
        // 7 (5) [1, 2, 5, 6, 8]
        // splice(n,n)[0] 에서 [0]을 안붙일경우 잘라낸 숫자가 배열에 담긴 채로 반환 됨. 
        //[9] (8) [1, 2, 3, 4, 5, 6, 7, 8]
        array.push(chosen);
    }
     console.log("정답 : ", array.join('')); //[9,4,3,7]
    // console.log(array.join('')); //9368
    // console.log(typeof array.join(''));  //string
    return array;
}

class BaseballClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resualt: '',
            value: '',
            answer : getNumbers(), // ex [1, 3, 4,5]
            tries : [], 
            // 배열에 값을 추가할 때 push를 쓰지 않는다. 
            // push는 배열의 원본을 바꾸고, react는 원본이 바뀔 경우 arry === arry 는 true를 뱉으므로 render를 추가로 실행 하지 않는다.

            // arry == arry2  false가 나와야 (참조가 끊어져야) state의 변경을 인식하고 새로 render 한다.
        };
    }

   onSubmitForm = (e) => {
    e.preventDefault();
    if(this.state.value === this.state.answer.join('')) {  // [1,2,3,4].join  > "1234"
        // 정답이면
        this.setState((prevState)=>{ 
            return {
                resualt : "홈런",
                tries : [...prevState.tries, {try : this.state.value, resualt: "홈런"}],  // 배열에 값을 추가하는 방법 .push 대신 사용. [...기존값, 추가할 값]
            }
        })
        console.log("tries ", this.state.tries)
    } else {
        // 오답이면
        console.log("this.state.value", this.state.value); //1234


        const answerArray = this.state.value.split('').map((value) => parseInt(value)); 
        // .split('') : 연속된 숫자(문자)를 한글자씩 잘라 배열로 담음. 
        // 1234 -> ["1","2","3","4"] => string
        // parseInt(value) 를 사용하여 문자열을 숫자로 바꿈
        // console.log("answerArray ", answerArray); //[2, 1, 3, 3]
        let strike = 0;
        let ball = 0;
        if(this.state.tries.length >= 9) {
            this.setState({
                resualt : `10번 넘게 틀려서 실패. 답은 ${this.state.answer.join('')}`,
            })
            alert("게임을 다시 시작합니다.");  //이 코드가 10번넘게.... 보다 먼저 실행 됨.
            this.setState({
                value: '',
                answer : getNumbers(),
                tries : [], 

            })
        } else {
            for(let i=0; i<4; i++) {
                if(answerArray[i] === this.state.answer[i]) {
                    strike += 1;
                } else if (this.state.answer.includes(answerArray[i])) {
                    ball += 1;
                }
            }
            this.setState((prevState)=>{
                return {
                    tries: [...this.state.tries, {try : this.state.value, resualt: `${strike} 스트라이크, ${ball} 볼입니다.`}],
                    value: '',
                }
            })

            this.input.focus();
        }
    }

   }

   onChangeInput = (e) => {
       this.setState({value : e.target.value})
   }

    //변수 선언. const input으로 선언하면 에러가 남.
    input; 

    onRefInput = (e) => { this.input = e }


  render() {
      return (
          <div>
            <h1>야구게임: 자식 컴포넌트 분리와 props 전달, .map(배열순회)를 통한 엘리먼트 동적생성</h1>
            <div>{this.state.resualt}</div>
            <form onSubmit={this.onSubmitForm}>
                <Space>
                    <input type="number" ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
                    <button className="ant-btn">입력</button>

                </Space>
            </form>
            <div>시도횟수 : {this.state.tries.length}</div>
            <ul>
                {
                    this.state.tries.map((value, index)=> (
                       <Baseball_Try key={`${index + 1}차 시도`} tryInfo={value} index={index}/>
                    ))
                }
            </ul>
          </div>
      )
  }
}


export default BaseballClass;
