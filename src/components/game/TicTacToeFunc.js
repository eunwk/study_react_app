/* TicTacToeFunc.js */


import React, { useEffect, useReducer, useCallback } from "react";
import Styles from "./TicTacToeStyles";
import Table from "../piece/TicTacToeTable";

const initalState = {
  winner: "",
  turn: "O",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ],
  recentCell: [-1, -1]
};

// type값을 상수수로 빼놓는게 좋다.
// 액션의 이름은 대문자로 한다.
// 여러군데서 쓸수 있도록 export 한다.
export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";


export const CHANGE_TURN = "CHANGE_TURN";
export const RESET_GAME = "RESET_GAME";

const reducer = (state, action) => {
  // 액션을 dispatch 할 때마다 reducer 부분이 실행된다.
  switch (action.type) {
    // state.winner = action.winner   //state를 직접 바꾸면 안된다. 새로운 객체를 만들어 바뀐값만 바꿔주어야 한다.
    case SET_WINNER:
      return {
        ...state, //기존 state 얕은 복사
        winner: action.winner // 바뀔 부분만 바꾸어 줌.
      };
    case CLICK_CELL: {
      //기존 tableData의 값 얕은 복사
      console.log("CLICK_CELL");
      const tableData = [...state.tableData];

      tableData[action.row] = [...tableData[action.row]]; //불변성을 위한 얕은복사 //immer라는 라이브러리로 가독성 해결 가능.
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell]
      };
    }
    case CHANGE_TURN: {
      console.log("CHANGE_TURN", state.turn);
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O"
      };
    }
    case RESET_GAME: {
      return {
        ...state,


        turn: "O",
        tableData: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""]
        ],
        recentCell: [-1, -1]
      };
    }
    default:
      return state;
  }
};

const TicTacToeFunc = () => {
  const [state, dispatch] = useReducer(reducer, initalState);
  const { tableData, turn, winner, recentCell } = state; //구조분해
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);


  // 승자 확인. cell을 눌러 recentCell이 바뀔 때 마다 호출
  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) {
      return;
    }
    let win = false; //승자 없음
    // 가로 검증
    if (
      tableData[row][0] === turn &&
      tableData[row][1] === turn &&
      tableData[row][2] === turn
    ) {
      win = true;
    }
    // 세로 검증
    if (
      tableData[0][cell] === turn &&
      tableData[1][cell] === turn &&
      tableData[2][cell] === turn
    ) {
      win = true;

    }
    // 대각선 검증
    if (
      tableData[0][0] === turn &&
      tableData[1][1] === turn &&
      tableData[2][2] === turn
    ) {
      win = true;
    }

    if (
      tableData[0][2] === turn &&
      tableData[1][1] === turn &&
      tableData[2][0] === turn
    ) {
      win = true;
    }
    console.log(win, tableData);
    if (win) {

      //승리시
      dispatch({ type: SET_WINNER, winner: turn });
    } else {
      //승리 없으면 다음 턴, 다 찼으면 무승부
      // 칸이 다 차 있으면 무승부
      let all = true;
      tableData.forEach((row) => {
        row.forEach((cell) => {
          //비어있는 셀이 있으면 무승부가 아님
          if (!cell) {
            all = false;
          }
        });
      });
      //무승부이면
      if (all) {
        dispatch({ type: RESET_GAME });
      } else {
        dispatch({ type: CHANGE_TURN });
      }


    }
  }, [recentCell]);

  return (
    <Styles>
      <h1>
        틱택톡 : useReducer, useCallback, 여러뎁스 이상 부모 자식 요소 간
        이벤트, props 전달, 변수의 export
      </h1>
      <p>변수를 export 하여 하위 컴포넌트에서 사용할 수 있다.</p>
      <Table tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
    </Styles>
  );
};

export default TicTacToeFunc;
