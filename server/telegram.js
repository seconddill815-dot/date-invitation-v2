require("dotenv").config();

const https = require("https");




// ===============================
// Настройки Telegram
// ===============================


const BOT_TOKEN =
process.env.TELEGRAM_BOT_TOKEN;


const CHAT_ID =
process.env.TELEGRAM_CHAT_ID;







// ===============================
// Отправка сообщения
// ===============================


function sendTelegramMessage(text){


return new Promise(
(resolve,reject)=>{


if(
!BOT_TOKEN ||
!CHAT_ID
){


console.log(
"Telegram не настроен"
);


return resolve(false);


}





const data = JSON.stringify({


chat_id: CHAT_ID,


text:text,


parse_mode:"HTML"



});





const options = {


hostname:
"api.telegram.org",



path:
`/bot${BOT_TOKEN}/sendMessage`,



method:
"POST",



headers:{


"Content-Type":
"application/json",



"Content-Length":
Buffer.byteLength(data)



}



};







const request =
https.request(
options,
(response)=>{


let result="";



response.on(
"data",
(chunk)=>{


result+=chunk;


});




response.on(
"end",
()=>{


try{


const json =
JSON.parse(result);



if(json.ok){


resolve(true);


}

else{


console.log(
"Telegram error:",
json
);


resolve(false);


}



}

catch(error){


reject(error);


}



});



}

);






request.on(
"error",
(error)=>{


console.error(
"Telegram connection error:",
error
);



reject(error);



});





request.write(data);


request.end();



}

);



}







module.exports = {


sendTelegramMessage


};
