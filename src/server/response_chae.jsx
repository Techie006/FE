// MOCK API before connecting real API

const RESP_CHAE = {
  RECIPES: {
    // 1. get ingredients state (/api/statistics/state)
    GET_STATE_SUCCESS: {
      result: true,
      content: {
        // in-hurry, warning, fine
        percentage: [0.3333, 0.3333, 0.3333],
        count: [3, 3, 3],
      },
      status: {
        code: 200,
        message: "식재료 상태 제공에 성공하였습니다.",
      },
    },
    GET_STATE_FAIL: {
      result: false,
      status: {
        code: 400,
        message: "해당 사용자가 입력한 식재료가 없습니다.",
      },
    },
  },
  STATISTICS: {
    // 1. get ingredients state (/api/statistics/state)
    GET_STATE_SUCCESS: {
      result: true,
      content: {
        // in-hurry, warning, fine
        percentage: [0.3333, 0.3333, 0.3333],
        count: [3, 3, 3],
      },
      status: {
        code: 200,
        message: "식재료 상태 제공에 성공하였습니다.",
      },
    },
    GET_STATE_FAIL: {
      result: false,
      status: {
        code: 400,
        message: "해당 사용자가 입력한 식재료가 없습니다.",
      },
    },
    // 2. get ingredients category (/api/statistics/category)
    GET_CATEGORY_SUCCESS: {
      result: true,
      content: {
        starch_num: 3,
        nut_num: 3,
        cereal_num: 3,
        fruit_num: 4,
        etc_num: 4,
        nan_num: 4,
        sugar_num: 4,
        pulses_num: 5,
        mushroom_num: 5,
        fish_num: 5,
        milkProducts_num: 5,
        fatAndOils_num: 5,
        meat_num: 6,
        drink_num: 6,
        processedFood_num: 6,
        seasoning_num: 6,
        alcohol_num: 6,
        tea_num: 6,
        vegetable_num: 7,
        seaweed_num: 7,
      },
      status: {
        code: 200,
        message: "식재료 카테고리 제공에 성공하였습니다.",
      },
    },
    GET_CATEGORY_FAIL: {
      result: false,
      status: {
        code: 400,
        message: "해당 사용자가 입력한 식재료가 없습니다.",
      },
    },
    // 3. get daily check (/api/statistics/daily)
    GET_DAILY_SUCCESS: {
      result: true,
      content: {
        statistics: {
          today: { calories: 300, nutrients: [300, 400, 500] },
          yesterday: { calories: 300, nutrients: [200, 300, 400] },
        },
      },
      status: {
        code: 200,
        message: "통계자료 제공에 성공하였습니다.",
      },
    },
    GET_DAILY_FAIL: {
      result: false,
      status: {
        code: 400,
        message: "해당 사용자가 요리한 레시피가 없습니다.",
      },
    },
    // 4. get nutrients (/api/statistics/ratio/nutrients)
    GET_NUTRIENTS_SUCCESS: {
      result: true,
      content: {
        statistics: {
          days: [
            "2022-03-01",
            "2022-04-01",
            "2022-05-01",
            "2022-06-01",
            "2022-07-01",
            "2022-08-01",
            "2022-09-01",
          ],
          carbohydrates: [10, 20, 30, 40, 50, 60, 70], //g
          proteins: [2, 2, 20, 4, 50, 6, 7], //g
          fats: [0, 3, 5, 5, 5, 6, 7], //g
          sodium: [7, 6, 5, 4, 3, 2, 7], //mg
        },
      },
      status: {
        code: 200,
        message: "통계자료 제공에 성공하였습니다.",
      },
    },
    GET_NUTRIENTS_FAIL: {
      result: false,
      status: {
        code: 400,
        message: "해당 사용자가 요리한 레시피가 없습니다.",
      },
    },
    // 5. get calories (/api/statistics/ratio/calories)
    GET_CALORIES_SUCCESS: {
      result: true,
      content: {
        statistics: {
          days: [
            "2022-03-01",
            "2022-04-01",
            "2022-05-01",
            "2022-06-01",
            "2022-07-01",
            "2022-08-01",
            "2022-09-01",
          ],
          calories: [100, 200, 300, 400, 500, 600, 700], //kcal
        },
      },
      status: {
        code: 200,
        message: "통계자료 제공에 성공하였습니다.",
      },
    },
    GET_CALORIES_FAIL: {
      result: false,
      status: {
        code: 400,
        message: "해당 사용자가 요리한 레시피가 없습니다.",
      },
    },
  },
  CALENDAR: {},
  CLASS: {},
};

export default RESP_CHAE;
