
//AJAX
;(function() {
const overlay = (function () {
    let body  = document.querySelector("body");
    let link = document.querySelector(".order-button");

    let openOverlay = function (modalId, content) {//передается id модального окна
        let overlay =   document.querySelector(modalId);      
        let innerOverlay = overlay.querySelector(".modal-review__inner");

        if(content){//если передали необязат параметр, то вставить содержимое в блок 
            innerOverlay.innerHTML = content;
            
        }

        overlay.classList.add("is-active");//добавляем класс и показываем модалку
        body.classList.add("body-menu--locked");

        link.addEventListener("click", (e) => {//обработка клика 
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
        let overlay = document.querySelector(modalId);  
        
        overlay.classList.remove("is-active");//удаляем класс и показываем модалку
        body.classList.remove("body-menu--locked");
    }

    return {
         open: openOverlay,
         close: closeOverlay,
         
    }    
})();
})()

//AJAX - созд ссылки Х
// const overlay = (function () {
//     let body  = document.querySelector("body");
//     let link = document.createElement("a");//созд ссылку

//     link.classList.add("modal-review__close");
//     link.setAttribute("href", "#");

//     let openOverlay = function (modalId, content) {//передается id модального окна
//         let overlay =   document.querySelector(modalId);      
//         let innerOverlay = overlay.querySelector(".modal-review__inner");

//         if(content){//если передали необязат параметр, то вставить содержимое в блок и после добавить ссылку закрытия
//             innerOverlay.innerHTML = content;
//             innerOverlay.appendChild(link);// добавляем ссылку закрытия после всего содержимого модалки
//         }

//         overlay.classList.add("is-active");//добавляем класс и показываем модалку
//         body.classList.add("locked");

//         link.addEventListener("click", (e) => {//обработка клика на созд крестик
//             e.preventDefault();
//             closeOverlay(modalId);//закрываем
//         })

//         overlay.addEventListener("click", (e) => {//обработка клика вне модалки
//             e.preventDefault();
//             if(e.target === overlay){
//                 closeOverlay(modalId);//закрываем
//             }
//         })

//         document.addEventListener("keydown", function (e) {
//             if (e.keyCode == 27) closeOverlay(modalId);// закрывает при нажатии на esc
//         });
//     }

//     let closeOverlay = function (modalId) {//функция закрытия удаляет классы у выбранного модального окна
//         let overlay =   document.querySelector(modalId);  
        
//         overlay.classList.remove("is-active");//удаляем класс и показываем модалку
//         body.classList.remove("locked");
//     }

//     let setContent = function (modalId, content){
//         let overlay =   document.querySelector(modalId); 
//         let innerOverlay = overlay.querySelector(".modal-review__inner");

//         if(content){//если передан необязательный параметр то вставить содержимое в блок и после добавить ссылку закрытия
//             innerOverlay.innerHTML = content;
//             innerOverlay.appendChild(link);
//         }
//     }
    
//     return {
//          open: openOverlay,
//          close: closeOverlay,
//          setContent: setContent
//     }    
// })();


//ЗАПРОС НА СЕРВЕР
;(function() {
const ajaxForm = function(form){
    let data = new FormData();
    data.append("name", form.elements.name.value);
    data.append("phone", form.elements.phone.value);
    data.append("comment", form.elements.comment.value);
    data.append("to", "otana@narod.ru");

    url = "https://webdev-api.loftschool.com/sendmail";

    const xhr = new XMLHttpRequest();
    xhr.responseType = "json"; 
    xhr.open("POST", url);
    xhr.send(data);

    return xhr;
}

var submitForm = function (e){//обрабатывается ответ с сервера:
    e.preventDefault();
    var form = e.target;
    let request = ajaxForm(form);//кладем ответ с сервера в перем request
    console.log(request)
    request.addEventListener('load', () => {//после того как ответ получен, проверяем статус ответа и выводим модальное окно
        
        if (request.status >= 400){
            let content = "Ошибка соединения с сервером, попробуйте позже";
            overlay.open("#modal-review", '${content}.Ошибка ${request.status}');
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
})()



