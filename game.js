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
let y2 = 332;
let xWidth2 = 40;
let yHeight2 = 40;
let moveStep2 = 5;
let gravity2 = 1;
let jump2 = -15;
let jumpVelo2 = 0;
let isJump2 = false;

coinVisible = true;

// Platform variables
let platforms = [
  { x: 165, y: 300, width: 100, height: 20 },
  { x: 315, y: 240, width: 100, height: 20 },
  { x: 500, y: 250, width: 150, height: 20 },
  { x: 670, y: 300, width: 150, height: 20 },
];

// Coin array
let coin = [{ x: 200, y: 300, width: 20, height: 20 }];

// Scrolling variables
let scrollOffset = 0;
let scrollSpeed = 3;

// Ground segments
let groundSegments = [{ x: 0, width: 1200 }];

// Stop character
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

    // STAY ON platform
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

    // STAY ON ground
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
    if (y1 > height || y2 >= height) {
      char1Stopped = true;
      char2Stopped = true;
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

    // STAY ON PLATFORM
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

    // STAY ON GROUND
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
  for (let platform of platforms) {
    if (isOnPlatform(x, y, width, height, velocity, platform)) {
      return true;
    }
  }

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

  if (!char1Stopped || !char2Stopped) {
    moving();
  }

  if (!char1Stopped) charOne();
  if (!char2Stopped) charTwo();

  drawPlatforms();
  ground();
  drawCoins();
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
  let baseY = y1 + 230; // Adjusted for ground level

  noStroke();
  // Antenna
  fill(0, 110, 0);
  rect(x1 - 49, baseY - 318, 5, 23);
  ellipse(x1 - 47, baseY - 318, 10);
  push();
  fill(0, 255, 0);
  rect(x1 - 41, baseY - 318, 5, 23);
  ellipse(x1 - 39, baseY - 318, 12);
  fill(255);
  stroke(200);
  arc(x1 - 35, baseY - 318, 5, 7, -HALF_PI, HALF_PI, PI);
  fill(0);
  noStroke();
  arc(x1 - 33, baseY - 318, 3, 5, -HALF_PI, HALF_PI, PI);
  pop();

  // Body
  fill(0, 255, 0);
  ellipse(x1 - 39, baseY - 242, 55, 75);
  ellipse(x1 - 39, baseY - 282, 45);

  // Spots
  push();
  fill(255, 225, 0);
  arc(x1 - 22, baseY - 239, 26, 46, -HALF_PI, HALF_PI, PI);
  ellipse(x1 - 49, baseY - 289, 17);
  ellipse(x1 - 37, baseY - 280, 7);
  ellipse(x1 - 45, baseY - 275, 10);
  ellipse(x1 - 33, baseY - 258, 12);
  ellipse(x1 - 43, baseY - 256, 8);
  ellipse(x1 - 51, baseY - 220, 10);
  ellipse(x1 - 47, baseY - 230, 8);
  ellipse(x1 - 59, baseY - 240, 12);
  ellipse(x1 - 58, baseY - 227, 4);
  ellipse(x1 - 31, baseY - 226, 4);
  ellipse(x1 - 51, baseY - 236, 4);
  ellipse(x1 - 29, baseY - 217, 8);
  ellipse(x1 - 27, baseY - 250, 4);
  ellipse(x1 - 28, baseY - 234, 4);
  ellipse(x1 - 38, baseY - 288, 4);
  ellipse(x1 - 55, baseY - 276, 4);
  ellipse(x1 - 37, baseY - 273, 4);
  pop();

  // Face
  push();
  stroke(200);
  fill(255);
  arc(x1 - 19, baseY - 287, 15, 22, -HALF_PI, HALF_PI, PI);
  fill(0);
  noStroke();
  arc(x1 - 13, baseY - 287, 10, 12, -HALF_PI, HALF_PI, PI);
  pop();

  // Leg
  push();
  rect(x1 - 57, baseY - 218, 15, 25);
  ellipse(x1 - 45, baseY - 194, 25, 10);
  pop();

  // Arm
  push();
  stroke(0, 110, 0);
  rect(x1 - 44, baseY - 257, 10, 25);
  pop();
  push();
  noStroke();
  rect(x1 - 43, baseY - 258, 8, 4);
  pop();

  // Hand
  push();
  stroke(0, 110, 0);
  ellipse(x1 - 39, baseY - 232, 10);
  pop();
  push();
  noStroke();
  rect(x1 - 43, baseY - 238, 8, 5);
  pop();

  push();
  stroke(0, 110, 0);
  fill(0, 255, 0);
  arc(x1 - 39, baseY - 229, 3, 10, 0, 3, PI);
  arc(x1 - 35, baseY - 231, 3, 10, 5, 3, PI);
  arc(x1 - 43, baseY - 231, 3, 10, 7, 3, PI);
  pop();
}

function charTwo() {
  let baseY = y2 + 230; // Adjusted for ground level

  noStroke();
  // Antenna
  fill(0, 80, 110);
  rect(x2 - 49, baseY - 318, 5, 23);
  ellipse(x2 - 47, baseY - 318, 10);
  push();
  fill(0, 200, 255);
  rect(x2 - 41, baseY - 318, 5, 23);
  ellipse(x2 - 39, baseY - 318, 12);
  fill(255);
  stroke(200);
  arc(x2 - 35, baseY - 318, 5, 7, -HALF_PI, HALF_PI, PI);
  fill(0);
  noStroke();
  arc(x2 - 33, baseY - 318, 3, 5, -HALF_PI, HALF_PI, PI);
  pop();

  // Body
  fill(0, 200, 255);
  ellipse(x2 - 39, baseY - 242, 60, 70);
  ellipse(x2 - 39, baseY - 282, 45);

  // Spots
  push();
  fill(255, 200, 200);
  arc(x2 - 20, baseY - 241, 30, 48, -HALF_PI, HALF_PI, PI);
  ellipse(x2 - 49, baseY - 289, 17);
  ellipse(x2 - 37, baseY - 280, 7);
  ellipse(x2 - 45, baseY - 275, 10);
  ellipse(x2 - 33, baseY - 258, 12);
  ellipse(x2 - 43, baseY - 256, 8);
  ellipse(x2 - 51, baseY - 220, 10);
  ellipse(x2 - 47, baseY - 230, 8);
  ellipse(x2 - 59, baseY - 240, 12);
  ellipse(x2 - 58, baseY - 227, 4);
  ellipse(x2 - 31, baseY - 226, 4);
  ellipse(x2 - 51, baseY - 236, 4);
  ellipse(x2 - 29, baseY - 217, 8);
  ellipse(x2 - 27, baseY - 250, 4);
  ellipse(x2 - 28, baseY - 234, 4);
  ellipse(x2 - 38, baseY - 288, 4);
  ellipse(x2 - 55, baseY - 276, 4);
  ellipse(x2 - 37, baseY - 273, 4);
  pop();

  // Face
  push();
  stroke(200);
  fill(255);
  arc(x2 - 19, baseY - 287, 15, 22, -HALF_PI, HALF_PI, PI);
  fill(0);
  noStroke();
  arc(x2 - 13, baseY - 287, 10, 12, -HALF_PI, HALF_PI, PI);
  pop();

  // Leg
  push();
  rect(x2 - 47, baseY - 218, 15, 25);
  ellipse(x2 - 37, baseY - 194, 20, 10);
  pop();

  // Arm
  push();
  stroke(0, 0, 110);
  rect(x2 - 44, baseY - 257, 10, 25);
  pop();
  push();
  noStroke();
  rect(x2 - 43, baseY - 258, 8, 4);
  pop();

  // Hand
  push();
  stroke(0, 0, 110);
  ellipse(x2 - 39, baseY - 232, 10);
  pop();
  push();
  noStroke();
  rect(x2 - 43, baseY - 238, 8, 5);
  pop();

  push();
  stroke(0, 0, 110);
  fill(0, 200, 255);
  arc(x2 - 39, baseY - 229, 3, 10, 0, 3, PI);
  arc(x2 - 35, baseY - 231, 3, 10, 5, 3, PI);
  arc(x2 - 43, baseY - 231, 3, 10, 7, 3, PI);
  pop();
}

function drawPlatforms() {
  fill(100, 23, 40);

  if (random(1) < 0.024) {
    let platformWidth = random(80, 120);
    let platformHeight = 20;
    let platformX = scrollOffset + width + random(50, 250);
    let platformY = random(100, 350);

    platforms.push({
      x: platformX,
      y: platformY,
      width: platformWidth,
      height: platformHeight,
    });
  }

  platforms = platforms.filter(
    (platform) => platform.x - scrollOffset + platform.width > 0
  );

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
    let gapChance = random(1) < 0.6;
    let gapWidth = gapChance ? random(80, 250) : 0;

    groundSegments.push({
      x: lastSegment.x + lastSegment.width + gapWidth,
      width: random(800, 100),
    });
  }

  if (groundSegments[0].x - scrollOffset + groundSegments[0].width < 0) {
    groundSegments.shift();
  }
}

function drawCoins() {
  fill(255, 255, 0);

  // Spawn new coins
  if (random(1) < 0.05) {
    let coinWidth = 20;
    let coinHeight = 20;
    let coinX = scrollOffset + width + random(50, 300);
    let coinY = random(100, 350);

    coin.push({
      x: coinX,
      y: coinY,
      width: coinWidth,
      height: coinHeight,
    });
  }

  // remove coins that are off screen
  coin = coin.filter((coin) => coin.x - scrollOffset + coin.width > 0);

  for (let i = coin.length - 1; i >= 0; i--) {
    let c = coin[i];
    ellipse(c.x - scrollOffset, c.y, c.width, c.height);

    //  collision with char1
    if (
      c.x - scrollOffset < x1 + xWidth1 &&
      c.x - scrollOffset + c.width > x1 &&
      c.y < y1 + yHeight1 &&
      c.y + c.height > y1
    ) {
      coin.splice(i, 1);
    }

    //  collision with char2
    else if (
      c.x - scrollOffset < x2 + xWidth2 &&
      c.x - scrollOffset + c.width > x2 &&
      c.y < y2 + yHeight2 &&
      c.y + c.height > y2
    ) {
      coin.splice(i, 1);
    }
  }
}
