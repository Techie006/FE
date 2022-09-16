import axios from "axios";

const base = {
  server_http: "http://3.36.56.125",
  server_https: "https://magorosc.shop/",
};

const api = axios.create({
  baseURL: "http://3.36.56.125",
  headers: {
    "content-type": "application/json; charset=UTF-8",
    accept: "application/json,",
  },
});

// TODO login, signup 에는 안들어가게 처리해야하나?
// 조건부 분기
api.interceptors.request.use(function (config) {
  const auth = localStorage.getItem("Authorization");
  config.headers.common["Authorization"] = auth;
  return config;
});

export const apis = {
  // recipes
  get_recipes: ({ pageNum, pageLimit }) =>
    api.get(`/api/recipes?pageNum=${pageNum}&pageLimit=${pageLimit}`),
  get_searched_recipes: ({ recipe_name }) =>
    api.get(`/api/recipes/search`, { recipe_name }),
  get_recipe: ({ id }) => api.get(`/api/recipe/${id}`),
  get_ingredients: () => api.get(`/api/ingredients`),
  done_recipe: ({ id, ingredients_id }) =>
    api.post(`/api/recipe/finish?id=${id}`, { ingredients_id }),
  like_recipe: ({ id }) => api.post(`/api/recipe/like?id=${id}`),
  unlike_recipe: ({ id }) => api.post(`/api/recipe/unlike?id=${id}`),

  // statistics
  get_state: () => api.get(`/api/statistics/state`),
  get_category: () => api.get(`/api/statistics/category`),
  get_daily: () => api.get(`/api/statistics/daily`),
  get_calories_ratio: ({ view }) => {
    let filter = view === "일별" ? "day" : view === "주별" ? "week" : "month";
    return api.post(`/api/statistics/ratio/calories`, { filter });
  },
  get_nutrients_ratio: ({ view }) => {
    let filter = view === "일별" ? "day" : view === "주별" ? "week" : "month";
    console.log(filter);
    return api.post(`/api/statistics/ratio/nutrients`, { filter });
  },

  // calendar
  get_all_diets: ({ date }) => api.get(`/api/calendar/month?day=${date}`),
  get_weekly_diets: ({ date }) => api.get(`/api/calendar/week?day=${date}`),
  create_diet: ({ recipe_name, category, date }) =>
    api.post(`/api/calendar`, { recipe_name, category, date }),
  update_diet: ({ id, recipe_name, category, date }) =>
    api.put(`/api/calendar/${id}`, { recipe_name, category, date }),
  delete_diet: ({ id }) => api.delete(`/api/calendar/${id}`),
};
