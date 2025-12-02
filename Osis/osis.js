document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('toggleBtn');
  const sidebar = document.getElementById('sidebar');

  toggleBtn.addEventListener('click', function() {
    sidebar.classList.toggle('open');
  });

  // Intersection Observer for animations
const observerOptions = {
  threshold: 0, // Trigger when the element enters the viewport
  rootMargin: '0px 0px -50px 0px' // Optional: adjust trigger point
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    } else{
      entry.target.classList.remove('animate')
    }
  });
}, observerOptions);
// Observe elements
const line = document.querySelector(".line");
const leftSection = document.querySelector('.left-section');
const rightSection = document.querySelector('.right-section');
const strukturSection = document.querySelector('.strukturSection');
if (leftSection) observer.observe(leftSection);
if (rightSection) observer.observe(rightSection);
if (strukturSection) observer.observe(strukturSection);
if (line) observer.observe(line)
});

const form = document.getElementById("form")

form.addEventListener("submit", (e) =>{
  e.preventDefault()
  const nomor = 6289521027851
  const text = document.getElementById('textBox').value
  if (text === ""){
    alert("isi terlebih dahulu!")
    return
  }
  const url = `https://wa.me/${nomor}?text=${encodeURIComponent(text)}`
  window.open(url,"_blank")
} )