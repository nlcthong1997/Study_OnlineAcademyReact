const fetchAPI = async (url = '', headers = {}, types = 'get', data = {}) => {
  if (['get', 'post', 'put', 'delete'].includes(types.toLowerCase())) {
    const options = {
      method: types.toUpperCase(),
      headers: headers,
    };

    if (['post', 'put'].includes(types)) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    return response.json();
  }
  return;
}

export default fetchAPI;