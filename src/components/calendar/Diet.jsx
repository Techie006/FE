import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Dropdown from "rc-dropdown";
import Menu, { Item } from "rc-menu";
import styled from "styled-components";

import "rc-dropdown/assets/index.css";
import "./rc-dropdown/style.css";
import { parseDate } from "../../shared/regex";
import { openDietModal, __deleteDiet } from "../../modules/redux/calendar";
import { showConfirm, showAlert } from "../../shared/popups";
import BookmarkBtn from "../../elements/molecules/BookmarkBtn";
import IconBox from "../../elements/atoms/IconBox";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import Textbox from "../../elements/atoms/Textbox";

const Diet = ({ id, time, day, ...props }) => {
  const { recipe_id, recipe_name, liked, category, calorie, method } = props;

  const dispatch = useDispatch();

  // 식단 삭제 시 삭제 수행
  const delete_diet = () => {
    dispatch(__deleteDiet({ id }));
  };

  // 식단 변경 시 식단 변경하기 모달 띄움
  const showModal = () => {
    const parsedDate = parseDate(new Date(day));
    dispatch(
      openDietModal({
        diet: { id, time, day },
        type: "update",
        date: parsedDate,
        recipe: { ...props, id: recipe_id },
      })
    );
  };

  // 식단 삭제 시 컨펌창 띄우기
  const showDeleteConfirm = () =>
    showConfirm(
      "해당 식단을 정말 삭제하실건가요?",
      "warning",
      true,
      "취소하기",
      "삭제하기"
    );

  // 식단 삭제 완료 후 알랏창 띄우기
  const showSuccessAlert = () =>
    showAlert(1000, "success", "해당 식단을 삭제합니다.");

  // rc-menu로 드롭다운 생성
  const overlay = () => (
    <Menu onSelect={onSelect}>
      <Item key='update'>수정하기</Item>
      <Item key='delete'>삭제하기</Item>
    </Menu>
  );

  // 사용자가 특정 드롭다운 선택
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

  // 날짜 포맷팅
  const getDate = (day) => {
    const dateFormat = day.replace(/-/g, "/");
    const mm = new Date(dateFormat).getMonth() + 1;
    const dd = new Date(dateFormat).getDate();
    return `${mm}월 ${dd}일`;
  };

  return (
    <StLayout>
      <StHeader>
        <StName>
          <StRecipe>{recipe_name}</StRecipe>
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
      <StInfo>{`${method} | ${category} | ${calorie}kcal`}</StInfo>
      <StDate>{`${getDate(day)}`}</StDate>
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

// usage: 캘린더 식단명
const StRecipe = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  background: inherit;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  color: #282828;
`;

// usage: 식단 정보
const StInfo = styled(StRecipe)`
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: #8e7b6d;
`;

// usage : 식단 내 날짜
const StDate = styled(StRecipe)`
  margin-top: 23px;
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  color: #5b5b5b;
`;
