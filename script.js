let isConnected = false;
let interval = null;
let chart = null;

window.onload = function () {

  console.log("JS LOADED ✅");

  // CONNECT BUTTON
  document.getElementById("connectBtn").addEventListener("click", toggleConnection);

  // CREATE GRAPH
  let canvas = document.getElementById("chart");
  let ctx = canvas.getContext("2d");

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
  {
    label: "Heart",
    data: [],
    borderColor: "cyan",
    borderWidth: 2,
    tension: 0.3
  },
  {
    label: "Temp",
    data: [],
    borderColor: "orange",
    borderWidth: 2,
    tension: 0.3
  },
  {
    label: "Air",
    data: [],
    borderColor: "lime",
    borderWidth: 2,
    tension: 0.3
  },
  {
    label: "Water",
    data: [],
    borderColor: "blue",
    borderWidth: 2,
    tension: 0.3
  }
]
      
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

};

// CONNECT / DISCONNECT
function toggleConnection() {

  let status = document.getElementById("status");
  let btn = document.getElementById("connectBtn");

  if (!isConnected) {

    btn.innerText = "Disconnect";
    status.innerText = "✅ Connected";

    startSystem();

  } else {

    btn.innerText = "Connect";
    status.innerText = "❌ Disconnected";

    stopSystem();
  }

  isConnected = !isConnected;
}

// START DATA
function startSystem() {

  interval = setInterval(() => {

    let heart = Math.floor(Math.random() * 120);
    let temp = (Math.random() * 5 + 35).toFixed(1);
    let air = Math.floor(Math.random() * 200);
    let water = Math.floor(Math.random() * 100);

    document.getElementById("heart").innerText = heart;
    document.getElementById("temp").innerText = temp;
    document.getElementById("air").innerText = air;
    document.getElementById("water").innerText = water;

    // GRAPH UPDATE (SAFE)
    if (chart && chart.data) {

      chart.data.labels.push("");
      chart.data.datasets[0].data.push(heart);
      chart.data.datasets[1].data.push(temp);
      chart.data.datasets[2].data.push(air);
      chart.data.datasets[3].data.push(water);

      if (chart.data.labels.length > 10) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
      }

      chart.update();
    }

    // SIMPLE WARNING
    let status = document.getElementById("status");

    if (heart > 100) {
      status.innerText = "⚠️ High Heart Rate";
    } else if (temp > 38) {
      status.innerText = "⚠️ High Temperature";
    } else if (air > 150) {
      status.innerText = "⚠️ Air Pollution High";
    } else if (water > 80) {
      status.innerText = "⚠️ Water Level High";
    } else {
      status.innerText = "✅ Normal";
    }

  }, 2000);
}

// STOP
function stopSystem() {
  clearInterval(interval);
}

// NAVIGATION
function showAI() {
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("aiPage").style.display = "block";
}

function showDashboard() {
  document.getElementById("dashboard").style.display = "block";
  document.getElementById("aiPage").style.display = "none";
}

// SIMPLE AI CHAT
function send() {
  let input = document.getElementById("userInput").value;
  if (!input) return;

  let box = document.getElementById("chatBox");

  box.innerHTML += "<div>You: " + input + "</div>";
  box.innerHTML += "<div>AI: Hello bro 😎</div>";

  document.getElementById("userInput").value = "";
}
