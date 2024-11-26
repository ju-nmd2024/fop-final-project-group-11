// Variables char1
let x1 = 89;
let y1 = 342;
let xWidth1 = 40;
let yHeight1 = 40;
let moveStep1 = 5;
let gravity1 = 1;
let jump1 = -15;
let jumpVelo1 = 0;
let isJump1 = false;

// Variables char2
let x2 = 39;
let y2 = 342;
let xWidth2 = 40;
let yHeight2 = 40;
let moveStep2 = 5;
let gravity2 = 1;
let jump2 = -15;
let jumpVelo2 = 0;
let isJump2 = false;

// Platform variables
let platforms = [
  { x: 165, y: 300, width: 100, height: 20 },
  { x: 315, y: 240, width: 100, height: 20 },
  { x: 500, y: 250, width: 150, height: 20 },
];

function setup() {
  createCanvas(1200, 500);
  background(255);
}

// Mechanics
function moving() {
  if (keyIsDown(RIGHT_ARROW)) {
    x1 += moveStep1;
  }
  if (keyIsDown(LEFT_ARROW)) {
    x1 -= moveStep1;
  }

  if (isJump1 || !isOnAnyPlatform(x1, y1, xWidth1, yHeight1, jumpVelo1)) {
    y1 += jumpVelo1;
    jumpVelo1 += gravity1;
  }

  for (let platform of platforms) {
    if (
      isOnPlatform(x1, y1, xWidth1, yHeight1, jumpVelo1, platform) &&
      y1 + yHeight1 + jumpVelo1 >= platform.y
    ) {
      y1 = platform.y - yHeight1;
      isJump1 = false;
      jumpVelo1 = 0; // Reset
    }
  }

  // Reset
  if (y1 >= 342) {
    y1 = 342;
    isJump1 = false;
    jumpVelo1 = 0;
  }
  x1 = constrain(x1, 0, 1000 - xWidth1);
  y1 = constrain(y1, 0, height - yHeight1);

  // Character 2 movement
  if (keyIsDown(68)) {
    x2 += moveStep2;
  }
  if (keyIsDown(65)) {
    x2 -= moveStep2;
  }

  if (isJump2 || !isOnAnyPlatform(x2, y2, xWidth2, yHeight2, jumpVelo2)) {
    y2 += jumpVelo2;
    jumpVelo2 += gravity2;
  }

  for (let platform of platforms) {
    if (
      isOnPlatform(x2, y2, xWidth2, yHeight2, jumpVelo2, platform) &&
      y2 + yHeight2 + jumpVelo2 >= platform.y
    ) {
      y2 = platform.y - yHeight2;
      isJump2 = false;
      jumpVelo2 = 0;
    }
  }

  if (y2 >= 342) {
    y2 = 342;
    isJump2 = false;
    jumpVelo2 = 0;
  }
  x2 = constrain(x2, 0, 1000 - xWidth2);
  y2 = constrain(y2, 0, height - yHeight2);
}

function isOnPlatform(x, y, width, height, velocity, platform) {
  return (
    x + width > platform.x &&
    x < platform.x + platform.width &&
    y + height <= platform.y &&
    y + height + velocity >= platform.y
  );
}

function isOnAnyPlatform(x, y, width, height, velocity) {
  for (let platform of platforms) {
    if (isOnPlatform(x, y, width, height, velocity, platform)) {
      return true;
    }
  }
  return false;
}

function draw() {
  clear();
  background(255);
  moving();
  charOne();
  charTwo();
  drawPlatforms();
  ground();
}

// keypresses
function keyPressed() {
  if (
    keyCode === UP_ARROW &&
    (!isJump1 || isOnAnyPlatform(x1, y1, xWidth1, yHeight1, jumpVelo1))
  ) {
    isJump1 = true;
    jumpVelo1 = jump1;
  }
  if (
    keyCode === 87 &&
    (!isJump2 || isOnAnyPlatform(x2, y2, xWidth2, yHeight2, jumpVelo2))
  ) {
    isJump2 = true;
    jumpVelo2 = jump2;
  }
}

// Draw Character 1
function charOne() {
  fill(255, 0, 0);
  rect(x1, y1, xWidth1, yHeight1);
}

// Draw Character 2
function charTwo() {
  fill(0, 0, 255);
  rect(x2, y2, xWidth2, yHeight2);
}

// Draw Platforms
function drawPlatforms() {
  fill(100, 23, 40);
  for (let platform of platforms) {
    rect(platform.x, platform.y, platform.width, platform.height);
  }
}

// Draw Ground
function ground() {
  fill(0, 255, 0);
  rect(0, 382, 1000, height - 382);
}
