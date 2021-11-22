/*MineSearchFunc.js*/
import React, { useReducer, createContext, useMemo, useEffect } from 'react';
import Styles from "./MineSearchStyles";
import Table from "../piece/MineSearchTable";
import Form from "../piece/MineSearchForm";

export const CODE = {
    MINE: -7,
    NORMAL : -1,  //일반칸. 닫혀있는 칸
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,  //? + 지뢰
    FLAG_MINE: -5,      //깃발 + 지뢰
    CLICKED_MINE : -6,  //지뢰 밟은 경우
    OPENED: 0, //열려있는 빈 칸


}

// createContext가 함수라서 다음과 같이 실행하는 것.
export const TableContext = createContext(
   //초기값. 
    {
        tableData : [],
        halted: true, 
        dispatch: () => {},
    }
);

const initialState = {
    tableData: [],
    data: {
        row: 0,
        cell: 0,
        mine: 0,
    },
    timer: 0,
    result: '',
    halted: true, // 게임 중단 여부
    openedCount: 0,


}

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row*cell).fill().map((arr, i) => {
        return i;
    })
    console.log(candidate);  // [0,1,2, .... 99]  10*10이니까
    var shuffle = [];
    while(candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    console.log(shuffle);  //[13, 73, 12, 89, 36, 4, 22, 11, 23, 53] mine 갯수만큼 랜덤한 숫자가 뽑힘. 폭탄의 위치값. 13 은 1,3 좌표임.
    // 100개의 정상적인 칸을 생성.
    const data = [];
    for(let i=0; i<row; i++) {
        const rowData = [];
        data.push(rowData);
        for(let j=0; j<cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }
    //폭탄심기
    for(let k=0; k<shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);  //13/10 = 1
        const hor = shuffle[k] % cell;  // 13/10 의 나머지
        data[ver][hor] = CODE.MINE;
        // console.log(ver, hor) // 13은 각각 1, 3으로 쪼개짐.
    }
    console.log(data);
    // 0: (10) [-1, -1, -7, -7, -1, -1, -1, -1, -1, -7]

    // 1: (10) [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    // 2: (10) [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    // 3: (10) [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    // 4: (10) [-1, -1, -1, -1, -1, -1, -7, -1, -1, -1]
    // 5: (10) [-1, -1, -1, -7, -1, -7, -1, -1, -1, -7]
    // 6: (10) [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    // 7: (10) [-1, -1, -1, -1, -1, -7, -1, -1, -1, -1]
    // 8: (10) [-1, -1, -1, -1, -1, -1, -7, -7, -1, -1]
    // 9: (10) [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    return data;
}

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME : 
            return {

                ...state,
                data: {
                    row: action.row,
                    cell: action.cell,
                    mine: action.mine,
                },
                openedCount: 0,
                tableData: plantMine(action.row, action.cell, action.mine), //지뢰생성
                halted: false,  //게임을 다시 시작
                timer: 0,
            }
        case OPEN_CELL : {
            //불변성 처리
            const tableData = [...state.tableData];
            // tableData[action.row] = [...state.tableData[action.row]];
            // tableData[action.row][action.cell] = CODE.OPENED;    
            // console.log({...state})  //기존 tableData
            // console.log(tableData)   //클릭해서 변경된 값 덮어씌움. -1  > 0

            //클릭한 셀 뿐 아니라 주변셀에 마인이 없으면 옆의 것까지 재귀로 검사해야 한다.


            //모든 셀 불변성 처리
            tableData.forEach((row, i) => {
                tableData[i] = [...row];
            });

            const checked = [];
            let openedCount = 0;
            console.log(tableData.length, tableData[0].length);
            const checkAround = (row, cell) => {

                //상하좌우 끝칸을 클릭했을 경우
                if(row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length ) {
                    return; 
                }

                // 닫혀있는 일반 셀이 아닐 경우 건너뜀
                if([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
                    return;
                }

                /*이미 검사한 칸 건너뜀*/
                if(checked.includes(row + '/' + cell)){
                    return;
                } else {
                    checked.push(row + '/' + cell);
                }

                //클릭한 주변 칸 검색하여 지뢰 갯수를 표시한다.
                let around = [
                    tableData[row][cell - 1], tableData[row][cell + 1],
                ];

                // 윗줄 검사(윗줄이 있으면), 윗줄 세칸의 코드값을 배열에 추가한다.
                if(tableData[row -1]) {
                    // .concat() : 배열에 값을 추가
                    around = around.concat([tableData[row - 1][cell - 1], tableData[row - 1][cell], tableData[row - 1][cell + 1]]);
                }



                // 아래줄 검사(윗줄이 있으면), 아래줄 세칸의 코드값을 배열에 추가한다.
                if(tableData[row + 1]) {
                    // .concat() : 배열에 값을 추가
                    around = around.concat([tableData[row + 1][cell - 1], tableData[row + 1][cell], tableData[row + 1][cell + 1]]);
                }

                console.log("around", around); //[-1, -1, -7, -1, -1, -1, -1, -1]

                // 주변 지뢰갯수 체크
                // 배열을 돌아서 해당하는 값이 몇개인지 체크함.
                //filter()의 매개변수로 넣는 함수는 불리언을 리턴해야 한다. 이때 리턴하는 값이 true인 배열의 요소만을 골라 새로운 배열을 만든다.
                const count = around.filter(function (v) {
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                }).length;
                console.log("count", count); // [-7];        
           

                

                // 주변에 지뢰가 없으면 주변 칸을 클릭한다..
                if (count === 0) {
                    // 윗줄을 검사하여 0 인 위치를 기준으로 상하좌우 좌표값을 찾아 배열에 추가한다.
                    if (row > -1) {
                        const near = [];
                        if (row - 1 > -1) {
                            near.push([row -1, cell - 1]);
                            near.push([row -1, cell]);
                            near.push([row -1, cell + 1]);
                        }
                        
                        near.push([row, cell - 1]);
                        near.push([row, cell + 1]);
                        if(row + 1 < tableData.length) {
                            near.push([row + 1, cell - 1 ]);
                            near.push([row + 1, cell ]);

                            near.push([row + 1, cell + 1 ]);
                        }
                        console.log("near", near) // [[0, 4], [0, 5], [0, 6]]
                        near.forEach((n) => {
                            if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                              checkAround(n[0], n[1]);
                            }
                        })
                    }
                }

                //칸 열때마다 count 증가
                if (tableData[row][cell] === CODE.NORMAL) { // 내 칸이 닫힌 칸이면 카운트 증가
                    openedCount += 1;
                }
                // 지뢰의 갯수를 표시
                tableData[row][cell] = count;


                
            }
            //클릭한 주변의 지뢰 갯수를 세어 칸에 입력 한다.
            checkAround(action.row, action.cell);
            
            let halted = null;
            let result = '';
            console.log(state.data.row * state.data.cell - state.data.mine, state.openedCount, openedCount);
            if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) { // 승리
                halted = true;
                result = `${state.timer}초만에 승리하셨습니다`;
            }
            return {
                ...state,
                tableData,
                openedCount: state.openedCount + openedCount,
                halted,
                result,

              };
        }
        case CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
              ...state,
              tableData,
              halted: true, //게임을 멈춤. 다른칸 클릭 되지 않도록
            };
        }
        case FLAG_CELL : {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            console.log("FLAG_CELL")
            //물음표를 놓을 칸이 지뢰가 있는 칸이면 CODE.FLAG_MINE 아니면 CODE.FLAG
            if (tableData[action.row][action.cell] === CODE.MINE) {


                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
            tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData,
            }
        }   
        case QUESTION_CELL : {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            console.log("QUESTION_CELL")
            //깃발을 꽂을 칸이 지뢰가 있는 칸이면 CODE.FLAG_MINE 아니면 CODE.QUESTION
            if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }

            return {
                ...state,
                tableData,
            };
        }

        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            console.log("NORMALIZE_CELL")
            //칸이 지뢰가 있는 칸이면 CODE.MINE 아니면 CODE.FLAG
            if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData,

            }
        }
        case INCREMENT_TIMER: {
            return {
                ...state,
                timer: state.timer + 1,
            }
        }
        default:
            return state;
    }
}


const MineSearchFunc = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    //구조분해
    const { tableData, halted, timer, result } = state;
    //캐싱
    // const value = useMemo(() => ({ tableData: tableData, halted: halted, dispatch }), [tableData, halted]);
    const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted]);
    useEffect(() => {
        let timer;

        if (halted === false) {
            timer = setInterval(() => {
            dispatch({ type: INCREMENT_TIMER });
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        }
    }, [halted]);
    
    return (
        <Styles>
            <h1>지뢰찾기 : </h1>
            {/* context를 적용할 컴포넌트들을 provider로 묶어 준다. */}
            {/* <TableContext.Provider value={{ tableData: state.tableData, dispatch }}> 성능문제로 인해 value는 따로 빼서 useMemo로 감싸준다. */}
            <TableContext.Provider value={value}>
                <Form />
                <div>{timer}</div>
                <Table />
                <div>{result}</div>
            </TableContext.Provider>

        </Styles>
    );
}

export default MineSearchFunc;
