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




let menuAccorddion = (function (options){
    let menuTitle = document.querySelector(options.menuTitle);
    let menuText = document.querySelector(options.menuText);

    let accorddion = document.getElementById("menu__content");

    let toggleAccorddion = function (e){
        menuTitle.classList.toggle('menu__title--active');
        menuText.classList.toggle('menu__text--active');
        accorddion.classList.toggle('overlay--open');

    }
    let addAccorddion = function (){
        menuTitle.addEventListener("click", toggleAccorddion);

        accorddion.addEventListener("click", function(e){
            target = e.target;
            console.log(target);
            if(target.classList.contains("menu__title")){
                toggleAccorddion(); 
            }
        })
    };        
    return{
        openAccorddion: addAccorddion
    };    

}) ({menuTitle:".menu__title",
    menuText: ".menu__text"

    });

// console.log(menuAccorddion);
menuAccorddion.openAccorddion();