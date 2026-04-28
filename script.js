let isConnected = false;
let interval = null;
let chart1, chart2;

window.onload = function () {
  console.log("JS LOADED ✅");
  // CONNECT BUTTON
  document.getElementById("connectBtn").addEventListener("click", toggleConnection);

  // GRAPH 1 → Heart + Temp
  let ctx1 = document.getElementById("chart1").getContext("2d");
  chart1 = new Chart(ctx1, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Heart",
          data: [],
          borderColor: "cyan",
          tension: 0.3
        },
        {
          label: "Temp",
          data: [],
          borderColor: "orange",
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  // GRAPH 2 → Air + Water
  let ctx2 = document.getElementById("chart2").getContext("2d");
  chart2 = new Chart(ctx2, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Air",
          data: [],
          borderColor: "lime",
          tension: 0.3
        },
        {
          label: "Water",
          data: [],
          borderColor: "blue",
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
    // GRAPH 1
    chart1.data.labels.push("");
    chart1.data.datasets[0].data.push(heart);
    chart1.data.datasets[1].data.push(temp);
    // GRAPH 2
    chart2.data.labels.push("");
    chart2.data.datasets[0].data.push(air);
    chart2.data.datasets[1].data.push(water);

    // LIMIT SIZE
    if (chart1.data.labels.length > 10) {
      chart1.data.labels.shift();
      chart1.data.datasets.forEach(ds => ds.data.shift());
    }
    if (chart2.data.labels.length > 10) {
      chart2.data.labels.shift();
      chart2.data.datasets.forEach(ds => ds.data.shift());
    }

    chart1.update();
    chart2.update();
    // CONDITIONS

    updateCard("card-heart", heart > 100 || heart < 50);
    updateCard("card-temp", temp > 38 || temp < 35);
    updateCard("card-air", air > 150);
    updateCard("card-water", water > 80 || water < 20);
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

function updateCard(id, isDanger) {

  let card = document.getElementById(id);

  if (isDanger) {
    card.classList.add("danger");
    card.classList.remove("safe");
  } else {
    card.classList.add("safe");
    card.classList.remove("danger");
  }
 

}
