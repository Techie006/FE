const colors = {
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

export const designTheme = {
  colors: {
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
  },

  page: {
    layout: {
      background: colors.background.gray,
    },
    content: {
      fontFamily: `'Noto Sans KR', sans-serif`,
      fontWeight: "700",
      fontSize: "16px",
      lineHeight: "23px",
    },
  },

  section: {
    layout: {
      background: colors.background.white,
      borderRadius: "10px",
      boxShadow: "0px 3px 13px 1px rgba(0, 0, 0, 0.05)",
    },
    content: {
      fontWeight: "700",
      fontSize: "16px",
      lineHeight: "23px",
    },
    // TODO 안쓰는지 확인해보고 안쓰면 지우기
    box: {
      background: colors.background.white,
      boxShadow: "0px 2px 11px rgba(0, 0, 0, 0.08)",
      borderRadius: "8px",
      fontWeight: "700",
      fontSize: "14px",
      lineHeight: "20px",
    },
  },

  modal: {
    layout: {
      background: colors.font.mainWhite,
      boxShadow: "0px 3px 13px 1px rgba(0, 0, 0, 0.05)",
      borderRadius: "15px",
    },
  },

  button: {
    layout: {
      background: colors.background.white,
      border: "none",
      borderRadius: "6px",
      borderRoundRadius: "30px",
      boxShadow: "0px 3px 13px 1px rgba(0, 0, 0, 0.05)",
    },
    content: {
      fontWeight: "700",
      fontSize: "16px",
      lineHeight: "23px",
    },
    auth: {
      layout: {
        border: "1px solid #F07401",
      },
      content: {
        basic: {
          fontSize: "16px",
          lineHeight: "23px",
          fontWeight: "700",
        },
        large: {
          fontSize: "19px",
          fontWeight: "700",
          lineHeight: "28px",
        },
      },
      colors: {
        basic: {
          background: colors.main.orange,
          text: colors.font.subWhite,
        },
        selected: {
          background: colors.main.mint,
          text: colors.special.purple,
        },
      },
    },
    statistics: {
      colors: {
        basic: {
          background: colors.special.whiteGray,
          text: colors.sub.brown,
        },
        selected: {
          background: colors.background.yellow,
          text: colors.special.purple,
        },
      },
      content: {
        fontWeight: "500",
        fontSize: "10px",
        lineHeight: "18px",
      },
    },
    recipes: {
      colors: {
        basic: {
          background: colors.background.white,
          text: colors.font.lightGray1,
        },
        selected: {
          background: colors.special.yellow,
          text: colors.font.gray1,
        },
      },
      content: {
        fontWeight: "700",
        fontSize: "16px",
        lineHeight: "23px",
      },
    },
    calendar: {
      layout: {
        border: "1px solid #ECECEC",
      },
      colors: {
        basic: {
          background: colors.background.gray,
          text: "#5B5B5B",
        },
      },
      content: {
        fontWeight: "500",
        fontSize: "10px",
        lineHeight: "14px",
      },
    },
    modal: {
      colors: {
        basic: {
          background: "#EFEFEF",
          text: colors.font.lightGray1,
        },
        selected: {
          background: colors.special.yellow,
          text: colors.font.mainBlack,
        },
      },
      content: {
        fontWeight: "700",
        fontSize: "14px",
        lineHeight: "16px",
      },
    },
  },

  textbox: {
    layout: {
      borderRadius: "6px",
      borderRoundRadius: "30px",
      boxShadow: "0px 3px 13px 1px rgba(0, 0, 0, 0.05)",
    },
    content: {
      fontWeight: "700",
      fontSize: "16px",
      lineHeight: "23px",
    },
    colors: {
      background: colors.background.white,
    },
  },

  iconbox: {
    layout: {
      background: colors.background.white,
      borderRadius: "6px",
      borderRoundRadius: "30px",
      boxShadow: "0px 3px 13px 1px rgba(0, 0, 0, 0.05)",
    },
    content: {
      fontWeight: "700",
      fontSize: "16px",
      lineHeight: "23px",
    },
    size: {
      // s1(big) ---> s5(small)
      s1: "24px",
      s2: "22px",
      s3: "20px",
      s4: "18px",
      s5: "15px",
    },
    colors: {
      color: colors.font.gray2,
    },
  },

  effects: {
    transition: "all 0.3s",
    transform: "scale(1,1)",
  },
};
