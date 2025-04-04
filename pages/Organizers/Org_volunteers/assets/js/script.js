document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the selected event ID from localStorage
    const activityId = localStorage.getItem("selectedEventId");

    if (activityId) {
        console.log('Activity ID from localStorage:', activityId);
        
        // Fetch applications for the specific event
        fetchApplications(activityId);
    } else {
        console.log('No activity ID found in localStorage.');
    }

    // Attach the logout functionality
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default link action
            logoutUser();
        });
    }

    // Attach event listener to the "Back" button
    const backBtn = document.getElementById("back-btn");
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            // Clear the selected event ID from localStorage
            localStorage.removeItem("selectedEventId");

            // Redirect back to the events page
            window.location.href ="../../../../../pages/Organizers/Org_events/index.html";
        });
    }
});

// 🎯 Fetch Applications for Activity
function fetchApplications(activityId) {
    fetch(`https://demo-api-skills.vercel.app/api/VolunteerOrg/activities/${activityId}/applications`)
        .then(response => response.json())
        .then(data => {
            const applicationList = document.getElementById("application-list");
            applicationList.innerHTML = ''; // Clear previous data

            data.forEach(application => {
                const appRow = document.createElement('div');
                appRow.classList.add('app-row');
                
                const userInfo = document.createElement('div');
                userInfo.classList.add('user-info');
                userInfo.innerHTML = `
                    <div class="user-text">
                        <p><strong>${application.user.name}</strong></p>
                        <p>Applied Event: ${application.activityId}</p>
                        <p>Application Date: ${new Date(application.createdAt).toLocaleDateString()}</p>
                        <p>Status: <strong>${application.status}</strong></p>
                    </div>
                `;
                
                const actions = document.createElement('div');
                actions.classList.add('actions');
                actions.innerHTML = `
                    <button class="approve-btn" onclick="updateApplicationStatus('${application.id}', 'confirmed')">✔️</button>
                    <button class="deny-btn" onclick="updateApplicationStatus('${application.id}', 'denied')">❌</button>
                `;
                
                appRow.appendChild(userInfo);
                appRow.appendChild(actions);
                applicationList.appendChild(appRow);
            });
        })
        .catch(error => {
            console.error('Error fetching applications:', error);
        });
}

// 🎯 Update Application Status
function updateApplicationStatus(applicationId, status) {
    fetch(`https://demo-api-skills.vercel.app/api/VolunteerOrg/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
    })
    .then(response => response.json())
    .then(data => {
        alert(`Application status updated to ${status}`);
        // Optionally refresh the applications after status update
        const activityId = localStorage.getItem("selectedEventId"); // Retrieve the activityId from localStorage
        fetchApplications(activityId);
    })
    .catch(error => {
        console.error('Error updating application status:', error);
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger"); // Get the hamburger button
    const sidebar = document.getElementById("sidebar"); // Get the sidebar element

    // Listen for the click event on the hamburger button
    hamburger.addEventListener("click", function () {
        sidebar.classList.toggle("open"); // Toggle the "open" class on sidebar (this controls visibility)
    });
});
