import { useNavigate } from "react-router-dom";

import Button from "../atoms/Button";

const HelpButton = ({ msg, content, path, page }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`${path}`);
  };

  return (
    <>
      <div>{msg}</div>
      <Button
        type='button'
        content={content}
        onClick={clickHandler}
        page={page}
      />
    </>
  );
};

export default HelpButton;
