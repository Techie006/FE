import { faX } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import Button from "../atoms/Button";

const Modal = ({ clickHandler, ...props }) => {
  return (
    <>
      <StBackground />
      <StModal>
        <Button isIcon={true} icon={faX} onClick={clickHandler} />
        {props.children}
      </StModal>
    </>
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

const StModal = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-height: 80%;
  width: 20rem;
  height: 80%;
  padding: 16px;
  background: white;
  border-radius: 10px;
  text-align: center;
  overflow-y: auto;
  z-index: 100;
`;
