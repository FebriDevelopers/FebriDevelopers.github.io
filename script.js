const slide = document.querySelector('.dokumentasi-slide');

slide.addEventListener('wheel', (e) => {
  e.preventDefault(); // cegah scroll vertikal
  slide.scrollLeft += e.deltaY; // ubah scroll ke horizontal
});
