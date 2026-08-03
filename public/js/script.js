
// ===============================
// Загрузка страницы
// ===============================


window.addEventListener("load", () => {


    setTimeout(() => {


        const loader = document.getElementById("loader");


        loader.style.opacity = "0";


        setTimeout(() => {


            loader.style.display = "none";


            document
            .getElementById("main")
            .classList.remove("hidden");


            startTyping();


            createHearts();


        },700);



    },2000);



});








// ===============================
// Печатающийся текст
// ===============================


const text = 
"Я подготовил этот маленький мир только для нас ❤️";



let index = 0;



function startTyping(){


const element =
document.getElementById("typing");



function typing(){


if(index < text.length){


element.innerHTML += text[index];


index++;


setTimeout(typing,70);


}



}



typing();



}









// ===============================
// Кнопка открыть
// ===============================



document
.getElementById("openBtn")
.addEventListener("click",()=>{


const music =
document.getElementById("music");



if(music){


music.play()
.catch(()=>{});


}




document
.querySelector(".gallery")
.scrollIntoView({

behavior:"smooth"

});



});









// ===============================
// Сердечки
// ===============================



function createHearts(){



setInterval(()=>{


const heart =
document.createElement("div");



heart.className =
"floating-heart";



heart.innerHTML =
["❤️","💕","💗","💖","💘"]
[
Math.floor(
Math.random()*5
)
];



heart.style.left =
Math.random()*100+"%";



heart.style.animationDuration =
(5+Math.random()*5)+"s";



document
.getElementById("hearts-container")
.appendChild(heart);



setTimeout(()=>{


heart.remove();


},10000);



},700);



}







// ===============================
// Конверт
// ===============================



const envelope =
document.getElementById("envelope");



if(envelope){


envelope.addEventListener(
"click",
()=>{


envelope.classList.toggle(
"open"
);


});



}

// ===============================
// Ответ "Да ❤️"
// ===============================


const yesBtn =
document.getElementById("yesBtn");



if(yesBtn){


yesBtn.addEventListener(
"click",
()=>{


createConfetti();



yesBtn.innerHTML =
"Я жду тебя ❤️";



sendTelegramData();



});



}







// ===============================
// Кнопка "Подумаю"
// ===============================


const thinkBtn =
document.getElementById("thinkBtn");



if(thinkBtn){


thinkBtn.addEventListener(
"click",
()=>{


thinkBtn.innerHTML =
"Хорошо, я подожду 😊";



});



}







// ===============================
// Конфетти
// ===============================



function createConfetti(){



for(let i=0;i<120;i++){



const piece =
document.createElement("div");



piece.className =
"confetti-piece";



piece.innerHTML =
["❤️","✨","🌸","💖"]
[
Math.floor(
Math.random()*4
)
];



piece.style.left =
Math.random()*100+"%";



piece.style.animationDelay =
Math.random()*2+"s";



piece.style.fontSize =
(10+Math.random()*25)+"px";



document
.getElementById("confetti")
.appendChild(piece);



setTimeout(()=>{


piece.remove();



},5000);



}



}








// ===============================
// Таймер встречи
// ===============================



let meetingDate =
new Date();



meetingDate.setDate(
meetingDate.getDate()+7
);




// Можно заменить вручную
// пример:
// meetingDate = new Date("2026-08-15 18:00");




function updateTimer(){



const now =
new Date();



const difference =
meetingDate-now;



if(difference<=0){


document
.querySelector(".timer")
.innerHTML =
"Сегодня наш день ❤️";


return;


}




const days =
Math.floor(
difference/(1000*60*60*24)
);



const hours =
Math.floor(
(difference/(1000*60*60))%24
);



const minutes =
Math.floor(
(difference/(1000*60))%60
);



const seconds =
Math.floor(
(difference/1000)%60
);




document
.getElementById("days")
.innerHTML =
String(days)
.padStart(2,"0");



document
.getElementById("hours")
.innerHTML =
String(hours)
.padStart(2,"0");



document
.getElementById("minutes")
.innerHTML =
String(minutes)
.padStart(2,"0");



document
.getElementById("seconds")
.innerHTML =
String(seconds)
.padStart(2,"0");



}



setInterval(
updateTimer,
1000
);


updateTimer();







// ===============================
// Яндекс карта
// ===============================



ymaps.ready(()=>{


const map =
new ymaps.Map(
"map",
{


center:
[
55.751244,
37.618423
],


zoom:
13


});




const place =
new ymaps.Placemark(


[
55.751244,
37.618423
],


{


balloonContent:

"Наше место встречи ❤️"



}



);



map.geoObjects.add(place);



});

// ===============================
// Сбор данных для Telegram
// ===============================


function collectDateData(){


const data = {


date:

document
.getElementById("date")
?.value || "не выбрана",



time:

document
.getElementById("time")
?.value || "не выбрано",




food:

document
.getElementById("food")
?.value || "не выбрано",




flowers:

document
.getElementById("flowers")
?.value || "не выбраны",




gift:

document
.getElementById("gift")
?.value || "нет",




wishes:

document
.getElementById("wishesText")
?.value || "нет",




browser:

navigator.userAgent,




language:

navigator.language,




platform:

navigator.platform,




screen:

`${window.innerWidth}x${window.innerHeight}`,




opened:

new Date()
.toLocaleString("ru-RU")



};



return data;



}









// ===============================
// Отправка на сервер
// ===============================



async function sendTelegramData(){



const data =
collectDateData();



try {



await fetch(
"/api/date-response",
{


method:"POST",


headers:{


"Content-Type":
"application/json"


},


body:
JSON.stringify(data)



}

);



console.log(
"Данные отправлены"
);



}

catch(error){


console.log(
"Ошибка отправки",
error
);



}



}









// ===============================
// Анимация появления блоков
// ===============================



const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.classList.add(
"fade-in"
);



}



});



},
{

threshold:0.15

});





document
.querySelectorAll(
"section"
)
.forEach(section=>{


observer.observe(section);



});









// ===============================
// Сохранение выбора локально
// ===============================



function saveChoice(){



const choice = {


date:

document
.getElementById("date")
?.value,



time:

document
.getElementById("time")
?.value,



food:

document
.getElementById("food")
?.value,



flowers:

document
.getElementById("flowers")
?.value,



gift:

document
.getElementById("gift")
?.value



};



localStorage.setItem(

"dateChoice",

JSON.stringify(choice)

);



}




document
.querySelectorAll(
"input,select,textarea"
)
.forEach(element=>{


element.addEventListener(
"change",
saveChoice
);



});








// ===============================
// Загрузка сохранённых данных
// ===============================



window.addEventListener(
"load",
()=>{


const saved =
localStorage.getItem(
"dateChoice"
);



if(saved){



const choice =
JSON.parse(saved);



if(
document.getElementById("date")
)

document.getElementById("date").value =
choice.date || "";



if(
document.getElementById("time")
)

document.getElementById("time").value =
choice.time || "";



if(
document.getElementById("food")
)

document.getElementById("food").value =
choice.food || "";



if(
document.getElementById("flowers")
)

document.getElementById("flowers").value =
choice.flowers || "";



if(
document.getElementById("gift")
)

document.getElementById("gift").value =
choice.gift || "";



}



});

// ===============================
// Защита от повторной отправки
// ===============================


let messageSent = false;



async function safeTelegramSend(){


if(messageSent){


console.log(
"Уведомление уже отправлено"
);


return;


}



messageSent = true;



await sendTelegramData();



}







// заменяем стандартную отправку
// на безопасную


if(yesBtn){


yesBtn.addEventListener(
"click",
()=>{


safeTelegramSend();



});



}









// ===============================
// Плавный переход по якорям
// ===============================



document
.querySelectorAll("a[href^='#']")
.forEach(link=>{


link.addEventListener(
"click",
(e)=>{


e.preventDefault();



document
.querySelector(
link.getAttribute("href")
)
.scrollIntoView({

behavior:"smooth"

});



});



});









// ===============================
// Проверка поддержки браузера
// ===============================


function checkBrowser(){


const info = {


cookies:
navigator.cookieEnabled,


online:
navigator.onLine,


touch:
"ontouchstart" in window



};



console.log(
"Browser info:",
info
);



}



checkBrowser();









// ===============================
// Запись времени нахождения
// ===============================


let visitStart =
Date.now();



window.addEventListener(
"beforeunload",
()=>{


const stayTime =
Math.floor(
(Date.now()-visitStart)
/1000
);



sessionStorage.setItem(

"visitTime",

stayTime

);



});









// ===============================
// Красивое открытие страницы
// ===============================



document.addEventListener(
"DOMContentLoaded",
()=>{


document.body.style.opacity="1";



});









// ===============================
// Пасхальная функция ❤️
// ===============================


function loveMessage(){


console.log(

`
❤️
Спасибо, что открыла этот сайт.

Пусть этот вечер станет
нашим воспоминанием.
❤️
`

);



}



loveMessage();
