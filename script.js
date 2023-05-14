var backgroundVideo = document.getElementById('background-video');

function handleVisibilityChange() {
  if (document.hidden) {
    backgroundVideo.pause();
  } else {
    backgroundVideo.play();
  }
}

document.addEventListener('visibilitychange', handleVisibilityChange);