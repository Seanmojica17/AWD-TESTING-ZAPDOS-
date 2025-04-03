document.addEventListener("DOMContentLoaded", async () => {
    const usersContainer = document.getElementById("users-container");
    const filterSelect = document.getElementById("filter-select"); // Dropdown for filtering

    if (!usersContainer || !filterSelect) {
        console.error("Error: Missing elements.");
        return;
    }

    let allUsers = []; // Store fetched users

    // Fetch all users from the API
    async function fetchUsers() {
        try {
            const response = await fetch("https://demo-api-skills.vercel.app/api/VolunteerOrg/users");
            const data = await response.json();

            if (!data.users || !Array.isArray(data.users)) {
                throw new Error("Unexpected API response format");
            }

            console.log("Fetched Users:", data.users);
            return data.users; // Return the fetched users
        } catch (error) {
            console.error("Error fetching users:", error);
            return []; // Return an empty array to avoid breaking displayUsers()
        }
    }

    // Display users in the usersContainer div
    function displayUsers(users) {
        usersContainer.innerHTML = ""; // Clear previous content

        if (users.length === 0) {
            usersContainer.innerHTML = "<p>No users available.</p>";
            return;
        }

        const userList = document.createElement("ul");
        userList.classList.add("user-list"); // Optional: Add a class for styling

        users.forEach((user) => {
            const listItem = document.createElement("li");
            listItem.classList.add("user-item"); // Optional: Add a class for styling

            const createdAt = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A";

            listItem.innerHTML = `
                <strong>Name:</strong> ${user.name} <br>
                <strong>Email:</strong> ${user.email} <br>
                <strong>Created At:</strong> ${createdAt} 
                <hr>
            `;

            userList.appendChild(listItem);
        });

        usersContainer.appendChild(userList);
    }

    // Filter users based on selected email domain
    function filterUsers(filter) {
        let filteredUsers = allUsers;

        if (filter === "@org.com") {
            filteredUsers = allUsers.filter(user => user.email.endsWith("@org.com"));
        } else if (filter === "@user.com") {
            filteredUsers = allUsers.filter(user => user.email.endsWith("@user.com"));
        } 
        // No filter for "all", it just uses allUsers

        displayUsers(filteredUsers);
    }

    // Fetch users and set up filtering
    allUsers = await fetchUsers(); // Fetch users once
    displayUsers(allUsers); // Display initially

    // Event listener for dropdown filter change
    filterSelect.addEventListener("change", () => {
        const selectedFilter = filterSelect.value;
        filterUsers(selectedFilter);
    });
});

// Logout Function
function logout() {
    localStorage.removeItem("user_data");
    window.location.href = "../../../../../index.html";
}

// Logout Button Event Listener
const logoutButton = document.getElementById("logout-btn");
if (logoutButton) {
    logoutButton.addEventListener("click", logout);
}
