// 🎯 Wait for the DOM to Load Properly
document.addEventListener("DOMContentLoaded", () => {
  // ✅ API Base URL
  const API_URL = "https://demo-api-skills.vercel.app/api/VolunteerOrg";

  // 🎯 Handle User Login
  async function loginUser(email, password) {
    try {
      console.log("🔄 Logging in user:", email);

      // ✅ Encode Email to Avoid URL Errors
      const encodedEmail = encodeURIComponent(email);
      const response = await fetch(`${API_URL}/users/login/${encodedEmail}`, {
        method: "GET",
      });

      if (!response.ok) {
        if (response.status === 404) {
          alert("❌ User not found. Please register first.");
        } else {
          alert("⚠️ Error during login. Please try again.");
        }
        return;
      }

      const userData = await response.json();
      console.log("✅ User data retrieved:", userData);

      // 🎯 Validate Password
      if (userData.password !== password) {
        alert("❌ Invalid email or password. Please try again.");
        return;
      }

      // ✅ Create User Object for Local Storage
      const userObject = {
        email: userData.email,
        name: userData.name,
        role: userData.role || "user", // Default to "user" if role is missing
        token: userData.token || "", // Store token if available
        id: userData.id, // User ID
      };

      // 🎯 Store User Data in Local Storage
      localStorage.setItem("user_data", JSON.stringify(userObject));

      // ✅ Role-Based Redirection
      if (userData.name.startsWith("a-")) { 
        // 🎯 Admin Case
        localStorage.setItem("admin_data", JSON.stringify({ ...userObject, role: "admin" }));
        window.location.href = "../../pages/Admin/Admin_dashboard/index.html";
      } else if (email.endsWith("@org.com")) {
        // 🎯 Organizer Case
        window.location.href = "../../pages/Organizers/Org_dashboard/index.html";
      } else if (email.endsWith("@user.com")) {
        // 🎯 Regular User Case
        window.location.href = "../../pages/User/User_dashboard/index.html";
      } else {
        alert("⚠️ Invalid email domain. Please use an appropriate domain.");
      }

      alert(`🎉 Welcome back, ${userData.name}!`);
    } catch (error) {
      console.error("🚨 Error logging in user:", error);
      alert("❌ An error occurred during login. Please try again.");
    }
  }

  // 🎯 Handle Login Button Click
  const loginBtn = document.getElementById("login-btn");

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value.trim();

      if (email && password) {
        loginUser(email, password);
      } else {
        alert("⚠️ Please enter your email and password.");
      }
    });
  }
});
