const http = require('http');

function httpGetRequest(addr,headers) {
  const opts = {
    method: 'GET',
    path: addr,
    headers
  };
  console.log(opts);
  const promise = new Promise((resolve, reject) => {
    const resData = [];
    const req = http.request(opts, (res) => {
      res.on('data', (chunk) => {
        resData.push(chunk);
      });
      res.on('end', (f) => {
        resolve(JSON.parse(resData.join('')));
      });
    });
    req.on('error', (err) => {
      reject(err);
    });
    req.end();
  });
  return promise;
}
function httpPostRequest(addr, param) {
  const opts = {
    method: 'POST',
    path: addr,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const promise = new Promise((resolve, reject) => {
    const resData = [];
    const req = http.request(opts, (res) => {
      res.on('data', (chunk) => {
        resData.push(chunk);
      });
      res.on('end', (f) => {
        resolve(JSON.parse(resData.join('')));
      });
    });
    req.on('error', (err) => {
      reject(err);
    });
    req.write(JSON.stringify(param));
    req.end();
  });

  return promise;
}

export async function post(addr, param) {
  let qPost;
  try {
    qPost = await httpPostRequest(addr, param);
    return qPost;
  } catch (e) {
    console.log(e);
    return {
      type: 'error',
      onError: (id, msg) => {
        const arr = ['error', `type:${id}`, `message:${msg}`];
        console.log(arr.join('\r\n'));
      },
    };
  }
}
export async function get(addr,headers) {
  let qGet;
  try {
    qGet = await httpGetRequest(addr,headers);
    return qGet;
  } catch (e) {
    console.log(e);
    return {
      type: 'error',
      onError: (id, msg) => {
        const arr = [
          'error',
          `type:${id}`,
          `message:${msg}`,
          `event:${e.toString()}`,
        ];
        console.log(arr.join('\r\n'));
      },
    };
  }
}
