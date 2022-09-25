import { useNavigate } from "react-router-dom";

import { T1 } from "../../styles/Text";
import Button from "../atoms/Button";

const HelpButton = ({ msg, content, path, page, ...props }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`${path}`);
  };

  return (
    <div style={{ ...props }}>
      <T1>{msg}</T1>
      <Button
        type='button'
        content={content}
        onClick={clickHandler}
        page={page}
      />
    </div>
  );
};

export default HelpButton;
