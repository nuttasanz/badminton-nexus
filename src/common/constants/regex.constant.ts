export const REGEX = {
  NAME: /^[a-zA-Z\u0E00-\u0E7F]+$/,
  DISPLAY_NAME: /^[a-zA-Z0-9\u0E00-\u0E7F ]+$/,
  USERNAME: /^[a-zA-Z0-9]+$/,
  PASSWORD: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  PHONE_NUMBER: /^[0-9]{10}$/,
};
