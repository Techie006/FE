import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

// import { apis } from "../../shared/axios";
// import RESP_CHAE from "../../server/response_chae";
import SmallIconButton from "../../elements/buttons/SmallIconButton";

const BookmarkBtn = ({ is_liked }) => {
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
    <>
      <SmallIconButton
        icon={faBookmark}
        onClick={clickHandler}
        isactive={bookmark}
      />
    </>
  );
};

export default BookmarkBtn;
