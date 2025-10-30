document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('toggleBtn');
  const sidebar = document.getElementById('sidebar');

  toggleBtn.addEventListener('click', function() {
    sidebar.classList.toggle('open');
  });
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