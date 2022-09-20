import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAppleWhole } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import Link from "../../elements/atoms/Link";

const Header = () => {
  const NAVIGATORS = [
    "홈",
    "통계",
    "캘린더",
    "쿠킹클래스",
    "레시피",
    "마이페이지",
  ];
  const PATHS = [
    "/",
    "/statistics",
    "/calendar",
    "/classes",
    "/recipes",
    "/my",
  ];

  const navigator = NAVIGATORS.map((nav, idx) => (
    <Link key={nav} content={nav} link={PATHS[idx]} />
  ));

  return (
    <StWrapper>
      <StLayout>
        <FontAwesomeIcon icon={faAppleWhole} size='lg' />
        {navigator}
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
  background-color: ${(props) => props.theme.colors.background.white};
`;

const StLayout = styled.div`
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-left: 3%;
  margin-top: 10px;
  background-color: inherit;
`;
