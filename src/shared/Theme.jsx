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
};

export const designTheme = {
  page: {
    layout: {
      background: colors.background.gray,
      boxShadow: "0px 3px 13px 1px rgba(0, 0, 0, 0.05)",
      borderRadius: "10px",
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
      background: "#FFFFFF",
      boxShadow: "0px 3px 13px 1px rgba(0, 0, 0, 0.05)",
      borderRadius: "10px",
    },
    content: {
      fontWeight: "700",
      fontSize: "16px",
      lineHeight: "23px",
    },
    // TODO 안쓰는지 확인해보고 안쓰면 지우기
    box: {
      background: "#FFFFFF",
      boxShadow: "0px 2px 11px rgba(0, 0, 0, 0.08)",
      borderRadius: "8px",
      fontWeight: "700",
      fontSize: "14px",
      lineHeight: "20px",
    },
  },

  modal: {
    layout: {
      background: "#FFFFFF",
      boxShadow: "0px 3px 13px 1px rgba(0, 0, 0, 0.05)",
      borderRadius: "15px",
    },
  },

  button: {
    layout: {
      background: "#FFFFFF",
      boxShadow: "0px 3px 13px 1px rgba(0, 0, 0, 0.05)",
      borderRadius: "6px",
      borderRoundRadius: "30px",
    },
    content: {
      fontWeight: "700",
      fontSize: "16px",
      lineHeight: "23px",
    },
    auth: {
      layout: {
        border: "1px solid #F07401",
        borderRadius: "6px",
      },
      content: {
        basic: {
          fontSize: "16px",
          lineHeight: "23px",
          fontWeight: "700",
        },
        large: {
          fontSize: "19.1769px",
          lineHeight: "28px",
          fontWeight: "700",
        },
      },
      colors: {
        basic: {
          background: colors.main.orange,
          text: "#FAFAFA",
        },
        special: {
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
          background: "#FFFFFF",
          text: "#A5A5A5",
        },
        selected: {
          background: colors.special.yellow,
          text: "#282828",
        },
      },
      content: {
        fontWeight: "700",
        fontSize: "16px",
        lineHeight: "23px",
      },
    },
    modal: {
      colors: {
        basic: {
          background: "#EFEFEF",
          text: "#A5A5A5",
        },
        selected: {
          background: colors.special.yellow,
          text: "#000000",
        },
      },
      content: {
        fontWeight: "700",
        fontSize: "14px",
        lineHeight: "16px",
      },
    },
    calendar: {
      layout: {
        border: "1px solid #ECECEC",
        borderRadius: "4px",
      },
      colors: {
        basic: {
          background: "#FAFAFA",
          text: "#5B5B5B",
        },
      },
      content: {
        fontWeight: "500",
        fontSize: "10px",
        lineHeight: "14px",
      },
    },
  },

  textbox: {
    layout: {
      background: "#FFFFFF",
      boxShadow: "0px 3px 13px 1px rgba(0, 0, 0, 0.05)",
      borderRadius: "6px",
      borderRoundRadius: "30px",
    },
    content: {
      fontWeight: "700",
      fontSize: "16px",
      lineHeight: "23px",
    },
  },

  iconbox: {
    layout: {
      background: "#FFFFFF",
      boxShadow: "0px 3px 13px 1px rgba(0, 0, 0, 0.05)",
      borderRadius: "6px",
      borderRoundRadius: "30px",
    },
    content: {
      fontWeight: "700",
      fontSize: "16px",
      lineHeight: "23px",
    },
    size: {
      s1: "24px",
      s2: "22px",
      s3: "20px",
      s4: "18px",
      s5: "15px",
    },
  },
};
