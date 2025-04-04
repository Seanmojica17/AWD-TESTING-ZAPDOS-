// Function to display the user's name
function displayUserName() {
    const userData = JSON.parse(localStorage.getItem("user_data"));

    if (userData && userData.name) {
        document.getElementById("namecard").textContent = userData.name;
    } else {
        document.getElementById("namecard").textContent = "Guest";
    }
}

// Fetch validated activities and display them with a "Join" button
function fetchValidatedActivities() {
    fetch('https://demo-api-skills.vercel.app/api/VolunteerOrg/activities') // Replace with your actual API endpoint
        .then(response => response.json())
        .then(data => {
            const activityList = document.querySelector('.volunteer-list');
            activityList.innerHTML = '';  // Clear existing items

            data.forEach(activity => {
                const activityItem = document.createElement('div');
                activityItem.classList.add('volunteer-item');
                
                // Add activity details
                const activityId = document.createElement('p');
                activityId.textContent = `ID: ${activity.id}`;
                activityItem.appendChild(activityId);

                const activityTitle = document.createElement('h2');
                activityTitle.textContent = activity.title;
                activityItem.appendChild(activityTitle);

                const activityDescription = document.createElement('p');
                activityDescription.textContent = `Description: ${activity.description}`;
                activityItem.appendChild(activityDescription);

                const activityLocation = document.createElement('p');
                activityLocation.textContent = `Location: ${activity.location}`;
                activityItem.appendChild(activityLocation);

                const activityDate = document.createElement('p');
                const eventDate = new Date(activity.date);
                activityDate.textContent = `Date: ${eventDate.toLocaleDateString()}`;
                activityItem.appendChild(activityDate);

                const joinButton = document.createElement('button');
                joinButton.textContent = 'Join';
                joinButton.classList.add('join-btn');
                
                // Attach an event listener to the "Join" button
                joinButton.addEventListener('click', function() {
                    joinActivity(activity.id);  // Call a function to handle joining
                });

                activityItem.appendChild(joinButton);
                activityList.appendChild(activityItem);
            });
        })
        .catch(error => {
            console.error('Error fetching activities:', error);
        });
}

// Handle joining an activity (you can extend this as needed, like sending an API request)
function joinActivity(activityId) {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    
    if (!userData || !userData.id) {
        alert("You need to be logged in to join an activity.");
        return;
    }

    const motivation = "I want to help!"; // Default motivation or allow user input if needed

    // Create the request body
    const requestBody = {
        userId: userData.id,
        activityId: activityId,
        motivation: motivation
    };

    // Send POST request to apply for the activity
    fetch('https://demo-api-skills.vercel.app/api/VolunteerOrg/applications', { // Replace with your actual API endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.id) {
            alert("Successfully joined the activity!");
        } else {
            alert("Failed to join the activity.");
        }
    })
    .catch(error => {
        console.error('Error applying for the activity:', error);
        alert("An error occurred while joining the activity.");
    });
}

// Logout function to remove user data from localStorage
function logout() {
    // Clear the admin data from localStorage
    localStorage.removeItem("user_data");

    // Redirect to the login page
    window.location.href = "../../../../../index.html";
}

// Example: Adding a logout button to trigger the logout function
const logoutButton = document.getElementById('logout-btn');
if (logoutButton) {
    logoutButton.addEventListener('click', logout);
}

// Fetch and display activities when the page loads
document.addEventListener('DOMContentLoaded', function() {
    displayUserName();
    fetchValidatedActivities(); // Fetch and display activities when page loads
});
