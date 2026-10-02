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
