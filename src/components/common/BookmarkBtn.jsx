import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// import RESP from "../../server/response;
import { apis } from "../../shared/axios";
import { ReactComponent as Bookmark } from "../../assets/icons/bookmark.svg";
import { ReactComponent as Bookmarked } from "../../assets/icons/bookmarked.svg";
import IconBox from "../../elements/atoms/IconBox";

const BookmarkBtn = ({ recipe_id, is_liked }) => {
  const [bookmark, setBookmark] = useState(is_liked);

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
    // 북마크 설정
    if (!bookmark) {
      // const resp = RESP.RECIPES.LIKE_RECIPE_SUCCESS;
      await apis.like_recipe({ id: recipe_id });
    }
    // 북마크 해지
    else {
      // const resp = RESP.RECIPES.UNLIKE_RECIPE_SUCCESS;
      await apis.unlike_recipe({ id: recipe_id });
    }

    // 북마크 정보 화면 반영
    alertHandler(!bookmark);
    setBookmark((prev) => !prev);
  };

  return (
    <>
      <IconBox page='calendar' func='bookmark' onClick={clickHandler}>
        {!bookmark ? (
          <Bookmark fill='#A5A5A5' />
        ) : (
          <Bookmarked fill='#FFB356' />
        )}
      </IconBox>
    </>
  );
};

export default BookmarkBtn;
