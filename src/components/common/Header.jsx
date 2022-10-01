import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAppleWhole } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Swal from "sweetalert2";
import styled from "styled-components";

import Potal from '../modals/Potal';
import UpdateProfileModal from '../modals/UpdateProfileModal';
import Link from "../../elements/atoms/Link";

const Header = () => {

  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  console.log("open",open)
  console.log("showModal",showModal)
  
  const navigate = useNavigate()

  const NAVIGATORS = [
    "홈",
    "통계",
    "캘린더",
    "쿠킹클래스",
    "레시피",
    
  ];
  const PATHS = [
    "/home",
    "/statistics",
    "/calendar",
    "/class",
    "/recipes",
    
  ];
  const myPageDropDown = () => {
    setOpen(!open)
  }
  const showModalHandler = () => {
    setOpen(false)
    setShowModal((prev) => !prev )
    
}
  const linkBookMark = () => {
    navigate("/bookmark")
  }
  const signoutHandler = async () => {

    setOpen(!open)
    const auth = localStorage.getItem("Authorization")
    const refresh = localStorage.getItem("Refresh_Token")

    const resp = await axios.delete(`https://magorosc.shop/api/user/signout`,{
      
          headers : {
              "Authorization" : auth,
              "Refresh_Token" : refresh
          }
      })

      console.log(resp.data.status.message)
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: '정말 로그아웃 하실건가요??',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '로그아웃 할게요!',
        cancelButtonText: '조금 더 둘러볼게요!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("Authorization");
          localStorage.removeItem("Refresh_Token");
          navigate("/auth")
        }
      })
  }
  // useEffect(() => {
  //   showModalHandler()
  // },[showModal])


  const navigator = NAVIGATORS.map((nav, idx) => (
    <Link key={nav} content={nav} link={PATHS[idx]} />
  ));

  return (
    <StWrapper>
      <StLayout>
        <FontAwesomeIcon icon={faAppleWhole} size='lg' />
        {navigator}
        
        <StMypageWrapper>
        <StMypage
          onClick={myPageDropDown}
          >
          마이페이지
        </StMypage>
        <div>
        <StMypageMenu>
        {open? (
          <div>
          <ul>
            <li onClick = {showModalHandler}>프로필 설정</li>
            <li onClick = {linkBookMark}>북마크한 레시피</li>
            <li onClick={signoutHandler}>로그아웃</li>
          </ul>
          </div>)
          :
          (null)}
           <Potal>
              {showModal && <UpdateProfileModal onClose = {showModalHandler}/>}
            </Potal>
        </StMypageMenu>
        </div>
        </StMypageWrapper>
      </StLayout>

    </StWrapper>
  );
};

export default Header;

const StWrapper = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: column;
  padding : 10px 84px 10px;
  background-color: ${(props) => props.theme.colors.background.white};
`;
const StLayout = styled.div`
  height: 44px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
  gap : 40px;
  background-color: inherit;
`;
const StMypage = styled.button`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  border : 0px;
  color: ${(props) => props.theme.colors.font.gray3};
  background-color: inherit;
  &:hover {
    cursor: default;
    color: ${(props) => props.theme.colors.main.orange_red};
  }
`
const StMypageMenu = styled.div`
  position : absolute;
  z-index : 900;
`
const StMypageWrapper = styled.div`
  li {
    border : 1px solid black;
    background-color : white;
  }
`

