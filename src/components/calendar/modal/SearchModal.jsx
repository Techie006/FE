import { useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import "../style.css";
import useDebounce from "../../../hooks/useDebounce";
import { apis } from "../../../shared/axios";
// import RESP from "../../../server/response";
import { closeSearchModal } from "../../../modules/redux/calendar";
import Modal from "../../../elements/templates/Modal";
import { ReactComponent as NoResultSVG } from "../../../assets/illustrations/no_result_black.svg";
import { T1 } from "../../../styles/Text";

const SearchModal = (props) => {
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [noResult, setNoResult] = useState(false);

  // 포커싱을 위해 useRef 사용
  const searchBar = useRef();

  // 컴포넌트 mount 시 검색창 포커스
  useEffect(() => {
    searchBar.current.focus();
  }, []);

  // 자동완성 API 호출 수를 줄이기위해 Debounce 0.3초 사용
  const debounceKeyword = useDebounce(keyword, 300);

  useEffect(() => {
    getAutoComplete(debounceKeyword);
  }, [debounceKeyword]);

  const getAutoComplete = async (debounceKeyword) => {
    // Mock APIs
    // const resp = RESP.CALENDAR.GET_AUTOCOMPLETE_SUCCESS;
    // const resp = RESP.CALENDAR.GET_AUTOCOMPLETE_EMPTY;

    const resp = await apis.get_autocomplete({ debounceKeyword });
    const {
      content: { empty, recipes },
    } = resp.data;

    // 자동 완성 결과가 없는 경우 TODO 디자인 어떻게 처리할지 논의
    if (empty) {
      setNoResult(true);
      setRecipes([]);
      return;
    }

    setNoResult(false);
    setRecipes(recipes);
  };

  const closeHandler = () => {
    const recipe = {};
    dispatch(closeSearchModal(recipe));
  };

  const changeHandler = (e) => {
    setKeyword(e.target.value);
  };

  const clickHandler = (recipe) => {
    dispatch(closeSearchModal(recipe));
  };

  const autoCompleteItems = recipes?.map((recipe) => (
    <StRecipe key={recipe.id} onClick={() => clickHandler(recipe)}>
      {recipe.recipe_name}
    </StRecipe>
  ));

  return (
    <Modal header='레시피 검색하기' onClick={closeHandler} depth={2}>
      <StLayout>
        <StInput
          type='text'
          placeholder='레시피명 검색'
          ref={searchBar}
          onChange={changeHandler}
        />
        {!noResult ? (
          <StResultPart className='scroll'>{autoCompleteItems}</StResultPart>
        ) : (
          <StSVGPart>
            <NoResultSVG width='200px' height='200px' viewport='' />
            <T1>검색 결과가 없어요</T1>
          </StSVGPart>
        )}
      </StLayout>
    </Modal>
  );
};

export default SearchModal;

const StLayout = styled.div`
  padding: 0px 61px;
`;

const StInput = styled.input`
  margin-top: -10px;
  background: #fafafa;
  border: 0.6px solid #dadada;
  border-radius: 6px;
  width: 285px;

  padding: 11px 48px 11px 14px;
  background-image: url("https://raw.githubusercontent.com/Techie006/FE/21142e4530a912b50a49fc500325a0d78f2fd272/src/assets/icons/search.svg");
  background-position: 250px center;
  background-repeat: no-repeat;
`;

const StResultPart = styled.div`
  margin-top: 20px;
  padding: 0px 0px 28px 0px;
  width: 285px;
  height: 356px;
  overflow-y: scroll;
`;

const StRecipe = styled.div`
  width: 285px;
  height: 37px;
  padding: 7px 1px;
  color: #5b5b5b;
  &:hover {
    background: #fafafa;
    color: #ff8e42;
  }
`;

const StSVGPart = styled.div`
  margin-top: 50px;
  padding: 0px 0px 28px 0px;
  width: 285px;
  height: 356px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
