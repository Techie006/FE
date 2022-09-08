import { faX } from "@fortawesome/free-solid-svg-icons";

import Modal from "../common/Modal";
import SmallIconButton from "../../elements/buttons/SmallIconButton";
import Detail from "./Detail";

const DetailModal = ({ id, recipeName, onClick }) => {
  return (
    <>
      <Modal>
        <SmallIconButton icon={faX} onClick={onClick} />
        <Detail id={id} recipeName={recipeName} />
      </Modal>
    </>
  );
};

export default DetailModal;
