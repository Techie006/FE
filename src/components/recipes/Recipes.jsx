import { useState, useRef, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
// import { apis } from "../../shared/axios";
// import RESP_CHAE from "../../server/response_chae";
import { ReactComponent as Search } from "../../assets/icons/search.svg";
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
  const [searchName, setSearchName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState(false);
  const [recipe, setRecipe] = useState({
    id: -1,
    recipe_name: "",
  });
  console.log(keyword)
  const onChangeData = (e) => {

    if (e.target.value === "") {
      setKeyword("")
    }
    setKeyword(e.target.value);
  };

  const pageNum = useRef(0);
  const hasMore = useRef(true);
  // const PAGELIMIT = 5;

  const get_data = useCallback(async () => {
    // const resp = RESP_CHAE.RECIPES.GET_RECIPES_SUCCESS;
    // const resp = RESP_CHAE.RECIPES.GET_RECIPE_FAIL;
    // const resp = await apis.get_recipes({ pageNum.current, PAGELIMIT });
    // const resp = await axios.get(`https://magorosc.shop/api/recipes?pageNum=${pageNum}&pageLimit=${pageLimit}`);
    const auth = localStorage.getItem("Authorization")

    const resp = await axios.get(`https://magorosc.shop/api/recipes?pageNum=${1}&pageLimit=${20}`,{
      headers : {
        "Authorization" : auth,
    } 
    });
    const { result, content } = resp.data;

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
    setKeyword("");
    setShowModal((prev) => !prev);
    seachRecipe();
    setRecipe({ ...recipe });
  };
  const showModalHandler = () => {
    
    setShowModal((prev) => !prev);
    
  }

  const seachRecipe = async (keyword) => {

    const auth = localStorage.getItem("Authorization")

    const resp = await axios.post(`https://magorosc.shop/api/recipes/autocomplete`,{
      keyword : keyword
    },{
      headers : {
          "Authorization" : auth,
      }
    });
    setRecipe()
  const autoCompleteData = resp.data.content.recipes;
  
  if (keyword !== ""){
    if (autoCompleteData == undefined) {
        setKeyItems([]);
        
    }else{
        setKeyItemsError("")
        let auto = resp.data.content.recipes.filter((list) =>
        list.recipe_name.includes(keyword) === true)

        setKeyItems(auto);
    }
}else{
    setKeyItemsError("검색결과가 없습니다!")
}
// && 연산자로 묶는거 고민
}
const searchRecipeResult = async () => {
  console.log("키워드",keyword)
  const auth = localStorage.getItem("Authorization")
  const resp = await axios.post(`https://magorosc.shop/api/recipes/search?pageNum=${0}&pageLimit=${100}`,{
    recipe_name : keyword
  },{
    headers : {
        "Authorization" : auth,
    }
  });
  console.log(resp.data)
  setRecipes(resp.data.content.recipes)
  setSearchName(resp.data.content.search_name)
  setSearch(!search)
  setKeyword("");
  seachRecipe();
}
useEffect(() => {
  const trottled = setTimeout(() => {
      if( keyword !== "" ) { seachRecipe(keyword) }
  }, 200)
  return () => {
      clearTimeout(trottled)
  }
  },[keyword])

  const recipesView = recipes.map((recipe, index) => (
    <Recipe key={index} {...recipe} onClick={clickHandler} />
  ));

  return (
    <StWrapper>
      <StHeader>
        {!search ? (
        <StTitle>
        다양한 레시피를 만나보세요!
        </StTitle>) : 
        (
        <StTitle>
          "{searchName}" 검색 결과
        </StTitle>
        )}
        <div>
        <StSearchWrapper>
        <div className="search_wrapper">
          <Search fill="#5B5B5B" onClick={searchRecipeResult}/>
        <StSearchInput
                  type = "text"
                  onChange={onChangeData}
                  value={keyword}
                  placeholder="원하는 레시피를 검색해보세요!"
                  />
        </div>
          <StSearchBoxWrapper>
          {keyItems.map((search, index) => (
              <StSearchBox
              className='search_box'
              key = {index}
              onClick = {clickHandler}
              >
              {search.recipe_name}
              </StSearchBox>                    
          ))
          }
          </StSearchBoxWrapper>
        </StSearchWrapper>
        </div>
      </StHeader>
        {/* {keyItemsError !== "" ? (keyItemsError) : (null)} */}
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

`;
const StHeader = styled.div`
  display : flex;
  flex-direction : row;
  justify-content : space-between;
  flex-wrap : wrap;
  width : 1270px;
`;
const StTitle = styled.div`
  font-family: 'Happiness Sans';
  font-weight: 900;
  font-size: 30px;
  line-height: 38px;
  color: #5B5B5B;
  padding-bottom : 36px;
  margin-bottom : 30px;
  
`;
const StSearchWrapper = styled.div`
  display : flex;
  flex-direction : column;
  .search_wrapper {
    display : flex;
    flex-direction : row;
    align-items : center;
    padding : 12px;
    width : 291px;
    height : 38px;
    background-color : #FFFFFF;
    border : 1px solid #C0C0C0;
    border-radius : 6px;
  }
`
const StSearchInput = styled.input`
  margin-left : 10px;
  border : 0px;
  background-color : #FFFFF;
  color : #5B5B5B;
  font-size : 14px;
  width : 250px;
  height : 35px;
  font-size : 14px;
  outline: none;
`
const StContent = styled.div`
  display: flex;
  flex-direction : row;
  flex-wrap: wrap;
  border-top : 1.5px solid #ECECEC;
`

const StSearchBoxWrapper = styled.div`
  position : absolute;
  z-index : 2;
  margin : 40px auto;
  width: 285px;
  height : auto;
  max-height : 200px;
  overflow-y: scroll;
  background: #FFFFFF;

  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
`
const StSearchBox = styled.div`
  width: 285px;
  padding : 14px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: -0.005em;
  color: #5B5B5B;
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


