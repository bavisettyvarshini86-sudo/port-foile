const API_URL = "http://127.0.0.1:8000/api";


// Load portfolio data
async function loadPortfolio() {

    try {

        const response = await fetch(
            `${API_URL}/portfolio/`
        );

        const data = await response.json();


        // Name
        document.getElementById("name").textContent =
            data.name;


        // Role
        document.getElementById("role").textContent =
            data.role;


        // About
        document.getElementById("about-text").textContent =
            data.about;


        // Skills
        const skillsContainer =
            document.getElementById("skills-container");

        skillsContainer.innerHTML = "";

        data.skills.forEach(function(skill) {

            const element =
                document.createElement("div");

            element.className = "skill";

            element.textContent = skill;

            skillsContainer.appendChild(element);

        });


        // Projects
        const projectsContainer =
            document.getElementById("projects-container");

        projectsContainer.innerHTML = "";

        data.projects.forEach(function(project) {

            const element =
                document.createElement("div");

            element.className = "project";

            element.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            `;

            projectsContainer.appendChild(element);

        });

    }

    catch (error) {

        console.error(
            "Error loading portfolio:",
            error
        );

    }
}



// Contact form
document
    .getElementById("contact-form")
    .addEventListener("submit", async function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "contact-name"
            ).value;


        const email =
            document.getElementById(
                "contact-email"
            ).value;


        const message =
            document.getElementById(
                "contact-message"
            ).value;


        try {

            const response = await fetch(
                `${API_URL}/contact/`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message
                    })
                }
            );


            const data =
                await response.json();


            document.getElementById(
                "form-message"
            ).textContent = data.message;


            if (data.success) {

                document
                    .getElementById("contact-form")
                    .reset();

            }

        }

        catch (error) {

            console.error(error);

            document.getElementById(
                "form-message"
            ).textContent =
                "Something went wrong.";

        }

    });


// Start application
loadPortfolio();