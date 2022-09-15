import { useDispatch } from "react-redux";
import {
  openUpdateModal,
  closeModal,
  __deleteDiet,
} from "../../modules/redux/calendar";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Menu, { Item } from "rc-menu";
import Dropdown from "rc-dropdown";
import "rc-dropdown/assets/index.css";
import styled from "styled-components";

import SmallIconButton from "../../elements/buttons/SmallIconButton";
import BookmarkBtn from "../common/BookmarkBtn";

const Recipe = ({
  id,
  recipe_id,
  recipe_name,
  time,
  liked,
  ingredients,
  category,
  calorie,
  method,
}) => {
  const dispatch = useDispatch();

  const delete_diet = () => {
    dispatch(__deleteDiet({ id }));
  };

  const show_update_modal = () => {
    dispatch(openUpdateModal());
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
    Swal.fire("식단을 삭제하였습니다!", "", "success");
  };

  const onSelect = ({ key }) => {
    console.log(key);
    if (key === "update") {
      show_update_modal();
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
        <StName>{recipe_name}</StName>
        <BookmarkBtn is_liked={liked} />
        <Dropdown trigger={["click"]} overlay={overlay} animation='slide-up'>
          <SmallIconButton icon={faEllipsisV} />
        </Dropdown>
      </StHeader>
      <div>{time}</div>
      <div>{ingredients}</div>
      <div>{`${calorie} | ${category} | ${method}`}</div>
    </StWrapper>
  );
};

export default Recipe;

const StWrapper = styled.div`
  width: 90%;
  margin: auto;
  margin-bottom: 10px;
  height: 90px;
  box-shadow: ${(props) => props.theme.boxShadow};
  padding: 10px;
`;

const StHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StName = styled.div``;
