/* ===== Starfield ===== */
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

/* ===== Star Factory ===== */
const STAR_COUNT = 2500;
const stars = [];

function createStar() {
  const typeRoll = Math.random();

  let speed, size, trail;

  if (typeRoll < 0.55) {
    // Dust
    speed = Math.random() * 0.3 + 0.1;
    size = Math.random() * 1.2 + 0.3;
    trail = false;
  } else if (typeRoll < 0.8) {
    // Normal
    speed = Math.random() * 0.8 + 0.4;
    size = Math.random() * 1.8 + 0.8;
    trail = false;
  } else if (typeRoll < 0.95) {
    // Giant
    speed = Math.random() * 0.4 + 0.2;
    size = Math.random() * 2.5 + 2;
    trail = false;
  } else {
    // Warp star
    speed = Math.random() * 4 + 3;
    size = Math.random() * 1.5 + 1;
    trail = true;
  }

  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speed,
    size,
    trail,
    alpha: Math.random() * 0.8 + 0.2
  };
}

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push(createStar());
}

/* ===== Animation ===== */
function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    ctx.globalAlpha = star.alpha;
    ctx.fillStyle = '#f59e0b';

    if (star.trail) {
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
      ctx.lineWidth = star.size;
      ctx.beginPath();
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(star.x - star.speed * 6, star.y);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();

    star.x += star.speed;

    if (star.x > canvas.width + 50) {
      Object.assign(star, createStar(), { x: -50 });
    }
  });

  requestAnimationFrame(animateStars);
}

animateStars();


/* ===== Tabs ===== */
document.querySelectorAll('.tab').forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  };
});


/* ===== Fake Proxy Launcher (Styled) ===== */
function openProxy() {
    const url = prompt('Enter URL (https://...)');
    if (!url) return;
  
    const proxy = 'https://api.codetabs.com/v1/proxy?quest=';
    const proxiedURL = proxy + encodeURIComponent(url);
  
    if (document.getElementById('proxy-overlay')) return;
  
    const overlay = document.createElement('div');
    overlay.id = 'proxy-overlay';
  
    const bar = document.createElement('div');
    bar.className = 'proxy-bar';
  
    const title = document.createElement('div');
    title.className = 'proxy-title';
    title.textContent = 'V0ID-EXP :: Proxy Mode';
  
    const exit = document.createElement('button');
    exit.className = 'proxy-exit';
    exit.textContent = 'Exit';
  
    exit.onclick = () => overlay.remove();
  
    bar.appendChild(title);
    bar.appendChild(exit);
  
    const iframe = document.createElement('iframe');
    iframe.id = 'proxy-frame';
    iframe.src = proxiedURL;
  
    overlay.appendChild(bar);
    overlay.appendChild(iframe);
    document.body.appendChild(overlay);
  }
  

/* ===== Game Loader ===== */
function openGame(url) {
    // Prevent double loading
    if (document.getElementById('game-frame')) return;
  
    const overlay = document.createElement('div');
    overlay.id = 'game-overlay';
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: black;
      z-index: 9999;
    `;
  
    const iframe = document.createElement('iframe');
    iframe.id = 'game-frame';
    iframe.src = url;
    iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
    `;
  
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
      position: fixed;
      top: 16px;
      right: 20px;
      z-index: 10000;
      background: rgba(0,0,0,0.6);
      color: #ffb347;
      border: 1px solid #ff9800;
      border-radius: 50%;
      width: 42px;
      height: 42px;
      font-size: 18px;
      cursor: pointer;
    `;
  
    closeBtn.onclick = () => {
      overlay.remove();
    };
  
    overlay.appendChild(iframe);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
  }
  