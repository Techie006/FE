import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import styled from "styled-components";

import Modal from "../../elements/templates/Modal";
import { ST3, ET1 } from "../../styles/Text";
import Category from "../../elements/molecules/Category";

const SearchModal = (props) => {
  return (
    <Modal
      header='레시피 검색하기'
      onClick={() => {
        console.log("hi");
      }}
      depth={2}
    ></Modal>
  );
};

export default SearchModal;

const StInput = styled.input`
  background: #fafafa;
  border: 0.6px solid #dadada;
  border-radius: 6px;
  width: 285px;
  padding: 11px 48px 11px 14px;
  background-image: url("https://raw.githubusercontent.com/Techie006/FE/21142e4530a912b50a49fc500325a0d78f2fd272/src/assets/icons/search.svg");
  background-position: 250px center;
  background-repeat: no-repeat;
`;
