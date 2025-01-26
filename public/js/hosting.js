const decrease = document.querySelectorAll(".hosting-floor-decrease");
const increase = document.querySelectorAll(".hosting-floor-increase");
const imageUploadBtn = document.querySelector(".hosting-photos-input-container button");
const nextbtn = document.querySelector(".btn-class-name");

decrease.forEach(item => {
    item.addEventListener("click", () => {
        const number = item.nextElementSibling;
        let numberData = parseInt(number.textContent);
        const newData = numberData - 1;
        if(newData > 0 ) {
            number.textContent = newData;
        } 
        else {
            number.textContent = "0";
            item.style.display = "none";
        }
    });
});

increase.forEach(item => {
    item.addEventListener("click", () => {
        const number = item.previousElementSibling;
        let numberData = parseInt(number.textContent);
        const newData = numberData + 1;
        if(newData > 0) {
            number.previousElementSibling.style.display = "flex";
            number.textContent = newData;
        } else if(newData < 17 && newData < 0) {
            number.textContent = "16";
        }
    });
});

// Upload Photos

if(imageUploadBtn) {
    nextbtn.style.backgroundColor = "rgba(17, 93, 252, 0.5)";
    nextbtn.style.border = "2px solid rgba(17, 93, 252, 0)";
    nextbtn.disabled = true;
}

if(imageUploadBtn) {
    imageUploadBtn.addEventListener("click", () => {
        imageUploadBtn.classList.add("animate__pulse");
    
        setTimeout(() => {
            Swal.fire({
    
                showClass: {
                    popup: `
                      animate__animated
                      animate__fadeInUp
                    `
                  },
                  hideClass: {
                    popup: `
                      animate__animated
                      animate__fadeOutDown
                    `
                  },
        
                html: ` 
                <form class="form_container">
                    <div class="title_container">
                        <div>
                            <p class="title">Upload photos</p>
                            <span class="subtitle">No items selected</span>
                        </div>
                        <i class="fa-solid fa-xmark"></i>
                        <i class="fa-solid fa-plus"></i>
                    </div>
                    <br>
                    <div class="input_container">
                        <div class="controls-container">
                            <img src="/resources/photos-vector.png">
                            <span>Drag and drop</span>
                            <p>or browse for photos</p>
                            <button title="Browse" class="browse_btn animate__animated">
                                <span style="display: flex; justify-content: center;">Browse</span>
                            </button>
                            <input type="file" id="fileInput" class="file_input" style="display: none;" accept="image/*" multiple>
                        </div>
                    </div>
                    <div class="ruler"></div>
                    <button title="Upload" type="submit" class="upload_btn">
                        <span style="display: flex; justify-content: center;">Upload</span>
                    </button>
                </form>
                `,
        
                showConfirmButton: false, 
                didOpen: () => {
                    document.querySelector('.fa-xmark').addEventListener('click', function() {
                        Swal.close(); 
                        imageUploadBtn.classList.remove("animate__pulse");
                        browsebtn.classList.remove("animate__pulse");
                    });
                },
                willOpen: () => {
                    const uploadbtn = document.querySelector(".upload_btn");
                    const browsebtn = document.querySelector(".browse_btn");
                    const fileInput = document.getElementById("fileInput");
                    const addphotos = document.querySelector(".fa-plus");
                    const inputContainer = document.querySelector(".input_container");
                    const subtitle = document.querySelector('.subtitle');
                
                    // Ensure file input allows multiple files
                    fileInput.setAttribute('multiple', 'true');
                
                    // Initially disable the upload button if no files are selected
                    if (fileInput.files.length > 0) {
                        console.log(fileInput.files);
                    } else {
                        uploadbtn.style.backgroundColor = "rgba(17, 93, 252, 0.5)";
                        uploadbtn.disabled = true;
    
                    }
                
                    // Function to handle files and update the UI
                    function getImageContainerCount() {
                        const imageContainers = document.querySelectorAll('.input_container > div');
                        return imageContainers.length;
                    }
    
                    function handleFiles(files) {
                        const dataTransfer = new DataTransfer();
                        const inputContainer = document.querySelector('.input_container');
                        const controlsContainer = document.querySelector('.controls-container');
                        const ruler = document.querySelector('.ruler');
                    
                        // Clear the inputContainer but not the data transfer
                        controlsContainer.style.display = "none";
                    
                        // Hide controls container when images are added
                        controlsContainer.style.display = 'none';
                        inputContainer.style.maxHeight = "29rem";
                        inputContainer.style.width = "100%";
                        ruler.style.marginTop = "0.5rem";
                        inputContainer.style.flexWrap = "wrap";
                        inputContainer.style.marginTop= "1rem";
    
                        inputContainer.style.display = "flex";
                        inputContainer.style.justifyContent = "space-evenly";
                        inputContainer.style.gap = "0.5rem";
                        document.querySelector(".swal2-html-container").style.padding = "18px 1.1rem 5.4px 1.1rem";
                        inputContainer.style.alignItems = "cover";
                    
                        // Display uploaded images
                        Array.from(files).forEach((file, index) => {
                            // Add each file to the DataTransfer object
                            dataTransfer.items.add(file);
                    
                            // Create a container for the image and delete icon
                            const imageContainer = document.createElement('div');
                            imageContainer.style.position = 'relative'; 
                    
                            const imgElement = document.createElement('img');
                            imgElement.src = URL.createObjectURL(file);
                            imgElement.className = 'uploaded-image';
                            imgElement.style.width = '228px';
                            imgElement.style.height = '223px';
                            imgElement.style.borderRadius = "0.8rem";
                            imgElement.style.objectFit = 'cover';
                    
                            // Create delete icon
                            const deleteIcon = document.createElement('i');
                            deleteIcon.className = 'fa-solid fa-trash delete-icon';
                            deleteIcon.style.position = 'absolute';
                            deleteIcon.style.top = '0.5rem';
                            deleteIcon.style.right = '0.5rem';
                            deleteIcon.style.cursor = 'pointer';
                            deleteIcon.style.transform = 'scale(0.85)';
                            deleteIcon.style.transition = "all 0.3s ease";
                    
                            deleteIcon.addEventListener("mouseover", () => {
                                deleteIcon.style.transform = "scale(1)";
                            });
                            deleteIcon.addEventListener("mouseout", () => {
                                deleteIcon.style.transform = "scale(0.85)";
                            });
                    
                            // Add click event to delete icon
                            deleteIcon.addEventListener('click', () => {
                                imageContainer.remove();
                    
                                dataTransfer.items.remove(index);
                                fileInput.files = dataTransfer.files;
                    
                                // Update the subtitle
                                const imageContainerCount = getImageContainerCount() - 1;
    
                        // Update subtitle
                                subtitle.textContent = imageContainerCount === 1 
                                    ? `1 item selected` 
                                    : `${imageContainerCount} items selected`;
                    
                                // If there are no files left, show the controls again
                                if (imageContainerCount === 0) {
                                    controlsContainer.style.display = 'flex';
                                    subtitle.textContent = 'No items selected';
                                    uploadbtn.style.backgroundColor = "rgba(17, 93, 252, 0.5)";
                                    uploadbtn.disabled = true;
                                    inputContainer.style.marginTop= "";
                                    inputContainer.style.marginBottom = "";
                                    inputContainer.style.display = "";
                                }
                            });
                    
                            // Append the image and delete icon to the container
                            imageContainer.appendChild(imgElement);
                            imageContainer.appendChild(deleteIcon);
                    
                            // Append the container to the input container
                            inputContainer.appendChild(imageContainer);
                        });
                    
                        // Update file input with the DataTransfer's files
                        fileInput.files = dataTransfer.files;
                    
                        const imageContainerCount = getImageContainerCount() - 1;
    
                        // Update subtitle
                        subtitle.textContent = imageContainerCount === 1 
                            ? `1 item selected` 
                            : `${imageContainerCount} items selected`;
                    
                        // Enable upload button if there are files
                        if (dataTransfer.files.length > 0) {
                            uploadbtn.style.backgroundColor = "#115DFC";
                            uploadbtn.disabled = false;
                        } else {
                            controlsContainer.style.display = 'block';
                            uploadbtn.disabled = true;
                        }
                    }                                              
                    
                    // Handle drag-and-drop event
                    inputContainer.addEventListener('dragover', (e) => {
                        e.preventDefault();
                        inputContainer.classList.add('dragover');
                    });
    
                    inputContainer.addEventListener('drop', (e) => {
                        e.preventDefault();
                        inputContainer.classList.remove('dragover');
                    
                        const files = e.dataTransfer.files;
                    
                        if (files.length > 0) {
                            handleFiles(files);
                        }
                    });
                
                    inputContainer.addEventListener('dragleave', () => {
                        inputContainer.classList.remove('dragover');
                    });
                    
                    // Handle file selection via browse button
                    fileInput.addEventListener('change', (e) => {
                        const newFiles = e.target.files;
                    
                        if (newFiles.length > 0) {
                            handleFiles(newFiles);
                        }
                    });
                
                    // Handle the "Browse" button click to trigger file input
                    browsebtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        browsebtn.classList.add("animate__pulse");
                        fileInput.click(); 
                    });
    
                    addphotos.addEventListener("click", (e) => {
                        e.preventDefault();
                        fileInput.click();
                    });
                
                
                    // Handle the "Upload" button click (placeholder for actual upload logic)
                    uploadbtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        if (fileInput.files.length > 0) {
                            console.log('Files ready for upload:', fileInput.files);
                            // Add your file upload logic here (e.g., send files to the server)
                        } else {
                            Swal.fire('Please select some files to upload.');
                        }
                    });
                },            
            });
        }, 50); 
    });
}

document.addEventListener('click', function(event) {
    const popup = document.querySelector('.swal2-popup');

    if (popup && !popup.contains(event.target)) {
        if(imageUploadBtn) {
            imageUploadBtn.classList.remove("animate__pulse");
        }
    }
});



