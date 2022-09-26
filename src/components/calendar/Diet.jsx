import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Dropdown from "rc-dropdown";
import Menu, { Item } from "rc-menu";
import styled from "styled-components";

import "rc-dropdown/assets/index.css";
import { openModal, __deleteDiet } from "../../modules/redux/calendar";
import BookmarkBtn from "../common/BookmarkBtn";
import IconBox from "../../elements/atoms/IconBox";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import { T3 } from "../../styles/Text";
import Textbox from "../../elements/atoms/Textbox";

const Diet = (props) => {
  const {
    id,
    recipe_id,
    recipe_name,
    time,
    liked,
    ingredients,
    category,
    calorie,
    method,
  } = props;

  const dispatch = useDispatch();

  const delete_diet = () => {
    dispatch(__deleteDiet({ id }));
  };

  const showModal = () => {
    dispatch(openModal({ diet: props, type: "update" }));
  };

  const showDeleteConfirm = () =>
    Swal.fire({
      title: "해당 날짜의 식단을 삭제하시겠습니까?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "취소하기",
      confirmButtonText: "삭제하기",
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
    });

  const showSuccessAlert = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "해당 식단을 삭제하였습니다.",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const onSelect = ({ key }) => {
    if (key === "update") {
      showModal();
      return;
    }
    if (key === "delete") {
      showDeleteConfirm().then((result) => {
        if (result.isConfirmed) {
          delete_diet();
          showSuccessAlert();
        }
      });
    }
  };

  const overlay = () => (
    <Menu onSelect={onSelect}>
      <Item key='update'>수정하기</Item>
      <Item key='delete'>삭제하기</Item>
    </Menu>
  );

  return (
    <StWrapper>
      <StHeader>
        <T3>{recipe_name}</T3>
        <Textbox content={time} />
        <BookmarkBtn recipe_id={recipe_id} is_liked={liked} />
        <Dropdown trigger={["click"]} overlay={overlay} animation='slide-up'>
          <IconBox page='calendar' func='edit'>
            <Edit fill='#A5A5A5' />
          </IconBox>
        </Dropdown>
      </StHeader>

      <div>{ingredients}</div>
      <div>{`${calorie} | ${category} | ${method}`}</div>
    </StWrapper>
  );
};

export default Diet;

const StWrapper = styled.div`
  height: 105px;
  background-color: tomato;
  box-shadow: ${(props) => props.theme.boxShadow};
`;

const StHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StName = styled.div``;
