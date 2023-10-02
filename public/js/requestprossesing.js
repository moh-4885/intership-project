const acceptButton = document.getElementById("acceptButton");
const denyButton = document.getElementById("denyButton");
const hiddeninput = document.getElementById("id");
const btn = document.getElementById("btn");
// const btn2 = document.getElementById("btn2");

btn.addEventListener("click", () => {
  window.location.href = "http://localhost:3000/";
});

const id = hiddeninput.value;

// Function to handle the "Accept" action
acceptButton.addEventListener("click", () => {
  const action = "accept";

  // Send a PUT request to update the status
  fetch(`http://localhost:3000/admin/request/proccess`, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action,
      id: id,
    }),
  })
    .then((response) => {
      if (response.ok) {
        // Update the status on the frontend
        window.location.href = "http://localhost:3000/admin";
      } else {
        // Handle errors here
        console.error("Request failed.");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

// Function to handle the "Deny" action
denyButton.addEventListener("click", () => {
  const action = "deny";

  // Send a PUT request to update the status
  fetch(`http://localhost:3000/admin/request/proccess`, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action, id: id }),
  })
    .then((response) => {
      if (response.ok) {
        // Update the status on the frontend
        window.location.href = "http://localhost:3000/admin";
      } else {
        // Handle errors here
        console.error("Request failed.");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
