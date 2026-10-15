const eventInput = document.getElementById("eventInput");
const result = document.getElementById("result");
const eventList = document.getElementById("eventList");
const searchInput = document.getElementById("search");
const totalCount = document.getElementById("total");
const threatCount = document.getElementById("threats");
const highRiskCount = document.getElementById("high");

const simulatedEvents = [
  { name: "Multiple failed logins", risk: "HIGH" },
  { name: "Unusual login time", risk: "MEDIUM" },
  { name: "Normal user login", risk: "LOW" },
  { name: "Unusual traffic spike", risk: "MEDIUM" },
  { name: "New device login", risk: "LOW" },
];

function classifyEvent(eventName) {
  const event = eventName.toLowerCase();

  if (
    /(multiple|repeated|brute.?force).*(failed login|login attempt)|\b(malware|ransomware|data exfiltration|unauthorized access)\b/.test(
      event,
    )
  ) {
    return "HIGH";
  }

  if (
    /\b(failed login|unusual|suspicious|traffic spike|unknown device)\b/.test(
      event,
    )
  ) {
    return "MEDIUM";
  }

  return "LOW";
}

function showResult(message, risk) {
  result.textContent = message;
  result.dataset.risk = risk;
  result.style.borderLeftColor =
    risk === "HIGH" ? "#fb7185" : risk === "MEDIUM" ? "#fbbf24" : "#4ade80";
}

function updateCounters(risk) {
  totalCount.textContent = String(Number(totalCount.textContent) + 1);

  if (risk !== "LOW") {
    threatCount.textContent = String(Number(threatCount.textContent) + 1);
  }

  if (risk === "HIGH") {
    highRiskCount.textContent = String(Number(highRiskCount.textContent) + 1);
  }
}

function addEventToHistory(eventName, risk) {
  const item = document.createElement("li");
  item.textContent = `${eventName} — ${risk}`;
  eventList.prepend(item);
  searchEvents();
}

function detectThreat() {
  const eventName = eventInput.value.trim();

  if (!eventName) {
    showResult("Please enter an event to analyze.", "MEDIUM");
    eventInput.focus();
    return;
  }

  const risk = classifyEvent(eventName);
  const message =
    risk === "HIGH"
      ? `High risk detected: ${eventName}`
      : risk === "MEDIUM"
        ? `Medium risk detected: ${eventName}`
        : `No immediate threat detected: ${eventName}`;

  showResult(message, risk);
}

function addEvent() {
  const event = simulatedEvents[Math.floor(Math.random() * simulatedEvents.length)];

  addEventToHistory(event.name, event.risk);
  updateCounters(event.risk);
  showResult(`Simulated event: ${event.name} — ${event.risk}`, event.risk);
}

function searchEvents() {
  const query = searchInput.value.trim().toLowerCase();

  for (const item of eventList.children) {
    item.hidden = !item.textContent.toLowerCase().includes(query);
  }
}