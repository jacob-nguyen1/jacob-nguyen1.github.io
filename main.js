// Click-to-load YouTube: keeps the page light until someone actually wants the video.
document.querySelectorAll(".yt").forEach((btn) => {
  btn.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${btn.dataset.id}?autoplay=1`;
    iframe.allow = "autoplay; encrypted-media; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.title = "SwampRise demo";
    btn.replaceWith(iframe);
  });
});

// Lightbox for photos and the schematic.
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
