import Colors from "./Colors";

export const designTheme = {
  colors: Colors,

  font: {
    fontFamily: `Noto Sans KR', 'Happiness-Sans-Bold', sans-serif`,
  },

  page: {
    layout: {
      background: Colors.background.gray,
    },
    content: {
      fontFamily: `Noto Sans KR', 'Happiness-Sans-Bold', sans-serif`,
      fontWeight: "700",
      fontSize: "16px",
      lineHeight: "23px",
    },
  },

  section: {
    layout: {
      background: Colors.background.white,
      borderRadius: "10px",
      boxShadow: "0px 3px 13px 1px rgba(0, 0, 0, 0.05)",
    },
    content: {
      fontWeight: "700",
      fontSize: "16px",
      lineHeight: "23px",
    },
    box: {
      background: Colors.background.gray,
      boxShadow: "0px 2px 11px rgba(0, 0, 0, 0.08)",
      borderRadius: "8px",
      fontWeight: "700",
      fontSize: "14px",
      lineHeight: "20px",
    },
  },

  modal: {
    layout: {
      background: Colors.font.mainWhite,
      boxShadow: "0px 3px 13px 1px rgba(0, 0, 0, 0.05)",
      borderRadius: "15px",
    },
  },

  button: {
    layout: {
      background: Colors.background.white,
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
    colors: {
      disabled: Colors.background.gray,
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
          background: Colors.main.orange,
          text: Colors.font.subWhite,
        },
        selected: {
          background: Colors.main.mint,
          text: Colors.special.purple,
        },
      },
    },
    statistics: {
      colors: {
        basic: {
          background: Colors.special.whiteGray,
          text: Colors.sub.brown,
        },
        selected: {
          background: Colors.background.yellow,
          text: Colors.special.purple,
        },
        hover: {
          background: Colors.special.whiteGray,
          text: Colors.sub.brown,
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
          background: Colors.background.white,
          text: Colors.font.lightGray1,
        },
        selected: {
          background: Colors.special.yellow,
          text: Colors.font.gray1,
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
          background: "#FAFAFA",
          text: "#5B5B5B",
        },
        hover: {
          background: Colors.background.gray,
          text: "#5B5B5B",
        },
      },
      content: {
        fontWeight: "500",
        fontSize: "10px",
        lineHeight: "14px",
      },
    },
    class: {
      layout: {
        border: "1px solid #ECECEC",
      },
      colors: {
        basic: {
          background: Colors.background.yellow,
          text: Colors.font.mainWhite,
        },
        hover: {
          background: Colors.background.orange,
          text: Colors.special.purple,
        },
      },
      content: {
        fontWeight: "700",
        fontSize: "14px",
        lineHeight: "16px",
      },
    },
    modal: {
      colors: {
        basic: {
          background: "#EFEFEF",
          text: Colors.font.lightGray1,
        },
        selected: {
          background: Colors.special.yellow,
          text: Colors.font.mainBlack,
        },
      },
      content: {
        fontWeight: "700",
        fontSize: "14px",
        lineHeight: "16px",
      },
    },
    section: {
      colors: {
        basic: {
          background: Colors.background.yellow,
          text: Colors.font.mainWhite,
        },
        hover: {
          background: Colors.background.orange,
          text: Colors.special.purple,
        },
      },
      content: {
        fontWeight: "700",
        fontSize: "16px",
        lineHeight: "23px",
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
      background: Colors.background.white,
    },
  },

  iconbox: {
    layout: {
      background: Colors.background.white,
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
      color: Colors.font.gray2,
    },
  },

  input: {
    layout: {
      background: Colors.background.gray,
      borderRadius: "6px",
      border: "1px solid #DADADA",
    },
    content: {
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "20px",
    },
    colors: {
      text: "#A5A5A5",
    },
  },

  effects: {
    transition: "all 0.3s",
    transform: "scale(1,1)",
  },
};
