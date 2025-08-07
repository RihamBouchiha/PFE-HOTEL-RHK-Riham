document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav ul li a');
    const reservationBtn = document.querySelector('.reservationbtn a');

    reservationBtn.addEventListener('click', () => {
        window.location.href = 'http://127.0.0.1:5502/kaouthar/indexKaouthar.html'; 
    });

    // Fonction pour changer la barre
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('scrolled-down');
            navLinks.forEach(link => link.classList.add('scrolled-down'));
            reservationBtn.classList.add('scrolled-down');
        } else {
            header.classList.remove('scrolled-down');
            navLinks.forEach(link => link.classList.remove('scrolled-down'));
            reservationBtn.classList.remove('scrolled-down');
        }
    });
// 
    // Changement d'images pour la section 3
    let currentImageIndexSection3 = 0;
    const imagesSection3 = [
        'css/imageKa/chambre2.jpg',
        'css/imageKa/chambre3.jpg',
    ];

    const imageElementSection3 = document.querySelector('.image-content-section3 img');

    function changeImageSection3() {
        imageElementSection3.classList.add('fade-out');

        setTimeout(function () {
            imageElementSection3.src = imagesSection3[currentImageIndexSection3];
            imageElementSection3.classList.remove('fade-out');
            currentImageIndexSection3 = (currentImageIndexSection3 + 1) % imagesSection3.length;
        }, 1000); 
    }

    imageElementSection3.src = imagesSection3[currentImageIndexSection3];
    currentImageIndexSection3 = (currentImageIndexSection3 + 1) % imagesSection3.length;

    setInterval(changeImageSection3, 5000); 
});
