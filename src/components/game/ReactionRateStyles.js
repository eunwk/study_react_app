import styled from "styled-components";

const Styles = styled.div`
  &::after {
    content: '';
    display:block;
    clear:both;
  }
  Button {
    margin-right: 10px;
  }

   #screen {
    width:200px;
    height:80px;
    text-align:center;
    user-select:none;
    float:left;
    margin-right:10px;
    &.waiting {
      background : aqua;
    }


    &.ready {
      background : red;
    }
    &.now {
      background : greenyellow;
    }
  
  }
`;

export default Styles;
