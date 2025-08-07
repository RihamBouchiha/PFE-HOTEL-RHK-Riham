const retourAccueil = () => {
    window.location.href = "indexRiham1.html"; // Remplacez "index.html" par le chemin de votre page d'accueil
}

document.querySelector('.acc').addEventListener('click', retourAccueil);
document.addEventListener('DOMContentLoaded', function() {
    
    let hotelNom = document.getElementById('hotelText');
    
    hotelNom.addEventListener('mouseover', function() {
      document.body.style.cursor = 'pointer';
    });
  
    hotelNom.addEventListener('click', function() {
      window.location.href = "indexRiham1.html";
    });
  });
  