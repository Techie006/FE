import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { __getPrevChats } from "../../modules/redux/cookingClass";

const Class = ({
  class_id,
  redis_class_id,
  class_name,
  class_img,
  viewer_nums,
}) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const clickHandler = () => {
    dispatch(__getPrevChats({ class_id }));
    navigate(`/class/${redis_class_id}`);
  };

  return (
    <StLayout onClick={clickHandler}>
      <img src={class_img} alt='thumbbnail' />
      <div>시청자 수: {viewer_nums}</div>
      <div>{class_name}</div>
    </StLayout>
  );
};

export default Class;

const StLayout = styled.div`
  width: 352px;
  height: 303px;
`;
