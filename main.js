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
    let button = document.querySelector("#button");
    let menu = document.querySelector("#overlay");
    // let body = document.querySelector("body");
    let toggleMenu = function (e){
        button.classList.toggle('button__gamburger--active');
        menu.classList.toggle('overlay--open');
        // body.classList.toggle('body-menu--active');
    }
    let addListeners = function (){
        button.addEventListener("click", toggleMenu);
    }
    return{
        openMenu: addListeners
    };    
})("#button", "#overlay" );
// console.log(menuOpenBurger)
menuOpenBurger.openMenu();



