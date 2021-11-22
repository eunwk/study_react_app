import React from "react";

//class Baseball_Try extends React.Component {
class Baseball_Try extends React.PureComponent {
//PureComponent 사용시 state가 변경되지 않는 한 render되지 않는다. 성능향상

    render() {
        return (
            <li>
                <div>{this.props.tryInfo.try}</div>
                <div>{this.props.tryInfo.resualt}</div>


             </li>
        )
    }
}

export default Baseball_Try;
