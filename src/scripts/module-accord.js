// Аккордеон КОМАНДА
;(function() {
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
})()


// //Аккордеон
;(function() {
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
})()