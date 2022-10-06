import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import styled from "styled-components";

import { ReactComponent as Logo } from "../../assets/icons/common/Logo.svg";
import Potal from "../../components/modals/Potal";
import UpdateProfileModal from "../../components/modals/UpdateProfileModal";
import Link from "../atoms/Link";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const NAVIGATORS = ["홈", "통계", "캘린더", "클래스", "레시피"];
  const PATHS = ["/", "/statistics", "/calendar", "/classes", "/recipes"];

  const navigator = NAVIGATORS.map((nav, idx) => (
    <Link
      key={nav}
      content={nav}
      link={PATHS[idx]}
      selected={location.pathname === PATHS[idx]}
    />
  ));

  const showDropdown = () => {
    setOpen(!open);
  };

  const showModalHandler = () => {
    setOpen(false);
    setShowModal((prev) => !prev);
  };

  const linkBookMark = () => {
    navigate("/bookmark");
  };

  const signoutHandler = () => {
    setOpen(!open);
    const auth = localStorage.getItem("Authorization");
    const refresh = localStorage.getItem("Refresh_Token");

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "정말 로그아웃 하실건가요??",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "로그아웃 할게요!",
        cancelButtonText: "조금 더 둘러볼게요!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios.delete(`https://magorosc.shop/api/user/signout`, {
            headers: {
              Authorization: auth,
              Refresh_Token: refresh,
            },
          });

          localStorage.removeItem("Authorization");
          localStorage.removeItem("Refresh_Token");
          navigate("/auth");
        }
      });
  };

  return (
    <StLayout>
      <StHeader>
        <Logo />
        {navigator}
        <StMypageWrapper>
          <StMypage onClick={showDropdown}>마이페이지</StMypage>
          <StMypageMenu>
            {open ? (
              <div>
                <ul>
                  <li onClick={showModalHandler}>프로필 설정</li>
                  <li onClick={linkBookMark}>북마크한 레시피</li>
                  <li onClick={signoutHandler}>로그아웃</li>
                </ul>
              </div>
            ) : null}
            <Potal>
              {showModal && <UpdateProfileModal onClose={showModalHandler} />}
            </Potal>
          </StMypageMenu>
        </StMypageWrapper>
      </StHeader>
    </StLayout>
  );
};

export default Header;

const StLayout = styled.div`
  width: 100%;
  height: 64px;
  background: #ffffff;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.04);
`;

const StHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
  padding: 14px 84px; // navbar 대비 거리, margin @Figma

  /* tablet */
  @media all and (max-width: 1024px) {
    padding: 14px 60px;
  }

  /* mobile */
  // TODO GNB
  @media all and (max-width: 600px) {
    padding: 14px 16px;
  }
`;

const StMypage = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;

  color: #656565;
  background-color: inherit;
  &:hover {
    cursor: default;
    color: #fc9700;
  }
`;

const StMypageMenu = styled.div`
  position: absolute;
  z-index: 50;
`;

const StMypageWrapper = styled.div`
  li {
    border: 1px solid black;
    background-color: white;
  }
`;
