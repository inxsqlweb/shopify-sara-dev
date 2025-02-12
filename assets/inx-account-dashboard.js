/*Initialize the dashboard functionality.*/
document.addEventListener("DOMContentLoaded", function () {
 
  
  // Event delegation for order details
  document.addEventListener("click", function (event) {
    if (event.target.matches(".jsOrderDetailsLink")) {
      event.preventDefault();
      const orderId = event.target.getAttribute("data-order-id");
      showOrderDetails(orderId);
    } else if (event.target.matches(".jsBackToOrders")) {
      showOrdersSection();
    }
  });

  
});

/*Show order details for a specific order ID.@param {string} orderId - The order ID to display details for.*/
function showOrderDetails(orderId) {
  const ordersSection = document.querySelector(`[data-type="orders"]`);
  //const paginationContainer = document.getElementById("pagination-container");
  const orderDetailsSection = document.getElementById("jsOrderDetailsSection");

  if (ordersSection) ordersSection.style.display = "none";
  //if (paginationContainer) paginationContainer.style.display = "none";
  if (orderDetailsSection) orderDetailsSection.style.display = "block";

  document.querySelectorAll(".jsOrderDetailsSection").forEach((box) => {
    box.style.display = box.id === `order-details-${orderId}` ? "block" : "none";
  });
}

/* Show the orders section and hide details.*/
function showOrdersSection() {
  const ordersSection = document.querySelector(`[data-type="orders"]`);
  //const paginationContainer = document.getElementById("pagination-container");
  const orderDetailsSection = document.getElementById("jsOrderDetailsSection");

  if (ordersSection) ordersSection.style.display = "block";
  //if (paginationContainer) paginationContainer.style.display = "block";
  if (orderDetailsSection) orderDetailsSection.style.display = "none";

  document.querySelectorAll(".jsOrderDetailsSection").forEach((box) => {
    box.style.display = "none";
  });
}
