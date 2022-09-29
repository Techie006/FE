// MOCK API before connecting real API

const RESP = {
  // recipes: 5 apis
  RECIPES: {
    // 1. get 5 recipes in certain page (/api/reipes?pageNum={pageNum}*pageLimit=&{pageLimit})
    GET_RECIPES_SUCCESS: {
      data: {
        result: true,
        content: {
          current_page_num: 1,
          total_page_num: 3,
          recipes: [
            {
              id: 1,
              recipe_name: "칼륨듬뿍고구마죽",
              ingredients: ["고구마죽 고구마", "설탕", "찹쌀가루"],
              final_img:
                "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00017_2.png",
              method: "끓이기",
              category: "후식",
              calorie: 200,
              is_liked: true,
            },
            {
              id: 2,
              recipe_name: "누룽지 두부 계란죽",
              ingredients: ["애호박", "표고버섯", "당근"],
              final_img:
                "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00016_2.png",
              method: "끓이기",
              category: "밥",
              calorie: 380,
              is_liked: true,
            },
            {
              id: 3,
              recipe_name: "새우두부계란찜",
              ingredients: ["초밥 밥", "배합초 식초", "설탕"],
              final_img:
                "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00009_2.png",
              method: "찌기",
              category: "반찬",
              calorie: 200,
              is_liked: false,
            },
            {
              id: 4,
              recipe_name: "두부 곤약 나물 비빔밥",
              ingredients: ["두부", "흰쌀", "현미쌀"],
              final_img:
                "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00010_2.png",
              method: "끓이기",
              category: "밥",
              calorie: 200,
              is_liked: false,
            },
            {
              id: 5,
              recipe_name: "저염 간장을 이용한 닭개장 비빔밥",
              ingredients: ["흑미밥 쌀", "검은 쌀", "닭가슴살"],
              final_img:
                "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00011_2.png",
              method: "끓이기",
              category: "밥",
              calorie: 200,
              is_liked: true,
            },
          ],
        },
        status: {
          code: 200,
          message: "해당 페이지 레시피 제공에 성공하였습니다.",
        },
      },
    },
    GET_RECIPES_LAST_SUCCESS: {
      data: {
        result: true,
        content: {
          current_page_num: 3,
          total_page_num: 3,
          recipes: [
            {
              id: 11,
              recipe_name: "된장국",
              ingredients: ["된장국 두부", "애느타리버섯", "감자"],
              final_img:
                "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00037_2.png",
              method: "끓이기",
              category: "국&찌개",
              calorie: 260,
              is_liked: false,
            },
          ],
        },
        status: {
          code: 200,
          message: "해당 페이지 레시피 제공에 성공하였습니다.",
        },
      },
    },
    // 2. get 5 recipes which are matching to keyworkd in certain page (/api/reipes/search)
    GET_SEARCHED_RECIPES_SUCCESS: {
      data: {
        result: true,
        content: {
          current_page_num: 1,
          total_page_num: 3,
          recipes: [
            {
              id: 1,
              recipe_name: "칼륨듬뿍고구마죽",
              ingredients: ["고구마죽 고구마", "설탕", "찹쌀가루"],
              final_img:
                "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00017_2.png",
              method: "끓이기",
              category: "후식",
              calorie: 200,
              is_liked: true,
            },
            {
              id: 2,
              recipe_name: "누룽지 고구마 계란죽",
              ingredients: ["애호박", "표고버섯", "당근"],
              final_img:
                "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00016_2.png",
              method: "끓이기",
              category: "밥",
              calorie: 380,
              is_liked: true,
            },
            {
              id: 3,
              recipe_name: "새우두부고구마계란찜",
              ingredients: ["초밥 밥", "배합초 식초", "설탕"],
              final_img:
                "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00009_2.png",
              method: "찌기",
              category: "반찬",
              calorie: 200,
              is_liked: false,
            },
            {
              id: 4,
              recipe_name: "두부 곤약 나물 고구마 비빔밥",
              ingredients: ["두부", "흰쌀", "현미쌀"],
              final_img:
                "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00010_2.png",
              method: "끓이기",
              category: "밥",
              calorie: 200,
              is_liked: false,
            },
            {
              id: 5,
              recipe_name: "저염 간장을 이용한 닭개장 고구마 비빔밥",
              ingredients: ["흑미밥 쌀", "검은 쌀", "닭가슴살"],
              final_img:
                "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00011_2.png",
              method: "끓이기",
              category: "밥",
              calorie: 200,
              is_liked: true,
            },
          ],
        },
        status: {
          code: 200,
          message: "해당 페이지 레시피 제공에 성공하였습니다.",
        },
      },
    },
    GET_SEARCHED_RECIPES_LAST_SUCCESS: {
      data: {
        result: true,
        content: {
          current_page_num: 3,
          total_page_num: 3,
          recipes: [
            {
              id: 11,
              recipe_name: "고구마 된장국",
              ingredients: ["된장국 두부", "애느타리버섯", "감자"],
              final_img:
                "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00037_2.png",
              method: "끓이기",
              category: "국&찌개",
              calorie: 260,
              is_liked: false,
            },
          ],
        },
        status: {
          code: 200,
          message: "해당 페이지 레시피 제공에 성공하였습니다.",
        },
      },
    },
    // 3. get recipe detail (/api/recipe/{id})
    GET_RECIPE_SUCCESS: {
      data: {
        result: true,
        content: {
          recipe: {
            id: 11,
            recipe_name: "고구마 된장국",
            ingredients: [
              "된장국 두부",
              "애느타리버섯",
              "감자",
              "가지",
              "고구마",
              "강된장",
            ],
            final_img:
              "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00037_2.png",
            method: "끓이기",
            category: "국&찌개",
            calorie: 260,
            carbohydrates: 300,
            proteins: 200,
            fats: 150,
            sodium: 30,
            is_liked: true,
            manual_desc: [
              "1. 감자, 양파를 잘 익도록 얇게 썬다.",
              "2. 애느타리버섯은 썰어 달궈진 팬에 굽는다.",
              "3. 대파를 송송 썬다.",
              "4. 냄비에 물을 붓고 된장을 푼 뒤 감 자, 양파, 두부를 넣어 재료가 투명 해지게 끓인다.",
              "5. 된장국의 재료를 건져서 국물 한 국 자와 믹서에 넣어 갈은 다음 된장국 에 다시 넣어 한 번 더 끓인다.",
              "6. 구운 애느타리버섯과 대파를 국에 넣어 끓인 후 그릇에 담는다.",
            ],
            manual_imgs: [
              "",
              "http://www.foodsafetykorea.go.kr/uploadimg/cook/20_00037_2.png",
              "",
              "http://www.foodsafetykorea.go.kr/uploadimg/cook/20_00037_4.png",
              "",
              "http://www.foodsafetykorea.go.kr/uploadimg/cook/20_00037_6.png	",
            ],
          },
        },
        status: {
          code: 200,
          message: "레시피 세부정보 제공에 성공하였습니다.",
        },
      },
    },
    // 4. get all ingredients (/api/ingredients)
    GET_INGREDIENTS_SUCCESS: {
      data: {
        result: true,
        content: {
          ingredients_num: 10,
          storage: [
            {
              id: 1,
              food_name: "고등어",
              group_name: "가공식품",
              in_date: "2022-09-01",
              d_date: "D-7",
              category: "frozen",
            },
            {
              id: 2,
              food_name: "멸치",
              group_name: "가공식품",
              in_date: "2022-09-01",
              d_date: "D-3",
              category: "room-temp",
            },
            {
              id: 3,
              food_name: "토마토",
              group_name: "가공식품",
              in_date: "2022-09-01",
              d_date: "D-20",
              category: "refrigirated",
            },
            {
              id: 4,
              food_name: "가지",
              group_name: "가공식품",
              in_date: "2022-09-01",
              d_date: "D-20",
              category: "refrigirated",
            },
            {
              id: 5,
              food_name: "고추",
              group_name: "가공식품",
              in_date: "2022-09-01",
              d_date: "D-20",
              category: "refrigirated",
            },
            {
              id: 6,
              food_name: "갈치",
              group_name: "가공식품",
              in_date: "2022-09-01",
              d_date: "D-20",
              category: "refrigirated",
            },
            {
              id: 7,
              food_name: "생밤",
              group_name: "가공식품",
              in_date: "2022-09-01",
              d_date: "D-20",
              category: "refrigirated",
            },
            {
              id: 8,
              food_name: "딸기",
              group_name: "가공식품",
              in_date: "2022-09-01",
              d_date: "D-20",
              category: "refrigirated",
            },
            {
              id: 9,
              food_name: "돼지목살",
              group_name: "가공식품",
              in_date: "2022-09-01",
              d_date: "D-20",
              category: "refrigirated",
            },
            {
              id: 10,
              food_name: "소고기",
              group_name: "가공식품",
              in_date: "2022-09-01",
              d_date: "D-20",
              category: "refrigirated",
            },
          ],
        },
        status: {
          code: 200,
          message: "냉장고 재료 제공에 성공하였습니다.",
        },
      },
    },
    // 4. finish certain recipe (/api/recipe/finish?id={id})
    FINISH_RECIPE_SUCCESS: {
      data: {
        result: true,
        status: {
          code: 200,
          message: "해당 레시피가 요리 완료 처리되었습니다.",
        },
      },
    },
    // 5. like certain recipe (/api/recipe/like?id={id})
    LIKE_RECIPE_SUCCESS: {
      data: {
        result: true,
        status: {
          code: 200,
          message: "해당 레시피 북마크가 성공하였습니다.",
        },
      },
    },
    LIKE_RECIPE_FAIL: {
      data: {
        result: false,
        status: {
          code: 400,
          message: "이미 북마크된 레시피입니다.",
        },
      },
    },
    // 6. unlike certain recipe (/api/recipe/unlike?id={id})
    UNLIKE_RECIPE_SUCCESS: {
      data: {
        result: true,
        status: {
          code: 200,
          message: "해당 레시피 북마크 취소가 성공하였습니다.",
        },
      },
    },
    UNLIKE_RECIPE_FAIL: {
      data: {
        result: false,
        status: {
          code: 400,
          message: "이미 북마크 취소된 레시피입니다.",
        },
      },
    },
  },

  // statistics: 5 apis
  // [x] all checked
  // [x] all connected
  STATISTICS: {
    // 1. get ingredients state (/api/statistics/state)
    GET_STATE_SUCCESS: {
      data: {
        result: true,
        content: {
          // in-hurry, warning, fine
          count: [3, 3, 3],
        },
        status: {
          code: 200,
          message: "식재료 상태 제공에 성공하였습니다.",
        },
      },
    },
    GET_STATE_FAIL: {
      data: {
        result: true,
        content: {
          // in-hurry, warning, fine
          count: [0, 0, 0],
        },
        status: {
          code: 200,
          message: "식재료 상태 제공에 실패하였습니다.",
        },
      },
    },

    // 2. get ingredients category (/api/statistics/category)
    GET_CATEGORY_SUCCESS: {
      data: {
        result: true,
        content: {
          nums: [1, 2, 3, 4, 5],
        },
        status: {
          code: 200,
          message: "식재료 카테고리 제공에 성공하였습니다.",
        },
      },
    },
    GET_CATEGORY_FAIL: {
      data: {
        result: true,
        content: {
          nums: [0, 0, 0, 0, 0],
        },
        status: {
          code: 200,
          message: "해당 사용자가 입력한 식재료가 없습니다.",
        },
      },
    },
    // 3. get daily check (/api/statistics/daily)
    GET_DAILY_SUCCESS: {
      data: {
        result: true,
        content: {
          empty: false,
          statistics: {
            today: { calories: 1800, nutrients: [300, 400, 500] },
            yesterday: { calories: 2300, nutrients: [200, 300, 400] },
          },
        },
        status: {
          code: 200,
          message: "통계자료 제공에 성공하였습니다.",
        },
      },
    },
    GET_DAILY_FAIL: {
      data: {
        result: true,
        content: {
          empty: true,
          statistics: {
            today: { calories: 0, nutrients: [0, 0, 0] },
            yesterday: { calories: 0, nutrients: [0, 0, 0] },
          },
        },
        status: {
          code: 200,
          message: "통계자료 제공에 성공하였습니다.",
        },
      },
    },
    // 4. get calories (/api/statistics/ratio/calories)
    GET_CALORIES_SUCCESS: {
      data: {
        result: true,
        content: {
          empty: false,
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
    },
    GET_CALORIES_FAIL: {
      data: {
        result: true,
        content: {
          empty: true,
          statistics: null,
        },
        status: {
          code: 200,
          message: "통계자료 제공에 성공하였습니다.",
        },
      },
    },
    // 5. get nutrients (/api/statistics/ratio/nutrients)
    GET_NUTRIENTS_SUCCESS: {
      data: {
        result: true,
        content: {
          empty: false,
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
            // sodium: [7, 6, 5, 4, 3, 2, 7], //mg
          },
        },
        status: {
          code: 200,
          message: "통계자료 제공에 성공하였습니다.",
        },
      },
    },
    GET_NUTRIENTS_FAIL: {
      data: {
        result: true,
        content: {
          empty: true,
          statistics: null,
        },
        status: {
          code: 200,
          message: "통계자료 제공에 성공하였습니다.",
        },
      },
    },
  },

  // calendar: 6 apis
  // [x] all checked
  // [ ] all connected
  CALENDAR: {
    GET_ALL_DIETS_SUCCESS: {
      data: {
        result: true,
        content: {
          recipes: [
            {
              id: 1,
              day: "2022-09-01",
              recipe_name: "된장국",
              recipe_id: 123,
              time: "아침",
              liked: true,
              category: "일품",
              calorie: 200,
              method: "끓이기",
            },
            {
              id: 2,
              day: "2022-09-02",
              recipe_name: "된장국",
              recipe_id: 1,
              time: "아침",
              liked: true,
              category: "일품",
              calorie: 200,
              method: "끓이기",
            },
            {
              id: 3,
              day: "2022-09-13",
              recipe_name: "된장국",
              recipe_id: 123,
              time: "아침",
              liked: true,
              category: "일품",
              calorie: 200,
              method: "끓이기",
            },
            {
              id: 4,
              day: "2022-09-14",
              recipe_name: "된장국",
              recipe_id: 123,
              time: "아침",
              liked: true,
              category: "일품",
              calorie: 200,
              method: "끓이기",
            },
            {
              id: 5,
              day: "2022-09-14",
              recipe_name: "해초를 넣은 간장게장",
              recipe_id: 123,
              time: "점심",
              liked: true,
              category: "일품",
              calorie: 200,
              method: "삶기",
            },
            {
              id: 6,
              day: "2022-09-14",
              recipe_name: "오이소박이",
              recipe_id: 123,
              time: "저녁",
              liked: true,
              category: "일품",
              calorie: 200,
              method: "끓이기",
            },
            {
              id: 7,
              day: "2022-09-14",
              recipe_name: "오이소박이",
              recipe_id: 123,
              time: "저녁",
              liked: true,
              category: "일품",
              calorie: 200,
              method: "끓이기",
            },
          ],
        },
        status: {
          code: 200,
          message: "성공적으로 식단을 제공하였습니다.",
        },
      },
    },
    GET_WEEKLY_DIETS_SUCCESS: {
      data: {
        result: true,
        content: {
          days: [
            "2022-09-01",
            "2022-09-02",
            "2022-09-03",
            "2022-09-04",
            "2022-09-05",
            "2022-09-06",
            "2022-09-07",
          ],
          recipes: [
            {
              id: 1,
              start: "2022-09-01",
              recipe_name: "된장국",
              recipe_id: 123,
              time: "아침",
              liked: true,
              ingredients: ["가지", "토마토", "고등어"],
              category: "일품",
              calorie: 200,
              method: "끓이기",
            },
            {
              id: 2,
              start: "2022-09-02",
              recipe_name: "된장국",
              recipe_id: 123,
              time: "아침",
              liked: true,
              ingredients: ["가지", "토마토", "고등어"],
              category: "일품",
              calorie: 200,
              method: "끓이기",
            },
            {
              id: 3,
              start: "2022-09-03",
              recipe_name: "된장국",
              recipe_id: 123,
              time: "아침",
              liked: true,
              ingredients: ["가지", "토마토", "고등어"],
              category: "일품",
              calorie: 200,
              method: "끓이기",
            },
            {
              id: 4,
              start: "2022-09-04",
              recipe_name: "된장국",
              recipe_id: 123,
              time: "아침",
              liked: true,
              ingredients: ["가지", "토마토", "고등어"],
              category: "일품",
              calorie: 200,
              method: "끓이기",
            },
            {
              id: 5,
              start: "2022-09-05",
              recipe_name: "된장국",
              recipe_id: 123,
              time: "아침",
              liked: true,
              ingredients: ["가지", "토마토", "고등어"],
              category: "일품",
              calorie: 200,
              method: "끓이기",
            },
            {
              id: 6,
              start: "2022-09-17",
              recipe_name: "된장국",
              recipe_id: 123,
              time: "아침",
              liked: true,
              ingredients: ["가지", "토마토", "고등어"],
              category: "일품",
              calorie: 200,
              method: "끓이기",
            },
          ],
        },
        status: {
          code: 200,
          message: "성공적으로 해당 주의 식단을 제공하였습니다.",
        },
      },
    },
    CREATE_DIET: {
      result: true,
      content: {
        day: "2022-09-01",
        meal: {
          id: 1,
          recipe_name: "된장국",
          recipe_id: 123,
          time: "아침",
          liked: true,
          category: "일품",
          calorie: 200,
          method: "끓이기",
        },
      },
      status: {
        code: 200,
        message: "해당 날짜에 신규 식단을 등록하였습니다.",
      },
    },
    UPDATE_DIET: {
      result: true,
      content: {
        day: "2022-09-01",
        meal: {
          id: 1,
          recipe_name: "된장국",
          recipe_id: 123,
          time: "아침",
          liked: true,
          category: "일품",
          calorie: 200,
          method: "끓이기",
        },
      },
      status: {
        code: 200,
        message: "해당 날짜에 식단을 변경하였습니다.",
      },
    },
    DELETE_DIET: {
      result: true,
      content: {
        day: "2022-09-01",
        meal: {
          id: 1,
          recipe_name: "된장국",
          recipe_id: 123,
          time: "아침",
          liked: true,
          category: "일품",
          calorie: 200,
          method: "끓이기",
        },
      },
      status: {
        code: 200,
        message: "해당 날짜에 식단을 삭제하였습니다.",
      },
    },
  },

  COMMON: {
    GET_AUTOCOMPLETE_SUCCESS: {
      data: {
        result: true,
        content: {
          empty: false,
          recipes: [
            {
              id: 1,
              recipe_name: "된장국",
            },
            {
              id: 2,
              recipe_name: "된장라면",
            },
            {
              id: 3,
              recipe_name: "된장찌개",
            },
            {
              id: 4,
              recipe_name: "된장제육볶음",
            },
            {
              id: 5,
              recipe_name: "된장 베이스로 절인 돼지고기",
            },
            {
              id: 6,
              recipe_name: "된장국",
            },
            {
              id: 7,
              recipe_name: "된장라면",
            },
            {
              id: 8,
              recipe_name: "된장찌개",
            },
            {
              id: 9,
              recipe_name: "된장제육볶음",
            },
            {
              id: 10,
              recipe_name: "된장 베이스로 절인 돼지고기",
            },
          ],
        },
        status: {
          code: 200,
          message: "키워드와 일치하는 결과를 제공하였습니다.",
        },
      },
    },
    GET_AUTOCOMPLETE_EMPTY: {
      data: {
        result: true,
        content: {
          empty: true,
          recipes: null,
        },
        status: {
          code: 200,
          message: "검색어와 일치하는 데이터가 없습니다.",
        },
      },
    },
  },

  // classes: 1 apis
  CLASS: {
    GET_CLASSES_SUCCESS: {
      data: {
        result: true,
        content: {
          empty: false,
          classes: [
            {
              class_id: 1,
              redis_class_id: "abcdef",
              class_name: "신나는 요리 클래스",
              viewer_nums: 200,
              class_img:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAAAw1BMVEUG1aCD7NDqM1YA1J116csG2aIg2KiI7dMGvZUGmIW1q6X///9/8NN989XsKlLuI0/vHEzOfoKY077jZnsFM2KW18HxDEe+nZrFkJIGw5gFEFvNgYUFioAGtZIGyJoFW24FdHcFLGEGq40FF1wFN2MFMmIGo4oFkIKxsagGqIwFPGUFfHoFIl4Fl4UFbXWY6tBP3rTh+vK98uHx/Phc37ep7NbQ9urJiIvnOVr48fHpV3DzxMrneIn119ruq7TyzNHutr0DCiEMAAAC2ElEQVR4nO3d61LaQBiA4ciyAZoasIIK9oQFiiJKjFJoPfT+r6ogaFuySNgPgpH3+eOMOAbf2SxJFoPjAAAAAAAAAAAAAAAAANvO3fQTSDN16alNP4c0c3vkk6AeAGAFFK8nAqrH0YxA4HnBpp9Daqkrb+SK8WdHheN8IfnsqP44X0A+O6o3zndNPkvKvblxqWeP4z7gtVLMbQIq+OfAROvJ9xK0sT98NdzRkcnTEpH++Gncz80mKO3LU4HXnw4B/bn85TFfbicxubTnU8+XVPTXRv1Ek8+Ozn9rlJsO+ezok1bne6tKPktaF/LMffbIJ0I+EfKJkE+EfCLkEyGfCPlEyCdCPpFl8r2ffjH670fIZ4j34VGl/c6gXZk8GiPgVubbbWdKE0Wj6YOZ9i75DGOvcpCJ5aCyaPxtZb7DYrx8xUPyRe0exc13tGjvJR/5pmLnO/bj5fN/kM+Qb28m36Bo7unvkW9xPn9/+LNEPvt8nverZBiA5Iubz/NuowHJFz+fdxfZg8m3RD7Pu8/45LPPN9qDffLZ53sYMPqs8w33ZyY/8i2R7z5y8Ey+2PnuBtETYfLFzDe8NZ12kC9evt++8aSXfMZ8s1dc/DkXsPxj8hnycb3PhHwirHWIsNImssQ6r//SMu/TQq/POu+c8Zd74U0Gz28zyPEugwUZ54j9C7Y7nxj5yDdFPhHyiZBPhHwi5BMhnwj5RMgnwX+TS3AvAxHupCHDfVxEuIuQDPewkuEOangFdDWJrVR1EltJnHYKtdGOvG5OreC8wYD69KxZzyeg3jw7jfRL/3TYOW+Uu93CmnW75cZ5J7Lxfuo/YkBXL2rr33e1rl1EZz/3771AU0vrVhKbaeno1Key2dTvvU4yU7pxI+mf+4A3jfM1CZUNQz4GxF7IZ/hIkE9CXYcBn9Rgj5eO1SKmhNpJ/ZnuJqnwkvEnwFQIAAAAAAAAAAAAAACArfcHI9BmNv0JG/IAAAAASUVORK5CYII=",
            },
            {
              class_id: 2,
              redis_class_id: "abcdefg",
              class_name: "엉망진창 요리 클래스",
              viewer_nums: 10,
              class_img:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAAAw1BMVEUG1aCD7NDqM1YA1J116csG2aIg2KiI7dMGvZUGmIW1q6X///9/8NN989XsKlLuI0/vHEzOfoKY077jZnsFM2KW18HxDEe+nZrFkJIGw5gFEFvNgYUFioAGtZIGyJoFW24FdHcFLGEGq40FF1wFN2MFMmIGo4oFkIKxsagGqIwFPGUFfHoFIl4Fl4UFbXWY6tBP3rTh+vK98uHx/Phc37ep7NbQ9urJiIvnOVr48fHpV3DzxMrneIn119ruq7TyzNHutr0DCiEMAAAC2ElEQVR4nO3d61LaQBiA4ciyAZoasIIK9oQFiiJKjFJoPfT+r6ogaFuySNgPgpH3+eOMOAbf2SxJFoPjAAAAAAAAAAAAAAAAANvO3fQTSDN16alNP4c0c3vkk6AeAGAFFK8nAqrH0YxA4HnBpp9Daqkrb+SK8WdHheN8IfnsqP44X0A+O6o3zndNPkvKvblxqWeP4z7gtVLMbQIq+OfAROvJ9xK0sT98NdzRkcnTEpH++Gncz80mKO3LU4HXnw4B/bn85TFfbicxubTnU8+XVPTXRv1Ek8+Ozn9rlJsO+ezok1bne6tKPktaF/LMffbIJ0I+EfKJkE+EfCLkEyGfCPlEyCdCPpFl8r2ffjH670fIZ4j34VGl/c6gXZk8GiPgVubbbWdKE0Wj6YOZ9i75DGOvcpCJ5aCyaPxtZb7DYrx8xUPyRe0exc13tGjvJR/5pmLnO/bj5fN/kM+Qb28m36Bo7unvkW9xPn9/+LNEPvt8nverZBiA5Iubz/NuowHJFz+fdxfZg8m3RD7Pu8/45LPPN9qDffLZ53sYMPqs8w33ZyY/8i2R7z5y8Ey+2PnuBtETYfLFzDe8NZ12kC9evt++8aSXfMZ8s1dc/DkXsPxj8hnycb3PhHwirHWIsNImssQ6r//SMu/TQq/POu+c8Zd74U0Gz28zyPEugwUZ54j9C7Y7nxj5yDdFPhHyiZBPhHwi5BMhnwj5RMgnwX+TS3AvAxHupCHDfVxEuIuQDPewkuEOangFdDWJrVR1EltJnHYKtdGOvG5OreC8wYD69KxZzyeg3jw7jfRL/3TYOW+Uu93CmnW75cZ5J7Lxfuo/YkBXL2rr33e1rl1EZz/3771AU0vrVhKbaeno1Key2dTvvU4yU7pxI+mf+4A3jfM1CZUNQz4GxF7IZ/hIkE9CXYcBn9Rgj5eO1SKmhNpJ/ZnuJqnwkvEnwFQIAAAAAAAAAAAAAACArfcHI9BmNv0JG/IAAAAASUVORK5CYII=",
            },
          ],
        },
        status: {
          code: 200,
          message: "성공적으로 클래스를 가져왔습니다.",
        },
      },
    },
    GET_CLASSES_EMPTY: {
      data: {
        result: true,
        content: {
          empty: true,
          classes: [],
        },
        status: {
          code: 200,
          message: "성공적으로 클래스를 가져왔습니다.",
        },
      },
    },
    CREATE_CLASS_SUCCESS: {
      data: {
        result: true,
        content: {
          room_id: "123",
          redis_room_id: "abcdefgh",
        },
        status: {
          code: 200,
          message: "성공적으로 클래스를 생성하였습니다.",
        },
      },
    },
    CREATE_CLASS_FAIL: {
      data: {
        result: false,
        content: null,
        status: {
          code: 400,
          message: "썸네일 크기는 20MB를 넘을 수 없습니다.",
        },
      },
    },
  },
};

export default RESP;
