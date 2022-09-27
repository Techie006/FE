const Colors = {
  main: {
    orange_red: "#FF5C01",
    orange: "#FC9700",
    mint: "#74BDB2",
  },
  sub: {
    brown: "#8E7B6D",
    mint: "#EBFAF5",
    orange_red: "#FFEAD8",
  },
  background: {
    orange: "#FF8E42",
    yellow: "#FFB356",
    gray: "#FAFAFA",
    white: "#FFFFFF",
  },
  special: {
    yellow: "#FFDD7C",
    ivory: "#FFF8CF",
    brown: "#4F2F00",
    brownBeige: "#DFB078",
    whiteGray: "#F0EADC",
    blue: "#79A6DC",
    purple: "#482647",
  },
  font: {
    mainBlack: "#000000",
    mainWhite: "#FFFFFF",
    subWhite: "#FAFAFA",
    // 1(dark) ---> 4(light)
    gray1: "#282828",
    gray2: "#4B4B4B",
    gray3: "#656565",
    gray4: "#939393",
    // 1(dark) ---> 4(light)
    lightGray1: "#A5A5A5",
    lightGray2: "#C0C0C0",
    lightGray3: "#DADADA",
    lightGray4: "#ECECEC",
  },
};

export const ChartColors = {
  font: Colors.font.gray3,
  due: ["#FF5C01", "#FC9700", "#74BDB2"],
  // TODO 카테고리 색상 뽑아달라고 요청 @Design
  category: ["#FFDD7C", "#FF5C01", "#74BDB2", "#FF8E42", "#FAFAFA"],
  calorie: ["#DFB078"],
  nutrients: ["#FF5C01", "#FFDD7C", "#74BDB2"],
};

export default Colors;
