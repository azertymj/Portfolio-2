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

    window.addEventListener('scroll', handleScroll, { passive: true });
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
    const notification = document.getElementById('notification');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = form.querySelector('.form-submit');
            const originalText = submitButton.innerHTML;
            
            try {
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
                submitButton.disabled = true;
                
                // Envoi du formulaire via Formspree
                await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                // Afficher la notification
                notification.classList.add('show');
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 3000);
                
                // Réinitialiser le formulaire
                form.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
            } catch (error) {
                // En cas d'erreur
                notification.querySelector('i').className = 'fas fa-exclamation-circle';
                notification.querySelector('i').style.color = '#ff4d00';
                notification.querySelector('span').textContent = 'Erreur lors de l\'envoi du message';
                notification.classList.add('show');
                
                setTimeout(() => {
                    notification.classList.remove('show');
                    notification.querySelector('i').className = 'fas fa-check-circle';
                    notification.querySelector('i').style.color = '#4CAF50';
                    notification.querySelector('span').textContent = 'Message envoyé avec succès !';
                }, 3000);
                
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
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

// Gestion de la navigation au scroll
const nav = document.querySelector('nav');
let lastScrollTop = 0;
const scrollThreshold = 50;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Si on défile vers le bas et qu'on a dépassé 100px
    if (currentScroll > lastScrollTop && currentScroll > 100) {
        nav.classList.add('nav-hidden');
    } 
    // Si on défile vers le haut
    else if (currentScroll < lastScrollTop) {
        nav.classList.remove('nav-hidden');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, { passive: true });

// Gestion des liens de navigation actifs
const navLinks = document.querySelectorAll('.nav-content a');
const sections = document.querySelectorAll('section');

function setActiveLink() {
    const currentPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (currentPos >= sectionTop && currentPos < sectionTop + sectionHeight) {
            const targetId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${targetId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink, { passive: true });
window.addEventListener('load', setActiveLink);

// Smooth scroll pour les liens de navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}); 