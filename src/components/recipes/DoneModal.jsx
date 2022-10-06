import { useState, useEffect } from "react";

import Select from "react-select";
import { ReactComponent as X } from "../../assets/icons/common/X.svg";

// import { apis } from "../../shared/axios";
// import RESP_CHAE from "../../server/response_chae";
import Modal from "../common/Modal";
import Button from "../../elements/atoms/Button";
import axios from "axios";
import styled from "styled-components";

const DoneModal = ({ id, onClick, onClickDetail }) => {
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const get_data = async () => {
    // const resp = await apis.get_ingredients();
    // const resp = RESP_CHAE.RECIPES.GET_INGREDIENTS_SUCCESS;
    const auth = localStorage.getItem("Authorization");

    const resp = await axios.get(`https://magorosc.shop/api/ingredient`, {
      headers: {
        Authorization: auth,
      },
    });

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

  const disabled = selectedIds.length === 0;

  const changedHandler = (data) => {
    const values = data.map((selected) => selected.value);
    setSelectedIds([...values]);
  };

  const send_data = async () => {

    const auth = localStorage.getItem("Authorization");

    const resp = await axios.post(
      `https://magorosc.shop/api/recipe/finish?id=${id}`,
      {
        ingredients_id: selectedIds,
      },
      {
        headers: {
          Authorization: auth,
        },
      }
    );
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
  const selectStyle = {
    valueContainer: (provided) => ({
      ...provided,
      width: "85px",
      padding: "0px",
    }),
    placeholder: (provided) => ({
      ...provided,
      height: "18px",
      width: "140px",
    }),

    singleValue: (provided) => ({
      ...provided,

      height: "18px",
      color: "#656565",
      fontWeight: "500",
      fontSize: "12px",
      margin: "0px",
      letterSpacing: "-0.005em",
    }),
    control: (provided) => ({
      ...provided,
      width: "212px",
      margin: "0px auto",
      minHeight: "40px",
      backgroundColor: "#FAFAFA",
      border: "1.19856px solid #DADADA",
      borderRadius: "6px",
      boxShadow: `0 0 0 0 'orange'`,
      "&:hover": { textDecoration: "none" },
      "&:focus-within": { borderColor: "#FFB356" },
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      width: "33px",
      minHeight: "50px",
    }),
    option: (provided) => ({
      ...provided,
      color: "#000000",
      letterSpacing: "-0.5px",
      fontSize: "14px",
      "&:hover": { color: "#FC9700", backgroundColor: "#FAFAFA" },
    }),
  };

  return (
    <>
      <StyledModalBackground>
        <StyledContent>
          <StHeader>
            <div>분류</div>
            <X fill='black' onClick={onClick} />
          </StHeader>
          <StContentWrapper>
            {!loading ? (
              <Select
                className='react-select'
                isMulti
                name='ingredients'
                options={ingredientOptions}
                placeholder='재료를 검색해주세요.'
                onChange={changedHandler}
                styles={selectStyle}
              />
            ) : null}
            <button
              type='button'
              onClick={clickHandler}
              disabled={disabled}
              style={{
                width: "94px",
                height: "27px",
                border: "0.6px solid #DADADA",
                margin: "0px auto",
                marginBottom: "20px",
                borderRadius: "8px",
              }}
            >
              재료 사용 완료
            </button>
          </StContentWrapper>
        </StyledContent>
      </StyledModalBackground>
    </>
  );
};

export default DoneModal;
const StyledModalBackground = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 15%;
  top: 5%;
  text-align: center;
`;
const StyledContent = styled.div`
  cursor: initial;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  text-align: left;
  width: 250px;
  height: 300px;
  position: relative;
  background-color: #ffffff;
  border: 1px solid #dadada;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  z-index: 200;
  .complete_button {
    background: #fafafa;
    width: 94px;
    height: 27px;
    border: 0.6px solid #dadada;
    border-radius: 8px;
    font-weight: 500;
    font-size: 12px;
    line-height: 17px;
    margin: 0px auto;
    margin-bottom: 20px;
    letter-spacing: -0.005em;
    color: #5b5b5b;

    cursor: pointer;
  }
`;
const StHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  display: flex;
  align-items: center;
  letter-spacing: -0.5px;
  color: #282828;
  margin: 12px 18px;
`;
const StContentWrapper = styled.div`
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const StCompleteButton = styled.button`
  background: #fafafa;
  width: 94px;
  height: 27px;
  border: 0.6px solid #dadada;
  border-radius: 8px;
  color: #5b5b5b;
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  margin: 0px auto;
  letter-spacing: -0.005em;

  margin-bottom: 20px;
`;

// const St = styled.div``
// const St = styled.div``
// const St = styled.div``
// const St = styled.div``
// const St = styled.div``
// const St = styled.div``
// const St = styled.div``
