async function loadResults() {
  const params = new URLSearchParams(window.location.search);
  const jobId = params.get("jobId");

  const res = await fetch(`YOUR_DATASTORE_PUBLIC_URL/${jobId}`);
  const data = await res.json();

  const container = document.getElementById("resultsContainer");

  function createSection(title, contentHTML) {
    const section = document.createElement("div");
    section.className = "section";

    const header = document.createElement("div");
    header.className = "section-header";
    header.textContent = title;

    const content = document.createElement("div");
    content.className = "section-content";
    content.innerHTML = contentHTML;

    header.onclick = () => {
      content.style.display = content.style.display === "block" ? "none" : "block";
    };

    section.appendChild(header);
    section.appendChild(content);
    container.appendChild(section);
  }

  createSection("Raw Colours", data.colors.raw.map(c =>
    `<div class="color-swatch" style="background:${c.hex}"></div>
     <div>${c.hex} (${c.rgb})</div>`
  ).join(""));

  createSection("Cleaned Palette", `
    <p><strong>Primary:</strong> ${data.colors.cleaned.primary}</p>
    <p><strong>Secondary:</strong> ${data.colors.cleaned.secondary}</p>
    <p><strong>Accent:</strong> ${data.colors.cleaned.accent}</p>
  `);

  createSection("Fonts", `
    <p><strong>Headline:</strong> ${data.fonts.headline}</p>
    <p><strong>Body:</strong> ${data.fonts.body}</p>
  `);

  const imageCategories = data.images;
  for (const [category, imgs] of Object.entries(imageCategories)) {
    createSection(category.toUpperCase(), imgs.map(src =>
      `<img src="${src}" class="image-thumb">
       <div class="download-btn" onclick="window.open('${src}')">Download</div>`
    ).join(""));
  }

  createSection("Text Summaries", `
    <p><strong>Description:</strong> ${data.text.description}</p>
    <p><strong>About:</strong> ${data.text.about}</p>
  `);

  createSection("Metadata", `
    <p><strong>Domain:</strong> ${data.metadata.domain}</p>
  `);

  document.getElementById("shareBtn").onclick = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied");
  };

  document.getElementById("downloadJsonBtn").onclick = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "brand-kit.json";
    a.click();
  };
}

loadResults();
