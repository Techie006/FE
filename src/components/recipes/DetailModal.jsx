import { useState, useCallback, useEffect } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";

import { apis } from "../../shared/axios";
// import RESP_CHAE from "../../server/response_chae";
import Loader from "../common/Loader";
import BookmarkBtn from "../common/BookmarkBtn";
import Button from "../../elements/atoms/Button";
import DoneModal from "./DoneModal";
import axios from 'axios';
import styled from "styled-components";

const DetailModal = ({ id, recipeName, totalIngredient, onClick }) => {
  console.log(totalIngredient)
  console.log("id", id)
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [recipe, setRecipe] = useState({});

  const get_data = useCallback(async () => {
    // const resp = RESP_CHAE.RECIPES.GET_RECIPE_SUCCESS;
    // const resp = RESP_CHAE.RECIPES.GET_RECIPE_FAIL;
    // const resp = await apis.get_recipes({ pageNum.current, PAGELIMIT });
    const resp = await axios.get(`https://magorosc.shop/api/recipe/${id}`);
    const { result, content } = resp.data;

    if (!result) {
      setLoading(false);
      return;
    }
    console.log(recipe)
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
    <StInstruction key={idx}>
      {recipe?.manual_imgs[idx] !== "" ? (
        <StRecipeimg src={recipe?.manual_imgs[idx]} alt={`img${idx}`} />
      ) : null}
      <div className="desc">{desc}</div>
    </StInstruction>
  ));
  const headerIngredient = totalIngredient && totalIngredient.map((data)=> 
  (<div className="ingredient">{data}</div>))

  return (
    <>
      <StyledModalBackground>
        <StyledContent>
        <StWrapper>
          <StHeader>
            <div className="left_section">
            <div className="header_title">
              {recipeName}
            </div>
            <div className="header_ingredient">
              {headerIngredient}
            </div>
            </div>
            <StClosebutton onClick={onClick}/>
          </StHeader>
        <>
          {loading ? <Loader /> : null}
          {!loading ? (
            <>
              {/* <BookmarkBtn is_liked={recipe.is_liked} /> */}
              <StTotalIngredient>
                <div className="title">들어가는 재료</div>
                <div className="total_ingredient">{ingredients}</div>
                </StTotalIngredient>
              <StDetailRecipe>
              {instruction}
              <button
                type='button'
                // content='요리 완료'
                onClick={clickHandler}
              >요리완료</button>
              </StDetailRecipe>
            </>
          ) : null}
        </>
        {!loading && showModal ? (
          <DoneModal onClick={clickHandler} onClickDetail={onClick} />
        ) : null}
        
        </StWrapper>
      </StyledContent>
      </StyledModalBackground>
    </>
  );
};

export default DetailModal;

const StyledModalBackground = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    background-color : rgba(0, 0, 0, 0.8);
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    text-align: center;
`
const StyledContent = styled.div`
    display : flex;
    flex-direction : column;
    justify-content: left;
    align-items: left;
    text-align: left;
    width: 622px;
    height: 884px;
    border : 1px solid black;
    border-radius: 15px;
    position: relative;
    background-color : #FFFFFF;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.4);
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.3);
      border-radius: 6px;
    }
`

const StWrapper = styled.div``
const StHeader = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    padding : 23px 26px;
    height : 68px;
    border-bottom : 1.5px solid #ECECEC;
    .left_section {
      display : flex;
      flex-direction : row;
      justify-content : left;
    }
    .header_title {
      font-family: 'Happiness Sans';
      font-style: normal;
      font-weight: 900;
      font-size: 24px;
      line-height: 32px;
      display: flex;
      align-items: center;
      letter-spacing: -0.005em;
      color: #282828;
      margin-right : 20px;
    }
    .header_ingredient {
      display : flex;
      flex-direction : row;
      gap : 10px;
    
    }
    .ingredient {
      padding: 7.5px;
      height: 27px;
      gap : 10px;
      background: #FFEAD8;
      border-radius: 6px;
      font-weight: 500;
      font-size: 12px;
      text-align: center;
      letter-spacing: -0.5px;
      color: #FF5C01;
    }
`
const StClosebutton = styled.button`
    width :21.5px;
    height :21.5px;

`
const StTotalIngredient = styled.div`
  padding : 13px 36px 0px 30px;
  height : 149px;
  border-bottom : 1.5px solid #ECECEC;
  .title {
    font-family: 'Happiness Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: -0.5px;
    color: #656565;
    margin-bottom : 14px;
  }
  .total_ingredient {
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    letter-spacing: -0.5px;
    color: #5B5B5B;
  }
`
const StDetailRecipe = styled.div`
  padding : 0px 80px;  
  height : 665px;
  display : flex;
  flex-direction : row;
  flex-wrap : wrap;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`
const StInstruction = styled.div`
  .desc {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    letter-spacing: -0.5px;
    color: #5B5B5B;
    margin-bottom :16px;
  }
`
const StRecipeimg = styled.img`
    width : 462px;
    height : 215px;
    margin-bottom : 10px;
`


// const StWrapper = styled.div``
// const StWrapper = styled.div``
// const StWrapper = styled.div``
// const StWrapper = styled.div``
