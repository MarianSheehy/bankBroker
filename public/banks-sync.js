document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".js-sync-item");

  buttons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const itemId = btn.dataset.itemId;
      if (!itemId) return;

      btn.disabled = true;
      const oldText = btn.textContent;
      btn.textContent = "Syncing...";

      try {
        const res = await fetch("/api/plaid/transactions/sync", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId }),
        });

        if (!res.ok) {
          console.error("Sync failed", res.status);
          alert("Sync failed for this bank item");
        } else {
          alert("Sync complete for this bank item");
        }
      } catch (err) {
        console.error("Sync error", err);
        alert("Error syncing this bank item");
      } finally {
        btn.disabled = false;
        btn.textContent = oldText;
      }
    });
  });
});
