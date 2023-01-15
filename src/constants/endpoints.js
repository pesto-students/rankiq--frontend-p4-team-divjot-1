export const SERVER_BASE_API = 'https://rankiq-server.onrender.com/';
// export const SERVER_BASE_API = 'http://127.0.0.1:4000/';

export const USER_API = {
  LOGIN: 'user/signin',
  SIGNUP: 'user/signup',
  RESET_PASSWORD_LINK: 'user/resetPasswordLink',
  UPDATE_PASSWORD: 'user/updatePassword',
};

export const CONTENT_API = {
  GET_CONTENT: 'content/getContent?requestUrl=',
};

export const EXAM_API = {
  LOG_MARKS: 'exam/logMarks',
  RANK: 'exam/checkRank',
  HISTORY: 'exam/userExamHistory',
};
