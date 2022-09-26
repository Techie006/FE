import styled from "styled-components";

import { T4 } from "../../styles/Text";

const Textbox = ({ content, ...props }) => {
  return (
    <StLayout style={{ ...props }}>
      <T4>{content}</T4>
    </StLayout>
  );
};

export default Textbox;

const StLayout = styled.div`
  width: 44px;
  height: 24px;
  padding: 2px 9px;

  // layout
  border-radius: 6px;

  // colors
  background: #f0eadc;
`;
