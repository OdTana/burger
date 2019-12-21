

let player;

const formatTime = timeSec => {
  const roundTime = Math.round(timeSec);

  const minutes = Math.floor(roundTime / 60);
  const seconds = roundTime - minutes * 60;

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${formattedSeconds}`;
};

const onPlayerReady = () => {
  let interval;
  let durationSec = player.getDuration();

  $(".player__duration-estimate").text(formatTime(durationSec));

  if (typeof interval !== "undefined") {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPercent = (completedSec / durationSec) * 100;

    $(".player__playback-button").css({
      left: `${completedPercent}%`
    });

    $(".player__duration-completed").text(formatTime(completedSec));
  }, 1000);
};

const eventsInit = () => {
  $(".player__start").on("click", e => {
    e.preventDefault();
    const btn = $(e.currentTarget);

    if (btn.hasClass("paused")) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });

  $(".player__playback").on("click", e => {
    const bar = $(e.currentTarget);
    const newButtonPosition = e.pageX - bar.offset().left;
    const buttonPosPercent = (newButtonPosition / bar.width()) * 100;
    const newPlayerTimeSec = (player.getDuration() / 100) * buttonPosPercent;

    $(".player__playback-button").css({
      left: `${buttonPosPercent}%`
    });

    player.seekTo(newPlayerTimeSec);
  });

  $(".player__splash").on("click", e => {
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
      $('.player__wrapper').addClass('active');
      playerButton.addClass("paused");
      break;
    case 2: 
      playerButton.removeClass("paused");
      break;
  }
};

function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    height: "405",
    width: "660",
    videoId: "zmg_jOwa9Fc",
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



// $(".main").onepage_scroll({
//     sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
//     easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
//                                      // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
//     animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
//     pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
//     updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
//     beforeMove: function(index) {},  // This option accepts a callback function. The function will be called before the page moves.
//     afterMove: function(index) {},   // This option accepts a callback function. The function will be called after the page moves.
//     loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
//     keyboard: true,                  // You can activate the keyboard controls
//     responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
//                                      // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
//                                      // the browser's width is less than 600, the fallback will kick in.
//     direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
//  });
