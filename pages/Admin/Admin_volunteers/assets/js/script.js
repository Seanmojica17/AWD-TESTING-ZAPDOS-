document.addEventListener("DOMContentLoaded", () => {
    // Fetch and display all activities when the page loads by default
    fetchActivities(null, false);  // Fetch all events
    setActiveTab("all-events-tab");  // Set "All Events" tab as active by default

    // Attach logout functionality
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default link action
            logoutUser();
        });
    }

    // Event listeners for tab switching
    document.getElementById("my-events-tab").addEventListener("click", () => {
        const userData = JSON.parse(localStorage.getItem("user_data"));
        const userId = userData ? userData.id : null;
        fetchActivities(userId, true); // Fetch "My Events"
        setActiveTab("my-events-tab"); // Set "My Events" tab as active
    });

    document.getElementById("all-events-tab").addEventListener("click", () => {
        fetchActivities(null, false); // Fetch "All Events"
        setActiveTab("all-events-tab"); // Set "All Events" tab as active
    });
});

// 🎯 Fetch Activities Function
function fetchActivities(userId, myEvents = false) {
    const url = 'https://demo-api-skills.vercel.app/api/VolunteerOrg/activities';  // API URL for events

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const eventContainer = document.getElementById("event-container");
            eventContainer.innerHTML = ''; // Clear previous events

            // Filter activities based on whether the user wants "My Events" or "All Events"
            const filteredActivities = myEvents 
                ? data.filter(activity => activity.organizerId === userId)  // Filter by userId if showing "My Events"
                : data; // Show all events if "All Events" is selected

            // Display filtered activities
            filteredActivities.forEach(activity => {
                const eventCard = document.createElement('div');
                eventCard.classList.add('event-card');

                const eventDetails = document.createElement('div');
                eventDetails.classList.add('event-details');
                eventDetails.innerHTML = `
                    <h3>${activity.title}</h3>
                    <p><strong>Date:</strong> ${new Date(activity.date).toLocaleDateString()}</p>
                    <p><strong>Description:</strong> ${activity.description}</p>
                    <button class="btn" onclick="viewEventDetails('${activity.id}')">View Details</button>
                    <button class="btn" onclick="updateEvent('${activity.id}')">Update</button>
                    <button class="btn" onclick="deleteEvent('${activity.id}')">Delete</button>
                `;
                eventCard.appendChild(eventDetails);
                eventContainer.appendChild(eventCard);
            });
        })
        .catch(error => {
            console.error('Error fetching activities:', error);
        });
}

// 🎯 Set Active Tab Function
function setActiveTab(activeTabId) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    const activeTab = document.getElementById(activeTabId);
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

// 🎯 View Event Details Function
function viewEventDetails(activityId) {
    // Log the activityId to verify it's correct
    console.log('Selected Event ID:', activityId);

    // Save the activityId to localStorage
    localStorage.setItem('selectedEventId', activityId);

    // Redirect to the volunteer page
    window.location.href = "../../../../../pages/Organizers/Org_volunteers/index.html";
}

// 🎯 Update Event Function
function updateEvent(activityId) {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    const userId = userData ? userData.id : null;

    if (!userId) {
        alert("Please log in to update events.");
        return;
    }

    // Fetch the event data to update
    fetch(`https://demo-api-skills.vercel.app/api/VolunteerOrg/activities/${activityId}`)
        .then(response => response.json())
        .then(activity => {
            if (activity.organizerId !== userId && userData.role !== 'admin') {
                alert("You are not authorized to update this event.");
                return;
            }

            const updatedTitle = prompt("Enter the updated event title:", activity.title);
            if (updatedTitle) {
                const updatedEvent = {
                    title: updatedTitle,
                    organizerId: userId,
                };

                fetch(`https://demo-api-skills.vercel.app/api/VolunteerOrg/activities/${activityId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedEvent),
                })
                .then(response => {
                    if (response.ok) {
                        alert("Event updated successfully!");
                        fetchActivities(userId, true);  // Refresh activities
                    } else {
                        alert("Error updating event. Please try again.");
                    }
                })
                .catch(error => console.error("Error updating event:", error));
            }
        })
        .catch(error => console.error('Error fetching event:', error));
}

// 🎯 Delete Event Function
function deleteEvent(activityId) {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    const userId = userData ? userData.id : null;

    if (!userId) {
        alert("Please log in to delete events.");
        return;
    }

    fetch(`https://demo-api-skills.vercel.app/api/VolunteerOrg/activities/${activityId}`)
        .then(response => response.json())
        .then(activity => {
            if (activity.organizerId !== userId && userData.role !== 'admin') {
                alert("You are not authorized to delete this event.");
                return;
            }

            const confirmDelete = confirm("Are you sure you want to delete this event?");
            if (confirmDelete) {
                fetch(`https://demo-api-skills.vercel.app/api/VolunteerOrg/activities/${activityId}`, {
                    method: 'DELETE',
                })
                .then(response => {
                    if (response.ok) {
                        alert("Event deleted successfully!");
                        fetchActivities(userId, true);  // Refresh activities
                    } else {
                        alert("Error deleting event. Please try again.");
                    }
                })
                .catch(error => console.error('Error deleting event:', error));
            }
        })
        .catch(error => console.error('Error fetching event:', error));
}
