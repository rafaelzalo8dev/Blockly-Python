import axios from 'axios';
import config from '../config';
const apiCall = axios.create({
  baseURL: config.API_URL,
});


export const post = (data) => {
  return new Promise ((resolve, reject) => {
    apiCall
    .post(data.url, data.body)
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {

      reject(err.message);
    });
  });
};

export const get = (data) => {
  console.log('data.url ', data.url);
  return new Promise((resolve, reject) => {
    apiCall
    .get(data.url)
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err);
    });
  });
};

export const sendImg = (img) => {
  const imperialCall = axios.create({
    baseURL: 'http://thelastimperial.com:8080'
  });
  return new Promise((resolve, reject) => {
    imperialCall
    .post('/imgData',{
      data: img, height: 400, width: 400
    })
    .then(response => {
      resolve(response);
    })
    .catch(err => {
      reject(err);
    });
  });
};
