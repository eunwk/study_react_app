import React, {memo, useContext} from 'react';
import Td from './MineSearchTd';
import { TableContext } from '../game/MineSearchFunc';

const Tr = memo(({ rowIndex }) => {
   const { tableData } = useContext(TableContext)
    return (
       <tr>
          {tableData[0] && Array(tableData[0].length).fill().map((td, i) => {
            return (
              <Td rowIndex={rowIndex} cellIndex={i}/>
            ) 
          })}

       </tr>
    );

})
export default Tr;
