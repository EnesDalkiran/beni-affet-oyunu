// CONFIG
const CONFIG = {
    youtubeVideoId: 'G7VgtKp0sOM',
    acceptScaleIncrement: 0.12,
    maxAcceptScale: 2.2,
    numberOfHearts: 15,
  };
  
  let btnRunaway, btnAccept, tapOverlay, gameScreen, finalScreen;
  let acceptScale = 1;
  let youtubePlayer;
  let musicStarted = false;
  
  function init() {
    btnRunaway = document.getElementById('btn-runaway');
    btnAccept = document.getElementById('btn-accept');
    tapOverlay = document.getElementById('tap-overlay');
    gameScreen = document.getElementById('game-screen');
    finalScreen = document.getElementById('final-screen');
  
    createHearts();
    setupRunawayButton();
    setupAcceptButton();
    setupTapOverlay();
  }
  
  function createHearts() {
    const container = document.getElementById('hearts-container');
    const hearts = ['❤️','💖','💕'];
  
    for (let i = 0; i < CONFIG.numberOfHearts; i++) {
      const h = document.createElement('span');
      h.className = 'heart';
      h.textContent = hearts[i % hearts.length];
      h.style.left = Math.random() * 100 + '%';
      h.style.top = Math.random() * 100 + '%';
      h.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(h);
    }
  }
  
  function setupRunawayButton() {
    const container = btnRunaway.parentElement;
  
    function move() {
      const rect = container.getBoundingClientRect();
      const x = Math.random() * (rect.width - 120);
      const y = Math.random() * (rect.height - 50);
      btnRunaway.style.left = x + 'px';
      btnRunaway.style.top = y + 'px';
      growAcceptButton();
    }
  
    btnRunaway.addEventListener('mouseenter', move);
    btnRunaway.addEventListener('touchstart', (e) => {
      e.preventDefault();
      move();
    });
  
    btnRunaway.addEventListener('click', (e) => {
      e.preventDefault();
      move();
    });
  
    move();
  }
  
  function growAcceptButton() {
    acceptScale = Math.min(acceptScale + CONFIG.acceptScaleIncrement, CONFIG.maxAcceptScale);
    btnAccept.style.setProperty('--accept-scale', acceptScale);
  }
  
  function setupAcceptButton() {
    btnAccept.addEventListener('click', () => {
      gameScreen.classList.add('hidden');
      finalScreen.classList.remove('hidden');
    });
  }
  
  function setupTapOverlay() {
    tapOverlay.addEventListener('click', startMusicOnce);
    tapOverlay.addEventListener('touchstart', startMusicOnce);
  }
  
  function startMusicOnce() {
    if (musicStarted) return;
    musicStarted = true;
    tapOverlay.classList.add('hidden');
    if (youtubePlayer) youtubePlayer.playVideo();
  }
  
  // YouTube API
  function onYouTubeIframeAPIReady() {
    youtubePlayer = new YT.Player('youtube-player', {
      height: '1',
      width: '1',
      videoId: CONFIG.youtubeVideoId,
      playerVars: {
        autoplay: 0,
        loop: 1,
        playlist: CONFIG.youtubeVideoId
      }
    });
  }
  
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  
  document.addEventListener('DOMContentLoaded', init);
  