import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

// import { apis } from "../../shared/axios";
// import RESP_CHAE from "../../server/response_chae";
import SmallIconButton from "../../elements/buttons/SmallIconButton";

// TODO isbookmarked!
const Recipe = ({
  id,
  recipe_name,
  ingredients,
  final_img,
  method,
  category,
  calorie,
  is_liked,
  onClick,
}) => {
  const [bookmark, setBookmark] = useState(is_liked);

  const ingredientList = ingredients.slice(0, 3).join(" ");

  const BookmarkSwal = withReactContent(Swal);

  const alertHandler = (active) =>
    BookmarkSwal.fire({
      position: "center",
      icon: "success",
      title: active
        ? "해당 레시피를 북마크하였습니다."
        : "해당 레시피 북마크를 해제하였습니다.",
      showConfirmButton: false,
      timer: 1000,
    });

  const clickHandler = async () => {
    if (!bookmark) {
      // const resp = RESP_CHAE.RECIPES.LIKE_RECIPE_SUCCESS;
      // const resp = await apis.like_recipe({ id });
    } else {
      // const resp = RESP_CHAE.RECIPES.UNLIKE_RECIPE_SUCCESS;
      // const resp = await apis.unlike_recipe({ id });
    }
    alertHandler(!bookmark);
    setBookmark((prev) => !prev);
  };

  return (
    <StWrapper>
      <div onClick={() => onClick({ id, recipe_name })}>{recipe_name}</div>
      <div>{ingredientList}</div>
      <SmallIconButton
        icon={faBookmark}
        onClick={clickHandler}
        isactive={bookmark}
      />
      <StImg src={final_img} alt={recipe_name} />
      <div>조리방법: {method}</div>
      <div>카테고리: {category}</div>
      <div>열량: {calorie}</div>
    </StWrapper>
  );
};

export default Recipe;

const StWrapper = styled.div`
  box-sizing: border-box;
  padding: 10px;
  box-shadow: ${(props) => props.theme.boxShadow};
`;

const StImg = styled.img`
  width: 200px;
  height: 200px;
`;
