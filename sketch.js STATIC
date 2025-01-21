const weatherURL = "https://raw.githubusercontent.com/fivethirtyeight/data/refs/heads/master/us-weather-history/KNYC.csv";

let weatherTable;
let temps = [];
let minTemp = Infinity;
let maxTemp = -Infinity;

function preload() {
  weatherTable = loadTable(weatherURL, 'csv', 'header');
}

function setup() {
  createCanvas(800, 400);
  
  // Extract temperature data from 'actual_mean_temp' 
  for (let i = 0; i < weatherTable.getRowCount(); i++) {
    let highTemp = weatherTable.getNum(i, 'actual_max_temp');  
    let lowTemp = weatherTable.getNum(i, 'actual_min_temp');   
    
    // If valid data, add to the temps array
    if (highTemp && lowTemp) {
      if (lowTemp < minTemp) minTemp = lowTemp;
      if (highTemp > maxTemp) maxTemp = highTemp;
      temps.push({ highTemp, lowTemp });
    }
  }
  
  console.log(temps); 
}

function draw() {
  background(220);
  
  let dx = width / (temps.length + 2);  // Calculate spacing between days
  
  for (let i = 0; i < temps.length; i++) {
    const x = (i + 1) * dx;
    const currentDay = temps[i];
    
    // Map temperatures to the canvas 
    const yHigh = map(currentDay.highTemp, minTemp, maxTemp, height * 0.8, height * 0.2);
    const yLow = map(currentDay.lowTemp, minTemp, maxTemp, height * 0.8, height * 0.2);
    
    // Draw the temperature line
    stroke('black');
    line(x, yHigh, x, yLow);
    
    // Draw the circles for high and low temperatures
    noStroke();
    
    fill("red");
    circle(x, yHigh, 10);
    
    fill("blue");
    circle(x, yLow, 10);
    
    // Display the high temperature if it's the maximum
    if (currentDay.highTemp === maxTemp) {
      fill('black');
      text(int(currentDay.highTemp), x, yHigh - 10);
    }
    
    // Display the low temperature if it's the minimum
    if (currentDay.lowTemp === minTemp) {
      fill('black');
      text(int(currentDay.lowTemp), x, yLow + 15);
    }
  }
}
