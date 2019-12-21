//ОТКРЫТИЕ МЕНЮ
;(function() {
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
})()




// let button = document.querySelector("#button");
// let menu = document.querySelector("#overlay");
// let body = document.querySelector("body");
// function toggleMenu(){
//     button.classList.toggle('button__gamburger--active');
//     menu.classList.toggle('overlay--open');
//     body.classList.toggle('body-menu--active');
// }
// button.addEventListener("click", toggleMenu);