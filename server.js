require("dotenv").config();
const axios = require("axios").default;

const link = "https://indodax.com/api/ticker/btcidr";
const config = {
    headers: { "Content-Type": "application/json" }
}
setInterval(() => {
    axios.get(link).then((respons)=>{
        const data = respons.data.ticker;
        const out = 
        `-\n-\nHigh: ${data.high}\nLow: ${data.low}\nVol_btc: ${data.vol_btc}\nVol_idr: ${data.vol_idr}\nLast: ${data.last}\nBuy: ${data.buy}\nSell: ${data.sell}\n-\n-`;
        axios.post(process.env.LINK_DC, { content: out }, config)
        .then((d)=>{})
        .catch((e)=>{console.log(e);});
    })
    .catch((err)=>{console.error("Unerror")});
}, 10000);
