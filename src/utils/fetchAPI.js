import $ from 'jquery';

export const fetchAPI = (url = '', type = 'get', headers = {}, data = {}) => {
  if (!isTypes(type) || url === '') {
    return;
  }

  const options = {
    url,
    type: type.toUpperCase()
  }

  if (Object.entries(headers).length > 0) {
    options.headers = headers;
  }

  if (Object.entries(data).length > 0 && ['post', 'put'].includes(type.toLowerCase())) {
    options.dataType = 'json';
    options.contentType = 'application/json';
    options.data = JSON.stringify(data);
  }

  return $.ajax(options)
}

export const setTokenToHeader = () => {
  const token = localStorage.getItem('nekot_ssecca');
  return { 'x-access-token': token }
}

const isTypes = (type) => {
  if (['get', 'post', 'put', 'delete'].includes(type.toLowerCase())) {
    return true;
  }
  return false;
}