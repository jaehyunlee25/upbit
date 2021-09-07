// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
const server_url = "https://api.upbit.com"
 
export default async function handler(req, res) {
  var result = await axios({
    method: 'GET',
    url: server_url + "/v1/trades/ticks?count=1&market=KRW-"+req.query.currency,
  });

  console.log(result.data);

  res.status(200).json(result.data);
}
