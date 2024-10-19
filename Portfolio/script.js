// Function to create project cards
function createProjectCard(project) {
    const card = document.createElement('div');
    card.classList.add('project-card');
    card.innerHTML = `
        <h3>${project.name}</h3>
        <p>${project.description || 'No description available.'}</p>
        <a href="${project.html_url}" target="_blank">View on GitHub</a>
    `;
    return card;
}

// Function to fetch projects from GitHub and display them
async function fetchAndDisplayProjects() {
    const username = 'your-github-username'; // Replace with your GitHub username
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const projects = await response.json();
        const projectGrid = document.getElementById('project-grid');
        projects.forEach(project => {
            const card = createProjectCard(project);
            projectGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        const projectGrid = document.getElementById('project-grid');
        projectGrid.innerHTML = '<p>Error loading projects. Please try again later.</p>';
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to a server
        // For this example, we'll just log it to the console
        const formData = new FormData(form);
        console.log('Form submitted with the following data:');
        for (let [key, value] of formData.entries()) {
            console.log(key + ': ' + value);
        }
        
        // Clear the form
        form.reset();
        
        // Show a success message (you can replace this with a more user-friendly notification)
        alert('Thank you for your message! I will get back to you soon.');
    });
});

// Call the function to fetch and display projects when the page loads
window.addEventListener('load', fetchAndDisplayProjects);
