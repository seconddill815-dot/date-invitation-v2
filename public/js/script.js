// ===============================
// Загрузка страницы
// ===============================

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.getElementById("loader");

        if(loader){

            loader.style.opacity = "0";

            setTimeout(() => {

                loader.style.display = "none";

                const main =
                document.getElementById("main");

                if(main){
                    main.classList.remove("hidden");
                }

                startTyping();
                createHearts();

            },700);

        }

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
