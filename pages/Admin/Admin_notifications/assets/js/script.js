// Wait for the DOM to load before adding event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Get all buttons with the class 'review-btn'
    const reviewButtons = document.querySelectorAll(".feedback-card");
    
    // Add click event listeners to each button
    reviewButtons.forEach(div => {
        div.addEventListener("click", function () {
            // Show the modal
            document.querySelector(".modal-container").style.display = "block";
        });
    });

    // Close the modal when clicking the close button
    document.querySelector(".close-btn").addEventListener("click", function () {
        document.querySelector(".modal-container").style.display = "none";
    });

    // Close the modal when clicking outside the modal
    window.addEventListener("click", function (event) {
        const modal = document.querySelector(".modal-container");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
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



    document.addEventListener("DOMContentLoaded", function () {
        const hamburger = document.getElementById("hamburger");
        const sidebar = document.getElementById("sidebar");

        hamburger.addEventListener("click", function () {
            sidebar.classList.toggle("open");
        });
    });