import { useState, useRef, useCallback, useEffect } from "react";
import styled from "styled-components";

// import { apis } from "../../shared/axios";
// import RESP_CHAE from "../../server/response_chae";
import axios from 'axios';
import Loader from "../common/Loader";
import Recipe from "./Recipe";
import DetailModal from "./DetailModal";


const Recipes = (props) => {
  const [keyword, setKeyword] = useState("");
  const [keyItems, setKeyItems] = useState([]);
  const [keyItemsError, setKeyItemsError] = useState("");
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [recipe, setRecipe] = useState({
    id: -1,
    recipe_name: "",
  });

  const onChangeData = (e) => {
    setKeyword(e.target.value);
    console.log(keyword)
  };

  const pageNum = useRef(0);
  const hasMore = useRef(true);
  // const PAGELIMIT = 5;

  const get_data = useCallback(async () => {
    // const resp = RESP_CHAE.RECIPES.GET_RECIPES_SUCCESS;
    // const resp = RESP_CHAE.RECIPES.GET_RECIPE_FAIL;
    // const resp = await apis.get_recipes({ pageNum.current, PAGELIMIT });
    // const resp = await axios.get(`https://magorosc.shop/api/recipes?pageNum=${pageNum}&pageLimit=${pageLimit}`);
    const resp = await axios.get(`https://magorosc.shop/api/recipes?pageNum=${2}&pageLimit=${20}`);
    const { result, content } = resp.data;
    console.log("hi",resp.data)


    if (!result) {
      setLoading(false);
      return;
    }

    setRecipes((prev) => [...prev, ...content.recipes]);
    pageNum.current = content.current_page_num;
    hasMore.current = content.current_page_num !== content.total_page_num;
    setLoading(false);
  }, []);

  useEffect(() => {
    get_data();
  }, [get_data]);

  const clickHandler = (recipe) => {
    setShowModal((prev) => !prev);
    setRecipe({ ...recipe });
  };

  const seachRecipe = async (keyword) => {

    const auth = localStorage.getItem("Authorization")

    const resp = await axios.post(`https://magorosc.shop/api/recipes/autocomplete`,{
      keyword : keyword
    },{
      headers : {
          "Authorization" : auth,
      }
    });
  const autoCompleteData = resp.data.content.recipes;
  
  if (keyword !== ""){
    if (autoCompleteData == undefined) {
        setKeyItems([]);
        setKeyItemsError("검색결과가 없습니다!")
        
    }else{
        setKeyItemsError("")
        let auto = resp.data.content.recipes.filter((list) =>
        list.recipe_name.includes(keyword) === true)

        setKeyItems(auto);
    }
}else{
    setKeyItemsError("검색결과가 없습니다!")
}

    console.log("as",resp.data.content.recipes)
// && 연산자로 묶는거 고민
}
useEffect(() => {
  const trottled = setTimeout(() => {
      if( keyword !== "" ) { seachRecipe(keyword) }
  }, 150)
  return () => {
      clearTimeout(trottled)
  }
  },[keyword])

  const recipesView = recipes.map((recipe, index) => (
    <Recipe key={index} {...recipe} onClick={clickHandler} />
  ));

  return (
    <StWrapper>
      <StTitle>
        다양한 레시피를 만나보세요!
      </StTitle>
      <StSearchInput
                type = "text"
                onChange={onChangeData}
                value={keyword}
                />
        <StSearchBoxWrapper>
        {keyItems.map((search, index) => (
            <StSearchBox
            className='search_box'
            key = {index}
            onClick = { () => {
                // setKeyword(search.food_name);
                // dispatch(recommend(search.id))
                // dispatch(searchData(search.food_name))
                // onClose()
            }}
            >
            {search.food_name}
            </StSearchBox>                    
        ))
        }
        </StSearchBoxWrapper>
        {keyItemsError !== "" ? (keyItemsError) : (null)}
      <StContent>
      {loading ? <Loader /> : null}
      {!loading ? recipesView : null}
      {!loading && showModal ? (
        <DetailModal
          id={recipe.id}
          recipeName={recipe.recipe_name}
          onClick={clickHandler}
        />
      ) : null}
      </StContent>
    </StWrapper>
  );
};

export default Recipes;

const StWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding : 40px 84px ;
`;
const StTitle = styled.div`
  font-family: 'Happiness Sans';
  width : 1270px;
  font-weight: 900;
  font-size: 30px;
  line-height: 38px;
  color: #5B5B5B;
  padding-bottom : 36px;
  border-bottom : 1.5px solid #ECECEC;
  margin-bottom : 30px;
`;
const StSearchInput = styled.input`
  border : 0px;
  // background-color : #FAFAFA;
  background-color : green;
  color : #5B5B5B;
  font-size : 14px;
  border : 0px;
  width : 240px;
  height : 35px;
  font-size : 14px;
  outline: none;
`
const StContent = styled.div`
  display: flex;
  flex-direction : row;
  flex-wrap: wrap;
`

const StSearchBoxWrapper = styled.div`
  margin : 8px auto;
  padding: 0px 0px 28px 0px;
  width: 285px;
  height: 356px;
  overflow-y: scroll;
`
const StSearchBox = styled.div`
  width: 285px;
  height: 37px;
  padding: 7px 1px;
  color: red;
  &:hover {
    background: #fafafa;
    color: #ff8e42;
  }
`
// const StContent = styled.div``
// const StContent = styled.div``
// const StContent = styled.div``
// const StContent = styled.div``
// const StContent = styled.div``
// const StContent = styled.div``
// const StContent = styled.div``


