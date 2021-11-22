import React, { useState, useCallback, useContext, memo } from 'react';
import { Space } from 'antd';
import {TableContext, START_GAME} from '../game/MineSearchFunc'

const Form = memo(() => {
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(20);
  const { dispatch } = useContext(TableContext);

    // 불필요한 랜더링을 막기 위해 useCallback으로 감싸는게 좋다. 함수형 컴포넌트는 state 변경시 함수 전체를 다시 랜더링 하기 때문.
    const onChangeRow = useCallback((e) => {
      setRow(e.target.value);
    }, []);
  
    const onChangeCell = useCallback((e) => {
      setCell(e.target.value);
    }, []);
  

    const onChangeMine = useCallback((e) => {
      setMine(e.target.value);
    }, []);
  
    const onClickBtn = useCallback(() => {
      dispatch({ type: START_GAME, row, cell, mine });
    }, [row, cell, mine]);

    return (
        <form>
          <Space>
            <input type="number" placeholder="가로갯수" style={{ width: '100px' }} value={row} onChange={onChangeRow} />
            <input type="number" placeholder="세로갯수" style={{ width: '100px' }} value={cell} onChange={onChangeCell} />
            <input type="number" placeholder="지뢰갯수" style={{ width: '100px' }} value={mine} onChange={onChangeMine} />
            <button className="ant-btn" onClick={onClickBtn}>생성</button>
          </Space>
        </form>
    );
})


export default Form;
