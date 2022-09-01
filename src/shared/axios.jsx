import axios from "axios";

const base = {
  server_http: "http://15.165.18.108:8080",
  server_https: "https://sparta-omj.shop",
};

const api = axios.create({
  // baseURL: "https://sparta-omj.shop",
  baseURL: base.server_http,
  headers: {
    "content-type": "application/json; charset=UTF-8",
    accept: "application/json,",
    // origin: "http://localhost:3000",
    withCredentials: true,
  },
});

// TODO login, signup, nicknamecheck, idcheck에는 안들어가게 처리해야하나?
// 3가지 방법 중 실무에서는 무엇 사용?
// 조건부 분기
api.interceptors.request.use(function (config) {
  const auth = localStorage.getItem("AccessToken");
  config.headers.common["Authorization"] = auth;

  // const accessToken = document.cookie.split("=")[1];
  // const refreshToken = document.cookie.split("=")[1];
  // config.headers.common["Authentication"] = `${accessToken}`;
  // config.headers.common["RefreshToken"] = `${refreshToken}`;
  return config;
});

// TODO question: apis 하나로 관리하는게 나은지, 아니면 각각 모듈 기능별로 분리하는게 좋은지?
export const apis = {
  // auth : signup, login, logout
  signup: (email, username, password) =>
    api.post("/api/signup", {
      email,
      username,
      password,
    }),
  login: (email, password) => api.post("/api/login", { email, password }),
  logout: () => api.get("/api/logout"),

  // post : CRUD, like/unlike
  // CRUD
  create_post: (content, files, hashtags) => {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("hashtags", hashtags);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    return api.post("/api/post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  get_posts: (pageNum, pageLimit) =>
    api.get(`/api/posts?pageNum=${pageNum}&pageLimit=${pageLimit}`),
  get_post: (id) => api.get(`/api/post/${id}`),
  edit_post: (id, content, hashtags) =>
    api.put(`/api/post/${id}`, { content, hashtags }),
  delete_post: (id) => api.delete(`/api/post/${id}`),
  // like, unlike
  like_post: (id) => api.post(`/api/like/${id}`),
  unlike_post: (id) => api.post(`/api/unlike/${id}`),

  // comment : CRUD
  create_comment: (id, content, hashtags) =>
    // TODO  create에 Blob 써보기
    api.post(`/api/comment/${id}`, { content, hashtags }),

  get_comments: (postId, pageNum, pageLimit) =>
    api.get(
      `/api/comments/${postId}?pageNum=${pageNum}&pageLimit=${pageLimit}`
    ),
  edit_comment: (id, content, hashtags) =>
    api.put(`/api/comment/${id}`, { content, hashtags }),
  delete_comment: (id) => api.delete(`/api/comment/${id}`),

  // search : search result
  get_search_result: (tag, pageNum, pageLimit) =>
    api.post(`/api/hashtag?pageNum=${pageNum}&pageLimit=${pageLimit}`, tag),
  // rank : hashtag ranking
  get_rank: () => api.get("api/hashtag/rank"),

  // profile : get info, posts, following, follower list
  get_profile_info: (username) => api.get(`/api/profile/info/${username}`),
  get_profile_posts: (username, pageNum, pageLimit) =>
    api.get(
      `/api/profile/posts?username=${username}&pageNum=${pageNum}&pageLimit=${pageLimit}`
    ),
  get_profile_followings: (username, pageNum, pageLimit) =>
    api.get(
      `/api/profile/following?username=${username}&pageNum=${pageNum}&pageLimit=${pageLimit}`
    ),
  get_profile_followers: (username, pageNum, pageLimit) =>
    api.get(
      `/api/profile/followers?username=${username}&pageNum=${pageNum}&pageLimit=${pageLimit}`
    ),

  // follow : follow/unfollow
  follow_user: (username) => api.post(`api/user/follow`, { username }),
  // TODO delete 요청
  unfollow_user: (username) =>
    api.delete(`api/user/unfollow`, { data: { username } }),
    unfollow_user: (username) =>
    api.get(`api/user/unfollow`, { data: { username } }),
};
