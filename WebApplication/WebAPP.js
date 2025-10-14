function darkMode(){
    document.body.classList.toggle("darkMode");
    document.querySelector("header").classList.toggle("darkMode");
    const dropdownContents = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdownContents.length; i++) {
        dropdownContents[i].classList.toggle("darkMode");
    }
    const dropbtns = document.getElementsByClassName("dropbtn");
    for (let i = 0; i < dropbtns.length; i++) {
        dropbtns[i].classList.toggle("darkMode");
    }
    document.getElementsByClassName("help")[0].classList.toggle("darkMode");    
    document.getElementsByClassName("close")[0].classList.toggle("darkMode");
    document.getElementsByClassName("paragraph")[0].classList.toggle("darkMode");
    document.getElementsByClassName("nameFile")[0].classList.toggle("darkMode");
    document.querySelector("footer").classList.toggle("darkMode");
}

// name file
function createFile(){
    const fileName = document.getElementById("inputNameFile").value;
    if (fileName === "") {
        alert("Please enter a file name.");
        return;
    } else if(fileName.includes(" ")){
        alert("File name cannot contain a space.");
        return;
    }

    const titleFile =document.getElementById("nameFile");
    titleFile.textContent = fileName;
    document.querySelector(".nameContainer").classList.toggle("close");
}
//save
function saveFile(){
    const titleFile =document.getElementById("nameFile");
    const text = document.querySelector("textarea");
    const blob = new Blob([text.value], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = titleFile.textContent;
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);    
    URL.revokeObjectURL(url);
}
function help() {
    document.querySelector(".helpContainer").classList.toggle("show");
}

function helpClose() {
    document.querySelector(".helpContainer").classList.remove("show");
}
// animasi
function animasiTitleHelp(){
    const title = document.getElementById("title");
    const word =title.textContent.split("")
    title.textContent = "";
    word.forEach((char,index)=>{
        const span = document.createElement("span");
        span.textContent = char;
        span.style.animationDelay = `${index * 0.2}s`;
        span.classList.add("textAnimation");
        title.appendChild(span);
    })
}
animasiTitleHelp()
// Fungsi untuk membuka popup modal Save As File
function saveAs() {
    const modal = document.getElementById('saveAsModal');
    modal.style.display = 'flex';
    
    // Focus pada input nama file
    setTimeout(() => {
        document.getElementById('fileName').focus();
    }, 100);
}

// Fungsi untuk menutup popup modal
function closeSaveAsModal() {
    const modal = document.getElementById('saveAsModal');
    modal.style.display = 'none';
    
    // Reset form
    document.getElementById('fileName').value = '';
    document.getElementById('fileType').value = '.txt';
    document.getElementById('fileDescription').value = '';
}

// Fungsi untuk menyimpan file dari modal
function saveFileAs() {
    const fileName = document.getElementById('fileName').value.trim();
    const fileType = document.getElementById('fileType').value;
    const description = document.getElementById('fileDescription').value.trim();
    
    // Validasi input
    if (!fileName) {
        alert('❌ Silakan masukkan nama file!');
        document.getElementById('fileName').focus();
        return;
    }
    
    // Ambil konten dari textarea
    const textArea = document.getElementById('text');
    let content = textArea.value;
    
    // Tambahkan deskripsi jika ada
    if (description) {
        const descriptionHeader = `/*\n * File: ${fileName}${fileType}\n * Deskripsi: ${description}\n * Dibuat: ${new Date().toLocaleString('id-ID')}\n */\n\n`;
        content = descriptionHeader + content;
    }
    
    // Tentukan MIME type berdasarkan ekstensi file
    let mimeType = 'text/plain';
    switch (fileType) {
        case '.html':
            mimeType = 'text/html';
            break;
        case '.css':
            mimeType = 'text/css';
            break;
        case '.js':
            mimeType = 'application/javascript';
            break;
        case '.json':
            mimeType = 'application/json';
            break;
        case '.py':
            mimeType = 'text/x-python';
            break;
        case '.md':
            mimeType = 'text/markdown';
            break;
        default:
            mimeType = 'text/plain';
    }
    
    // Buat dan download file
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}${fileType}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Tampilkan notifikasi sukses
    alert(`✅ File "${fileName}${fileType}" berhasil disimpan!`);
    
    // Tutup modal
    closeSaveAsModal();
}

// Event listener untuk menutup modal dengan ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('saveAsModal');
        if (modal && modal.style.display === 'flex') {
            closeSaveAsModal();
        }
    }
});

// Event listener untuk menutup modal dengan klik di luar
document.addEventListener('click', function(event) {
    const modal = document.getElementById('saveAsModal');
    if (event.target === modal) {
        closeSaveAsModal();
    }
});

function lightMode(){
    const elemen = document.querySelectorAll(".darkMode");
    elemen.forEach(element => {
        element.classList.remove("darkMode");
    });
}
// Animasi untuk title2 (Contact Me)
window.addEventListener('DOMContentLoaded', function() {
    const title2 = document.getElementById("title2");
    if (title2) {
        const word1 = title2.textContent.split("");
        title2.textContent = "";
        word1.forEach((char, index) => {
            const span = document.createElement("span");
            span.textContent = char;
            span.style.animationDelay = `${index * 0.2}s`;
            span.classList.add("textAnimation");
            title2.appendChild(span);
        });
    }
});


function closeHelp() {
    const helpModal = document.getElementById('helpModal');
    helpModal.style.display = 'none';
}
function credit(){
    window.location = "Credit.html";
}
function exit(){
    const confirmClose = confirm("Are you sure you want to close this application?");
    if (confirmClose === true) {
        window.open("https://www.google.com", "_blank");
        window.close();
    }else{
        return;
    }
}
function newFile(){
    window.location.reload();
}
// Open File function
function openFile(){
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".txt";
    fileInput.click();
    fileInput.addEventListener("change", function(e){
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e){
                const text = e.target.result;
                const textArea = document.getElementById("text");
                const nameFile = document.getElementById("nameFile");
                nameFile.textContent = file.name;
                textArea.value = text;
            };
            reader.readAsText(file);
        }
    });
}