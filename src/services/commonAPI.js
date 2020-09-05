function apiCall(url, callback, errCallback, type) {
  return new Promise(resolve => {
    fetch(url)
    .then(results => results.json())
    .then(data => {
        console.info('success');
        resolve(callback(type, data));
      })
      .catch(function(error) {
        console.error(error);
        errCallback(type);
      });
    });
  }
  
export const makeAPIRequest = async (url, callback, errCallback, type) => {
  console.log('calling');
  await apiCall(url, callback, errCallback, type);
}
