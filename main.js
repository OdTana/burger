// let button = document.querySelector("#button");
// let menu = document.querySelector("#overlay");
// let body = document.querySelector("body");
// function toggleMenu(){
//     button.classList.toggle('button__gamburger--active');
//     menu.classList.toggle('overlay--open');
//     body.classList.toggle('body-menu--active');
// }
// button.addEventListener("click", toggleMenu);





let menuOpenBurger = (function (buttonClass, menuClass){
    let button = document.querySelector(buttonClass);
    let menu = document.querySelector(menuClass);
    let body = document.querySelector("body");
    let toggleMenu = function (e){
        button.classList.toggle('button__gamburger--active');
        menu.classList.toggle('overlay--open');
        body.classList.toggle('body-menu--locked');
    }
    let addListeners = function (){
        button.addEventListener("click", toggleMenu);

        menu.addEventListener("click", function(e){
            target = e.target;
            if(target.classList.contains("nav__link")){
                toggleMenu(); 
            }
        })
    }
    return{
        openMenu: addListeners
    };    
})("#button", "#overlay" );
// console.log(menuOpenBurger);
menuOpenBurger.openMenu();



// Аккордеон КОМАНДА
let TeamAcc = () => {
    let team = document.querySelector(".team__list");
    team.addEventListener('click', function(e){
        e.preventDefault();
        let link = e.target;
        if(link.classList.contains('team__name')){ //если link содержит класс 'team__name', то выполняем:
            let active = team.querySelector('.team__item--active');//проверяем, есть ли в .team__list элемент с таким классом'.team__item--active'. Если есть, то в active запишется ссылка на этот эл-т

            if(active){//всегда закрывает активный элемент, если он есть
                let activeText = active.querySelector('.team__comment');
                activeText.style.opacity = "0";
                active.classList.remove('team__item--active');
            }
            if(!active || active.querySelector('.team__name')!==link){//если нет активного эл-та на странице ИЛИ если мы кликаем на другой (отличный от открытого) элемент ТО нужно открывать
                let current = link.closest('.team__item'); //ищем родителя, оторого нужно раскрыть
                current.classList.add('team__item--active');//добавляем родителю активный класс, тк он стилизуется
                let currentText = current.querySelector('.team__comment');// в этом родителе ищу эл-т '.team__comment'
                currentText.style.opacity = '1';//добавляю opacity

                
            }    

        }
    })
};
TeamAcc()

// //Аккордеон
let MenuAcc = () => {
    // let menu = document.querySelector(".menu__content");

    let links = document.querySelectorAll(".menu__title");
    let body  = document.querySelector("body");

    let colculateWidth = () => {
        let windowWidth = window.innerWidth;//вся ширина окна, включая скролл
        // let links = document.querySelector(".menu__title");
        let linksWidth = links[0].offsetWidth;
        let reqWidth = windowWidth - linksWidth * links.length;
        console.log(reqWidth);
        return reqWidth > 550 ? 550 : reqWidth;
    };

    function closeItem (activeElement){
        let activeText = activeElement.querySelector('.menu__text');
        activeText.style.width = "0px";
        activeElement.classList.remove('menu__list--active');
    }

    links.forEach(function(elem){
        elem.addEventListener("click", function(e){
            e.preventDefault();
            let link = e.target;
            let active = document.querySelector('.menu__list--active');//проверяем, есть ли в .team__list элемент с таким классом'.team__item--active'. Если есть, то в active запишется ссылка на этот эл-т
        
            if(active){//всегда закрывает активный элемент, если он есть
                    let activeText = active.querySelector('.menu__text');
                    activeText.style.width = "0px";
                    active.classList.remove('menu__list--active');
            }
            if(!active || active.querySelector('.menu__title') !== link){//если нет активного эл-та на странице ИЛИ если мы кликаем на другой (отличный от открытого) элемент ТО нужно открывать
                    let current = link.closest('.menu__list'); //ищем родителя, оторого нужно раскрыть
                    current.classList.add('menu__list--active');//добавляем родителю активный класс, тк он стилизуется
                    let currentText = current.querySelector('.menu__text');// в этом родителе ищу эл-т '.team__comment'
                    if(body.offsetWidth > 480){//ширина с учетом всех отступов
                        currentText.style.width = colculateWidth() + "px";
                    }else{
                        currentText.style.width = "100%";
                    } 
                }    
        })
    })
    //закрывает по клику вне аккордеона
    document.addEventListener("click", e => {
        let activePoint = document.querySelector(".menu__list--active");
        const target = e.target;
        if(!target.closest(".menu__content") && activePoint){
            closeItem(activePoint);
        }
    })

    //закрывает по клику на Х
    let close = document.querySelector(".close");
    close.addEventListener('click', e => {
        let activePoint = document.querySelector(".menu__list--active");
        closeItem(activePoint);
       
    })
};
MenuAcc()




// Слайдер конечный

// let prev = document.querySelector("#prev");
// let next = document.querySelector("#next");
// let slide = document.querySelector("#slide");

// let minLeft=-100;
// let maxLeft=0;
// let step=100;
// let currentLeft=0;

// slide.style.left=currentLeft;
// next.addEventListener("click", function(e){
//     e.preventDefault();
//     if (currentLeft>minLeft){
//         currentLeft -=step;
//         slide.style.left=currentLeft + "%";
//     }
// });

// prev.addEventListener("click", function(e){
//     e.preventDefault();
//     if (currentLeft<maxLeft){
//         currentLeft +=step;
//         slide.style.left=currentLeft + "%";
//     }
// });



//СЛАЙДЕР БЕСКОНЕЧНЫЙ
let prev = document.querySelector("#prev");
let next = document.querySelector("#next");
let slide = document.querySelector("#slide");

next.addEventListener("click", function(e){
        loop ("next",e);
});

prev.addEventListener("click", function(e){
    loop ("prev",e);
});

function loop(direction, e){
    e.preventDefault();
    if(direction==="next"){
        slide.appendChild(slide.firstElementChild);
    }else{
        slide.insertBefore(slide.lastElementChild, slide.firstElementChild)
    }
    
}

//СЛАЙДШОУ
(function () {
    const comment = document.querySelectorAll('.comment__item');
    const review = document.querySelectorAll('.review__item');
    let active = 0;

    for (let i = 0; i > comment.length; i++){
        review[i].addEventListener('click', function (e) {
            e.preventDefault();
            comment[i].classList.toggle("comment__item--active");
            review[i].classList.toggle("review__item--active");

            review[active].classList.toggle("review__item--active");
            comment[active].classList.toggle("comment__item--active");
            active = 1;
        })
    }
}());

//AJAX

const overlay = function () {
    let body  = document.querySelector("body");
    let link = document.createElement("a");//созд ссылку

    link.classList.add("modal-review__close");
    link.setAttribute("href", "#");

    let openOverlay = function (modalId, content) {//передается id модального окна
        let overlay =   document.querySelector(modalId);      
        let innerOverlay = overlay.querySelector(".modal-review__inner");

        if(content){//если передали необязат параметр, то вставить содержимое в блок и после добавить ссылку закрытия
            innerOverlay.innerHTML = content;
            innerOverlay.appendChild(link);// добавляем ссылку закрытия после всего содержимого модалки
        }

        overlay.classList.add("is-active");//добавляем класс и показываем модалку
        body.classList.add("locked");

        link.addEventListener("click", (e) => {//обработка клика на созд крестик
            e.preventDefault();
            closeOverlay(modalId);//закрываем
        })

        overlay.addEventListener("click", (e) => {//обработка клика вне модалки
            e.preventDefault();
            if(e.target === overlay){
                closeOverlay(modalId);//закрываем
            }
        })

        document.addEventListener("keydown", function (e) {
            if (e.keyCode == 27) closeOverlay(modalId);// закрывает при нажатии на esc
        });
    }

    let closeOverlay = function (modalId) {//функция закрытия удаляет классы у выбранного модального окна
        let overlay =   document.querySelector(modalId);  
        
        overlay.classList.remove("is-active");//удаляем класс и показываем модалку
        body.classList.remove("locked");
    }

    let setContent = function (modalId, content){
        let overlay =   document.querySelector(modalId); 
        let innerOverlay = overlay.querySelector(".modal-review__inner");

        if(content){//если передан необязательный параметр то вставить содержимое в блок и после добавить ссылку закрытия
            innerOverlay.innerHTML = content;
            innerOverlay.appendChild(link);
        }
    }
    
    return{
         open: openOverlay,
         close: closeOverlay,
         setContent: setContent
    }    
}
// })()

//ЗАПРОС НА СЕРВЕР
var ajaxForm = function(form){
    var data = {
        name: form.elements.name.value,
        phone: form.elements.phone.value,
        comment: form.elements.comment.value,
        to: "otana@narod.ru"
    },
    url = " https://webdev-api.loftschool.com/sendmail";

    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", url);
    xhr.send(JSON.stringify(data))

    return xhr;
}

var submitForm = function (e){//обрабатывается ответ с сервера:
    e.preventDefault();
    var form = e.target;
    let request = ajaxForm(form);//кладем ответ с сервера в перем request

    request.addEventListener('load', () => {//после того как ответ получен, проверяем статус ответа и выводим модальное окно
        if (request.status >= 400){
            let content = "Ошибка соединения с сервером, попробуйте позже";

            overlay.open("#modal-review", '${content}.Ошибка ${request.status}')
        }else if (request.response.status){//иначе приходит норм ответ и хранится в response
            let content = request.response.message;
            overlay.open("#modal-review", content);//вызываем модальное окно. Первая пременная - id формы
        }else{
            let content = request.response.message;
            overlay.open("#modal-review", content);
        }
    });
}

let myform = document.querySelector("#main-form");
myform.addEventListener("submit", submitForm);//вешаем обработчик событий на форму


// let myform = document.querySelector("#main-form");
// let send = document.querySelector("#send");
//  send.addEventListener("click", event => {
//      event.preventDefault();
//      if (validateForm(myform)){
//         const data = {
//             name: myform.elements.name.value,
//             phone: myform.elements.phone.value,
//             comment: myform.elements.comment.value,
//             to: "otana@narod.ru"

//         }
//         const xhr = new XMLHttpRequest();
//         xhr.responseType = "json";
//         xhr.open("POST", "https://webdev-api.loftschool.com/sendmail");
//         xhr.send(JSON.stringify(data));
//         xhr.addEventListener("load",() =>{
//             if (xhr.response.status){
//                 console.log("Все ОК!!!")
//             }
//         });
//      }
//  });
//   function validateForm(myform) {
//       let valid = true;
//       if (!validateField(myform.elements.name)){
//         valid = false;
//       }
//       if (!validateField(myform.elements.phone)){
//         valid = false;
//       }
//       if (!validateField(myform.elements.comment)){
//         valid = false;
//       }
//       return valid
//   }

//   function validateField(field){
//       field.nextElementSibling.textContent = field.validationMessage;
//       return field.checkValidity;
//   }