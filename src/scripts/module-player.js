let video;
let durationControl;
let soundControl;
let intervalId;
const MAX_SOUND_VALUE = 10;

$().ready(function(){
  video = document.getElementById("player");
  // console.dir(video)

  video.addEventListener('click',playStop);

  let playButtons = document.querySelectorAll(".play");//обработчик событий для кнопки play
  for (let i=0; i < playButtons.length; i++){
    playButtons[i].addEventListener('click',playStop);
  }

  let micControl = document.getElementById("mic");//обработчик событий для кнопки динамик
  micControl.addEventListener('click', soundOff)

  durationControl = document.getElementById("durationLevel");//обработчик событий для кнопки ползунка продолжительности ввидео
  durationControl.addEventListener('mousedown', stopInterval);//кликнула по ползунку, но не отпустила
  durationControl.addEventListener('mouseup', setVideoDuration);

  durationControl.min = 0;
  durationControl.value = 0;

  soundControl = document.getElementById("micLevel");//обработчик событий для ползунка громкости
  soundControl.addEventListener('mouseup', changeSoundVolume);

  soundControl.min = 0;
  soundControl.max = MAX_SOUND_VALUE;

  video.addEventListener('ended', function(){//при окончании видео появляетсяя на экране белая большая кнопка и ползунок переходит в начало
    document.querySelector(".video__player-img").classList.toggle("video__player-img--hidden");
    video.currentTime = 0;
  }, false);

});


  function playStop(){//при клике
      document.querySelector(".video__player-img").classList.toggle("video__player-img--hidden");//показывает/скаывает белую кнопку play
      durationControl.max = video.duration;//присваивает ползунку продолжительности максимальное значение = продолжительности видео

      if (video.paused){//если функция на паузе, то
        video.play();//запускаем видео
        intervalId = setInterval(updataDuration, 1000/66);//запуск перемещеения ползунка с перидоичностью 1000/66 (мб любое)
      }else{//если не стояло на паузе
        stopInterval(intervalId);//останавливается выполнение функции (чтобы не происходила утечка памяти)
      }
  }
  

  function stopInterval(){
    video.pause();//то ставим на паузу
    clearInterval(intervalId);//останавливается выполнение функции (чтобы не происходила утечка памяти)
  }



  function setVideoDuration(){//возможность перемотки видео по движению ползунка
    video.currentTime = durationControl.value;
    intervalId = setInterval(updataDuration,1000/66);

    if(video.paused){
      video.play();
      document.getElementsByClassName("video__player-img")[0].classList.add("video__player-img--hidden");
    }
  }



  function updataDuration(){//обновление позиции ползунка продолжительности видео
    durationControl.value = video.currentTime;//присваем полхунку текущее время воспроизведения
  }

  function soundOff(){//управление звуком: если звук есть, то мы его выключаем, запомнив текущую позицию громкости в перем soundLevel. Если нет звука то выставляем уровень громкости на прежний уровень
    if(video.volume === 0){
      video.volume = soundLevel;
      soundControl.value = soundLevel*MAX_SOUND_VALUE;//тк у volume значения от 0 до 1 и мы преобразовываем из  от1 о 10
    }else{
      soundLevel = video.volume;// тк на момент загрузки видео всегда не равно нулю, то
      video.volume = 0;
      soundControl.value = 0//когда звук выключен отображаем ползунок на 0
    }
  }

  function changeSoundVolume(){// вызываетсая когда отпустили мышку
    video.volume = soundControl.value/MAX_SOUND_VALUE;
    console.log (video.volume)
  }







// YOUTUBE API
// let player;

// const formatTime = timeSec => {//завеои формат времени в сек
//   const roundTime = Math.round(timeSec);

//   const minutes = Math.floor(roundTime / 60); //расчет минут
//   const seconds = roundTime - minutes * 60;

//   const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds; // формат времени 00-00

//   return `${minutes}:${formattedSeconds}`;
// };

// const onPlayerReady = () => { // время прошло и время осталось
//   let interval;
//   let durationSec = player.getDuration();

//   $(".player__duration-estimate").text(formatTime(durationSec));// вставляем время оставшееся

//   if (typeof interval !== "undefined") {//если интервал запущен его нужно очистить
//     clearInterval(interval);
//   }

//   interval = setInterval(() => {//интервал запуска таймаута
//     const completedSec = player.getCurrentTime();
//     const completedPercent = (completedSec / durationSec) * 100; // курсор движения по полосе - в процентах

//     $(".player__playback-button").css({//двигаем курсор на кол-во процентов
//       left: `${completedPercent}%`
//     });

//     $(".player__duration-completed").text(formatTime(completedSec));
//   }, 1000);
// };

// const eventsInit = () => {
//   $(".player__start").on("click", e => {// по нажатию на кнопку видео стартовало
//     e.preventDefault();
//     const btn = $(e.currentTarget);

//     if (btn.hasClass("paused")) {//если у кнопки есть класс paused значит видео запустили и его нужно остановись на паузу
//       player.pauseVideo();
//     } else { // если нет класса paused то запускаем
//       player.playVideo();
//     }
//   });

//   $(".player__playback").on("click", e => {//перемещение курсора кликом в процентах
//     const bar = $(e.currentTarget);//смотрим куда мы кликнули
//     const newButtonPosition = e.pageX - bar.offset().left;// клик относительно левого края окна - положение самого бара
//     const buttonPosPercent = (newButtonPosition / bar.width()) * 100;//расчет процентов куда кликнули
//     const newPlayerTimeSec = (player.getDuration() / 100) * buttonPosPercent;//общее колво времени/100 * столтко сколько клинули по бару

//     $(".player__playback-button").css({
//       left: `${buttonPosPercent}%`//подвинули курсор
//     });

//     player.seekTo(newPlayerTimeSec);
//   });

//   $(".player__splash").on("click", e => {// при клике на нее видео запустится
//     player.playVideo();
//   });
// };

// const onPlayerStateChange = event => {
//   const playerButton = $(".player__start");
//   /*
//   -1 (воспроизведение видео не начато)
//   0 (воспроизведение видео завершено)
//   1 (воспроизведение)
//   2 (пауза)
//   3 (буферизация)
//   5 (видео подают реплики).
//    */
//   switch (event.data) {
//     case 1: 
//       $('.player__wrapper').addClass('active');// кодна запустили
//       playerButton.addClass("paused");
//       break;
//     case 2: 
//       playerButton.removeClass("paused");
//       break;
//   }
// };

// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('yt-player', {
//     height: "370",
//     width: "600",
//     videoId: 'ADlGkXAz1D0',
//     // videoId: "QkfUqb2XFR",
    
//     events: {
//       onReady: onPlayerReady,
//       onStateChange: onPlayerStateChange
//     },
//     playerVars: {
//       controls: 0,
//       disablekb: 0,
//       showinfo: 0,
//       rel: 0,
//       autoplay: 0,
//       modestbranding: 0
//     }
//   });
// }

// eventsInit();
