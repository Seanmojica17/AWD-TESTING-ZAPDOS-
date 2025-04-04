let loggedInUserId = null;
let isAdmin = false;

// Check if the user is logged in from previous session or saved state (e.g., localStorage)
// Assume `loggedInUserId` and `isAdmin` are already set from a previous login if necessary

// Fetch and display activities when the page loads
window.addEventListener('DOMContentLoaded', async () => {
    // Assume the email login is already successful, and set loggedInUserId & isAdmin manually
    loggedInUserId = 'your-logged-in-user-id'; // Set the user ID here
    isAdmin = false; // Set the admin flag (false if not admin)

    // Fetch activities on page load
    fetchActivities();
});

// Fetch and display validated activities
async function fetchActivities() {
    try {
        const response = await fetch('https://demo-api-skills.vercel.app/api/VolunteerOrg/activities');
        const activities = await response.json();
        const container = document.getElementById('activities-container');
        const counter = document.getElementById('event-count'); // Get the counter element

        container.innerHTML = ''; // Clear previous activities

        // Loop through activities and display them
        activities.forEach(event => {
            const div = document.createElement('div');
            div.innerHTML = `
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <p>Location: ${event.location}</p>
                <p>Date: ${new Date(event.date).toLocaleString()}</p>
                <p>ID: ${event.id}</p>
                <p>Validated: ${event.validated ? 'Yes' : 'No'}</p>
            `;
            container.appendChild(div);
        });

        // ✅ Update event counter
        if (counter) {
            counter.textContent = activities.length;
        }

    } catch (error) {
        console.error("Error fetching activities:", error);
    }
}



document.getElementById('create-event-btn').addEventListener('click', async () => {
    const organizerId = JSON.parse(localStorage.getItem("user_data")).id;

    if (!organizerId) {
        alert("Please log in first.");
        return;
    }

    const newEvent = {
        title: document.getElementById('event-title').value,
        description: document.getElementById('event-description').value,
        location: document.getElementById('event-location').value,
        date: new Date(document.getElementById('event-date').value).toISOString(),
        organizerId: organizerId
    };

    try {
        const response = await fetch('https://demo-api-skills.vercel.app/api/VolunteerOrg/activities', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEvent)
        });
        const result = await response.json();
        if (response.ok) {
            const newEventId = result.id;
        
            // Retrieve existing event IDs from localStorage (if any)
            let eventIds = JSON.parse(localStorage.getItem("event_ids")) || [];
        
            // Add the new event ID to the array if it's not already in the list
            if (!eventIds.includes(newEventId)) {
                eventIds.push(newEventId);
                // Save the updated array of event IDs to localStorage
                localStorage.setItem("event_ids", JSON.stringify(eventIds));
            }
        
            alert("Activity created! ID: " + newEventId);
            fetchActivities(); // Refresh the activities list if needed
        } else {
            console.error("Error creating event:", result);
        }
    } catch (error) {
        console.error("Error creating event:", error);
    }
});


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