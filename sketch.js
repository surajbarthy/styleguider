let colors = [];
let fonts = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop(); // Redraw only when styles are updated

  // Add an event listener for the Generate button
  const generateButton = document.getElementById("generateButton");
  generateButton.addEventListener("click", fetchStyles);
}

function draw() {
  background(240);

  if (colors.length === 0 || fonts.length === 0) {
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(100);
    text("Enter a URL to generate a branding guide!", width / 2, height / 2);
    return;
  }

  // Display Colors
  textSize(18);
  textAlign(LEFT, TOP);
  fill(0);
  text("Colors:", 20, 20);

  colors.forEach((color, index) => {
    fill(color);
    rect(20 + index * 60, 50, 50, 50);
  });

  // Display Fonts
  textSize(18);
  fill(0);
  text("Fonts:", 20, 120);

  fonts.forEach((font, index) => {
    textSize(16);
    textFont(font);
    text(font, 20, 150 + index * 30);
  });
}

async function fetchStyles() {
  const url = document.getElementById("urlInput").value;
  if (!url) {
    alert("Please enter a URL!");
    return;
  }

  try {
    // Replace with your deployed backend URL
    const response = await fetch(
      `https://styleguider-backend-3d011947f576.herokuapp.com/extractStyles?url=${encodeURIComponent(url)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch styles from the backend.");
    }

    const data = await response.json();
    colors = data.colors;
    fonts = data.fonts;

    // Trigger a redraw
    redraw();
  } catch (error) {
    console.error("Error fetching styles:", error);
    alert("Failed to fetch styles. Try again.");
  }
}
