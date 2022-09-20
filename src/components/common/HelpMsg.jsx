import { useNavigate } from "react-router-dom";

import Button from "../../elements/atoms/Button";

const HelpMsg = ({ msg, content, path }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`${path}`);
  };

  return (
    <>
      <div>{msg}</div>
      <Button type='button' content={content} onClick={clickHandler} />
    </>
  );
};

export default HelpMsg;
