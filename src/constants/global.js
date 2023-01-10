export const REGEX = {
  PASSWORD: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
  EMAIL: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
};

export const ERROR_MESSAGE = {
  PASSWORD:
    'min 6 char with combination of letter,number and special char needed',
  EMAIL: 'Invalid email',
  REQUIRED: 'This field is required',
};

export const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  RESULT: '/result',
  FAQS: '/faqs',
  CONTACT_US: '/contact-us',
  USER_HISTORY: '/userHistory',
};
