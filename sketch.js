const weatherURL = "https://raw.githubusercontent.com/fivethirtyeight/data/refs/heads/master/us-weather-history/KNYC.csv";

let weatherTable;
let temps = [];
let selectedMonth = 0; // Default to January (0)

let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function preload() {
  weatherTable = loadTable(weatherURL, 'csv', 'header');
}

function setup() {
  createCanvas(800, 400);
  noLoop();

  // Extract temperature data from the CSV file
  for (let i = 0; i < weatherTable.getRowCount(); i++) {
    let date = weatherTable.getString(i, 'date');
    let highTemp = weatherTable.getNum(i, 'actual_max_temp');
    let lowTemp = weatherTable.getNum(i, 'actual_min_temp');
    
    if (highTemp && lowTemp) {
      let tempDate = new Date(date); // Convert the date to a Date object
      temps.push({
        date: tempDate,
        highTemp: highTemp,
        lowTemp: lowTemp
      });
    }
  }
}

function draw() {
  background(220);

  // Filter data for the selected month
  let selectedData = temps.filter(day => day.date.getMonth() === selectedMonth);

  let minTemp = Math.min(...selectedData.map(day => day.lowTemp));
  let maxTemp = Math.max(...selectedData.map(day => day.highTemp));

  let dx = width / (selectedData.length + 2);

  // Draw the graph for the selected month
  for (let i = 0; i < selectedData.length; i++) {
    const x = (i + 1) * dx;
    const currentDay = selectedData[i];

    const yHigh = map(currentDay.highTemp, minTemp, maxTemp, height * 0.8, height * 0.2);
    const yLow = map(currentDay.lowTemp, minTemp, maxTemp, height * 0.8, height * 0.2);

    stroke('black');
    line(x, yHigh, x, yLow);

    noStroke();
    fill("red");
    circle(x, yHigh, 10);

    fill("blue");
    circle(x, yLow, 10);
  }

  // Display month title
  textSize(16);
  fill(0);
  text("High and Low Temperatures for " + months[selectedMonth], width / 2, 30);

  // Labels
  textSize(12);
  text("Temperature (°F)", width / 2, height - 20);
  text("Days", width / 2, height - 40);
}

// Handle key presses to change the selected month
function keyPressed() {
  if (keyCode === UP_ARROW) {
    selectedMonth = (selectedMonth === 0) ? 11 : selectedMonth - 1; // Move to previous month
    redraw(); // Redraw the graph with the new month
  } else if (keyCode === DOWN_ARROW) {
    selectedMonth = (selectedMonth === 11) ? 0 : selectedMonth + 1; // Move to next month
    redraw(); // Redraw the graph with the new month
  }
}
