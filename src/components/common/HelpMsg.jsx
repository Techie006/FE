import { useNavigate } from "react-router-dom";

import SmallButton from "../../elements/buttons/SmallButton";

const Loader = ({ msg, goto, path }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`${path}`);
  };

  return (
    <>
      <div>{msg}</div>
      <SmallButton
        type='button'
        content={`${goto} 가기`}
        onClick={clickHandler}
      />
    </>
  );
};

export default Loader;
