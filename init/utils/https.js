var request= require('request');
function get(opts) {
    return new Promise((resolve, reject) => {
      request.get(opts, function (err, response, body) {
        if (response.statusCode == '200') {
          if (body) {
            resolve(body);
          } else {
            resolve('');
          }
        } else {
          reject(err);
        }
      });
    });
  }
  function post(opts) {
    return new Promise((resolve, reject) => {
      request.post(opts, function (err, response, body) {
        if (response.statusCode == '200') {
          if (body) {
            resolve(body);
          } else {
            resolve('');
          }
        } else {
          reject(err);
        }
      });
    });
  }
  module.exports={get,post}