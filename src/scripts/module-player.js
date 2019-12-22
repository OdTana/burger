

let player;

const formatTime = timeSec => {//завеои формат времени в сек
  const roundTime = Math.round(timeSec);

  const minutes = Math.floor(roundTime / 60); //расчет минут
  const seconds = roundTime - minutes * 60;

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds; // формат времени 00-00

  return `${minutes}:${formattedSeconds}`;
};

const onPlayerReady = () => { // время прошло и время осталось
  let interval;
  let durationSec = player.getDuration();

  $(".player__duration-estimate").text(formatTime(durationSec));// вставляем время оставшееся

  if (typeof interval !== "undefined") {//если интервал запущен его нужно очистить
    clearInterval(interval);
  }

  interval = setInterval(() => {//интервал запуска таймаута
    const completedSec = player.getCurrentTime();
    const completedPercent = (completedSec / durationSec) * 100; // курсор движения по полосе - в процентах

    $(".player__playback-button").css({//двигаем курсор на кол-во процентов
      left: `${completedPercent}%`
    });

    $(".player__duration-completed").text(formatTime(completedSec));
  }, 1000);
};

const eventsInit = () => {
  $(".player__start").on("click", e => {// по нажатию на кнопку видео стартовало
    e.preventDefault();
    const btn = $(e.currentTarget);

    if (btn.hasClass("paused")) {//если у кнопки есть класс paused значит видео запустили и его нужно остановись на паузу
      player.pauseVideo();
    } else { // если нет класса paused то запускаем
      player.playVideo();
    }
  });

  $(".player__playback").on("click", e => {//перемещение курсора кликом в процентах
    const bar = $(e.currentTarget);//смотрим куда мы кликнули
    const newButtonPosition = e.pageX - bar.offset().left;// клик относительно левого края окна - положение самого бара
    const buttonPosPercent = (newButtonPosition / bar.width()) * 100;//расчет процентов куда кликнули
    const newPlayerTimeSec = (player.getDuration() / 100) * buttonPosPercent;//общее колво времени/100 * столтко сколько клинули по бару

    $(".player__playback-button").css({
      left: `${buttonPosPercent}%`//подвинули курсор
    });

    player.seekTo(newPlayerTimeSec);
  });

  $(".player__splash").on("click", e => {// при клике на нее видео запустится
    player.playVideo();
  });
};

const onPlayerStateChange = event => {
  const playerButton = $(".player__start");
  /*
  -1 (воспроизведение видео не начато)
  0 (воспроизведение видео завершено)
  1 (воспроизведение)
  2 (пауза)
  3 (буферизация)
  5 (видео подают реплики).
   */
  switch (event.data) {
    case 1: 
      $('.player__wrapper').addClass('active');// кодна запустили
      playerButton.addClass("paused");
      break;
    case 2: 
      playerButton.removeClass("paused");
      break;
  }
};

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: "370",
    width: "600",
    videoId: 'ADlGkXAz1D0',
    // videoId: "QkfUqb2XFR",
    
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
}

eventsInit();
