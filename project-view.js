document.addEventListener('DOMContentLoaded', () => {
    // Récupérer l'ID du projet depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    // Fonction pour charger les détails du projet
    const loadProjectDetails = (id) => {
        // Ici vous pouvez remplacer par un appel API réel pour charger les données du projet
        const projectData = {
            title: "Nom du Projet",
            subtitle: "Une brève description du projet",
            image: "path/to/project-image.jpg",
            description: `Description détaillée du projet...`,
            technologies: ["HTML", "CSS", "JavaScript"],
            role: "Développeur Principal",
            duration: "3 mois",
            year: "2024",
            links: [
                { url: "https://github.com/username/project", icon: "fab fa-github", text: "Voir sur GitHub" },
                { url: "https://demo-link.com", icon: "fas fa-external-link-alt", text: "Demo en ligne" }
            ]
        };

        // Mettre à jour le contenu de la page
        document.querySelector('.project-title').textContent = projectData.title;
        document.querySelector('.project-subtitle').textContent = projectData.subtitle;
        document.querySelector('.project-image').src = projectData.image;
        document.querySelector('.project-description').innerHTML = projectData.description;

        // Mettre à jour les tags
        const tagsContainer = document.querySelector('.project-tags');
        tagsContainer.innerHTML = projectData.technologies
            .map(tech => `<span class="project-tag">${tech}</span>`)
            .join('');

        // Mettre à jour les informations du projet
        document.querySelector('[data-info="role"] .info-value').textContent = projectData.role;
        document.querySelector('[data-info="duration"] .info-value').textContent = projectData.duration;
        document.querySelector('[data-info="year"] .info-value').textContent = projectData.year;

        // Mettre à jour les liens
        const linksContainer = document.querySelector('.project-links');
        linksContainer.innerHTML = projectData.links
            .map(link => `
                <a href="${link.url}" class="project-link" target="_blank" rel="noopener noreferrer">
                    <i class="${link.icon}"></i>
                    <span>${link.text}</span>
                </a>
            `)
            .join('');
    };

    // Charger les détails du projet si un ID est présent
    if (projectId) {
        loadProjectDetails(projectId);
    }

    // Gestion du retour à la page d'accueil
    document.querySelector('.back-button')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'index.html';
    });
}); 