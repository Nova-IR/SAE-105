const form = document.getElementById("albumForm");
const previewContainer = document.getElementById("preview-album");

document.getElementById("previewButton").addEventListener("click", function() {
    const imageInput = document.getElementById("image");
    const lien = document.getElementById("lien").value;
    const audio = document.getElementById("audio").value;
    const description = document.getElementById("description").value;
    const texte = document.getElementById("texte").value;

    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const newAlbum = {
                src: e.target.result,
                description: description,
                texte: texte,
                lien: lien,
                audio: audio
            };

            const img = document.createElement("img");
            img.src = newAlbum.src;
            img.alt = newAlbum.description;

            const a = document.createElement("a");
            a.href = newAlbum.lien;
            a.target = "_blank";

            const audioButton = document.createElement("button");
            let currentAudio = null;
            audioButton.addEventListener("click", () => {
                if (currentAudio) {
                    currentAudio.pause();
                    currentAudio.currentTime = 0;
                }
                currentAudio = new Audio(newAlbum.audio);
                currentAudio.play();
            });

            const descriptionP = document.createElement("p");
            descriptionP.textContent = newAlbum.description;

            const texteP = document.createElement("p");
            texteP.textContent = newAlbum.texte;

            const div = document.createElement("div");
            div.className = "bloc-album";
            div.appendChild(img);
            div.appendChild(audioButton);
            div.appendChild(descriptionP);
            div.appendChild(texteP);

            previewContainer.innerHTML = '';
            previewContainer.appendChild(div);

            form.reset();
        }

        reader.readAsDataURL(imageInput.files[0]);
    } else {
        alert("Veuillez sélectionner une image.");
    }
});