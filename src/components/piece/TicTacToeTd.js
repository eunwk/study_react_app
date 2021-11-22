import React, { useCallback, memo } from 'react';
import { CLICK_CELL } from '../game/TicTacToeFunc';


const Td = memo(({rowIndex, cellIndex, dispatch, cellData}) => {
    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);
       
        // 이미 cellData가 있으면, 클릭했던 td라면
        if(cellData) {
            return;
        }
        //틱택토 메인 컴포넌트 reducer에서 다음 dispatch 처리
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex })
       
    }, [cellData]);
    
    return (
        <td onClick={onClickTd}>{cellData}</td>
    );
})


export default Td;
