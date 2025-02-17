const container = document.getElementById("album-container");

let currentAudio = null;

listeImages.forEach(imageData => {
    const img = document.createElement("img");
    img.src = imageData.src;
    img.alt = imageData.description;

    const a = document.createElement("a");
    a.href = imageData.lien;
    a.target = "_blank";

    const audioButton = document.createElement("button");

    audioButton.addEventListener("click", () => {
        if (currentAudio && currentAudio.src === imageData.audio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        } else {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
            currentAudio = new Audio(imageData.audio);
            currentAudio.play();
        }
    });

    const description = document.createElement("p");
    description.textContent = imageData.description;

    const texte = document.createElement("p");
    texte.textContent = imageData.texte;

    const div = document.createElement("div");
    div.className = "bloc-album";
    div.appendChild(img);
    div.appendChild(audioButton);
    div.appendChild(description);
    div.appendChild(texte);

    a.appendChild(img);

    container.appendChild(a);
    container.appendChild(div);

    img.addEventListener("mousemove", (e) => {
        const rect = img.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = (offsetX - centerX) / centerX;
        const deltaY = (offsetY - centerY) / centerY;

        img.style.transform = `rotateX(${deltaY * 15}deg) rotateY(${deltaX * 15}deg)`;
    });
    img.addEventListener("mouseleave", () => {
        img.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
});