function displayUserName() {
    const userData = JSON.parse(localStorage.getItem("user_data"));
  
    if (userData && userData.name) {
      document.getElementById("namecard").textContent = userData.name;
    } else {
      document.getElementById("namecard").textContent = "Guest";
    }
  }
  
  // Call the function to set the name when the page loads
  displayUserName();

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