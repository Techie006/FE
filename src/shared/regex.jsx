// export const emailCheck = (email) => {
//   let regExp =
//     /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/;
//   // specific check
//   // /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
//   return regExp.test(email);
// };

// parse YYYY-MM-DD from new Date()
export const parseDate = (date) => {
  const YYYY = date.getFullYear();
  const mm = (date.getMonth() + 1).toString();
  const dd = date.getDate().toString();

  return `${YYYY}-${mm.padStart(2, 0)}-${dd.padStart(2, 0)}`;
};
