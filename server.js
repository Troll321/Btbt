require("dotenv").config();
const axios = require("axios").default;

const link = "https://indodax.com/api/ticker/btcidr";
const config = {
    headers: { "Content-Type": "application/json" }
}

function koma(x) {
    var i = x.toString().split(".");
    if (i.length > 2) {
        return ;
    }
    var outStr = "";
    for (let l = i[0].length - 1; l >= 0; l--) {
        outStr += i[0][l];
        if (l != i[0].length  && (l - 1) % 3 == 0 && l != 0) {
            outStr += ".";
        }
        
    }

    var outA = outStr.split("").reverse().join("");
    if (i[1]) {
        outA += "," + i[1]
    }
    return outA;
}

setInterval(() => {
    axios.get(link).then((respons)=>{
        const data = respons.data.ticker;
        const out = 
        `-\n-\nHigh: ${koma(data.high)}\nLow: ${koma(data.low)}\n\nVol_btc: ${koma(data.vol_btc)}\nVol_idr: ${koma(data.vol_idr)}\n\nLast: ${koma(data.last)}\n\nBuy: ${koma(data.buy)}\nSell: ${koma(data.sell)}\n-\n-`;
        axios.post(process.env.LINK_DC, { content: out }, config)
        .then((d)=>{})
        .catch((e)=>{console.log(e);});
    })
    .catch((err)=>{console.error("Unerror")});
}, 20000);
