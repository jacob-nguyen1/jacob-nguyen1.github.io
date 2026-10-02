const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Click-to-load YouTube so the page doesn't pull in YouTube until someone wants the video.
document.querySelectorAll(".yt").forEach((btn) => {
  btn.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${btn.dataset.id}?autoplay=1`;
    iframe.allow = "autoplay; encrypted-media; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.title = "Demo video";
    btn.replaceWith(iframe);
  });
});

// Click a photo to see it full size.
const box = document.getElementById("lightbox");
const boxImg = box.querySelector("img");
document.querySelectorAll(".zoom").forEach((el) => {
  el.addEventListener("click", () => {
    boxImg.src = el.dataset.full;
    boxImg.alt = el.querySelector("img")?.alt || "";
    box.showModal();
  });
});
box.addEventListener("click", () => box.close());

// Little Pong game on the FPGA card: both paddles chase the ball.
document.querySelectorAll("canvas.pong").forEach((cv) => {
  const ctx = cv.getContext("2d");
  let w, h, ball, left, right;
  const PADDLE_H = 0.26, PADDLE_W = 8, BALL = 9, MARGIN = 22;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    w = cv.clientWidth; h = cv.clientHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function reset() {
    ball = { x: w / 2, y: h / 2, vx: 3.2, vy: 2.1 };
    left = right = h / 2;
  }
  function step() {
    ball.x += ball.vx; ball.y += ball.vy;
    if (ball.y < BALL / 2 || ball.y > h - BALL / 2) ball.vy *= -1;
    const ph = h * PADDLE_H;
    if (ball.x < MARGIN + PADDLE_W + BALL / 2 && ball.vx < 0) { ball.vx *= -1; ball.vy += (ball.y - left) / ph * 1.5; }
    if (ball.x > w - MARGIN - PADDLE_W - BALL / 2 && ball.vx > 0) { ball.vx *= -1; ball.vy += (ball.y - right) / ph * 1.5; }
    ball.vy = Math.max(-3.5, Math.min(3.5, ball.vy));
    // Paddles track the ball with a speed cap, so it looks like play rather than a lock.
    const chase = (p, active) => p + Math.max(-2.6, Math.min(2.6, ((active ? ball.y : h / 2) - p) * 0.12));
    left = chase(left, ball.vx < 0);
    right = chase(right, ball.vx > 0);
  }
  function draw() {
    const css = getComputedStyle(document.documentElement);
    const accent = css.getPropertyValue("--accent").trim();
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    for (let y = 8; y < h; y += 18) ctx.fillRect(w / 2 - 1.5, y, 3, 10);
    const ph = h * PADDLE_H;
    ctx.fillStyle = "#e8edf4";
    ctx.fillRect(MARGIN, left - ph / 2, PADDLE_W, ph);
    ctx.fillRect(w - MARGIN - PADDLE_W, right - ph / 2, PADDLE_W, ph);
    ctx.fillStyle = accent;
    ctx.fillRect(ball.x - BALL / 2, ball.y - BALL / 2, BALL, BALL);
  }
  function loop() { step(); draw(); requestAnimationFrame(loop); }

  resize(); reset(); draw();
  window.addEventListener("resize", () => { resize(); reset(); draw(); });
  if (!reduceMotion) requestAnimationFrame(loop);
});
