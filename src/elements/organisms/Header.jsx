import { useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import { apis } from "../../shared/axios";
import { showConfirm } from "../../shared/popups";
import { ReactComponent as Logo } from "../../assets/icons/common/Logo.svg";
import Link from "../atoms/Link";
import DropDown from "../atoms/DropDown";
import Potal from "../../components/modals/Potal";
import UpdateProfileModal from "../../components/modals/UpdateProfileModal";

const Header = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // 로그인 되어있지 않으면 로그인 페이지로 이동
  const redirectHandler = useCallback(() => {
    if (!isLogin) {
      navigate("/auth");
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    redirectHandler();
  }, [redirectHandler]);

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

  // 사용자가 특정 드롭다운 선택
  const onSelect = async ({ key }) => {
    if (key === "profile") {
      setShowModal(true);
      return;
    }
    if (key === "bookmark") {
      navigate("/bookmark");
      return;
    }
    if (key === "signout") {
      console.log("onClick signout");
      const result = await showConfirm(
        "정말 로그아웃 하실건가요?",
        "warning",
        true,
        "조금 더 둘러볼래요.",
        "로그아웃 할래요."
      );

      if (result.isConfirmed) {
        const resp = await apis.sign_out();
        const { result } = resp.data;
        if (!result) {
          return;
        }

        // 로컬 스토리지에서 유저 정보를 삭제

        localStorage.clear();

        // 로그인 페이지로 이동
        navigate("/auth");
      }
    }
  };

  const showModalHandler = () => {
    setShowModal(false);
  };

  return (
    <StLayout>
      <StHeader>
        <Logo />
        {navigator}
        <DropDown
          onSelect={onSelect}
          keys={["profile", "bookmark", "signout"]}
          contents={["프로필 설정", "북마크", "로그아웃"]}
        >
          <StMypage>마이페이지</StMypage>
        </DropDown>
        <Potal>
          {showModal && <UpdateProfileModal onClose={showModalHandler} />}
        </Potal>
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
