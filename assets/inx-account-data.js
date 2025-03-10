
 document.addEventListener("DOMContentLoaded", function () {
    const dashboardLinks = document.querySelectorAll(".jsDashboardLink");
  
    dashboardLinks.forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default navigation
  
        const targetUrl = link.getAttribute("href"); // Get the link
        const actionType = link.dataset.action; // Action identifier (e.g., "orders", "invoices")
  
        if (actionType) {
          fetchDataForAction(actionType)
            .then(() => {
              // Navigate to the page after fetching data
              window.location.href = targetUrl;
            })
            .catch((error) => {
              console.error("Error fetching data for action:", actionType, error);
            });
        }
      });
    });
  });
  
  /**
   * Fetch data based on the action type.
   * @param {string} actionType
   * @returns {Promise<void>}
   */
  function fetchDataForAction(actionType) {
    const endpointMap = {
      orders: "https://sara-dev-site.myshopify.com/apps/proxy?action=orders",
      blanket: "https://inxsql-test-store.myshopify.com/apps/proxy?action=blanket",
      quotes: "https://inxsql-test-store.myshopify.com/apps/proxy?action=quotes",
      rma: "https://inxsql-test-store.myshopify.com/apps/proxy?action=rma",
      openInvoices: "https://inxsql-test-store.myshopify.com/apps/proxy?action=openInvoices",
      invoiceHistory: "https://inxsql-test-store.myshopify.com/apps/proxy?action=invoiceHistory",
      // Add more action endpoints as needed
    };
  
    const endpoint = endpointMap[actionType];
  
    if (!endpoint) {
      return Promise.reject(new Error("Unknown action type: " + actionType));
    }
  
    return fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Data for ${actionType}:`, data);
        sessionStorage.setItem(`${actionType}Data`, JSON.stringify(data)); // Store fetched data
      });
  }