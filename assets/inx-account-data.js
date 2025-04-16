window.callInxsqlProxy = async function (actionType, bodyData) {
  try {
    let endpoint;
    switch (actionType) {
      case "cart":
        endpoint = `https://sara-dev-site.myshopify.com/apps/proxy?action=${actionType}`;
        break;
      default:
        throw new Error(`Unknown actionType: ${actionType}`);
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      throw new Error(
        `Network response not OK: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log("INxSQL cart proxy response:", data);
    return data;
  } catch (error) {
    console.error(`Error calling cart proxy: ${error}`);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const dashboardLinks = document.querySelectorAll(".jsDashboardLink");

  dashboardLinks.forEach((link) => {
    link.addEventListener("click", async function (event) {
      const acctIconClass =
        link.getElementsByClassName("jsAcctIcon")[0].classList;
      const targetUrl = link.getAttribute("href"); // Get the link
      const actionType = link.dataset.action; // Action identifier (e.g., "orders", "invoices")
      let endpoint;
      event.preventDefault(); // Prevent default navigation
      acctIconClass.add("fa-spinner", "fa-pulse");

      switch (actionType) {
        case "orders":
          endpoint = `https://sara-dev-site.myshopify.com/apps/proxy?action=${actionType}`;
          break;
        case "blanket":
          endpoint = `https://sara-dev-site.myshopify.com/apps/proxy?action=${actionType}`;
          break;
        case "quotes":
          endpoint = `https://sara-dev-site.myshopify.com/apps/proxy?action=${actionType}`;
          break;
        case "rma":
          endpoint = `https://sara-dev-site.myshopify.com/apps/proxy?action=${actionType}`;
          break;
        case "openInvoices":
          endpoint = `https://sara-dev-site.myshopify.com/apps/proxy?action=${actionType}`;
          break;
        case "invoiceHistory":
          endpoint = `https://sara-dev-site.myshopify.com/apps/proxy?action=${actionType}`;
          break;
        default:
          throw new Error(`Unknown actionType: ${actionType}`);
      }
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(
            `Network response not OK: ${response.status} ${response.statusText}`,
          );
        }
        const data = await response.json();
        console.log(`Data for ${actionType}:`, data);

        // Store fetched data
        sessionStorage.setItem(`${actionType}Data`, JSON.stringify(data));

        // Navigate to the page after success
        window.location.href = targetUrl;
      } catch (error) {
        console.error(`Try/Catch Error: inx-account-data.js: fetch request`);
      } finally {
        // Stop the spinner (optional, depend on US preference)
        acctIconClass.remove("fa-spinner", "fa-pulse");
      }
    });
  });
});