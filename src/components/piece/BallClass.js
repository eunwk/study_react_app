import React, { PureComponent } from "react";

class Ball extends PureComponent {
//PureComponent 사용시 state가 변경되지 않는 한 render되지 않는다. 성능향상

    render() {
        //console.log("this.props", this.props);
        const {number} = this.props;
        let background;

        if(number <= 10) {
            background = 'red';
        } else if(number <= 20) {
            background = 'yellow';
        } else if(number <= 30) {
            background = 'orange';
        } else if(number <= 40) {
            background = 'blue';
        } else {
            background = 'green';
        }
        return (

            <div className="ball" style={{background}}>{number}</div>
        )
    }
}
export default Ball;
