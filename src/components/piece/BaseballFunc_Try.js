import React, { memo } from "react";

// 기본 props 전달
// const Try = (props) => {
//     return (
//         <li>
//             <div>{props.tryInfo.try}</div>
//             <div>{props.tryInfo.resualt}</div>
//          </li>
//     )
// }

// 전달된 props를 구조분해 할 수 있다.
// const Baseball_Try = ({ tryInfo }) => {

//     return (
//         <li>
//             <div>{tryInfo.try}</div>
//             <div>{tryInfo.resualt}</div>
//          </li>
//     )
// }

// memo는 class component의 PureComponent과 같이 작동한다.
// 함수를 memo()로 감싼다.
const Baseball_Try = memo(({ tryInfo }) => {
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.resualt}</div>
         </li>
    )
})

export default Baseball_Try;
