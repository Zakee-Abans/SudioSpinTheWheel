const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

// Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 44, value: "Free Gift", probability: 12.5 },
  { minDegree: 45, maxDegree: 89, value: "Spin Again", probability: 12.5 },
  { minDegree: 90, maxDegree: 134, value: "Free Gift", probability: 12.5 },
  { minDegree: 135, maxDegree: 179, value: "Better Luck Next Time", probability: 12.5 },
  { minDegree: 180, maxDegree: 224, value: "Spin Again", probability: 12.5 },
  { minDegree: 225, maxDegree: 269, value: "Better Luck Next Time", probability: 12.5 },
  { minDegree: 270, maxDegree: 314, value: "Free Gift", probability: 12.5 },
  { minDegree: 315, maxDegree: 359, value: "Spin Again", probability: 12.5 }
];



// Calculate total probability
const totalProbability = rotationValues.reduce((acc, cur) => acc + cur.probability, 0);

// Adjust probabilities to ensure they add up to 100%
rotationValues.forEach((item) => {
  item.probability = (item.probability / totalProbability) * 100;
});

// Create canvas gradients for pie slices with different colors
const createGradient = (ctx, x, y, radius, startColor, endColor) => {
  const gradient = ctx.createLinearGradient(x - radius, y - radius, x + radius, y + radius);
  gradient.addColorStop(0, startColor); // Start color in hex
  gradient.addColorStop(1, endColor);   // End color in hex
  return gradient;
};

// Set up the chart
const ctx = wheel.getContext('2d');

// Define different color gradients for each slice
const pieColors = [
  createGradient(ctx, 150, 150, 150, '#176400ff', '#24ca0bff'), // Gradient for "10 Points"
  createGradient(ctx, 150, 150, 150, '#ffffff', '#e7e4e4'), // Gradient for "Try Again"
  createGradient(ctx, 150, 150, 150, '#056400ff', '#2eca0bff'), // Gradient for "100 Points"
  createGradient(ctx, 150, 150, 150, '#ffffff', '#e7e4e4'), // Gradient for "Try Again"
  createGradient(ctx, 150, 150, 150, '#006400ff', '#11ca0bff'), // Gradient for "20 Points"
  createGradient(ctx, 150, 150, 150, '#ffffff', '#e7e4e4'), // Gradient for "Try Again"
  createGradient(ctx, 150, 150, 150, '#086400ff', '#4eca0bff'), // Gradient for "10 Points"
  createGradient(ctx, 150, 150, 150, '#ffffff', '#e7e4e4'), // Gradient for "Try Again"
  createGradient(ctx, 150, 150, 150, '#286400ff', '#31ca0bff'), // Gradient for "10 Points"
];

// Create chart
let myChart = new Chart(ctx, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [
  "Free Gift",
  "Spin Again",
  "Free Gift",
  "Better Luck\nNext Time",
  "Spin Again",
  "Better Luck\nNext Time",
  "Free Gift",
  "Spin Again"
]
,
    datasets: [{
      backgroundColor: pieColors,
      data: [1, 1, 1, 1, 1, 1, 1, 1], // Arbitrary values for slices
    }],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: { display: false },
      datalabels: {
        color: "#000000ff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: calculateFontSize() },
      },
    },
  },
});

// ... rest of your JavaScript code remains the same



// Function to calculate font size based on screen size
function calculateFontSize() {
  // You can adjust these values based on your specific requirements
  const screenSize = window.innerWidth;
  if (screenSize <= 768) {
    return 16; // Small screens
  } else if (screenSize <= 1024) {
    return 20; // Medium screens
  } else {
    return 26; // Large screens
  }
}

// Function to display value based on the randomAngle
const valueGenerator = (angleValue) => {
  let selectedValue = null;

  // Calculate cumulative probabilities
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      selectedValue = i.value;
      break;
    }
  }

  finalValue.innerHTML = `<p>Result: ${selectedValue}</p>`;
  spinBtn.disabled = false;
  
};

// Spinner count
let count = 0;
// 100 rotations for animation and last rotation for result
let resultValue = 101;

// Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  // Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  // Generate random degrees to stop at
  let randomDegree = generateRandomAngle();
  // Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    // Set rotation for pie chart
    myChart.options.rotation = myChart.options.rotation + resultValue;
    // Update chart with new value
    myChart.update();
    // If rotation > 360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});

// Function to generate a random angle based on probabilities
const generateRandomAngle = () => {
  const randomProbability = Math.random() * 100;
  let cumulativeProbability = 0;

  for (let i = 0; i < rotationValues.length; i++) {
    cumulativeProbability += rotationValues[i].probability;
    if (randomProbability <= cumulativeProbability) {
      return Math.floor(
        Math.random() * (rotationValues[i].maxDegree - rotationValues[i].minDegree + 1) +
          rotationValues[i].minDegree
      );
    }
  }
};

// Update font size on window resize
window.addEventListener("resize", () => {
  myChart.options.plugins.datalabels.font.size = calculateFontSize();
  myChart.update();
});



    function submitForm() {
      var formData = {
        name: document.getElementById('name').value,
        mobile: document.getElementById('mobile').value,
        nic: document.getElementById('nic').value,
        dob: document.getElementById('dob').value,
        email: document.getElementById('email').value,
      };
  
      fetch('https://script.google.com/macros/s/AKfycby5ulNFxm2R4iG1J2oRbK3PkgvgRf96dNOQWNQhpULMhNXUnDzeGifcwMpgsuhZflzV/exec', {
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (response.status === 200) {
          alert('Form data submitted successfully');
          // Redirect to spin.html after successful submission
          window.location.href = 'spin.html';
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Form submission failed');
      });
    }
 

