document.querySelector("#year").textContent = new Date().getFullYear().toString();

const photos = Array.from(document.querySelectorAll(".memory-photo"));
const lightbox = document.querySelector("#memory-lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("figcaption");
let activePhotoIndex = 0;

function showPhoto(index) {
  activePhotoIndex = (index + photos.length) % photos.length;
  const photo = photos[activePhotoIndex];
  const sourceImage = photo.querySelector("img");
  lightboxImage.src = sourceImage.src;
  lightboxImage.alt = sourceImage.alt;
  lightboxCaption.textContent = `${String(activePhotoIndex + 1).padStart(3, "0")} · ${photo.dataset.caption}`;
  if (!lightbox.open) lightbox.showModal();
}

photos.forEach((photo, index) => photo.addEventListener("click", () => showPhoto(index)));

lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.querySelector(".lightbox-prev").addEventListener("click", () => showPhoto(activePhotoIndex - 1));
lightbox.querySelector(".lightbox-next").addEventListener("click", () => showPhoto(activePhotoIndex + 1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.open) return;
  if (event.key === "ArrowLeft") showPhoto(activePhotoIndex - 1);
  if (event.key === "ArrowRight") showPhoto(activePhotoIndex + 1);
});
