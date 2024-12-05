/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 
let logoImage;
let trashImage;

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    const logoImage = new Image();
    logoImage.src = "assets/logo.png"; 
    const trashImage = new Image();
    trashImage.src = "assets/img/trash.png"; 

});

// Tableau des images des pages de règles
const ruleImages = [
    'assets/img/rules_p1.png',
    'assets/img/rules_p2.png',
    'assets/img/rules_p3.png'
];

// Index de la page actuelle
let currentPage = 0;

// Changer de page (précédente ou suivante)
function changePage(direction) {
    console.log("changePage");
    if (direction === 'next') {
        currentPage = (currentPage + 1) % ruleImages.length; // Passer à la page suivante
    } else if (direction === 'prev') {
        currentPage = (currentPage - 1 + ruleImages.length) % ruleImages.length; // Passer à la page précédente
    }
    
    const ruleImage = document.getElementById('ruleImage');
    ruleImage.src = ruleImages[currentPage]; // Mettre à jour l'image affichée
}
