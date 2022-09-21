import { useState, useCallback, useEffect } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";

import { apis } from "../../shared/axios";
import RESP_CHAE from "../../server/response_chae";
import Modal from "../common/Modal";
import SmallIconButton from "../../elements/buttons/SmallIconButton";
import Loader from "../common/Loader";
import BookmarkBtn from "../common/BookmarkBtn";
import SmallButton from "../../elements/buttons/SmallButton";
import DoneModal from "./DoneModal";

const DetailModal = ({ id, recipeName, onClick }) => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [recipe, setRecipe] = useState({});

  const get_data = useCallback(async () => {
    const resp = RESP_CHAE.RECIPES.GET_RECIPE_SUCCESS;
    // const resp = RESP_CHAE.RECIPES.GET_RECIPE_FAIL;
    // const resp = await apis.get_recipes({ pageNum.current, PAGELIMIT });
    const { result, content } = resp.data;

    if (!result) {
      setLoading(false);
      return;
    }

    setRecipe(content.recipe);
    setLoading(false);
  }, []);

  useEffect(() => {
    get_data();
  }, [get_data]);

  const clickHandler = () => {
    setShowModal((prev) => !prev);
  };

  const ingredients = recipe.ingredients?.join(" ");
  const instruction = recipe.manual_desc?.map((desc, idx) => (
    <div>
      <div>{desc}</div>
      {recipe?.manual_imgs[idx] !== "" ? (
        <img src={recipe?.manual_imgs[idx]} alt={`img${idx}`} />
      ) : null}
    </div>
  ));

  return (
    <>
      <Modal>
        <SmallIconButton icon={faX} onClick={onClick} />
        <>
          <div>{recipeName}</div>
          {loading ? <Loader /> : null}
          {!loading ? (
            <>
              <BookmarkBtn is_liked={recipe.is_liked} />
              <div>{ingredients}</div>
              <div>
                {recipe.method} | {recipe.category}| {recipe.calorie}
              </div>
              {instruction}
              <SmallButton
                type='button'
                content='요리 완료'
                onClick={clickHandler}
              />
            </>
          ) : null}
        </>
        {!loading && showModal ? (
          <DoneModal onClick={clickHandler} onClickDetail={onClick} />
        ) : null}
      </Modal>
    </>
  );
};

export default DetailModal;
