import { useState } from "react";

import ClassesHeader from "./ClassesHeader";
import Classes from "./Classes";
import CreateClass from "./CreateClass";

const ClassesFrame = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const clickHandler = () => {
    console.log("clicked");
    setModalOpen((prev) => !prev);
  };

  return (
    <>
      <ClassesHeader onClick={clickHandler} />
      <Classes />
      {modalOpen ? <CreateClass onClick={clickHandler} /> : null}
    </>
  );
};

export default ClassesFrame;
