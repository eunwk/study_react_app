import React, { useContext, memo } from 'react';
import Tr from './MineSearchTr';
import { TableContext } from '../game/MineSearchFunc';



const Table = memo(() => {
    const { tableData } = useContext(TableContext)
    return (
        <table>
          {Array(tableData.length).fill().map((tr, i) => {
            return (
              <Tr key={i} rowIndex={i}/>
            ) 
          })}        
        </table>

    );
})

export default Table;
