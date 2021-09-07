// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
const { v4: uuidv4 } = require("uuid")
const sign = require('jsonwebtoken').sign
 
const access_key = '2WKy6FshEP8bKOTJNYmrLfXAMIJUkKIkTib1cWSW' // 업비트에서 발급 받은 access_key
const secret_key = 'Sznxm8yPZ2kswX2waH3UkX8iLvl8cBLRMINuVS47' // 업비트에서 발급 받은 secret_key
const server_url = "https://api.upbit.com"
 


export default async function handler(req, res) {
  
  /* const options = {
    method: "GET",
    url: server_url + "/v1/accounts",
    headers: {Authorization: `Bearer ${token}`},
  } */
  
  //const result = await get(server_url + "/v1/accounts",{Authorization: `Bearer ${token}`});
  const payload = {
    access_key: access_key,
    nonce: uuidv4(),
  }
  const token = sign(payload, secret_key)

  var result = await axios({
    method: 'GET',
    url: server_url + "/v1/accounts",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  console.log(result.data);

  res.status(200).json(result.data);
}
