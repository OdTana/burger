// СЛАЙДЕР КОНЕЧНЫЙ

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



// //СЛАЙДЕР БЕСКОНЕЧНЫЙ
// let prev = document.querySelector("#prev");
// let next = document.querySelector("#next");
// let slide = document.querySelector("#slide");

// next.addEventListener("click", function(e){
//         loop ("next",e);
// });

// prev.addEventListener("click", function(e){
//     loop ("prev",e);
// });

// function loop(direction, e){
//     e.preventDefault();
//     if(direction==="next"){
//         slide.appendChild(slide.firstElementChild);
//     }else{
//         slide.insertBefore(slide.lastElementChild, slide.firstElementChild)
//     }
    
// }



//СЛАЙДЕР ГОРИЗОНТАЛЬНЫЙ JQ

;$(function() {
    var moveSlide = function (container, slideNum) {
        var items = container.find(".bar__item"),
            activeSlide = items.filter(".active"),
            reqItem = items.eq(slideNum),
            reqIndex = reqItem.index(),
            list = container.find(".bar__list"),
            duration = 200;
        if(reqItem.length){
            list.animate({
                "left": -reqIndex * 100 + "%"
            }, duration, function() {
                activeSlide.removeClass("active");
                reqItem.addClass("active");
                
            });
        };
        
    };
    $(".arrow__btn").on("click", function(e){
        e.preventDefault();
        var $this = $(this),
            container = $this.closest(".bar__content"),
            items = container.find(".bar__item"),
            activeItem = items.filter(".active"),
            existedItem, edgeItem, reqItem;
        if($this.hasClass("arrow__next")){//вперед
            existedItem = activeItem.next();
            edgeItem = items.first();
        }
        if($this.hasClass("arrow__prev")){//назад
            existedItem = activeItem.prev();
            edgeItem = items.last();
        }
        reqItem = existedItem.length ? existedItem.index() : edgeItem.index();

        moveSlide(container, reqItem);

    });
})