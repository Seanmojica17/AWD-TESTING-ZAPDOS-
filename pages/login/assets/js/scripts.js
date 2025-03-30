// ✅ Correct API URL
const API_URL = "https://demo-api-skills.vercel.app/api/VolunteerOrg";

// 🎯 Handle User Registration
async function registerUser(email, name, password) {
  try {
    // ✅ Correct endpoint for registration
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password }),
    });

    if (response.status === 201) {
      const data = await response.json();
      alert("User registered successfully!");
      console.log("New User:", data);
    } else {
      const error = await response.json();
      alert(`Error: ${error.error}`);
    }
  } catch (error) {
    console.error("Error registering user:", error);
  }
}

// 🎯 Handle User Login (GET to login route with email & password validation)
async function loginUser(email, passwordInput) {
  try {
    // ✅ Corrected API URL for login with GET method
    const response = await fetch(`${API_URL}/users/login/${email}`, {
      method: "GET",
    });

    if (response.status === 200) {
      const userData = await response.json();

      // ✅ Validate password from API response
      if (userData.password === passwordInput) {
        alert(`Welcome back, ${userData.name}!`);
        console.log("User Data:", userData);
      } else {
        alert("Invalid email or password. Please try again.");
      }
    } else {
      alert("User not found. Please register.");
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
}

// 🎯 Add Event Listeners for Form Buttons
document.addEventListener("DOMContentLoaded", () => {
  // ✅ Corrected to Target the Correct Button IDs
  const registerBtn = document.getElementById("signup-btn");
  const loginBtn = document.getElementById("login-btn");

  if (registerBtn) {
    registerBtn.addEventListener("click", () => {
      // ✅ Fetching Correct IDs for Inputs
      const email = document.getElementById("reg-email").value.trim();
      const name = document.getElementById("reg-name").value.trim();
      const password = document.getElementById("reg-password").value.trim();

      // ✅ Basic Validation to Prevent Empty Inputs
      if (email && name && password) {
        registerUser(email, name, password);
      } else {
        alert("Please fill in all fields.");
      }
    });
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value.trim();

      if (email && password) {
        loginUser(email, password);
      } else {
        alert("Please enter your email and password.");
      }
    });
  }
});

// 🎯 Test API Connection (Optional - For Debugging Purposes)
fetch(`${API_URL}/users`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("API connection failed");
    }
    return response.json();
  })
  .then((data) => console.log("API connected successfully:", data))
  .catch((error) => console.error("Error connecting to API:", error));
