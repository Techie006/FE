// parse YYYY-MM-DD from new Date()
export const parseDate = (date) => {
  const YYYY = date.getFullYear();
  const mm = (date.getMonth() + 1).toString();
  const dd = date.getDate().toString();

  return `${YYYY}-${mm.padStart(2, 0)}-${dd.padStart(2, 0)}`;
};

export const emailCheck = (email) => {
  let regExp =
    /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/;
  return regExp.test(email);
};

export const pwCheck = (pw) => {
  let regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  return regExp.test(pw);
};

export const usernameCheck = (nick) => {
  let regExp = /^[0-9a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  return regExp.test(nick);
};
