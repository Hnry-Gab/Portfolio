const skillsData = [
    {
        category: "Frontend",
        techs: [
            { name: "HTML5", icon: "fab fa-html5" },
            { name: "CSS3", icon: "fab fa-css3-alt" },
            { name: "JavaScript", icon: "fab fa-js" },
            { name: "React", icon: "fab fa-react" },
            { name: "Vue.js", icon: "fab fa-vuejs" },
            { name: "Sass", icon: "fab fa-sass" },
            { name: "Bootstrap", icon: "fab fa-bootstrap" },
            { name: "Tailwind", icon: "fas fa-wind" } // Custom icon choice if brands not available
        ]
    },
    {
        category: "Backend",
        techs: [
            { name: "Node.js", icon: "fab fa-node" },
            { name: "Python", icon: "fab fa-python" },
            { name: "Java", icon: "fab fa-java" },
            { name: "PHP", icon: "fab fa-php" },
            { name: "Go", icon: "fab fa-golang" } // Check if golang exists, fallback
        ]
    },
    {
        category: "Database",
        techs: [
            { name: "MySQL", icon: "fas fa-database" },
            { name: "PostgreSQL", icon: "fas fa-database" },
            { name: "MongoDB", icon: "fas fa-leaf" }, // Approx
            { name: "Redis", icon: "fas fa-server" }
        ]
    },
    {
        category: "DevOps & Tools",
        techs: [
            { name: "Git", icon: "fab fa-git-alt" },
            { name: "Docker", icon: "fab fa-docker" },
            { name: "AWS", icon: "fab fa-aws" },
            { name: "Linux", icon: "fab fa-linux" },
            { name: "Figma", icon: "fab fa-figma" }
        ]
    }
];

const container = document.getElementById('skills-container');
const buttons = document.querySelectorAll('.js-mode-btn');

function initSkills() {
    if (!container) return;

    // Initial Render
    renderSingleMode();

    // Event Listeners
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update Active State
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Render Mode
            const mode = btn.dataset.mode;
            if (mode === 'single') renderSingleMode();
            else if (mode === 'multi') renderMultiMode();
            else if (mode === 'all') renderAllMode();
        });
    });
}

// Helper to create a skill card
function createSkillCard(tech) {
    const div = document.createElement('div');
    div.className = 'c-skill-item';
    div.innerHTML = `
        <i class="${tech.icon}"></i>
        <span>${tech.name}</span>
    `;
    return div;
}

// MODE 1: SINGLE (Infinite Marquee)
function renderSingleMode() {
    container.innerHTML = '';
    container.className = 'c-skills-container c-skills-mode--single';

    const marquee = document.createElement('div');
    marquee.className = 'c-skills-marquee';

    const track = document.createElement('div');
    track.className = 'c-skills-marquee__track';

    // Flatten all skills
    const allSkills = skillsData.flatMap(cat => cat.techs);

    // Duplicate for smooth infinite scroll
    [...allSkills, ...allSkills].forEach(tech => {
        track.appendChild(createSkillCard(tech));
    });

    marquee.appendChild(track);
    container.appendChild(marquee);
}

// MODE 2: MULTI (Category Scroll + Tech Scroll)
function renderMultiMode() {
    container.innerHTML = '';
    container.className = 'c-skills-container c-skills-mode--multi';

    // 1. Categories Row
    const catRow = document.createElement('div');
    catRow.className = 'c-skills-row c-skills-row--categories';

    skillsData.forEach((cat, index) => {
        const btn = document.createElement('button');
        btn.className = `c-skill-category-btn ${index === 0 ? 'active' : ''}`;
        btn.textContent = cat.category;
        btn.addEventListener('click', () => {
            document.querySelectorAll('.c-skill-category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateTechRow(cat.techs);
        });
        catRow.appendChild(btn);
    });

    // 2. Techs Row
    const techRow = document.createElement('div');
    techRow.className = 'c-skills-row c-skills-row--techs';

    const techWrapper = document.createElement('div');
    techWrapper.className = 'c-skills-row__wrapper';
    techRow.appendChild(techWrapper);

    function updateTechRow(techs) {
        techWrapper.innerHTML = '';
        techs.forEach(tech => {
            techWrapper.appendChild(createSkillCard(tech));
        });
    }

    // Initial Load
    updateTechRow(skillsData[0].techs);

    container.appendChild(catRow);
    container.appendChild(techRow);
}

// MODE 3: ALL (Stacked Rows)
function renderAllMode() {
    container.innerHTML = '';
    container.className = 'c-skills-container c-skills-mode--all';

    skillsData.forEach((cat, index) => {
        const rowSection = document.createElement('div');
        rowSection.className = 'c-skills-section';

        const title = document.createElement('h3');
        title.className = 'c-skills-section__title';
        title.textContent = cat.category;

        const marquee = document.createElement('div');
        marquee.className = 'c-skills-marquee';

        const track = document.createElement('div');
        track.className = `c-skills-marquee__track ${index % 2 !== 0 ? 'c-skills-marquee__track--reverse' : ''}`;

        // Duplicate for smooth scroll
        [...cat.techs, ...cat.techs, ...cat.techs].forEach(tech => { // Triple for short lists
            track.appendChild(createSkillCard(tech));
        });

        marquee.appendChild(track);
        rowSection.appendChild(title);
        rowSection.appendChild(marquee);
        container.appendChild(rowSection);
    });
}

// Init
document.addEventListener('DOMContentLoaded', initSkills);
