// ===============================
// Загрузка страницы
// ===============================

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.getElementById("loader");

        if (loader) {
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.style.display = "none";

                const main = document.getElementById("main");

                if (main) {
                    main.classList.remove("hidden");
                }

                startTyping();
                createHearts();

            }, 700);
        }

    }, 2000);

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


    if(!element) return;


    function typing(){

        if(index < text.length){

            element.innerHTML += text[index];

            index++;

            setTimeout(
                typing,
                70
            );

        }

    }

    typing();

}


// ===============================
// Кнопка открыть
// ===============================


const openBtn =
document.getElementById("openBtn");


if(openBtn){

openBtn.addEventListener(
"click",
()=>{


const music =
document.getElementById("music");


if(music){

music.play()
.catch(()=>{});

}


const gallery =
document.querySelector(".gallery");


if(gallery){

gallery.scrollIntoView({
behavior:"smooth"
});

}


});

}


// ===============================
// Сердечки
// ===============================


function createHearts(){

const container =
document.getElementById("hearts-container");


if(!container) return;


setInterval(()=>{


const heart =
document.createElement("div");


heart.className =
"floating-heart";


heart.innerHTML =
["❤️","💕","💗","💖","💘"]
[
Math.floor(Math.random()*5)
];


heart.style.left =
Math.random()*100+"%";


heart.style.animationDuration =
(5+Math.random()*5)+"s";


container.appendChild(heart);


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

envelope.classList.toggle("open");

});

}


// ===============================
// Кнопка "Да ❤️"
// Только открывает форму
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



const form =
document.querySelector(".date-form");


if(form){

form.scrollIntoView({
behavior:"smooth"
});

}


});

}


// ===============================
// Конфетти
// ===============================


function createConfetti(){


const box =
document.getElementById("confetti");


if(!box) return;


for(let i=0;i<120;i++){


const piece =
document.createElement("div");


piece.className =
"confetti-piece";


piece.innerHTML =
["❤️","✨","🌸","💖"]
[
Math.floor(Math.random()*4)
];


piece.style.left =
Math.random()*100+"%";


piece.style.animationDelay =
Math.random()*2+"s";


piece.style.fontSize =
(10+Math.random()*25)+"px";


box.appendChild(piece);



setTimeout(()=>{

piece.remove();

},5000);


}


}


// ===============================
// Сбор данных
// ===============================


function collectDateData(){


return {


date:
document.getElementById("date")?.value || "не выбрана",


time:
document.getElementById("time")?.value || "не выбрано",


food:
document.getElementById("food")?.value || "не выбрано",


flowers:
document.getElementById("flowers")?.value || "не выбраны",


gift:
document.getElementById("gift")?.value || "нет",


wishes:
document.getElementById("wishesText")?.value || "нет",


browser:
navigator.userAgent,


language:
navigator.language,


platform:
navigator.platform,


screen:
`${window.innerWidth}x${window.innerHeight}`,


opened:
new Date().toLocaleString("ru-RU")


};


}


// ===============================
// Отправка Telegram
// Только финальная кнопка
// ===============================


let messageSent = false;


async function sendTelegramData(){


if(messageSent){

return;

}


messageSent = true;


const data =
collectDateData();



try{


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


});


console.log(
"Telegram отправлен ❤️"
);


}

catch(error){


console.error(
"Ошибка:",
error
);


}


}


// ===============================
// Кнопка отправить
// ===============================


const sendBtn =
document.getElementById("sendBtn");


if(sendBtn){


sendBtn.addEventListener(
"click",
()=>{


sendTelegramData();


sendBtn.innerHTML =
"Отправлено ❤️";


});


}


// ===============================
// Таймер
// ===============================


let meetingDate =
new Date();


meetingDate.setDate(
meetingDate.getDate()+7
);



function updateTimer(){


const now =
new Date();


const diff =
meetingDate-now;


if(diff<=0) return;


const days =
Math.floor(diff/(1000*60*60*24));


const hours =
Math.floor(diff/(1000*60*60)%24);


const minutes =
Math.floor(diff/(1000*60)%60);


const seconds =
Math.floor(diff/1000%60);



if(document.getElementById("days"))
days.textContent =
String(days).padStart(2,"0");

if(document.getElementById("hours"))
hours.textContent =
String(hours).padStart(2,"0");

if(document.getElementById("minutes"))
minutes.textContent =
String(minutes).padStart(2,"0");

if(document.getElementById("seconds"))
seconds.textContent =
String(seconds).padStart(2,"0");


}


setInterval(
updateTimer,
1000
);


// ===============================
// Сохранение выбора
// ===============================


document
.querySelectorAll(
"input,select,textarea"
)
.forEach(el=>{


el.addEventListener(
"change",
()=>{


localStorage.setItem(
el.id,
el.value
);


});


});


// ===============================
// Плавное появление
// ===============================


const observer =
new IntersectionObserver(
entries=>{


entries.forEach(entry=>{


if(entry.isIntersecting){

entry.target.classList.add(
"fade-in"
);

}


});


});


document
.querySelectorAll("section")
.forEach(section=>{

observer.observe(section);

});
