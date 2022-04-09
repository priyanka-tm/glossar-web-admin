import Axios from 'axios';
import {apiInstance} from './index';

export function setToken(token) {
  Object.assign(apiInstance.defaults.headers, {
    Authorization: token,
  });
}
export function removeToken() {
  delete apiInstance.defaults.headers.Authorization;
}
export async function handleRequest(request) {

    console.log(request);
  
  return request;
}
export function handleResponse(value) {

    console.log(value);
  
  return value;
}
export async function handleApiError(error) {
  if (Axios.isCancel(error)) {
    console.log('Canceled');
    throw error;
  }

    console.log(error);
  
  if (!error.response) {
    throw error;
  }
  if (error.response.status === 401 || error.response.status === 402) {
  
    throw error;
  } else if (error.response.status === 500) {

    throw error;
  } else {

  }
  throw error;
}
