import { useState } from "react";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

const FormFrame = () => {
  const [tab, setTab] = useState("signup");

  // 탭 전환 함수
  const clickHandler = () => {
    if (tab === "signin") {
      setTab("signup");
      return;
    }
    setTab("signin");
  };

  return (
    <>
      {tab === "signin" ? (
        <SignIn onClick={clickHandler} />
      ) : (
        <SignUp onClick={clickHandler} />
      )}
    </>
  );
};

export default FormFrame;
