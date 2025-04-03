// 🎯 Logout Function
function logoutUser() {
    // ✅ Clear stored user data
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_role");

    // ✅ Redirect to login page
    window.location.href = "../../login/index.html";
}

// 🎯 Attach Logout Event Listener
document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logout-btn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default link action
            logoutUser();
        });
    }
});
