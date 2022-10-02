import { useState, useEffect } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

// import { apis } from "../../shared/axios";
// import RESP_CHAE from "../../server/response_chae";
import Modal from "../common/Modal";
import Button from "../../elements/atoms/Button";
import axios from 'axios';
import styled from "styled-components";


const DoneModal = ({ id, onClick, onClickDetail }) => {
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const get_data = async () => {
    // const resp = await apis.get_ingredients();
    // const resp = RESP_CHAE.RECIPES.GET_INGREDIENTS_SUCCESS;
    const auth = localStorage.getItem("Authorization")

    const resp = await axios.get(`https://magorosc.shop/api/ingredient`,{
      headers: {
          Authorization: auth,
          },
    })
    
    const { result, content } = resp.data;

    if (!result) {
      alert();
      return;
    }

    const { storage } = content;
    setIngredients([...storage]);
    setLoading(false);
  };

  useEffect(() => {
    get_data();
  }, []);

  const ingredientOptions = ingredients?.map((ingredient, list) => ({
    label: `[${ingredient.category}] ${ingredient.food_name}`,
    value: ingredient.id,
  }));
  console.log(ingredientOptions)

  const disabled = selectedIds.length === 0;

  const changedHandler = (data) => {
    const values = data.map((selected) => selected.value);
    setSelectedIds([...values]);
    console.log(selectedIds)
  };

  const send_data = async () => {
    // const payload = {
    //   ingredients_id: selectedIds,
    // };
    // console.log(payload);
    // const resp = RESP_CHAE.RECIPES.FINISH_RECIPE_SUCCESS;
    // const resp = await apis.done_recipe({ id, payload });
    const auth = localStorage.getItem("Authorization")

    const resp = await axios.post(`https://magorosc.shop/api/recipe/finish?id=${id}`,{
      ingredients_id : selectedIds
    },{
      headers : {
        Authorization: auth,
      }
    });
    const { result } = resp.data;

    if (!result) {
      alert("error");
      return;
    }

    onClick();
    onClickDetail();
  };

  const clickHandler = () => {
    send_data();
  };

  return (
    <>
      <Modal styled={{
        width : "232px",
        height : "318px",
        backgroundColor : "#FFFFFF",
        border: "1px solid #DADADA"}}>
        <Button icon={faX} onClick={onClick} />
        {!loading ? (
          <Select
            className='react-select'
            isMulti
            name='ingredients'
            options={ingredientOptions}
            placeholder='재료를 검색해주세요.'
            onChange={changedHandler}
          />
        ) : null}
        <Button
          type='button'
          content='해당 재료로 요리 완료 처리하기'
          onClick={clickHandler}
          disabled={disabled}
        />
      </Modal>
    </>
  );
};

export default DoneModal;

// const St = styled.div``
// const St = styled.div``
// const St = styled.div``
// const St = styled.div``
// const St = styled.div``
// const St = styled.div``
// const St = styled.div``
// const St = styled.div``
// const St = styled.div``
// const St = styled.div``
// const St = styled.div``
