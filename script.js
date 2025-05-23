// Animation au défilement
document.addEventListener('DOMContentLoaded', () => {
    // Animation des statistiques
    const stats = document.querySelectorAll('.stat-item');
    stats.forEach(stat => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
    });

    // Animation des projets
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        project.style.opacity = '0';
        project.style.transform = 'translateY(20px)';
    });

    // Fonction pour vérifier si un élément est visible
    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // Animation au défilement
    const handleScroll = () => {
        stats.forEach(stat => {
            if (isElementInViewport(stat) && stat.style.opacity === '0') {
                stat.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
            }
        });

        projects.forEach((project, index) => {
            if (isElementInViewport(project) && project.style.opacity === '0') {
                setTimeout(() => {
                    project.style.transition = 'all 0.5s ease';
                    project.style.opacity = '1';
                    project.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    };

    // Écouteur d'événement pour le défilement
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Vérification initiale

    // Animation des boutons de projet
    document.querySelectorAll('.project-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });

    // Animation du menu de navigation
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            nav.style.transform = 'translateY(0)';
            return;
        }

        if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
            nav.style.transform = 'translateY(-100%)';
        } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
            nav.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Gestion du formulaire
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Ici vous pouvez ajouter votre logique d'envoi de formulaire
            alert('Message envoyé ! (Simulation)');
            form.reset();
        });
    }
});

// Gestion du scroll pour la sidebar
window.addEventListener('scroll', () => {
    const sidebar = document.querySelector('.fixed-sidebar');
    if (sidebar) {
        const scrolled = window.scrollY;
        sidebar.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Gestion des transitions de page
const projectCards = document.querySelectorAll('.project-card');
const transitionElement = document.createElement('div');
transitionElement.className = 'page-transition';
document.body.appendChild(transitionElement);

projectCards.forEach(card => {
    const link = card.querySelector('.project-link');
    if (link) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            // Animation de sortie
            transitionElement.classList.add('active');
            
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    }
});

// Animation d'entrée lors du chargement de la page
window.addEventListener('load', () => {
    transitionElement.style.transform = 'scaleY(1)';
    transitionElement.style.transformOrigin = 'bottom';
    
    setTimeout(() => {
        transitionElement.style.transform = 'scaleY(0)';
        transitionElement.style.transformOrigin = 'top';
    }, 100);
});

// Navigation active
const navLinks = document.querySelectorAll('.nav-content a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}); 