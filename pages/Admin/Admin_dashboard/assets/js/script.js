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

document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const sidebar = document.getElementById("sidebar");

    hamburger.addEventListener("click", function () {
        sidebar.classList.toggle("open");
    });
});