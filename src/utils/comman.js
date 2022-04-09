export const BASE_URL = 'https://web-glooser.herokuapp.com/api/app';
// export const BASE_URL = 'http://192.168.1.5:12000/api/app/';

export const IMG_URL = 'https://web-glooser.herokuapp.com/api/app';

export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
};

export const getEmail = () => {
  const userEmail = sessionStorage.getItem('user_email');
  if (userEmail) return JSON.parse(userEmail);
  else return null;
};

export const getData = () => {
  const userData = sessionStorage.getItem('data');
  if (userData) return JSON.parse(userData);
  else return null;
};

// return the token from the session storage
export const getToken = () => {
  let dataToken = sessionStorage.getItem('token');
  console.log('🚀 ~ file: comman.js ~ line 27 ~ getToken ~ dataToken', dataToken);
  return sessionStorage.getItem('token') || null;
};

// remove the token and user from the session storag
export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('user_email');
};

// set the token and user from the session storage
export const setUserSession = (token, user, email, phone, data) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', user);
  sessionStorage.setItem('user_email', email);
  sessionStorage.setItem('user_phone', phone);
  sessionStorage.setItem('data', JSON.stringify(data));
};
