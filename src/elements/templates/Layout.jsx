import styled from "styled-components";

const Layout = (props) => {
  return <StWrapper>{props.children}</StWrapper>;
};

export default Layout;

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
