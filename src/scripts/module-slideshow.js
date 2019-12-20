//СЛАЙДШОУ
;(function () {
    const comment = document.querySelectorAll('.comment__item');
    const review = document.querySelectorAll('.review__item');
    let active = 0;

    for (let i = 0; i < comment.length; i++){
        review[i].addEventListener('click', function (e) {
            e.preventDefault();
            comment[i].classList.toggle("comment__item--active");
            review[i].classList.toggle("review__item--active");

            review[active].classList.toggle("review__item--active");
            comment[active].classList.toggle("comment__item--active");
            active = i;
        })
    }

})()
