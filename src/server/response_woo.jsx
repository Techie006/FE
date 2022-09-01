export const RESP_WOO = {
  // woo
  AUTH: {},
  HOME: {},
  RECEPIE: {
    GET_RECIPES_SUCCESS :{
    result : true,
    
    content : {
      current_page_num : 1,
      total_page_num : 3,
          recipes : [ { id: "1", 
          recipe_name :  "새우 두부 계란찜",
          ingredients :  ["연두부 75g(3/4모)", "칵테일새우 20g(5마리)"],  
          final_img : "https://src.hidoc.co.kr/image/lib/2020/10/14/1602663615388_0.jpg",
          method :  "찌기",
          category : "반찬",
          calorie : 220,
              },
              { id: "2", 
          recipe_name :  "새우 두부 계란찜",
          ingredients :  ["연두부 75g(3/4모)", "칵테일새우 20g(5마리)"],  
          final_img : "https://src.hidoc.co.kr/image/lib/2020/10/14/1602663615388_0.jpg",
          method :  "찌기",
          category : "반찬",
          calorie : 220,
              },
              { id: "3"} ],
              status : {
                code : 200,
                message : "전체레시피 제공에 성공하였습니다."
           },

          }
          },
        },
  MY: {},
};

  // 전체 레시피 조회 get
  //   {
  //     “result” : true,
  //     “content” : [
  //    “current_page_num” : 1, (현재페이지),
  //    “total_page_num” : 3  (전체 페이지),
  //    “recipes” :  [ 
  //             { ”id”: "1", 
  //         "recipe_name” :  "새우 두부 계란찜",
  //         “ingredients" :  ["연두부 75g(3/4모), 
  //                                              칵테일새우 20g(5마리),  …  ]                   
  //          “final_img” : “URL” ,(요리 완성이미지)
  //          “method” :  “찌기”,
  //          “category” : “반찬”,
  //         “calorie “220”, (열량),
  //                   },

  //     { ”id”: "2", 
  //         "recipe_name” :  "연포탕",
  //         “ingredients" :  ["연두부 75g(3/4모), 
  //                                              칵테일새우 20g(5마리),  …  ]                   
  //         “final_img” : “URL” ,(요리 완성이미지)
  //           “method” :  “찌기”,
  //          “category” : “반찬”,
  //         “calorie “220”, (열량),
  //                   },
      
  //         { ”id”: "3", 
  //         "recipe_name” :  "갈비찜",
  //         “ingredients" :  ["연두부 75g(3/4모), 
  //                                              칵테일새우 20g(5마리),  …  ]                   
  //        “final_img” : “URL” ,(요리 완성이미지)
  //          “method” :  “찌기”,
  //          “category” : “반찬”,
  //         “calorie “220”, (열량),
  //                   },

  //    { ”id”: "4", 
  //         "recipe_name” :  "아구찜",
  //         “ingredients" :  ["연두부 75g(3/4모), 
  //                                              칵테일새우 20g(5마리),  …  ]                   
  //        “final_img” : “URL” ,(요리 완성이미지)
  //            “method” :  “찌기”,
  //          “category” : “반찬”,
  //         “calorie “220”, (열량),
  //                   },

  //    { ”id”: "5", 
  //         "recipe_name” :  "만두찜",
  //         “ingredients" :  ["연두부 75g(3/4모), 
  //                                              칵테일새우 20g(5마리),  …  ]                   
  //          “final_img” : “URL” ,(요리 완성이미지)
  //           “method” :  “찌기”,
  //          “category” : “반찬”,
  //         “calorie “220”, (열량),
  //                   },
  //  { ”id”: "6", 
  //         "recipe_name” :  "고기찜",
  //         “ingredients" :  ["연두부 75g(3/4모), 
  //                                              칵테일새우 20g(5마리),  …  ]                   
  //          “final_img” : “URL” ,(요리 완성이미지)
  //           “method” :  “찌기”,
  //          “category” : “반찬”,
  //         “calorie “220”, (열량),
  //                   },
  //                                ],
  //      “status” : {
  //          “code” : 200,
  //          “message” : “전체레시피 제공에 성공하였습니다.”
  //     }
  //  ]
    
  // }


  // 상세 레시피 조회 get

  // response body

  // {
  // “result” : true,
  // “content” :    {
  //  ”id”: "1",
  // "recipe_name” : "새우 두부 계란찜",
  // “ingredients" : ["연두부 75g(3/4모),
  // 칵테일새우 20g(5마리), … ]
  // “method” : “찌기”,
  // “category” : “반찬”,
  // “calorie “220”, (열량),
  // ”carbohydrates” : “3 “, (탄수화물) ,
  // “proteins” : “2”, (단백질)
  // “fats” : “2”(지방),
  // “sodium” : “ 1”(나트륨),
  // “final_img” : “URL” ,(요리 완성이미지)
  // “manual_desc” : [“만드는법내용1”, “만드는법내용2”, “만드는법내용3”, “만드는법내용4”], 
  // ”manual_imgs”: [”https://asdjfslkaj”, ”https://asdjfslkaj”, ”https://asdjfslkaj”, ”https://asdjfslkaj”,]                         
  // }
  // “status” : {
  // “code” : 200,
  // “message” : “레시피 제공에 성공하였습니다.”
  // }
  // }
  // *manual_desc, manual_imgs 하나도 없으면 빈배열로 주기
  // ——————————————————————————
  // {
  // “result” : false,
  // “status” : {
  // “code” : 401,
  // “message” : “Access Token이 만료되었습니다.”
  // }
  // }

  // request header

  //   ”Authorization”:
  // Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsYXN0bWFuIiwiYXV0aCI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNjYwMzc0NzYwfQ.md7GkryurbgmfFIjaJtvQEoOm6HqQWCCVrK2FzSqUMc,
  // ”Refresh_Token”:
  // eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsYXN0bWFuIiwiYXV0aCI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNjYwMzc0NzYwfQ.md7GkryurbgmfFIjaJtvQEoOm6HqQWCCVrK2FzSqUMc,
  // }