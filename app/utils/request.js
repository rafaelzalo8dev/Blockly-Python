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
  return new Promise((resolve, reject) => {
    var bodyFormData = new FormData();
    bodyFormData.set('data', img);
    bodyFormData.set('height', '160');
    bodyFormData.set('width', '160');

    axios({
      method: 'post',
      url: 'http://thelastimperial.com:8080/imgData',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
    })
    .then(function (response) {
      resolve(response.data);
    })
    .catch(function (response) {
      reject(response);
    });
  });
};
