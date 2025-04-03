document.addEventListener("DOMContentLoaded", () => {
    const eventContainer = document.getElementById('event-container');
    const tabs = document.querySelectorAll('.tab');
    let events = [];

    // Retrieve admin data from localStorage
    const adminData = JSON.parse(localStorage.getItem("admin_data"));
    if (!adminData || adminData.role !== "admin") {
        // Redirect to login if no admin data or invalid role
        window.location.href = "../../pages/Login/login.html";
        return;
    }

    const loggedInAdminId = adminData.id;

    // Fetch activities (both validated and unvalidated)
    async function fetchActivities() {
        try {
            const response = await fetch("https://demo-api-skills.vercel.app/api/VolunteerOrg/activities");
            if (!response.ok) throw new Error("Failed to fetch events");
            events = await response.json();
            displayEvents(); // Display all activities by default
        } catch (error) {
            console.error("Error fetching events:", error);
            eventContainer.innerHTML = "<p>Failed to load events. Please try again later.</p>";
        }
    }

    // Display activities with event IDs and validate buttons
    function displayEvents() {
        eventContainer.innerHTML = ''; // Clear the container

        const newEventIds = JSON.parse(localStorage.getItem("event_ids")) || [];  // Pending events stored in localStorage

        if (events.length === 0 && newEventIds.length === 0) {
            eventContainer.innerHTML = "<p>No events available at the moment.</p>";
            return;
        }

        // Separate approved events (from API) and pending events (from localStorage)
        const approvedEvents = events.filter(event => event.validated);
        const pendingEvents = events.filter(event => !event.validated);

        

        if (newEventIds.length > 0) {
            const pendingSection = document.createElement('div');
            pendingSection.innerHTML = "<h2>Pending Events (New)</h2>";
            eventContainer.appendChild(pendingSection);

            newEventIds.forEach(eventId => {
                // You may want to fetch the event details based on eventId here, or use a temporary placeholder
                const event = {
                    id: eventId,
                    title: `Event ${eventId}`,
                    validated: false, // These events are not validated
                    date: new Date().toISOString(),
                    location: "Location not available"
                };
                const eventCard = createEventCard(event);
                eventContainer.appendChild(eventCard);
            });
        }
        
        if (approvedEvents.length > 0) {
            const approvedSection = document.createElement('div');
            approvedSection.innerHTML = "<h2>Approved Events</h2>";
            eventContainer.appendChild(approvedSection);

            approvedEvents.forEach(event => {
                const eventCard = createEventCard(event);
                eventContainer.appendChild(eventCard);
            });
        }

        // Show pending events (new ones stored in localStorage)
      
    }

    // Helper function to create an event card
    function createEventCard(event) {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');

        eventCard.innerHTML = `
            <div class="event-details">
                <h3>Event ID: ${event.id}</h3>
                <h3>Event NAME: ${event.title}</h3>
                <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p><strong>Category:</strong> ${event.validated ? 'Approved' : 'Pending'}</p>
                <button class="btn" onclick="viewEventDetails('${event.id}')">View Details</button>
                <button class="btn" onclick="deleteEvent('${event.id}')">Delete</button>
                ${!event.validated ? `<button class="btn" onclick="validateEvent('${event.id}')">Validate</button>` : ''}
            </div>
        `;
        return eventCard;
    }

    // Validate event function
    window.validateEvent = async (eventId) => {
        // Retrieve user data from localStorage
        const userData = JSON.parse(localStorage.getItem("user_data"));
        const adminId = userData ? userData.id : null;  // Admin ID from the logged-in user data
    
        // Check if user is an admin
        if (!userData || !adminId) {
            alert("Only admins can validate activities.");
            return;
        }
    
        // Proceed with validation for the selected event ID
        try {
            const response = await fetch(`https://demo-api-skills.vercel.app/api/VolunteerOrg/admin/activities/${eventId}/validate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ adminId: adminId })
            });
    
            const result = await response.json();
    
            if (response.ok) {
                // Alert for successful validation
                alert(`Event ID: ${eventId} validated successfully!`);
    
                // Remove the validated event ID from localStorage
                const newEventIds = JSON.parse(localStorage.getItem("event_ids")) || [];
                const updatedEventIds = newEventIds.filter(id => id !== eventId); // Remove the validated event ID
    
                // Save the updated list back to localStorage
                localStorage.setItem("event_ids", JSON.stringify(updatedEventIds));
    
                // Refresh the events list to show updated state
                fetchActivities();
            } else {
                console.error(`Error validating event ID: ${eventId}`, result);
            }
        } catch (error) {
            console.error(`Error validating event ID: ${eventId}`, error);
        }
    };

    // Fetch activities when the page loads
    fetchActivities();
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