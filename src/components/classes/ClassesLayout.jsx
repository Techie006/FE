import { useState } from "react";

import ChatTest from "./ChatTest";
import ClassesHeader from "./ClassesHeader";
import Classes from "./Classes";
import CreateClass from "./CreateClass";

const ClassesLayout = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const clickHandler = () => {
    console.log("clicked");
    setModalOpen((prev) => !prev);
  };

  return (
    <>
      <ChatTest />
      <ClassesHeader onClick={clickHandler} />
      <Classes />
      {modalOpen ? <CreateClass onClick={clickHandler} /> : null}
    </>
  );
};

export default ClassesLayout;
