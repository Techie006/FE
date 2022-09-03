import axios from "axios";

const base = {
  server_http: "http://15.165.18.108:8080",
  server_https: "https://sparta-omj.shop",
};

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "content-type": "application/json; charset=UTF-8",
    accept: "application/json,",
  },
});

// TODO login, signup 에는 안들어가게 처리해야하나?
// 조건부 분기
api.interceptors.request.use(function (config) {
  const auth = localStorage.getItem("AccessToken");
  config.headers.common["Authorization"] = auth;
  return config;
});

export const apis = {
  // recipes
  get_recipes: ({ pageNum, pageLimit }) =>
    axios.get(`/api/recipes?pageNum=${pageNum}&pageLimit=${pageLimit}`),
  get_searched_recipes: ({ recipe_name }) =>
    axios.get(`/api/recipes/search`, { recipe_name }),
  get_recipe: ({ id }) => axios.get(`/api/recipe/${id}`),
  done_recipe: ({ id, ingredients_id }) =>
    axios.get(`/api/recipe/finish?id=${id}`, { ingredients_id }),
  like_recipe: ({ id }) => axios.get(`/api/recipe/like?id=${id}`),
  unlike_recipe: ({ id }) => axios.get(`/api/recipe/unlike?id=${id}`),

  // statistics
  get_state: () => axios.get(`/api/statistics/state`),
  get_daily: () => axios.get(`/api/statistics/daily`),
  get_nutrients_ratio: ({ filter }) =>
    axios.get(`/api/statistics/ratio/nutrients`, { filter }),
  get_calories_ratio: ({ filter }) =>
    axios.get(`/api/statistics/ratio/calories`, { filter }),
};
