import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Dropdown from "rc-dropdown";
import Menu, { Item } from "rc-menu";
import styled from "styled-components";

import "rc-dropdown/assets/index.css";
import "./rc-dropdown/style.css";
import { openDietModal, __deleteDiet } from "../../modules/redux/calendar";
import BookmarkBtn from "../../elements/molecules/BookmarkBtn";
import IconBox from "../../elements/atoms/IconBox";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import { T3, T5, T6 } from "../../styles/Text";
import Textbox from "../../elements/atoms/Textbox";

const Diet = (props) => {
  const {
    id,
    recipe_id,
    recipe_name,
    time,
    liked,
    category,
    calorie,
    method,
    day,
  } = props;

  const dispatch = useDispatch();

  const delete_diet = () => {
    dispatch(__deleteDiet({ id }));
  };

  const showModal = () => {
    dispatch(openDietModal({ diet: props, type: "update" }));
  };

  // 식단 삭제 시 컨펌창 띄우기
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

  // 식단 삭제 완료 후 알랏창 띄우기
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

  // rc-menu로 드롭다운 생성
  const overlay = () => (
    <Menu onSelect={onSelect}>
      <Item key='update'>수정하기</Item>
      <Item key='delete'>삭제하기</Item>
    </Menu>
  );

  // 날짜 포맷팅
  const getDate = (day) => {
    const dateFormat = day.replace(/-/g, "/");
    const mm = new Date(dateFormat).getMonth() + 1;
    const dd = new Date(dateFormat).getDay();
    return `${mm}월 ${dd}일`;
  };

  return (
    <StLayout>
      <StHeader>
        <StName>
          <T3>{recipe_name}</T3>
          <Textbox content={time} />
        </StName>
        <StButtons>
          <BookmarkBtn recipe_id={recipe_id} is_liked={liked} isBox={false} />
          <Dropdown trigger={["click"]} overlay={overlay} animation='slide-up'>
            <IconBox page='calendar' func='edit' isBox={false}>
              <Edit fill='#A5A5A5' />
            </IconBox>
          </Dropdown>
        </StButtons>
      </StHeader>
      <T5>{`${method} | ${category} | ${calorie}kcal`}</T5>
      <StDate>
        <T6>{`${getDate(day)}`}</T6>
      </StDate>
    </StLayout>
  );
};

export default Diet;

const StLayout = styled.div`
  height: minmax(105px, auto);
  border: 1px solid #ececec;
  border-left: none;
  border-right: none;
  box-shadow: ${(props) => props.theme.boxShadow};
  padding: 16px;
`;

const StHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StName = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const StButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const StDate = styled.div`
  margin-top: 23px;
`;
