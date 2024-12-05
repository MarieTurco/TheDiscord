
// Ajouter un joueur
function addPlayer() {
    const playerName = prompt("Enter a username :");

    if (playerName && playerName.trim() !== "") {

        const table = document.getElementById('playerTable');
        const row = table.insertRow();

        // Cellule pour le nom du joueur
        const cell1 = row.insertCell(0);
        cell1.textContent = playerName.trim();

        // Cellule pour "Vrai"
        const cell2 = row.insertCell(1);
        cell2.innerHTML = `<img src="assets/logo.png" alt="Vrai" class="logo-tab" onclick="toggleLogo(this)">`;
        // Cellule pour "Faux"
        const cell3 = row.insertCell(2);
        cell3.innerHTML = `<img src="assets/logo.png" alt="Faux" class="logo-tab" onclick="toggleLogo(this)">`;
        // Cellule pour le bouton supprimer
        const cell4 = row.insertCell(3);
        cell4.innerHTML = `<img src="assets/img/trash.png" alt="Delete" class="logo-tab" onclick="removePlayer(this)">`;
    } 
}

// Supprimer un joueur spécifique
function removePlayer(button) {
  const row = button.parentElement.parentElement;
  row.remove();
}

// Effacer toutes les croix
function clearAll() {
    const rows = document.getElementById('playerTable').getElementsByTagName('tr');

    // Parcours de chaque ligne du tableau (sauf l'en-tête)
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName('td');
      const imgVrai = cells[1].querySelector('img');
      const imgFaux = cells[2].querySelector('img');
  
      // Réinitialisation de l'opacité des images
      imgVrai.style.opacity = "0.5";
      imgFaux.style.opacity = "0.5";
    }
}

// Supprimer tous les joueurs
function removeAllPlayers() {
  const table = document.getElementById('playerTable');
  table.innerHTML = ''; // Efface tout le contenu de la table
  playerCount = 0; // Réinitialiser le compteur
}

// S'assurer qu'une seule case est cochée par ligne
function toggleLogo(img) {
    // Changer l'image au clic (logo de jeu activé ou non)
    if (img.style.opacity === "1") {
      img.style.opacity = "0.5"; // Réinitialiser l'image
    } else {
      img.style.opacity = "1"; // Mettre l'image en valeur (activer)
    }
}
