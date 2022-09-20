import { useNavigate } from "react-router-dom";

import styled from "styled-components";

const Class = ({ class_id, class_name, class_img, viewer_nums }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/class/${class_id}`);
  };

  return (
    <StLayout onClick={clickHandler}>
      <img src={class_img} alt='thumbbnail' />
      <div>시청자 수 : {viewer_nums}</div>
      <div>{class_name}</div>
    </StLayout>
  );
};

export default Class;

const StLayout = styled.div`
  width: 352px;
  height: 303px;
`;
