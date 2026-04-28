let ctx = document.getElementById("chart").getContext("2d");

let chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "Heart Rate",
      data: [],
      borderColor: "cyan",
      borderWidth: 3
    }]
  },
  options: {
    plugins: {
      legend: {
        labels: {
          color: "white"
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "white" }
      },
      y: {
        ticks: { color: "white" }
      }
    }
  }
});

setInterval(() => {

  let heart = Math.floor(Math.random() * 40) + 60;
  let temp = (Math.random() * 2 + 36).toFixed(1);
  let air = Math.floor(Math.random() * 200);
  let water = Math.floor(Math.random() * 100);

  document.getElementById("heart").innerText = heart;
  document.getElementById("temp").innerText = temp;
  document.getElementById("air").innerText = air;
  document.getElementById("water").innerText = water;

  updateColor("heart", heart > 100);
  updateColor("temp", temp > 38);
  updateColor("air", air > 150);
  updateColor("water", water > 80);

  // GRAPH UPDATE
  chart.data.labels.push("");
  chart.data.datasets[0].data.push(heart);

  if (chart.data.labels.length > 10) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  }

  chart.update();

}, 3000);

function updateColor(id, condition) {
  let card = document.getElementById(id).parentElement;

  if (condition) {
    card.style.border = "2px solid red";
  } else {
    card.style.border = "2px solid lime";
  }
}