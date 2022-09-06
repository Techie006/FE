import { faX } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import SmallIconButton from "../../elements/buttons/SmallIconButton";
import Detail from "./Detail";

const DetailModal = ({ id, recipeName, onClick }) => {
  return (
    <>
      <Background />
      <ModalContainer>
        <SmallIconButton icon={faX} onClick={onClick} />
        <Detail id={id} recipeName={recipeName} />
      </ModalContainer>
    </>
  );
};

export default DetailModal;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;
`;

const ModalContainer = styled.div`
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
`;
