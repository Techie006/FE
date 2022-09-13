
const RESP_WOO = {
  // woo
  AUTH: {
    SIGN_UP_SUCCESS : {
    result : true,
    status : {
        code : 200,
         message : "성공적으로 회원가입되었습니다."
    }},
    SIGN_UP_FAIL : {
   result : false,
   status : {
        code : 400,
        message : ["이미 존재하는 이메일입니다.",
                  "적절하지 않은 이메일 형식입니다.",
                  "적절하지 않은 사용자 이름 형식입니다."]
 }},
  HOME: {},
  RECEPIE: {
    GET_RECIPES_SUCCESS: {
      result: true,

      content: {
        current_page_num: 1,
        total_page_num: 3,
        recipes: [
          {
            id: "1",
            recipe_name: "새우 두부 계란찜",
            ingredients: ["연두부 75g(3/4모)", "칵테일새우 20g(5마리)"],
            final_img:
              "https://src.hidoc.co.kr/image/lib/2020/10/14/1602663615388_0.jpg",
            method: "찌기",
            category: "반찬",
            calorie: 220,
          },
          {
            id: "2",
            recipe_name: "새우 두부 계란찜",
            ingredients: ["연두부 75g(3/4모)", "칵테일새우 20g(5마리)"],
            final_img:
              "https://src.hidoc.co.kr/image/lib/2020/10/14/1602663615388_0.jpg",
            method: "찌기",
            category: "반찬",
            calorie: 220,
          },
          { id: "3" },
        ],
        status: {
          code: 200,
          message: "전체레시피 제공에 성공하였습니다.",
        },
      },
    },
    GET_RECIPE_SUCCESS: {
      result: true,
      content: {
        recipe: {
          id: "1",
          recipe_name: "새우 두부 계란찜",
          ingredients: ["연두부 75g(3/4모)", "칵테일새우 20g(5마리)"],
          method: "찌기",
          category: "반찬",
          calorie: 220,
          carbohydrates: 3,
          proteins: 2,
          fats: 2,
          sodium: 1,
          final_img:
            "https://src.hidoc.co.kr/image/lib/2020/10/14/1602663615388_0.jpg",
          manual_desc: [
            "만드는법내용1",
            "만드는법내용2",
            "만드는법내용3",
            "만드는법내용4",
          ],
          manual_imgs: [
            "https://src.hidoc.co.kr/image/lib/2020/10/14/1602663615388_0.jpg",
            "https://src.hidoc.co.kr/image/lib/2020/10/14/1602663615388_0.jpg",
            "https://src.hidoc.co.kr/image/lib/2020/10/14/1602663615388_0.jpg",
            "https://src.hidoc.co.kr/image/lib/2020/10/14/1602663615388_0.jpg",
          ],
        },
      },
      status: {
        code: 200,
        message: "레시피 제공에 성공하였습니다.",
      },
      // *manual_desc, manual_imgs 하나도 없으면 빈배열로 주기
      result: false,
      status: {
        code: 401,
        message: "Access Token이 만료되었습니다.",
      },
    },
  },
  MY: {},
  }};

  export default RESP_WOO;

