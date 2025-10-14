// Animasi teks untuk home title
const text = document.getElementById("homeTitle");
const originalText = text.textContent;
text.textContent = ""; // Kosongkan dulu

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    text.innerHTML = "";
    // Buat span dan animasi saat terlihat
    originalText.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.animationDelay = `${index * 0.2}s`;
      span.style.animationIterationCount = "3";
      span.classList.add("textAnimation");
      text.appendChild(span);
    });
  }
});
observer.observe(text);

// Fungsi untuk menambah proyek baru
document.addEventListener('DOMContentLoaded', function() {
    const addProjectCard = document.querySelector('.add-project');
    const projectsContainer = document.getElementById('projects-container');
    
    // Event listener untuk tombol tambah proyek
    addProjectCard.addEventListener('click', function() {
        showAddProjectModal();
    });
    
    // Fungsi untuk menampilkan modal tambah proyek
    function showAddProjectModal() {
        // Buat modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        // Buat modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        modalContent.innerHTML = `
            <div class="modal-header">
                <h3>Tambah Proyek Baru</h3>
                <button class="close-modal">&times;</button>
            </div>
            <form id="add-project-form">
                <div class="form-group">
                    <label for="project-title">Judul Proyek:</label>
                    <input type="text" id="project-title" name="title" required>
                </div>
                
                <div class="form-group">
                    <label for="project-description">Deskripsi:</label>
                    <textarea id="project-description" name="description" rows="3" required></textarea>
                </div>
                
                <div class="form-group">
                    <label for="project-image">Gambar Proyek:</label>
                    <div class="image-input-container">
                        <input type="file" id="project-image" name="image" accept="image/*" style="display: none;">
                        <button type="button" class="btn-select-image" onclick="document.getElementById('project-image').click()">
                            📁 Pilih Gambar dari Komputer
                        </button>
                        <input type="url" id="project-image-url" name="imageUrl" placeholder="Atau masukkan URL gambar" style="margin-top: 0.5rem;">
                    </div>
                    <div class="image-preview" id="image-preview" style="display: none;">
                        <img id="preview-img" src="" alt="Preview" style="max-width: 100%; max-height: 150px; border-radius: 8px; margin-top: 0.5rem;">
                        <button type="button" class="btn-remove-image" onclick="removeImagePreview()">❌ Hapus</button>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="project-tech">Teknologi (pisahkan dengan koma):</label>
                    <input type="text" id="project-tech" name="tech" placeholder="HTML, CSS, JavaScript">
                </div>
                
                <div class="form-buttons">
                    <button type="button" class="btn-cancel">Batal</button>
                    <button type="submit" class="btn-submit">Tambah Proyek</button>
                </div>
            </form>
        `;
        
        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);
        
        // Event listeners untuk modal
        const closeBtn = modalContent.querySelector('.close-modal');
        const cancelBtn = modalContent.querySelector('.btn-cancel');
        const form = modalContent.querySelector('#add-project-form');
        const fileInput = modalContent.querySelector('#project-image');
        const urlInput = modalContent.querySelector('#project-image-url');
        
        // Event listener untuk file input
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    showImagePreview(e.target.result, file.name);
                };
                reader.readAsDataURL(file);
                // Clear URL input jika file dipilih
                urlInput.value = '';
            }
        });
        
        // Event listener untuk URL input
        urlInput.addEventListener('input', function(e) {
            const url = e.target.value.trim();
            if (url) {
                showImagePreview(url, 'URL Image');
                // Clear file input jika URL dimasukkan
                fileInput.value = '';
            } else {
                hideImagePreview();
            }
        });
        
        // Tutup modal
        function closeModal() {
            document.body.removeChild(modalOverlay);
        }
        
        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
        
        // Submit form
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            // Ambil gambar dari file atau URL
            const imageFile = formData.get('image');
            const imageUrl = formData.get('imageUrl');
            let finalImageSrc = '../../FILE_Random/wpp.jpeg'; // default image
            
            if (imageFile && imageFile.size > 0) {
                // Jika ada file yang dipilih, buat URL object
                finalImageSrc = URL.createObjectURL(imageFile);
            } else if (imageUrl && imageUrl.trim()) {
                // Jika ada URL yang dimasukkan
                finalImageSrc = imageUrl.trim();
            }
            
            const projectData = {
                title: formData.get('title'),
                description: formData.get('description'),
                image: finalImageSrc,
                tech: formData.get('tech').split(',').map(t => t.trim()).filter(t => t)
            };
            
            addNewProject(projectData);
            closeModal();
        });
    }
    
    // Fungsi untuk menambah proyek baru ke container
    function addNewProject(projectData) {
        const newProjectCard = document.createElement('div');
        newProjectCard.className = 'project-card';
        
        // Buat tech tags HTML
        const techTagsHTML = projectData.tech.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        newProjectCard.innerHTML = `
            <img src="${projectData.image}" alt="${projectData.title}" class="project-image" loading="lazy">
            <div class="project-info">
                <h5 class="project-title">${projectData.title}</h5>
                <p class="project-description">${projectData.description}</p>
                <div class="project-tech">
                    ${techTagsHTML}
                </div>
            </div>
        `;
        
        // Tambahkan sebelum tombol add-project
        projectsContainer.insertBefore(newProjectCard, addProjectCard);
        
        // Animasi fade in
        newProjectCard.style.opacity = '0';
        newProjectCard.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            newProjectCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            newProjectCard.style.opacity = '1';
            newProjectCard.style.transform = 'translateY(0)';
        }, 100);
        
        // Tampilkan notifikasi sukses
        showNotification('Proyek berhasil ditambahkan!', 'success');
    }
    
    // Fungsi untuk menampilkan notifikasi
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animasi masuk
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Hapus setelah 3 detik
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Fungsi untuk menampilkan preview gambar
    window.showImagePreview = function(src, name) {
        const preview = document.getElementById('image-preview');
        const previewImg = document.getElementById('preview-img');
        
        if (preview && previewImg) {
            previewImg.src = src;
            previewImg.alt = name;
            preview.style.display = 'block';
        }
    }
    
    // Fungsi untuk menghapus preview gambar
    window.removeImagePreview = function() {
        const preview = document.getElementById('image-preview');
        const fileInput = document.getElementById('project-image');
        const urlInput = document.getElementById('project-image-url');
        
        if (preview) {
            preview.style.display = 'none';
        }
        if (fileInput) {
            fileInput.value = '';
        }
        if (urlInput) {
            urlInput.value = '';
        }
    }
    
    // Fungsi untuk menyembunyikan preview gambar
    function hideImagePreview() {
        const preview = document.getElementById('image-preview');
        if (preview) {
            preview.style.display = 'none';
        }
    }
});

