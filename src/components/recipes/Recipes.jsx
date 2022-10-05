import { useState, useRef, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import GridTemplate from "../../elements/templates/GridTemplate";
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
    const buttonList = [
      {type : "방법", category : "굽기"},
      {type : "방법", category : "끓이기"},
      {type : "방법", category : "볶기"},
      {type : "방법", category : "찌기"},
      {type : "방법", category : "튀기기"},
      {type : "방법", category : "기타"},
      {type : "종류", category : "국&찌개"},
      {type : "종류", category : "밥"},
      {type : "종류", category : "일품"},
      {type : "종류", category : "후식"},
      {type : "종류", category : "기타"},
    ]
    var auth = localStorage.getItem("Authorization")

    const buttonHandler = async (data) => {
      

      const resp = await axios.post(`https://magorosc.shop/api/recipes/category`,{
          type : data.type,
          category : data.category
      },
        {headers : {
          "Authorization" : auth,
      } 
      });
      setRecipes(resp.data.content.recipes)
    }


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
    // setKeyword("");
    // seachRecipe();
    setRecipe({ ...recipe });
    setShowModal((prev) => !prev);
  };
  const onKeyPress = (e) => {
    if(e.key == 'Enter') {
      searchRecipeResult()
    }
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
}
const searchRecipeResult = async () => {
  const auth = localStorage.getItem("Authorization")
  const resp = await axios.post(`https://magorosc.shop/api/recipes/search?pageNum=${0}&pageLimit=${100}`,{
    recipe_name : keyword
  },{
    headers : {
        "Authorization" : auth,
    }
  });
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

  const methodView = buttonList.map((data, index) => 
  data.type === "방법" ? 
  (<StCategoryButton key={index} value={data.category} onClick={()=>{buttonHandler(data)}}>{data.category}</StCategoryButton>)
  :(null)
  );
  const categoryView = buttonList.map((data, index) => 
  data.type === "종류" ? 
  (<StCategoryButton key={index} value={data.category} onClick={()=>{buttonHandler(data)}}>{data.category}</StCategoryButton>)
  :(null)
  );

  return (
    
    <StWrapper>
      <GridTemplate height='auto'>
      <StLeftHeaderSection>
        {!search ? (
        <StTitle>
        다양한 레시피를 만나보세요!
        </StTitle>) : 
        (
        <StTitle>
          "{searchName}" 검색 결과
        </StTitle>
        )}
        </StLeftHeaderSection>
        <StRightHeaderSection>
        <div>
        <StSearchWrapper>
        <div className="search_wrapper">
          <Search fill="#5B5B5B" onClick={searchRecipeResult}/>
        <StSearchInput
                  type = "text"
                  onChange={onChangeData}
                  value={keyword}
                  placeholder="원하는 레시피를 검색해보세요!"
                  onKeyPress={onKeyPress}
                  />
        </div>
        
          <StSearchBoxWrapper>
          {keyItems.map((search, index) => (
              <StSearchBox
              className='search_box'
              key = {index}
              onClick={() => {clickHandler(search)}}
              >
              {search.recipe_name}
              </StSearchBox>                    
          ))
          }
          </StSearchBoxWrapper>
        </StSearchWrapper>
        </div>
      </StRightHeaderSection>
      </GridTemplate>
        {/* {keyItemsError !== "" ? (keyItemsError) : (null)} */}
      <StContent>
        <StButtonList>
          <StButtonLeftSection>
            {methodView}
          </StButtonLeftSection>
          <StButtonRightSection>
            {categoryView}
          </StButtonRightSection>
        </StButtonList>
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

const StGrid = styled.div`
  border-radius: ${(props) => props.theme.section.layout.borderRadius};
`;
const StWrapper = styled.div`
  display: flex;
  flex-direction : column;
`;
const StLeftHeaderSection = styled(StGrid)`

  grid-column: 1 / span 8;
  height: auto;

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
  }
`;
const StRightHeaderSection = styled(StGrid)`
  
  grid-column: 9 / span 4;
  height: auto;

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
  }
`;
const StTitle = styled.div`
  font-family: 'Happiness Sans';
  font-weight: 900;
  font-size: 1.75rem;
  line-height: 38px;
  color: #5B5B5B;
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
  margin : 0px auto;
`

const StSearchBoxWrapper = styled.div`
  position : absolute;
  margin : 40px auto;
  width: 285px;
  height : auto;
  max-height : 200px;
  overflow-y: scroll;
  background: #FFFFFF;
  z-index : 100;
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
  z-index : 100;
  &:hover {
    background: #fafafa;
    color: #ff8e42;
  }
`
const StButtonList = styled.div`
  display : flex;
  flex-direction : row;
  flex-wrap : wrap;
  height : 30px;
  margin : 30px auto;
  width : 100%;
  border-top : 1.5px solid #ECECEC;
  padding-top : 22px;
`
const StButtonLeftSection = styled.div`
  grid-column: 1 / span 6;
  margin-right : 30px;

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
    margin-bottom : 10px;
  }


`
const StButtonRightSection = styled.div`
  grid-column: 7 / span 6;
  margin-bottom : 10px;
  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
  }
`
const StCategoryButton = styled.button`
  font-weight: 700;
  font-size: 12px;
  width : 57.5px;
  color : #A5A5A5;
  letter-spacing: -0.5px;
  background-color : #FFFFFF;
  padding : 1% 1.2%;
  box-shadow: 0px 3px 13px 1px rgba(0, 0, 0, 0.05);
  border-radius: 30px;
  margin-right : 8px;
  border : 0px;
  :hover {
    color : #000000;
    background-color : #FFDD7C;
  }
`

// const StContent = styled.div``
// const StContent = styled.div``
// const StContent = styled.div``


