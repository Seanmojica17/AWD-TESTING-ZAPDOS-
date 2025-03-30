// ✅ Correct API URL
const API_URL = "https://demo-api-skills.vercel.app/api/VolunteerOrg/users";

// 🎯 Handle User Registration
async function registerUser(email, name, password) {
  try {
    const response = await fetch(API_URL, {
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

// 🎯 Handle User Login (Get User by Email) [Optional]
async function loginUser(email) {
  try {
    const response = await fetch(`${API_URL}/login/${email}`);

    if (response.status === 200) {
      const userData = await response.json();
      alert(`Welcome back, ${userData.name}!`);
      console.log("User Data:", userData);
    } else {
      alert("User not found. Please register.");
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
}

// 🎯 Add Event Listeners for Form Buttons
document.addEventListener("DOMContentLoaded", () => {
  // ✅ Corrected to Target the Correct ID
  const registerBtn = document.getElementById("signup-btn");

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
});

// 🎯 Test API Connection (Optional - For Debugging Purposes)
fetch(API_URL)
  .then((response) => {
    if (!response.ok) {
      throw new Error("API connection failed");
    }
    return response.json();
  })
  .then((data) => console.log("API connected successfully:", data))
  .catch((error) => console.error("Error connecting to API:", error));
