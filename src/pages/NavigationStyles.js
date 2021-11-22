import styled from "styled-components";

const Styles = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid #d1d1d1;
  padding-bottom: 6px;
  & a {
    margin-right: 20px;
    padding-right: 20px;
    display: inline-block;
    position: relative;
    &:after {
      content: "";
      background: #ccc;
      width: 1px;
      height: 12px;
      position: absolute;
      right: 0;
      top: 7px;
    }
  }
`;

export default Styles;
