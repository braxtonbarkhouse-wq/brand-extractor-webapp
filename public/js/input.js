document.getElementById("extractBtn").onclick = async () => {
  const url = document.getElementById("urlInput").value.trim();
  const status = document.getElementById("status");

  if (!url) {
    status.textContent = "Please enter a valid URL.";
    return;
  }

  status.textContent = "Processing...";

  const response = await fetch("YOUR_MAKE_WEBHOOK_URL", {
    method: "POST",
    body: JSON.stringify({ url }),
    headers: { "Content-Type": "application/json" }
  });

  const data = await response.json();

  window.location.href = `results.html?jobId=${data.jobId}`;
};

