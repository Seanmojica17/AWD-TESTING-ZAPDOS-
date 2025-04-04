// Logout function: Removes user data from localStorage and redirects to homepage
function logout() {
    localStorage.removeItem("user_data"); // Clear user data from localStorage
    window.location.href = "../../../../../index.html"; // Redirect to home page
}

// Set up the logout button event listener
const logoutButton = document.getElementById('logout-btn');
if (logoutButton) {
    logoutButton.addEventListener('click', logout); // Trigger logout function on button click
}

// Fetch and process stats (events and users data)
async function fetchStats() {
    try {
        // Fetch events data from the API
        const eventsRes = await fetch('https://demo-api-skills.vercel.app/api/VolunteerOrg/activities');
        const eventsData = await eventsRes.json();
        
        console.log("Events Data:", eventsData); // Log events data for debugging

        // Filter the events to count only validated events
        const validatedEvents = eventsData.filter(event => event.validated).length;

        // Fetch users data from the API
        const usersRes = await fetch('https://demo-api-skills.vercel.app/api/VolunteerOrg/users');
        const usersData = await usersRes.json();

        console.log("Users Data:", usersData); // Log users data for debugging
        console.log("Users Data Length:", usersData.users.length); // Log the length of users array

        // Check if users data is valid and non-empty
        if (usersData.users && usersData.users.length > 0) {
            // Count volunteers by excluding @org.com and @admin.com emails
            const totalVolunteers = usersData.users.filter(user => {
                const email = user.email.toLowerCase();
                return !email.endsWith('@org.com') && !email.endsWith('@admin.com');
            }).length;

            // Update the DOM with the event and volunteer counts
            document.getElementById('event-count').textContent = validatedEvents;
            document.getElementById('volunteer-count').textContent = totalVolunteers;
        } else {
            console.warn("No users found"); // Log a warning if no users are found
        }
    } catch (error) {
        console.error("Failed to fetch dashboard stats:", error); // Log errors if the fetch fails
    }
}

// Fetch stats when the page is fully loaded
document.addEventListener("DOMContentLoaded", fetchStats);

// Sidebar toggle functionality (hamburger menu)
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger"); // Get the hamburger button
    const sidebar = document.getElementById("sidebar"); // Get the sidebar element

    // Listen for the click event on the hamburger button
    hamburger.addEventListener("click", function () {
        sidebar.classList.toggle("open"); // Toggle the "open" class on sidebar (this controls visibility)
    });
});
