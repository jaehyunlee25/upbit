import axios from 'axios';
import { HtmlContext } from 'next/dist/shared/lib/utils';
import { useState } from 'react';

export default function Home() {
  const [total, setTotal] = useState(0);
  const [curTotal, setCurTotal] = useState(0);
  async function divLoad(){
    setTotal(0);
    setCurTotal(0);
    detail.innerHTML = '';
    now.innerHTML = '';
    var result = await axios({
      method: 'GET',
      url: "/api/assets"
    });

    let sum = 0;
    let curSum = 0;
    result.data.forEach(async ob=>{
      
      var h3 = document.createElement('h3');
      var h31 = document.createElement('h3');
      h3.style.paddingLeft = 30 + 'px';
      h31.style.paddingLeft = 30 + 'px';
      window.detail.appendChild(h3);
      window.now.appendChild(h31);

      if(ob.currency === 'KRW'){
        sum += ob.balance * 1;
        curSum += ob.balance * 1;
        h3.innerHTML=[ob.currency, ob.balance,'(구매단가',ob.balance+')'].join(': ');
        h31.innerHTML=[ob.currency, ob.balance,'(현재단가',ob.balance+')'].join(': ');
      }else{
        sum += ob.balance * ob.avg_buy_price;
        const qCur = await axios({
          method: 'GET',
          url: "/api/currency?currency="+ob.currency,
        });
        curSum += ob.balance * qCur.data[0].trade_price;
        h3.innerHTML=[ob.currency, ob.balance * ob.avg_buy_price,'(구매단가',ob.avg_buy_price+')'].join(': ');
        h31.innerHTML=[ob.currency, ob.balance * qCur.data[0].trade_price,'(현재단가',qCur.data[0].trade_price+')'].join(': ');
        setTotal(sum);
        setCurTotal(curSum);
      }
    });
    
  };
  
  return (
    <div onClick={divLoad}>
      <div>
        <h1>구매가격: {total}</h1>
        <div id='detail'></div>
      </div>
        <h1>현재가격: {curTotal}</h1>
        <div id='now'></div>
    </div>
  )
};