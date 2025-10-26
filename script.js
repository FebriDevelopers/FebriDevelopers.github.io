//scroll function
const slide = document.querySelector('.dokumentasi-slide');

slide.addEventListener('wheel', (e) => {
  e.preventDefault(); // cegah scroll vertikal
  slide.scrollLeft += e.deltaY; // ubah scroll ke horizontal
});

// fullscreen image
let currentIndex = 0;
const images = [
  "./img/dokumentasi osis/osis1.jpeg",
  "./img/dokumentasi osis/osis2.jpeg",
  "./img/dokumentasi osis/osis3.jpeg",
  "./img/dokumentasi osis/osis4.jpeg",
  "./img/dokumentasi osis/osis5.jpeg",
  "./img/dokumentasi osis/osis6.jpeg",
  "./img/dokumentasi osis/osis7.jpeg",
  "./img/dokumentasi osis/osis8.jpeg",
  "./img/dokumentasi osis/osis12.jpeg",
  "./img/dokumentasi osis/osis13.jpeg",
  "./img/dokumentasi osis/osis14.jpeg",
  "./img/dokumentasi osis/osis15.jpeg",
  "./img/dokumentasi osis/osis9.jpeg",
  "./img/dokumentasi osis/osis10.jpeg",
  "./img/dokumentasi osis/osis11.jpeg",
  "./img/dokumentasi osis/osis15.jpeg",
  "./img/dokumentasi osis/osis15.jpeg",
  "./img/dokumentasi osis/osis15.jpeg"
];

function openImage(index) {
  currentIndex = index - 1;
  const container = document.querySelector(".shadow");
  const foto = document.querySelector('.foto-temp');
  const alamat = document.getElementById("index");
  container.style.display = "flex";
  foto.src = images[currentIndex];
  alamat.textContent = `${currentIndex + 1}/${images.length}`;
}

function nextImg() {
  currentIndex = (currentIndex + 1) % images.length;
  openImage(currentIndex + 1);
}

function prevImg() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  openImage(currentIndex + 1);
}

function download() {
  const link = document.createElement('a');
  link.href = images[currentIndex];
  link.download = `image-${currentIndex + 1}.jpeg`;
  link.click();
}

function closeWin() {
  const content = document.querySelector(".shadow");
  content.style.display = "none";
}
