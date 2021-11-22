import styled from "styled-components";

const Styles = styled.div`
  
  & .btn {
    border: 1px solid #333;
    border-radius: 3px;
    padding: 0 10px;
    background: #fff;
    &.active {
      background: #333;
      color: #fff;
    }
  }

  #elem-fullscreen:not(:fullscreen) button {
    background: red;
  }

  #elem-fullscreen:fullscreen button {
    background: blue;
  }
`;

export default Styles;
