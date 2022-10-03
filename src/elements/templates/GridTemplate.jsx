import styled from "styled-components";

const GridTemplate = ({ children, ...props }) => {
  return (
    <StLayout {...props}>
      {children}
      {/* 아래 코드 활성화하면 그리드를 직접 볼 수 있어요. */}
      {/* <StGrid>1</StGrid>
      <StGrid>2</StGrid>
      <StGrid>3</StGrid>
      <StGrid>4</StGrid>
      <StGrid>5</StGrid>
      <StGrid>6</StGrid>
      <StGrid>7</StGrid>
      <StGrid>8</StGrid>
      <StGrid>9</StGrid>
      <StGrid>10</StGrid>
      <StGrid>11</StGrid>
      <StGrid>12</StGrid> */}
      {/* 아래 코드처럼 섹션을 생성해서 각 컴포넌트에서 사용하시면 됩니다. */}
      {/* <StBigSection>BigSection</StBigSection>
      <StSmallSection>SmallSection</StSmallSection> */}
    </StLayout>
  );
};

export default GridTemplate;

const StLayout = styled.div`
  display: grid;
  grid-auto-rows: ${(props) => (!props.height ? "621px" : `${props.height}px`)};
  // 콘텐츠 영역 확인하려면 아래 주석 활성화하세요!
  /* background: black;
  background-clip: content-box; */
  padding: 20px 84px; // navbar 대비 거리, margin @Figma
  /* grid-template-columns: repeat(12, calc((100% - (11 * 28px)) / 12)); */
  grid-template-columns: repeat(12, 12fr);
  grid-column-gap: 28px; // gutter @Figma
  grid-row-gap: 28px; // gutter @Figma
  grid-auto-rows: minmax(349px, auto);

  /* tablet */
  @media all and (max-width: 1024px) {
    padding: 20px 60px; // navbar 대비 거리, margin @Figma
    grid-template-columns: repeat(12, 12fr);
    grid-column-gap: 28px; // gutter @Figma
    grid-row-gap: 28px; // gutter @Figma
  }

  /* mobile */
  @media all and (max-width: 600px) {
    padding: 0px 16px; // navbar 대비 거리, margin @Figma
    grid-template-columns: repeat(4, 4fr);
    grid-column-gap: 16px; // gutter @Figma
    grid-row-gap: 16px; // gutter @Figma
  }
`;

export const StGrid = styled.div`
  background: #ffffff;
  box-shadow: 0px 3px 13px 1px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;

// const StBigSection = styled(StGrid)`
//   grid-column: 1 / span 9;

//   /* mobile */
//   @media all and (max-width: 600px) {
//     grid-column: 1 / span 4;
//   }
// `;

// const StSmallSection = styled(StGrid)`
//   grid-column: 10 / span 3;

//   /* mobile */
//   @media all and (max-width: 600px) {
//     grid-column: 1 / span 4;
//   }
// `;
