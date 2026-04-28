window.onload = function () {

  let sound = new Audio("alert.mp3");

  function speak(msg) {
    let s = new SpeechSynthesisUtterance(msg);
    speechSynthesis.speak(s);
  }

  // connection
  let isConnected = false;

  window.toggleConnection = function () {
    let status = document.getElementById("connectionStatus");
    let btn = document.getElementById("connectBtn");

    if (!isConnected) {
      status.innerText = "● Connected";
      status.className = "status-badge connected";
      btn.innerText = "Disconnect Devices";
      speak("Devices connected");
    } else {
      status.innerText = "● Disconnected";
      status.className = "status-badge disconnected";
      btn.innerText = "Connect Devices";
      speak("Devices disconnected");
    }

    isConnected = !isConnected;
  };

  // chart
  let ctx = document.getElementById("chart").getContext("2d");

  let chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [{
        label: "Heart Rate",
        data: [],
        borderColor: "cyan"
      }]
    }
  });

  // main loop
  setInterval(() => {

    let heart = Math.floor(Math.random()*40)+60;
    let temp = (Math.random()*2+36).toFixed(1);
    let air = Math.floor(Math.random()*200);
    let water = Math.floor(Math.random()*100);

    document.getElementById("heart").innerText = heart;
    document.getElementById("temp").innerText = temp;
    document.getElementById("air").innerText = air;
    document.getElementById("water").innerText = water;

    update("heart", heart>100);
    update("temp", temp>38);
    update("air", air>150);
    update("water", water>80);

    chart.data.labels.push("");
    chart.data.datasets[0].data.push(heart);

    if(chart.data.labels.length>10){
      chart.data.labels.shift();
      chart.data.datasets[0].data.shift();
    }

    chart.update();

    let statusText = document.getElementById("systemStatus");

    if (heart>100 || temp>38 || air>150 || water>80){
      statusText.innerText="⚠️ System Status: CRITICAL";
      statusText.style.color="red";
    } else {
      statusText.innerText="✅ System Status: NORMAL";
      statusText.style.color="lime";
    }

  },3000);

  function update(id, cond){
    let card=document.getElementById(id).parentElement;

    if(cond){
      card.classList.add("danger");
      card.classList.remove("safe");

      sound.play();
      speak("Warning");
    } else {
      card.classList.add("safe");
      card.classList.remove("danger");
    }
  }

};
