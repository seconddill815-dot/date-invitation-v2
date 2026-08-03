const fs = require("fs");
const path = require("path");



// папка логов

const logsFolder =
path.join(
__dirname,
"../logs"
);




// создаём папку если нет

if(!fs.existsSync(logsFolder)){

    fs.mkdirSync(logsFolder);

}




const logFile =
path.join(
logsFolder,
"app.log"
);







function writeLog(type,message){



const line =

`[${new Date().toLocaleString("ru-RU")}] ${type}: ${message}\n`;



fs.appendFileSync(
logFile,
line
);



}





// ===============================
// Лог запросов
// ===============================


function logRequest(req){


const info = {


method:req.method,


url:req.url,


ip:
req.headers["x-forwarded-for"]
||
req.socket.remoteAddress



};



writeLog(
"REQUEST",
JSON.stringify(info)
);



}





// ===============================
// Ошибки
// ===============================


function logError(error){



writeLog(
"ERROR",
error.message || error
);



}





module.exports = {


logRequest,


logError


};
