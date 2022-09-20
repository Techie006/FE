import { useState } from "react";

import ClassesHeader from "./ClassesHeader";
import Classes from "./Classes";
import Modal from "../../elements/templates/Modal";

const ClassesFrame = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const clickHandler = (class_id) => {
    setModalOpen((prev) => !prev);
  };

  return (
    <>
      <ClassesHeader />
      <Classes />
      {modalOpen ? <Modal onClick={clickHandler}></Modal> : null}
    </>
  );
};

export default ClassesFrame;
