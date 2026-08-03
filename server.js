require("dotenv").config();

const express = require("express");
const path = require("path");

const routes = require("./server/routes");
const logger = require("./server/logger");


const app = express();

const PORT = process.env.PORT || 3000;



// ===============================
// Middleware
// ===============================


app.use(
express.json({
    limit:"50kb"
})
);



app.use(
express.urlencoded({
    extended:true
})
);



// Логи

app.use(
(req,res,next)=>{


logger.logRequest(req);


next();


});





// Статика сайта


app.use(
express.static(
path.join(__dirname,"public")
)
);





// API маршруты


app.use(
"/api",
routes
);







// Главная страница


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});








// Запуск сервера


app.listen(
PORT,
()=>{


console.log(
`
❤️ Сайт запущен

Порт:
${PORT}

http://localhost:${PORT}

`
);


}
);