import styled from "styled-components";

import BookmarkBtn from "../../elements/molecules/BookmarkBtn";

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
  const ingredientList = ingredients.map((data) => <div className="ingredient">{data}</div> )

  return (
    <StWrapper className="wrapper">
      <StImg alt={recipe_name} style={{
        backgroundImage : `url(${final_img})`,
        backgroundSize : "100% 100%",
      }}>
        <BookmarkBtn className="bookmark" recipe_id={id} is_liked={is_liked} isBox={false} />
      </StImg>
      <StDesc>
      <div className="ingredient_list">{ingredientList}</div>
      <StTitle className="title" onClick={() => onClick({ id, recipe_name })}>{recipe_name}</StTitle>
      
      <StEtcInfo>
        {method} | {category} | {calorie} kcal
      </StEtcInfo>
      </StDesc>
    </StWrapper>
  );
};

export default Recipe;

const StWrapper = styled.div`
  width : 405px;
  height : 302px;
  background-color : #FFFFFF;
  box-shadow: 0px 3px 13px 1px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  margin : 14px 10.5px;
  .bookmark {
    position : absolute;
  }
  .ingredient {
    margin-right : 6px;
    padding: 5px 8px;
    background: #F0EADC;
    border-radius: 6px;
    font-weight: 500;
    font-size: 12px;
    line-height: 17px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: -0.005em;
    color: #8E7B6D;
  }
  .ingredient_list {
    display : flex;
    flex-direction : row;
    
    margin-bottom : 10px;
  }
  // .wrapper:hover .title {
  //   color : #8E7B6D;
  // }
`;
const StImg = styled.div`
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  width : 405px;
  height : 167px;
  background-size : cover;
  padding-left : 91%;
  padding-top : 3%;
`;
const StDesc = styled.div`
  padding : 12px 18px;
`
const StTitle = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 130%;
  letter-spacing: -0.5px;
  color: #4B4B4B;
  margin-bottom : 10px;
`
const StEtcInfo = styled.div`
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.3px;
  color: #A5A5A5;
`