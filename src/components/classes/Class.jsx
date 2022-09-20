import styled from "styled-components";

const Class = ({ class_id, class_name, class_img, viewer_nums }) => {
  return (
    <StLayout>
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
