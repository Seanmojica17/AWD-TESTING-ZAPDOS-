document.addEventListener("DOMContentLoaded", loadApplications);

function logout() {
    // Clear the admin data from localStorage
    localStorage.removeItem("user_data");
  

    // Redirect to the login page
    window.location.href = "../../../../../index.html";
}

// Example: Adding a logout button to trigger the logout function
const logoutButton = document.getElementById('logout-btn');
if (logoutButton) {
}