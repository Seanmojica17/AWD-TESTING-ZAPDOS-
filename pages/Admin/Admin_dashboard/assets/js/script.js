function logout() {
    localStorage.removeItem("user_data");
    window.location.href = "../../../../../index.html";
}

const logoutButton = document.getElementById('logout-btn');
if (logoutButton) {
    logoutButton.addEventListener('click', logout);
}


document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const sidebar = document.getElementById("sidebar");

    hamburger.addEventListener("click", function () {
        sidebar.classList.toggle("open");
    });
});

async function fetchStats() {
    try {
        // Fetch events
        const eventsRes = await fetch('https://demo-api-skills.vercel.app/api/VolunteerOrg/activities');
        const eventsData = await eventsRes.json();

        // Log the events data to confirm the structure
        console.log("Events Data:", eventsData);

        // Filter validated events
        const validatedEvents = eventsData.filter(event => event.validated).length;

        // Fetch users
        const usersRes = await fetch('https://demo-api-skills.vercel.app/api/VolunteerOrg/users');
        const usersData = await usersRes.json();

        // Log the users data to confirm the structure
        console.log("Users Data:", usersData);
        console.log("Users Data Length:", usersData.users.length);

        // If there are users, proceed
        if (usersData.users && usersData.users.length > 0) {
            // Count volunteers (exclude @org.com and @admin.com)
            const totalVolunteers = usersData.users.filter(user => {
                const email = user.email.toLowerCase();
                return !email.endsWith('@org.com') && !email.endsWith('@admin.com');
            }).length;

            // Update the DOM with counts
            document.getElementById('event-count').textContent = validatedEvents;
            document.getElementById('volunteer-count').textContent = totalVolunteers;
        } else {
            console.warn("No users found");
        }
    } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
    }
}

// Fetch stats when the page loads
document.addEventListener("DOMContentLoaded", fetchStats);


