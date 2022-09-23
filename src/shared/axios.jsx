import axios from "axios";
import { encode as base64_encode } from "base-64";

const base = {
  server_http: "http://3.36.56.125",
  server_https: "https://magorosc.shop",
  openvidu_server: "https://monsterwarrior.shop",
};

const api = axios.create({
  baseURL: base.server_http,
  headers: {
    "content-type": "application/json; charset=UTF-8",
    accept: "application/json,",
  },
});

// TODO login, signup 에는 안들어가게 조건부 분기하기
api.interceptors.request.use(function (config) {
  const auth = localStorage.getItem("Authorization");
  config.headers.common["Authorization"] = auth;
  return config;
});

const videoApi = axios.create({
  baseURL: base.openvidu_server,
  headers: {
    "Content-Type": "application/json",
    //	Authorization: Basic EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)
    Authorization: `Basic ${base64_encode("OPENVIDUAPP:jack0906")}`,
  },
});

export const apis = {
  // statistics page
  get_state: () => api.get(`/api/statistics/state`),
  get_category: () => api.get(`/api/statistics/category`),
  get_daily: () => api.get(`/api/statistics/daily`),
  get_calories_ratio: ({ view }) => {
    let filter = view === "일별" ? "day" : view === "주별" ? "week" : "month";
    return api.post(`/api/statistics/ratio/calories`, { filter });
  },
  get_nutrients_ratio: ({ view }) => {
    let filter = view === "일별" ? "day" : view === "주별" ? "week" : "month";
    return api.post(`/api/statistics/ratio/nutrients`, { filter });
  },

  // calendar page
  get_all_diets: ({ date }) => api.get(`/api/calendar/month?day=${date}`),
  get_weekly_diets: ({ date }) => api.get(`/api/calendar/week?day=${date}`),
  create_diet: ({ recipe_name, category, date }) =>
    api.post(`/api/calendar`, { recipe_name, category, day: date }),
  update_diet: ({ id, recipe_name, category, date }) =>
    api.put(`/api/calendar/${id}`, { recipe_name, category, day: date }),
  delete_diet: ({ id }) => api.delete(`/api/calendar/${id}`),

  // recipes page
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

  // classes
  get_classes: () => api.get(`/api/class`),
  create_class: ({ recipe_id, class_name, files }) => {
    const formData = new FormData();
    formData.append("recipe_id", recipe_id);
    formData.append("class_name", class_name);
    formData.append("file", files[0]);
    // for multi files
    // for (let i = 0; i < files.length; i++) {
    //   formData.append("Multipart", files[i]);
    // }
    return api.post(`/api/class`, formData);
  },
  get_prev_chats: ({ class_id }) => api.get(`api/class/enter/${class_id}`),
  create_session: () => {
    const sessionOptions = {
      mediaMode: "ROUTED",
      recordingMode: "MANUAL",
      // OpenVidu 서버가 랜덤한 sessionId 생성해 반환
      customSessionId: "",
      allowTranscoding: false,
      defaultRecordingProperties: {
        name: "MyRecording",
        hasAudio: true,
        hasVideo: true,
        outputMode: "COMPOSED",
        recordingLayout: "BEST_FIT",
        resolution: "1280x720",
        frameRate: 25,
        shmSize: 536870912,
      },
      mediaNode: {
        id: "media_i-0c58bcdd26l11d0sd",
      },
    };
    return videoApi.post(`/openvidu/api/sessions`, sessionOptions);
  },
  create_token: ({ sessionId }) => {
    const connectionOption = {
      type: "WEBRTC",
      data: "My Server Data",
      record: true, // TODO set as false
      role: "PUBLISHER", // "SUBSCRIBER" "MODERATOR"
    };
    return videoApi.post(
      `/openvidu/api/sessions/${sessionId}/connection`,
      connectionOption
    );
  },
};
