import { useNavigate } from "react-router-dom";

import { H3 } from "../../styles/Text";
import Button from "../atoms/Button";

const HelpButton = ({ msg, content, path, page }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`${path}`);
  };

  return (
    <>
      <H3>{msg}</H3>
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
