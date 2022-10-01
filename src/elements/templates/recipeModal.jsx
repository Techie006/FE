import styled from "styled-components";

import { BT2, ST1 } from "../../styles/Text";
import IconBox from "../atoms/IconBox";
// import { ReactComponent as X } from "../../assets/icons/x.svg";

const Modal = ({ header, onClick, depth, ...props }) => {
  return (
    <div style={{ ...props }}>
      <StBackground depth={depth} />
      <StLayout depth={depth}>
        {/* depth에 따라 스타일 분기처리 */}
        <StHeader hasLine={depth === 1}>
          {depth === 1 ? <BT2>{header}</BT2> : <ST1>{header}</ST1>}
          <IconBox page='modal' func='close' isCircle={true} onClick={onClick}>
            {/* <X fill='#5B5B5B' /> */}
          </IconBox>
        </StHeader>
        {props.children}
      </StLayout>
    </div>
  );
};

export default Modal;

const StBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${(props) => props.depth * 50};
`;

const StLayout = styled.div`
  position: fixed;
  left: 50%;
  top: 46%;
  transform: translate(-50%, -50%);
  width: 622px;
  height: 884px;
  background: #ffffff;
  border-radius: 15px;
  overflow-y: auto;
  z-index: ${(props) => props.depth * 100};
`;

const StHeader = styled.div`
  height: 68px;
  padding: 20px 28px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: ${(props) => (props.hasLine ? "1.5px solid #ececec" : "none")};
`;