// СЛАЙДЕР ВЕБИНАР

const sections = $(".section");
const display = $(".main");
let inscroll = false;

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

const countPositionPercent = sectionEq => {
  return `${sectionEq * -100}%`;
};

const switchActiveClass = (elems, elemNdx) => {
  elems
    .eq(elemNdx)
    .addClass("active")
    .siblings()
    .removeClass("active");
};

const unBlockScroll = () => {
  setTimeout(() => {
    inscroll = false;
  }, 1300); // подождать пока завершится инерция на тачпадах
};

const performTransition = sectionEq => {
  if (inscroll) return;
  inscroll = true;

  const position = countPositionPercent(sectionEq);
  const switchFixedMenuClass = () =>
    switchActiveClass($(".pages__elips"), sectionEq);

  switchActiveClass(sections, sectionEq);
  switchFixedMenuClass();

  display.css({
    transform: `translateY(${position})`
  });

  unBlockScroll();
};

const scrollViewport = direction => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction === "next" && nextSection.length) {
    performTransition(nextSection.index());
  }

  if (direction === "prev" && prevSection.length) {
    performTransition(prevSection.index());
  }
};

$(document).on({
  wheel: e => {
    const deltaY = e.originalEvent.deltaY;
    const direction = deltaY > 0 ? "next" : "prev";
    scrollViewport(direction);
  },
  keydown: e => {
    const tagName = e.target.tagName.toLowerCase();
    const userTypingInInputs = tagName === "input" || tagName === "textarea";

    if (userTypingInInputs) return;

    switch (e.keyCode) {
      case 40:
        scrollViewport("next");
        break;

      case 38:
        scrollViewport("prev");
        break;
    }
  }
});

$("[data-scroll-to]").on("click", e => {
  e.preventDefault();
  performTransition(parseInt($(e.currentTarget).attr("data-scroll-to")));
});

// разрешаем свайп на мобильниках
if (isMobile) {
  window.addEventListener(
    "touchmove",
    e => {
      e.preventDefault();
    },
    { passive: false }
  );

  $("body").swipe({
    swipe: (event, direction) => {
      let scrollDirecrion;
      if (direction === "up") scrollDirecrion = "next";
      if (direction === "down") scrollDirecrion = "prev";
      scrollViewport(scrollDirecrion);
    }
  });
}



//НЕРАДАКТИРОВАННЫЙ
// const sections = $(".section");
// const display = $(".main");
// let inscroll = false;//изначально страница не скролится

// const mobileDetect = new MobileDetect(window.navigator.userAgent);
// const isMobile = mobileDetect.mobile();

// const performTransition = sectionEq => {//функция перемещеия к секции
//     if (inscroll === false){//какие либо действия произойдет если inscroll === false (если не скролится, то мы будем что-то делать)
//         inscroll = true;//когда if случился, мы поменяем значение
    
//         const position = sectionEq * -100 ;



//         sections
//         .eq(sectionEq)  //из всех секций выбрать нужную по номеру
//         .addClass('active')  //добавить ей класс active
//         .siblings()  //у всех соседей...
//         .removeClass('active');  //удалить класс active

//         display.css({
//             transform: `translateY(${position}%)`
//         });

//         setTimeout(() =>{//задержка в 1с  пока функция не выполнится inscroll===true 
//             inscroll = false;//после завершения скролла отработает функция, и только через 1,3с  заработает, когда inscroll вернется обратно

//             $(".pages__elips")
//             .eq(sectionEq)
//             .addClass("active")
//             .siblings()
//             .removeClass("active")
//         }, 1000);
           
//     }
// };

// const scrollToSection = direction => {
//     const activeSection = sections.filter (".active");//из всех секчий отфильтруем по классу - найдем активную секцию
//     const nextSection = activeSection.next();// - следующая от активной (см JQ)
//     const prevSection = activeSection.prev();// - предыдущая

//     if (direction === "next" && nextSection.length){ // обработка параметра direction: если есть следующая секция, то кней и поскроллим
//         performTransition(nextSection.index());// если хотим перейти к следующей то скролл к секции с index (номером элемента в наборе)
//     }

//     if (direction === "prev" && prevSection.length){// если есть предыдущая секция, то кней и поскроллим
//         performTransition(prevSection.index());
//     }

// };

// $(window).on("wheel", e =>{
//     const deltaY = e.originalEvent.deltaY;

    
//     if(deltaY > 0) {
//         // performTransition("next")
//         scrollToSection("next"); 
//     }
//     if(deltaY < 0) {
//         // performTransition("prev")
//         scrollToSection("prev"); 
//     }
// });

// $(window).on("keydown", e => {//навешали на window реакцию на клавиатуру
//     // console.log(e.keyCode)//у каждой клавиши есть свой код
//     const tagName = e.target.tagName.toLowerCase();//строки приводят к нижнему регистру

//     if(tagName != "input" && !tagName != "textarea"){
//         switch (e.keyCode){
//             case 38://кнопка наверх
//                 scrollToSection("prev");
//                 break;
//             case 40://кнопка вниз
//                 scrollToSection("next");
//                 break;
//         }
//     }
// });

// $("[data-scroll-to]").on("click", e => {
//             e.preventDefault();
//             const $this = $(e.currentTarget);
//             const target = $this.attr("data-scroll-to");

//             performTransition(target);
// });

// // разрешаем свайп на мобильниках
// if (isMobile) {
//     window.addEventListener(
//       "touchmove",
//       e => {
//         e.preventDefault();
//       },
//       { passive: false }
//     );
  
//     $("body").swipe({
//       swipe: (event, direction) => {
//         let scrollDirecrion;
//         if (direction === "up") scrollDirecrion = "next";//если двигаем вверх, то это следующий слайд
//         if (direction === "down") scrollDirecrion = "prev";//если двигаем вниз, то это предыдуший слайд
//         scrollViewport(scrollDirecrion);
//       }
//     });
//   }
