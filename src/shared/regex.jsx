// TODO regex 한번 체크해 코드 이해하기
export const emailCheck = (email) => {
  let regExp =
    /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/;
  // specific check
  // /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  return regExp.test(email);
};

export const usernameCheck = (id) => {
  let regExp = /^[0-9a-zA-Z]/;
  // 대문자 포함
  return regExp.test(id);
};

export const pwCheck = (pw) => {
  let regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  return regExp.test(pw);
};

export const noSpaceCheck = (value) => {
  let regExp = /\s/g;
  return !regExp.test(value);
};

export const notEmptyCheck = (value) => {
  return value.replace(/\s+/g, "") !== "";
};

// export const nickCheck = (nick) => {
//   let regExp = /^[0-9a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

//   return regExp.test(nick);
// };
