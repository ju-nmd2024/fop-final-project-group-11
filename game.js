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
  { x: 670, y: 300, width: 150, height: 20 },
];

// Scrolling variables
let scrollOffset = 0;
let scrollSpeed = 2;

// Ground segments
let groundSegments = [{ x: 0, width: 1200 }];

// stop character
let char1Stopped = false;
let char2Stopped = false;

function setup() {
  createCanvas(1200, 500);
  background(255);
}

// Mechanics
function moving() {
  // Character 1 movement
  if (!char1Stopped) {
    if (keyIsDown(RIGHT_ARROW)) {
      x1 += moveStep1;
    }
    if (keyIsDown(LEFT_ARROW)) {
      x1 -= moveStep1;
    }

    // Apply gravity to Character 1
    if (isJump1 || !isOnAnyPlatform(x1, y1, xWidth1, yHeight1, jumpVelo1)) {
      y1 += jumpVelo1;
      jumpVelo1 += gravity1;
    }

    // Snap to platform
    for (let platform of platforms) {
      if (
        isOnPlatform(x1, y1, xWidth1, yHeight1, jumpVelo1, platform) &&
        y1 + yHeight1 + jumpVelo1 >= platform.y
      ) {
        y1 = platform.y - yHeight1;
        isJump1 = false;
        jumpVelo1 = 0;
      }
    }

    // Snap to ground segment
    for (let segment of groundSegments) {
      if (
        x1 + xWidth1 > segment.x - scrollOffset &&
        x1 < segment.x - scrollOffset + segment.width &&
        y1 + yHeight1 + jumpVelo1 >= 382
      ) {
        y1 = 382 - yHeight1;
        isJump1 = false;
        jumpVelo1 = 0;
      }
    }

    // Stop updates if character 1 falls into a gap
    if (y1 > height) {
      char1Stopped = true;
    }
  }

  // Character 2 movement
  if (!char2Stopped) {
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

    // Snap to platform
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

    // Snap to ground segment
    for (let segment of groundSegments) {
      if (
        x2 + xWidth2 > segment.x - scrollOffset &&
        x2 < segment.x - scrollOffset + segment.width &&
        y2 + yHeight2 + jumpVelo2 >= 382
      ) {
        y2 = 382 - yHeight2;
        isJump2 = false;
        jumpVelo2 = 0;
      }
    }

    // Stop updates if character 2 falls into a gap
    if (y2 > height) {
      char2Stopped = true;
    }
  }

  // Update scroll offset
  scrollOffset += scrollSpeed;
}

function isOnPlatform(x, y, width, height, velocity, platform) {
  return (
    x + width > platform.x - scrollOffset &&
    x < platform.x - scrollOffset + platform.width &&
    y + height <= platform.y &&
    y + height + velocity >= platform.y
  );
}

function isOnAnyPlatform(x, y, width, height, velocity) {
  // Check platforms
  for (let platform of platforms) {
    if (isOnPlatform(x, y, width, height, velocity, platform)) {
      return true;
    }
  }

  // Check ground segments
  for (let segment of groundSegments) {
    if (
      x + width > segment.x - scrollOffset &&
      x < segment.x - scrollOffset + segment.width &&
      y + height + velocity >= 382 &&
      y + height <= 382 + abs(velocity)
    ) {
      return true;
    }
  }

  return false;
}

function draw() {
  clear();
  background(255);

  // Only update if neither character has stopped
  if (!char1Stopped || !char2Stopped) {
    moving();
  }

  // Draw characters if they are still active
  if (!char1Stopped) charOne();
  if (!char2Stopped) charTwo();

  drawPlatforms();
  ground();
}

function keyPressed() {
  if (
    keyCode === UP_ARROW &&
    !char1Stopped &&
    (!isJump1 || isOnAnyPlatform(x1, y1, xWidth1, yHeight1, jumpVelo1))
  ) {
    isJump1 = true;
    jumpVelo1 = jump1;
  }
  if (
    keyCode === 87 &&
    !char2Stopped &&
    (!isJump2 || isOnAnyPlatform(x2, y2, xWidth2, yHeight2, jumpVelo2))
  ) {
    isJump2 = true;
    jumpVelo2 = jump2;
  }
}

function charOne() {
  fill(255, 0, 0);
  rect(x1, y1, xWidth1, yHeight1);
}

function charTwo() {
  fill(0, 0, 255);
  rect(x2, y2, xWidth2, yHeight2);
}

function drawPlatforms() {
  fill(100, 23, 40);

  // Add more platforms dynamically
  if (random(1) < 0.02) {
    // 10% chance to generate a platform per frame
    let platformWidth = random(80, 120);
    let platformHeight = 20;
    let platformX = scrollOffset + width + random(50, 300); // Place ahead of the screen
    let platformY = random(100, 350); // Random height

    platforms.push({
      x: platformX,
      y: platformY,
      width: platformWidth,
      height: platformHeight,
    });
  }

  // Remove platforms that move off-screen
  platforms = platforms.filter(
    (platform) => platform.x - scrollOffset + platform.width > 0
  );

  // Draw the platforms
  for (let platform of platforms) {
    rect(
      platform.x - scrollOffset,
      platform.y,
      platform.width,
      platform.height
    );
  }
}

function ground() {
  fill(0, 255, 0);

  for (let i = 0; i < groundSegments.length; i++) {
    let segment = groundSegments[i];
    rect(segment.x - scrollOffset, 382, segment.width, height - 382);
  }

  let lastSegment = groundSegments[groundSegments.length - 1];
  if (lastSegment.x - scrollOffset + lastSegment.width / 2 < width) {
    let gapChance = random(1) < 4;
    let gapWidth = gapChance ? random(50, 120) : 0;

    groundSegments.push({
      x: lastSegment.x + lastSegment.width + gapWidth,
      width: random(800, 100),
    });
  }

  if (groundSegments[0].x - scrollOffset + groundSegments[0].width < 0) {
    groundSegments.shift();
  }
}
