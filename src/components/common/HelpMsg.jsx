import { useNavigate } from "react-router-dom";

import SmallButton from "../../elements/buttons/SmallButton";

const HelpMsg = ({ msg, content, path }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`${path}`);
  };

  return (
    <>
      <div>{msg}</div>
      <SmallButton type='button' content={content} onClick={clickHandler} />
    </>
  );
};

export default HelpMsg;
