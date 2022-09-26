import styled from "styled-components";

import { BT2 } from "../../styles/Text";
import IconBox from "../../elements/atoms/IconBox";
import { ReactComponent as X } from "../../assets/icons/x.svg";

const Modal = ({ header, onClick, ...props }) => {
  return (
    <div style={{ ...props }}>
      <StBackground />
      <StLayout>
        <StHeader>
          <BT2>{header}</BT2>
          <IconBox page='modal' func='close' isCircle={true} onClick={onClick}>
            <X fill='#5B5B5B' />
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
  z-index: 50;
`;

const StLayout = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 405px;
  height: 472px;
  background: #ffffff;
  border-radius: 15px;
  overflow-y: auto;
  z-index: 100;
`;

const StHeader = styled.div`
  height: 68px;
  padding: 20px 28px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1.5px solid #ececec;
`;
