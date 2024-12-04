function initializeWheel(containerId, portfolioId) {
    const container = document.getElementById(containerId);
    const canvas = container.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const spinButton = container.querySelector('button');
    const resultTitleDisplay = container.querySelector('h2');
    const resultMessageDisplay = container.querySelector('p');

    // Options for the wheel
    const images = [];

    let imagePaths = JSON.parse(container.dataset.imageArray);
    console.log(imagePaths);
    let colors = JSON.parse(container.dataset.colorArray);
    console.log(colors);
    let titles = JSON.parse(container.dataset.titleArray);
    let messages = JSON.parse(container.dataset.messageArray);

    imagePaths.forEach((path, index) => {
        const img = new Image();
        img.src = path;
        images[index] = img;
    });

    // Number of sections
    const numSections = 4;
    const sectionAngle = (2 * Math.PI) / numSections;

    let rotation =  0;

    // Draw the wheel
    function drawWheel() {

        const radius = canvas.width / 2;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        for (let i = 0; i < numSections; i++) {
            const startAngle = - i * sectionAngle ;
            const endAngle = startAngle - sectionAngle;
            const middleAngle = startAngle - sectionAngle / 2;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle + rotation, endAngle + rotation, true);
            ctx.closePath();
            ctx.fillStyle = colors[i];
            ctx.fill();
            ctx.lineWidth = 2; // Épaisseur du trait (ajustez selon vos préférences)
            ctx.strokeStyle = '#FFFFFF'; // Couleur des traits (blanc)
            ctx.stroke();
            ctx.save();

            // Draw text
            const imageRadius  = radius * 0.7; // Rayon où placer le texte
            const imageX  = centerX + imageRadius * Math.cos(middleAngle + rotation); // Coordonnée X du texte
            const imageY  = centerY + imageRadius * Math.sin(middleAngle + rotation); // Coordonnée Y du texte
            const imageSize = 50;
        

            ctx.translate(imageX, imageY); // Déplace le contexte au centre de l'image
            ctx.rotate(middleAngle + rotation + Math.PI / 2);
            if (images[i].complete) {
                ctx.drawImage(images[i], -imageSize / 2, -imageSize / 2, imageSize, imageSize); // Dessiner l'image centrée
            } else {
                images[i].onload = () => drawWheel(); // Redessiner quand l'image est prête
            }
            ctx.restore(); // Restaurer l'état initial du contexte
        }
    }

    // Spin the wheel
    function spinWheel() {
        const spinDuration = 2000; // Time to spin in ms
        const targetAngle = Math.random() * 2 * Math.PI + 3 * 2 * Math.PI; // Un angle aléatoire, et 5 tours complets pour l'effet de rotation

        const startTime = Date.now();

        function animateWheel() {
            const elapsedTime = Date.now() - startTime;
            let progress = Math.min(elapsedTime / spinDuration, 1); // Progression de l'animation (entre 0 et 1)

            progress = Math.pow(progress, 2);

            rotation = - (targetAngle * progress) % (2 * Math.PI);

            drawWheel(); // Redessiner la roue avec le nouvel angle

            if (progress < 1) {
                requestAnimationFrame(animateWheel); // Continuer l'animation si elle n'est pas terminée
            } else {
                // Normaliser l'angle final de rotation
                const normalizedRotation = (rotation % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI); // Plage [0, 2π)

                // Ajuster pour aligner avec la flèche (ajouter un quart de tour pour que 0 soit en haut)
                const angleWithOffset = (normalizedRotation + Math.PI / 2) % (2 * Math.PI);

                // Trouver l'index de la section
                const selectedIndex = Math.floor(angleWithOffset / sectionAngle) % numSections;

                // Extraire l'option sélectionnée
                const selectedOption = imagePaths[selectedIndex];

                // Afficher le résultat
                resultTitleDisplay.textContent = titles[selectedIndex];
                resultMessageDisplay.textContent = messages[selectedIndex];
            }
        }

        animateWheel(); // Démarrer l'animation
    };

    const modal = document.getElementById(portfolioId);
    modal.addEventListener('shown.bs.modal', function () {
        // Log les dimensions du canvas après l'affichage du modal
        canvas.width = canvas.offsetWidth; // Mettre à jour les dimensions du canvas selon l'affichage
        canvas.height = canvas.offsetHeight; // Mettre à jour la hauteur

        drawWheel(); // Redessiner la roue après avoir ajusté les dimensions

        // Ajouter un événement au bouton pour lancer la roue
        spinButton.addEventListener('click', spinWheel);
    });
}

initializeWheel('wheelContainer1', 'portfolioModal1');
initializeWheel('wheelContainer2', 'portfolioModal2');