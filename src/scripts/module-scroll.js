
// СЛАЙДЕР ВЕБИНАР

const sections = $(".section");
const display = $(".main");
let inscroll = false;//изначально страница не скролится

const performTransition = sectionEq => {//функция перемещеия к секции
    if (inscroll === false){//какие либо действия произойдет если inscroll === false (если не скролится, то мы будем что-то делать)
        inscroll = true;//когда if случился, мы поменяем значение
    
        const position = sectionEq * -100 ;

        sections
        .eq(sectionEq)  //из всех секций выбрать нужную по номеру
        .addClass('is-active')  //добавить ей класс active
        .siblings()  //у всех соседей...
        .removeClass('is-active');  //удалить класс active

        display.css({
            transform: `translateY(${position}%)`
        });

        setTimeout(() =>{//задержка в 1с  пока функция не выполнится inscroll===true 
            inscroll = false;//после завершения скролла отработает функция, и только через 1,3с  заработает, когда inscroll вернется обратно

            $(".pages__elips")
            .eq(sectionEq)
            .addClass("active")
            .siblings()
            .removeClass("active")
        }, 1000);
           
    }
};

const scrollToSection = direction => {
    const activeSection = sections.filter (".is-active");//из всех секчий отфильтруем по классу - найдем активную секцию
    const nextSection = activeSection.next();// - следующая от активной (см JQ)
    const prevSection = activeSection.prev();// - предыдущая

    if (direction === "next" && nextSection.length){ // обработка параметра direction: если есть следующая секция, то кней и поскроллим
        performTransition(nextSection.index());// если хотим перейти к следующей то скролл к секции с index (номером элемента в наборе)
    }

    if (direction === "prev" && prevSection.length){// если есть предыдущая секция, то кней и поскроллим
        performTransition(prevSection.index());
    }


    // if (isMobile) {//разрешаю свайп на мобильниках
    //             $(window).swipe({
    //                 swipe: (event, direction) => {
    //                     scrollToSection(direction);
    //                 }
                    
    //             });
    //         }
};

$(window).on("wheel", e =>{
    const deltaY = e.originalEvent.deltaY;

    
    if(deltaY > 0) {
        // performTransition("next")
        scrollToSection("next"); 
    }
    if(deltaY < 0) {
        // performTransition("prev")
        scrollToSection("prev"); 
    }
});

$(window).on("keydown", e => {//навешали на window реакцию на клавиатуру
    // console.log(e.keyCode)//у каждой клавиши есть свой код
    const tagName = e.target.tagName.toLowerCase();//строки приводят к нижнему регистру

    if(tagName != "input" && !tagName != "textarea"){
        switch (e.keyCode){
            case 38://кнопка наверх
                scrollToSection("prev");
                break;
            case 40://кнопка вниз
                scrollToSection("next");
                break;
        }
    }
});

$("[data-scroll-to]").on("click", e => {
            e.preventDefault();
            const $this = $(e.currentTarget);
            const target = $this.attr("data-scroll-to");

            performTransition(target);
});
