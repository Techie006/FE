import styled from "styled-components";

import MediumLink from "../../elements/links/MediumLink";

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
    "/home",
    "/statistics",
    "/calendar",
    "/class",
    "/recipes",
    "/my",
  ];

  const navigator = NAVIGATORS.map((nav, idx) => (
    <MediumLink key={nav} content={nav} link={PATHS[idx]} />
  ));

  return <StWrapper>{navigator}</StWrapper>;
};

export default Header;

const StWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
