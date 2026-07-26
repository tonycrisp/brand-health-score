const form = document.querySelector("#analysis-form");
const input = document.querySelector("#brand-url");
const loading = document.querySelector("#loading");
const report = document.querySelector("#sample-report");

const previewReport = {
  score: 68,
  status: "Needs Attention",
  symptoms: [
    "The homepage leads with broad capability language instead of a sharp market position.",
    "The ideal customer and highest-value problem are not immediately obvious.",
    "Differentiation is implied through experience, but not stated as a memorable promise.",
  ],
  diagnosis:
    "CRISPx appears credible and capable, but its positioning asks visitors to interpret too much. The brand needs a narrower promise connecting a specific customer, business outcome, and reason to believe.",
  prescription:
    "Lead with one commercial outcome for one primary buyer. Support it with a concise category point of view, three proof points, and one clear next action.",
};

function normalizeUrl(value) {
  return new URL(value).toString();
}

function renderReport(url) {
  document.querySelector("#analyzed-url").textContent = url;
  document.querySelector("#score").textContent = previewReport.score;
  document.querySelector("#status").textContent = previewReport.status;
  document.querySelector("#diagnosis").textContent = previewReport.diagnosis;
  document.querySelector("#prescription").textContent = previewReport.prescription;

  const symptoms = document.querySelector("#symptoms");
  symptoms.replaceChildren(
    ...previewReport.symptoms.map((symptom) => {
      const item = document.createElement("li");
      item.textContent = symptom;
      return item;
    }),
  );
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let url;
  try {
    url = normalizeUrl(input.value);
  } catch {
    input.setCustomValidity("Enter a complete URL, including https://");
    input.reportValidity();
    return;
  }

  input.setCustomValidity("");
  loading.hidden = false;

  window.setTimeout(() => {
    renderReport(url);
    loading.hidden = true;
    report.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 650);
});

input.addEventListener("input", () => input.setCustomValidity(""));
