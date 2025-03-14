/* PAGINATION */
let currentPage = 1;
let currentActionType = "";
const pageSize = 10;
const pageInfo = document.getElementById("jsPageInfo");
const prevBtn = document.getElementById("jsPrevBtn");
const nextBtn = document.getElementById("jsNextBtn");
const paginationContainer = document.getElementById("jsPaginationContainer");

//We will store all .jsOrderRow elements and a separate "filteredRows"
let allRows = [];
let filteredRows = [];

/*Render the visible rows for the current page. @param {number} page - The current page number.@param {string} actionType - The section type (e.g., "orders", "invoices").*/
function renderPage(page, actionType) {
  const section = document.querySelector(`[data-type="${actionType}"]`);
  if (!section) return;

  const totalItems = parseInt(section.getAttribute("data-total"), 10);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  // Show only the rows for the current page
  const rowSelector = section.querySelectorAll(".jsOrderRow");
  rowSelector.forEach((row, index) => {
    // Skip rows in the totals table
    if (row.closest("#totals-table")){
      row.style.display = "flex";
    } else {
      row.style.display = index >= start && index < end ? "flex" : "none";
    }
  });

  updatePagination(totalItems);
}

/*Update the pagination controls.@param {number} totalItems - The total number of items.*/
function updatePagination(totalItems) {
  const totalPages = Math.ceil(totalItems / pageSize); 

  if (pageInfo) {
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  }
  if (prevBtn) {
    prevBtn.disabled = currentPage <= 1;
  }
  if (nextBtn) {
    nextBtn.disabled = currentPage >= totalPages;
  }
}

/* Navigate to the previous page. */
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage, currentActionType);
  }
}

 /* Navigate to the next page. */
function nextPage() {
  const section = document.querySelector(`[data-type="${currentActionType}"]`);
  const totalItems = parseInt(section.getAttribute("data-total"), 10);
  const totalPages = Math.ceil(totalItems / pageSize);

  if (currentPage < totalPages) {
    currentPage++;
    renderPage(currentPage, currentActionType);
  }
}

/*Initialize pagination for a section. @param {string} actionType - The type of action (e.g., "orders", "openInvoices").*/
function initializePagination(actionType) {
  currentActionType = actionType;
  currentPage = 1;
  renderPage(currentPage, actionType);
}
/*END PAGINATION*/


/*Initialize the dashboard functionality.*/
document.addEventListener("DOMContentLoaded", function () {
  /*Pagination Buttons*/ 
  if (prevBtn) prevBtn.addEventListener("click", prevPage);
  if (nextBtn) nextBtn.addEventListener("click", nextPage);
  // Determine the action type based on the active section
  const activeSection = document.querySelector("[data-type]");
  if (activeSection) {
    const actionType = activeSection.getAttribute("data-type");
    initializePagination(actionType);
  }
  
  /* Event delegation for order details */
  document.addEventListener("click", function (event) {
    if (event.target.matches(".jsOrderDetailsLink")) {
      event.preventDefault();
      const orderId = event.target.getAttribute("data-order-id");
      showOrderDetails(orderId);
      window.scrollTo(0, 0);
    } else if (event.target.matches(".jsBackToOrders")) {
      showOrdersSection();
      window.scrollTo(0, 0);
    }
  });

  /* Search for items within orders */
  const orderRows = document.querySelectorAll('.jsOrderRow');
  const itemSearch = document.getElementById('jsOrderItemSearch');

  itemSearch.addEventListener('input', function() {     
    const searchValue = this.value.trim().toLowerCase();
    const activeSection = document.querySelector("[data-type]");

      orderRows.forEach(row => {
        const rowItems = row.dataset.items;
            if (!searchValue || rowItems.includes(searchValue)) {
              row.style.display = '';
            } else {
              row.style.display = 'none';
            }
      })      

      if (searchValue) {
        //If we are searching, hide the pagination
        if (paginationContainer) paginationContainer.style.display = "none";
      }
        else {
          //If we are not searching, reinitialize pagination
          if (activeSection) {
            const actionType = activeSection.getAttribute("data-type");
            initializePagination(actionType);
          }
          if (paginationContainer) paginationContainer.style.display = "block";
        }
  });

  //Item search clear input button
  const clearInputButtons = document.querySelectorAll('.jsResetBtn');
  clearInputButtons.forEach(button => {
    button.addEventListener('click', function() {
      const input = this.closest('.jsResetInput').children[0]; // Find the closest parent, first child should be the input field      
          input.value = '';
          input.dispatchEvent(new Event('input', { bubbles: true }));        
      });
  });

});

/*Show order details for a specific order ID.@param {string} orderId - The order ID to display details for.*/
const ordersSection = document.querySelector(`[data-type="orders"]`);
const orderDetailsSection = document.getElementById("jsOrderDetailsSection");
const backToDashboard = document.getElementById("jsBackToDashboard");

function showOrderDetails(orderId) { 
  if (ordersSection) ordersSection.style.display = "none";
  if (paginationContainer) paginationContainer.style.display = "none";
  if (backToDashboard) backToDashboard.style.display = "none";
  if (orderDetailsSection) orderDetailsSection.style.display = "block";

  document.querySelectorAll(".jsOrderDetailsSection").forEach((box) => {
    box.style.display = box.id === `order-details-${orderId}` ? "block" : "none";
  });
}

/* Show the orders section and hide details.*/
function showOrdersSection() {  
  const itemSearch = document.getElementById('jsOrderItemSearch');
  const searchValue = itemSearch.value;

  if (ordersSection) ordersSection.style.display = "block";
  if (paginationContainer) {
    if (!searchValue) {
      paginationContainer.style.display = "block";
    }
      else {
        paginationContainer.style.display = "none";
      }
  }  
  
  if (backToDashboard) backToDashboard.style.display = "block";
  if (orderDetailsSection) orderDetailsSection.style.display = "none";

  document.querySelectorAll(".jsOrderDetailsSection").forEach((box) => {
    box.style.display = "none";
  });
}
