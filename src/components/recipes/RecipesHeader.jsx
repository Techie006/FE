import styled from "styled-components";

import { BT1 } from "../../styles/Text";
import Button from "../../elements/atoms/Button";

const RecipesHeader = ({ onClick, ...props }) => {
  return (
    <StLayout style={{ ...props }}>
      <BT1>실시간 쿠킹 클래스를 즐겨보세요!</BT1>
      <Button
        type='button'
        content='클래스 열기'
        page='classes'
        func='create'
        onClick={onClick}
      />
    </StLayout>
  );
};

export default RecipesHeader;

const StLayout = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 40px 0px 36px 0px;
  border-bottom: 1.5px solid #ececec;
`;
