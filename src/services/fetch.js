import API_URI from '../constants/api';

export default function(uri) {
  console.log(`${API_URI}/${uri}`);
  return new Promise((resolve, reject) => {
    fetch(`${API_URI}/${uri}`, {
      method: 'GET',
      headers: {
          Accept: 'application/json',
      },
    })
    .then(
      response => resolve(response.json()),
      err => reject(err)
    );
  });
}