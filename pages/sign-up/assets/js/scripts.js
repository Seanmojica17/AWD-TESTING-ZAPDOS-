// 🎯 Wait for the DOM to Load Properly
document.addEventListener("DOMContentLoaded", () => {
  // ✅ Correct API URL
  const API_URL = "https://demo-api-skills.vercel.app/api/VolunteerOrg";

  // 🎯 Handle User Registration
  async function registerUser(email, name, password) {
    try {
      console.log("Registering User:", { email, name, password });

      // ✅ Determine User Type by Email Domain
      let role;
      if (email.endsWith("@org.com")) {
        role = "Organizer";
      } else if (email.endsWith("@user.com")) {
        role = "Volunteer";
      } else {
        alert("Invalid email domain. Please use an @org.com or @user.com email.");
        return;
      }

      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      });

      if (response.status === 201) {
        const data = await response.json();
        alert(`User registered successfully as ${role}! 🎉`);
        console.log("New User:", data);

        // 🎯 Store Email in Local Storage
        localStorage.setItem("user_email", data.email);

        // 🎉 Redirect Based on Role
        if (role === "Organizer") {
          window.location.href = "../../pages/Organizers/Org_dashboard/index.html";
        } else {
          window.location.href = "../../pages/User/User_dashboard/index.html";
        }
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || "Something went wrong!"}`);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred while registering. Please try again.");
    }
  }

  // 🎯 Handle Registration Button Click
  const registerBtn = document.getElementById("signup-btn");

  if (registerBtn) {
    registerBtn.addEventListener("click", () => {
      const email = document.getElementById("reg-email").value.trim();
      const name = document.getElementById("reg-name").value.trim();
      const password = document.getElementById("reg-password").value.trim();

      if (email && name && password) {
        registerUser(email, name, password);
      } else {
        alert("Please fill in all fields.");
      }
    });
  }
});
