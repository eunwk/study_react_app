import styled from "styled-components";

const Styles = styled.div`
  & .item {
    margin-bottom: 20px;
    & .tit {
      margin-bottom: 5px;
    }
  }
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
`;

export default Styles;