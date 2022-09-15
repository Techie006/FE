import { useState, useEffect } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

// import { apis } from "../../shared/axios";
import Modal from "../common/Modal";
import SmallIconButton from "../../elements/buttons/SmallIconButton";
import SmallButton from "../../elements/buttons/SmallButton";

const CreateModal = ({ id, onClick, onClickDetail }) => {
  const [loading, setLoading] = useState(true);

  // const send_data = async () => {
  //   // const payload = {
  //   //   ingredients_id: selectedIds,
  //   // };
  //   // console.log(payload);
  //   const resp = RESP_CHAE.RECIPES.FINISH_RECIPE_SUCCESS;
  //   // const resp = await apis.done_recipe({ id, payload });
  //   const { result } = resp.data;

  //   if (!result) {
  //     alert("error");
  //     return;
  //   }

  //   onClick();
  //   onClickDetail();
  // };

  const clickHandler = () => {
    // send_data();
  };

  return (
    <>
      <Modal>
        <SmallIconButton icon={faX} onClick={onClick} />
        {!loading ? (
          <form>
            <input type='text' placeholder='recipe_name' />
            <input type='text' placeholder='category' />
          </form>
        ) : null}
        <SmallButton
          type='button'
          content='해당 재료로 요리 완료 처리하기'
          onClick={clickHandler}
        />
      </Modal>
    </>
  );
};

export default CreateModal;
