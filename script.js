const text = document.getElementById("text")
const word = text.textContent;
text.innerHTML = ""
word.split("").forEach((char,index) => {
  const span = document.createElement("span")
  span.textContent = char
  span.classList.add("span")
  span.style.textTransform = "uppercase"
  span.style.animationDelay = `${index * 0.3}s`
  console.log(span)
  text.appendChild(span)
})