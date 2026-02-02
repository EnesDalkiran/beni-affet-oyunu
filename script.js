// CONFIG
const CONFIG = {
  youtubeVideoId: 'G7VgtKp0sOM',
  acceptScaleIncrement: 0.12,
  maxAcceptScale: 2.2,
  numberOfHearts: 15,
};

let btnRunaway, btnAccept, tapOverlay, gameScreen, finalScreen;
let acceptScale = 1;
let youtubePlayer = null;
let musicStarted = false;

document.addEventListener('DOMContentLoaded', () => {
  btnRunaway = document.getElementById('btn-runaway');
  btnAccept = document.getElementById('btn-accept');
  tapOverlay = document.getElementById('tap-overlay');
  gameScreen = document.getElementById('game-screen');
  finalScreen = document.getElementById('final-screen');

  createHearts();
  setupTapOverlay();
  setupRunawayButton();
  setupAcceptButton();
});

// ❤️ HEARTS
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

// 🏃‍♂️ KAÇAN BUTON
function setupRunawayButton() {
  const container = btnRunaway.parentElement;

  function move() {
    const rect = container.getBoundingClientRect();
    const x = Math.random() * (rect.width - btnRunaway.offsetWidth);
    const y = Math.random() * (rect.height - btnRunaway.offsetHeight);
    btnRunaway.style.left = x + 'px';
    btnRunaway.style.top = y + 'px';
    growAcceptButton();
  }

  btnRunaway.addEventListener('mouseenter', move);
  btnRunaway.addEventListener('click', (e) => {
    e.preventDefault();
    move();
  });

  move();
}

// ❤️ BÜYÜYEN AFFEDİYORUM
function growAcceptButton() {
  acceptScale = Math.min(
    acceptScale + CONFIG.acceptScaleIncrement,
    CONFIG.maxAcceptScale
  );
  btnAccept.style.transform = `translateX(-50%) scale(${acceptScale})`;
}

// ✅ AFFEDİYORUM
function setupAcceptButton() {
  btnAccept.addEventListener('click', () => {
    gameScreen.classList.add('hidden');
    finalScreen.classList.remove('hidden');
  });
}

// 👆 İLK DOKUNUŞ
function setupTapOverlay() {
  tapOverlay.addEventListener('click', startGame, { once: true });
  tapOverlay.addEventListener('touchstart', startGame, { once: true });
}

function startGame() {
  if (musicStarted) return;
  musicStarted = true;

  // overlay TAMAMEN devre dışı
  tapOverlay.style.display = 'none';
  tapOverlay.style.pointerEvents = 'none';

  if (youtubePlayer) {
    youtubePlayer.playVideo();
  }
}

// 🎵 YOUTUBE API
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
