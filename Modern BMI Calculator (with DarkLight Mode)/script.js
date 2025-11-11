const body = document.body;
const toggle = document.getElementById('themeToggle');
const progressCircle = document.querySelector('.progress');
const bmiValueText = document.getElementById('bmiValue');
const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const result = document.getElementById("result");
const category = document.getElementById("category");

// ===== Always Load in Dark Mode =====
body.classList.add('dark');
localStorage.setItem('theme', 'dark');

// ===== Theme Toggle =====
toggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

// ===== Live BMI Calculation =====
function calculateBMI() {
  const weight = parseFloat(weightInput.value);
  const height = parseFloat(heightInput.value);

  if (!weight || !height) {
    result.innerHTML = "⚠️ Please enter both weight and height!";
    category.innerHTML = "";
    bmiValueText.textContent = "--";
    updateGauge(0);
    return;
  }

  const heightM = height / 100;
  const bmi = (weight / (heightM * heightM)).toFixed(2);
  result.innerHTML = `Your BMI is: <b>${bmi}</b>`;
  bmiValueText.textContent = bmi;

  let bmiCategory, color;
  if (bmi < 18.5) {
    bmiCategory = "Underweight 🥗";
    color = "#f39c12";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    bmiCategory = "Normal Weight ✅";
    color = "#2ecc71";
  } else if (bmi >= 25 && bmi < 29.9) {
    bmiCategory = "Overweight ⚠️";
    color = "#e67e22";
  } else {
    bmiCategory = "Obese 🚨";
    color = "#e74c3c";
  }

  category.innerHTML = bmiCategory;
  category.style.color = color;

  updateGauge(bmi, color);
}

// ===== Gauge Animation =====
function updateGauge(bmi, color = "#4facfe") {
  const maxBMI = 40;
  const circumference = 2 * Math.PI * 90; // r = 90
  const progress = Math.min(bmi, maxBMI) / maxBMI;
  const offset = circumference - progress * circumference;
  progressCircle.style.strokeDasharray = circumference;
  progressCircle.style.strokeDashoffset = offset;
  progressCircle.style.stroke = color;
}

// ===== Event Listeners for Live Update =====
weightInput.addEventListener('input', calculateBMI);
heightInput.addEventListener('input', calculateBMI);

// Initialize
updateGauge(0);
