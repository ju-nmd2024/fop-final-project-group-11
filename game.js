//setup function
function setup() {
  createCanvas(1200, 500);
  createSpikePlatforms();
}
// Variables char1
let x1 = 89;
let y1 = 342;
let xWidth1 = 40;
let yHeight1 = 40;
let moveStep1 = 3;
let gravity1 = 1;
let jump1 = -15;
let jumpVelo1 = 0;
let isJump1 = false;
let jumpCount1 = 0;
let hasSpeedBoost1 = false;

// Variables char2
let x2 = 40;
let y2 = 332;
let xWidth2 = 40;
let yHeight2 = 40;
let moveStep2 = 3;
let gravity2 = 1;
let jump2 = -15;
let jumpVelo2 = 0;
let isJump2 = false;
let jumpCount2 = 0;
let hasSpeedBoost2 = false;

//variables not affected by char
coinVisible = true;
let score = 0;
const maxJump = 2;
let fallingObjects = [];
let gameState = "start";
let timer = 60;
let intervalID;
let isTimerActive = false;
let buttonX = 500;
let buttonY = 200;
let buttonW = 300;
let buttonH = 100;
let stars = []; // Array to store star positions

//variables, added after initital examination


//makes the buttons clickable
function mousePressed() {
  if (gameState === "start") {
    if (
      mouseX >= buttonX &&
      mouseX <= buttonX + buttonW &&
      mouseY >= buttonY &&
      mouseY <= buttonY + buttonH
    ) {
      gameState = "game"; // Change to game screen when button is clicked
    } else if (
      mouseX >= buttonX &&
      mouseX <= buttonX + buttonW &&
      mouseY >= buttonY + 150 &&
      mouseY <= buttonY + 150 + buttonH
    ) {
      gameState = "controls";
    }
  } else if (gameState === "controls") {
    if (
      mouseX >= buttonX &&
      mouseX <= buttonX + buttonW &&
      mouseY >= buttonY + 150 &&
      mouseY <= buttonY + 150 + buttonH
    ) {
      gameState = "start";
    }
  } else if (gameState === "lose") {
    if (
      mouseX >= buttonX &&
      mouseX <= buttonX + buttonW &&
      mouseY >= buttonY &&
      mouseY <= buttonY + buttonH
    ) {
      resetGame();
      gameState = "start";
    }
  } else if (gameState === "win") {
    if (
      mouseX >= buttonX &&
      mouseX <= buttonX + buttonW &&
      mouseY >= buttonY &&
      mouseY <= buttonY + buttonH
    ) {
      gameState = "nextLevel2";
    }
  } else if (gameState === "win2") {
    if (
      mouseX >= buttonX &&
      mouseX <= buttonX + buttonW &&
      mouseY >= buttonY &&
      mouseY <= buttonY + buttonH
    ) {
      gameState = "nextLevel3";
    }
  }
}
//the stars on the starscreen
function drawStars() {
  fill(255); // White color
  noStroke();
  let sx = random(width); // Random x position within the canvas width
  let sy = random(height);
  ellipse(sx, sy, 3);
}
//the startscreen
function startScreen() {
  drawStars();

  drawGradientBackground("#6C3483", "#5DADE2", "#FFB7C4");
  push();
  starsVisible = true;
  moon();
  drawStars();
  push();
  translate(200, 100);
  scale(0.8);
  clouds();
  pop();

  push();
  translate(80, 150);
  scale(0.6);
  clouds();
  pop();

  push();
  translate(400, 60);
  clouds();
  pop();
  //start button
  stroke(149, 156, 235);
  strokeWeight(10);
  fill(159, 166, 255);
  rect(buttonX, buttonY, buttonW, buttonH, 70);
  strokeWeight(3);
  fill(255);

  textAlign(CENTER, CENTER);
  textSize(36);
  text("START", buttonX + 150, buttonY + 50);

  //Instructions button
  stroke(149, 156, 235);
  strokeWeight(10);
  fill(159, 166, 255);
  rect(buttonX, buttonY + 150, buttonW, buttonH, 70);
  strokeWeight(3);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("Instructions", buttonX + 150, buttonY + 200);
  pop();
  //the title
  fill(159, 166, 255);
  stroke(255);
  textAlign(CENTER, CENTER);
  textSize(48);
  text("ASTRO JUMP", 650, 100);
}
//the game screen
function gameScreen() {
  clear();
  drawGradientBackground("#6C3483", "#5DADE2", "#FFB7C4");
  strokeWeight(1);
  moon();
  drawStars();
  push();
  translate(200, 100);
  scale(0.8);
  clouds();
  pop();

  push();
  translate(80, 150);
  scale(0.6);
  clouds();
  pop();

  push();
  translate(400, 60);
  clouds();
  pop();

  drawSpikePlatforms(scrollOffset);

  if (!char1Stopped || !char2Stopped) {
    moving();
  }
  drawPlatforms();
  ground();
  drawCoins();
  drawPowerUps();
  fill(255);
  textSize(24);
  text("Score: " + score, 70, 30, 3);
  fallEnemy();
  if (!char1Stopped) charOne();
  if (!char2Stopped) charTwo();
  if (char1Stopped && char2Stopped) {
    gameState = "lose";
  }
  if (!isTimerActive) {
    isTimerActive = true;
    intervalID = setInterval(() => {
      timer--;
      if (timer <= 0) {
        clearInterval(intervalID);
        gameState = "win";
      }
    }, 1000);
  }
}
//the lose screen
function loseScreen() {
  push();
  drawGradientBackground("#6C3483", "#5DADE2", "#FFB7C4");
  stroke(149, 156, 235);
  strokeWeight(10);
  fill(159, 166, 255);

  rect(buttonX, buttonY, buttonW, buttonH, 70);
  strokeWeight(3);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("TRY AGAIN", buttonX + 150, buttonY + 50);
  text("you catched " + score + " coins", buttonX + 150, buttonY + 150);
  pop();
}
//the winscreen for level 1
function winScreen() {
  push();
  drawGradientBackground("#6C3483", "#5DADE2", "#FFB7C4");
  stroke(225, 130, 80);
  strokeWeight(10);
  fill(245, 150, 100);

  rect(buttonX - 50, buttonY + 200, buttonW - 200, buttonH - 20);

  rect(buttonX - 110, buttonY, buttonW + 230, buttonH);
  strokeWeight(3);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("Click to proceed to the next level", buttonX + 150, buttonY + 50);
  text("1", buttonX - 50, buttonY + 200, buttonW - 200, buttonH - 20);
  //2
  fill(129, 129, 129);
  stroke(0);
  textAlign(CENTER, CENTER);
  textSize(36);
  rect(buttonX + 100, buttonY + 200, buttonW - 200, buttonH - 20);
  fill(255);
  text("2", buttonX + 100, buttonY + 200, buttonW - 200, buttonH - 20);
  //3
  fill(129, 129, 129);
  stroke(0);
  textAlign(CENTER, CENTER);
  textSize(36);
  rect(buttonX + 250, buttonY + 200, buttonW - 200, buttonH - 20);
  fill(255);
  text("3", buttonX + 250, buttonY + 200, buttonW - 200, buttonH - 20);
  pop();
}
//the winscreen for level 2
function winScreen2() {
  push();
  drawGradientBackground("#6C3483", "#5DADE2", "#FFB7C4");
  stroke(225, 130, 80);
  strokeWeight(10);
  fill(245, 150, 100);

  rect(buttonX - 50, buttonY + 200, buttonW - 200, buttonH - 20, 70);

  rect(buttonX - 110, buttonY, buttonW + 220, buttonH, 70);
  strokeWeight(3);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("Click to proceed to the next level", buttonX + 150, buttonY + 50);
  text("1", buttonX - 50, buttonY + 200, buttonW - 200, buttonH - 20, 70);
  //2

  fill(245, 150, 100);
  textAlign(CENTER, CENTER);
  textSize(36);

  rect(buttonX + 100, buttonY + 200, buttonW - 200, buttonH - 20, 70);
  fill(255);
  text("2", buttonX + 100, buttonY + 200, buttonW - 200, buttonH - 20, 70);
  //3
  fill(129, 129, 129);
  stroke(0);
  textAlign(CENTER, CENTER);
  textSize(36);
  rect(buttonX + 250, buttonY + 200, buttonW - 200, buttonH - 20, 70);
  fill(255);
  text("3", buttonX + 250, buttonY + 200, buttonW - 200, buttonH - 20, 70);
  pop();
}
//the winscreen for level 3
function winScreen3() {
  push();
  drawGradientBackground("#6C3483", "#5DADE2", "#FFB7C4");
  stroke(225, 130, 80);
  strokeWeight(10);
  fill(245, 150, 100);

  rect(buttonX - 50, buttonY + 200, buttonW - 200, buttonH - 20, 70);

  rect(buttonX - 100, buttonY, buttonW + 200, buttonH, 70);
  strokeWeight(10);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("congratulations, you did it!!", buttonX + 150, buttonY + 50);
  text("1", buttonX - 50, buttonY + 200, buttonW - 200, buttonH - 20, 70);
  //2

  fill(245, 150, 100);
  textAlign(CENTER, CENTER);
  textSize(36);

  rect(buttonX + 100, buttonY + 200, buttonW - 200, buttonH - 20, 70);
  fill(255);
  text("2", buttonX + 100, buttonY + 200, buttonW - 200, buttonH - 20, 70);
  //3
  fill(245, 150, 100);
  stroke(0);
  textAlign(CENTER, CENTER);
  textSize(36);
  stroke(225, 130, 80);
  rect(buttonX + 250, buttonY + 200, buttonW - 200, buttonH - 20, 70);
  fill(255);
  text("3", buttonX + 250, buttonY + 200, buttonW - 200, buttonH - 20, 70);
  pop();
}
//resetting the game
function resetGame() {
  // Reset Character 1 and 2 variables
  x1 = 89;
  y1 = 342;
  jumpVelo1 = 0;
  isJump1 = false;
  jumpCount1 = 0;
  char1Stopped = false;
  x2 = 39;
  y2 = 332;
  jumpVelo2 = 0;
  isJump2 = false;
  jumpCount2 = 0;
  char2Stopped = false;
  scrollOffset = 0;
  scrollSpeed = 3;
  moveStep1 = 3;
  moveStep2 = 3;
  hasSpeedBoost1 = false;
  hasSpeedBoost2 = false;
  
  // Reset platforms
  platforms = [{ x: 165, y: 300, width: 100, height: 20 }];

  // Reset coins
  coin = [{ x: 200, y: 300, width: 20, height: 20 }];

  // Reset ground segments
  groundSegments = [{ x: 0, width: 1200 }];

  // Reset falling objects
  fallingObjects = [];

  // Reset score
  score = 0;

  // Reset game state
  gameState = "start";
  timer = 60;
  isTimerActive = false;
  clearInterval(intervalID);
  drawSpikePlatforms(scrollOffset);
}
//the gamescreen for level 2
function nextLevel2() {
  scrollSpeed = 5;
  drawSpikePlatforms(scrollOffset);

  fallSpeed = 8;

  x1 = 70;
  x2 = 70;

  if (random(1) < 0.07) {
    let objWidth = random(55, 55);
    let objHeight = random(55, 55);
    let objX = random(0, width);
    let objSpeed = random(2, 5);

    fallingObjects.push(
      new FallingObject(objX, 0, objWidth, objHeight, objSpeed)
    );
  }

  gameState = "game";
  clear();

  if (!char1Stopped || !char2Stopped) {
    moving();
  }
  drawPlatforms();
  ground();
  drawCoins();
  drawPowerUps();
  fill(255);
  textSize(24);
  text("Score: " + score, 10, 30);
  fallEnemy();
  charOne();
  charTwo();
  if (char1Stopped && char2Stopped) {
    gameState = "lose";
  }
  if (!isTimerActive) {
    isTimerActive = true;
    intervalID = setInterval(() => {
      timer--;
      if (timer <= 0) {
        clearInterval(intervalID);
        gameState = "win2";
      }
    }, 1000);
  }
}
//the gamescreen for level 3
function nextLevel3() {
  scrollSpeed = 7; // Faster scrolling
  drawSpikePlatforms(scrollOffset);

  fallSpeed = 7;

  platformGapChance = 1; // Larger chance of platform gaps

  x1 = 70;
  x2 = 70;

  if (random(1) < 0.08) {
    let objWidth = random(55, 55);
    let objHeight = random(55, 55);
    let objX = random(0, width);
    let objSpeed = random(2, 5);

    fallingObjects.push(
      new FallingObject(objX, 0, objWidth, objHeight, objSpeed)
    );
  }

  gameState = "game";
  clear();
  drawGradientBackground("#6C3483", "#5DADE2", "#FFB7C4");

  if (!char1Stopped || !char2Stopped) {
    moving(); // Ensure the moving logic is still working
  }
  drawPlatforms();
  ground();
  drawCoins();
  drawPowerUps();
  fill(255);
  textSize(24);
  text("Score: " + score, 10, 30);
  fallEnemy();
  charOne();
  charTwo();
  if (char1Stopped && char2Stopped) {
    gameState = "lose";
  }
  if (!isTimerActive) {
    isTimerActive = true;
    intervalID = setInterval(() => {
      timer--;
      if (timer <= 0) {
        clearInterval(intervalID);
        gameState = "win3";
      }
    }, 1000);
  }
}
//control screen
function controls() {
  drawGradientBackground("#6C3483", "#5DADE2", "#FFB7C4");
  strokeWeight(3);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(15);
  text(
    "use the arrow keys to move the green alien, WAD keys for the blue alien",
    buttonX + 150,
    buttonY + 50
  );
  text(
    "Avoid holes, asterioids falling from the sky and dangerous spike platforms",
    buttonX + 150,
    buttonY + 70
  );
  text(
    "Double jump by pressing the jump button twice (W/⬆)",
    buttonX + 150,
    buttonY + 90
  );
  text("", buttonX + 150, buttonY + 50);
  fill(159, 166, 255);
  stroke(149, 156, 235);
  rect(buttonX, buttonY + 150, buttonW, buttonH, 70);
  strokeWeight(3);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("back", buttonX + 150, buttonY + 200);

  rect(408, 107, 80, 80, 30);
  rect(518, 107, 80, 80, 30);
  rect(460, 18, 80, 80, 30);

  rect(658, 107, 80, 80, 30);
  rect(770, 107, 80, 80, 30);
  rect(710, 18, 80, 80, 30);

  stroke(0);
  fill(149);
  text("A", 447, 146);
  text("D", 560, 146);
  text("W", 500, 58);

  fill(0);
  textFont("sans-serif");
  text("⮕", 812, 146);
  text("⬅", 695, 146);
  text("⬆", 750, 58);
}
//how the gamestates works and show up
function draw() {
  if (gameState === "start") {
    startScreen();
    for (let i = 0; i < 100; i++) {
      drawStars();
    }
  } else if (gameState === "game") {
    gameScreen();
  } else if (gameState === "lose") {
    loseScreen();
  } else if (gameState === "win") {
    winScreen();
  } else if (gameState === "nextLevel2") {
    nextLevel2();
  } else if (gameState === "win2") {
    winScreen2();
  } else if (gameState === "nextLevel3") {
    nextLevel3();
  } else if (gameState === "win3") {
    winScreen3();
  } else if (gameState === "controls") {
    controls();
  }
}
// Platform array
let platforms = [{ x: 165, y: 300, width: 100, height: 20 }];

// Coin array
let coin = [{ x: 200, y: 300, width: 20, height: 20 }];

// Scrolling variables
let scrollOffset = 0;
let scrollSpeed = 3;

// The ground
let groundSegments = [{ x: 0, width: 1200 }];

// Making the characters not stop
let char1Stopped = false;
let char2Stopped = false;

//how the character moves, how it behaves on platforms, platform generating, how character dies
function moving() {
  if (!char1Stopped) {
    if (keyIsDown(RIGHT_ARROW)) {
      x1 += moveStep1;
    }
    if (keyIsDown(LEFT_ARROW)) {
      x1 -= moveStep1;
    }

    if (!isOnAnyPlatform(x1, y1, xWidth1, yHeight1, jumpVelo1)) {
      y1 += jumpVelo1;
      jumpVelo1 += gravity1;
    } else if (isOnAnyPlatform(x1, y1, xWidth1, yHeight1, jumpVelo1)) {
      y1 = Math.min(y1, 382 - yHeight1);
      isJump1 = false;
      jumpVelo1 = 0;
      jumpCount1 = 0;
    }

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

    if (y1 > height) {
      // If character falls below the ground
      char1Stopped = true; // Stop character
      coinVisible = false;
    }

    checkPowerUp(x1 - xWidth1, y1, xWidth1, yHeight1, scrollOffset, true);
  }

  if (!char2Stopped) {
    if (keyIsDown(68)) {
      x2 += moveStep2;
    }
    if (keyIsDown(65)) {
      x2 -= moveStep2;
    }

    if (!isOnAnyPlatform(x2, y2, xWidth2, yHeight2, jumpVelo2)) {
      y2 += jumpVelo2;
      jumpVelo2 += gravity2;
    } else if (isOnAnyPlatform(x2, y2, xWidth2, yHeight2, jumpVelo2)) {
      y2 = Math.min(y2, 382 - yHeight2);
      isJump2 = false;
      jumpVelo2 = 0;
      jumpCount2 = 0;
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

    if (y2 > height) {
      // If character falls below the ground
      char2Stopped = true; // Stop character
      coinVisible = false;
    }
    if (checkAllSpikeCollisions(x2, y2, xWidth2, yHeight2, scrollOffset)) {
      char2Stopped = true;
      gameState = "lose";
    }

    checkPowerUp(x2 - xWidth2, y2, xWidth2, yHeight2, scrollOffset, false);
  }

  scrollOffset += scrollSpeed;
}
//checks if character is on a specific platform
function isOnPlatform(x, y, width, height, velocity, platform) {
  return (
    x + width > platform.x - scrollOffset &&
    x < platform.x - scrollOffset + platform.width &&
    y + height <= platform.y &&
    y + height + velocity >= platform.y
  );
}
//checks is character on any platform orin the game
function isOnAnyPlatform(x, y, width, height, velocity) {
  for (let platform of platforms) {
    if (isOnPlatform(x, y, width, height, velocity, platform)) {
      return true;
    }
  }
  //checks if the character standing on ground
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
//how the platforms look and making them appear
function drawPlatforms() {
  fill(245, 150, 100);

  if (random(1) < 0.015) {
    let platformWidth = random(80, 120);
    let platformHeight = 20;
    let platformX = scrollOffset + width + random(50, 250);
    let platformY = random(350, 200);

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

//manages the ground and the gaps
function ground() {
  fill(245, 150, 100);

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

//double jump and jump
function keyPressed() {
  if (keyCode === UP_ARROW && !char1Stopped && jumpCount1 < maxJump) {
    isJump1 = true;
    jumpVelo1 = jump1;
    jumpCount1++;
  }
  if (keyCode === 87 && !char2Stopped && jumpCount2 < maxJump) {
    isJump2 = true;
    jumpVelo2 = jump2;
    jumpCount2++;
  }
}
//character 1 design
function charOne() {
  let baseY = y1 + 230; // Adjusted for ground level

  noStroke();
  // Antenna
  fill(0, 110, 0);
  rect(x1 - 49, baseY - 318, 5, 23);
  ellipse(x1 - 47, baseY - 318, 10);
  push();
  // If player has a speed boost from a power up the antenna is red
  if(hasSpeedBoost1) {
    fill(255, 0, 0);
  } else {
    fill(0, 255, 0);
  }
  rect(x1 - 41, baseY - 318, 5, 23);
  ellipse(x1 - 39, baseY - 318, 12);
  fill(255);
  stroke(200);
  arc(x1 - 35, baseY - 318, 5, 7, -HALF_PI, HALF_PI, PIE);
  fill(0);
  noStroke();
  arc(x1 - 33, baseY - 318, 3, 5, -HALF_PI, HALF_PI, PIE);
  pop();

  // Body
  fill(0, 255, 0);
  ellipse(x1 - 39, baseY - 242, 55, 75);
  ellipse(x1 - 39, baseY - 282, 45);

  // Spots
  push();
  fill(255, 225, 0);
  arc(x1 - 22, baseY - 239, 26, 46, -HALF_PI, HALF_PI, PIE);
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
  arc(x1 - 18, baseY - 282, 15, 22, -HALF_PI, HALF_PI, PIE);
  fill(0);
  noStroke();
  arc(x1 - 13, baseY - 282, 10, 12, -HALF_PI, HALF_PI, PIE);
  pop();

  // Leg
  push();

  rect(x1 - 57, baseY - 218, 15, 25);
  ellipse(x1 - 45, baseY - 194, 25, 10);

  rect(x1 - 37, baseY - 218, 10, 25);
  ellipse(x1 - 25, baseY - 194, 25, 10);
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
  arc(x1 - 39, baseY - 229, 3, 10, 0, 3, PIE);
  arc(x1 - 35, baseY - 231, 3, 10, 5, 3, PIE);
  arc(x1 - 43, baseY - 231, 3, 10, 7, 3, PIE);
  pop();
}
//character 2 design
function charTwo() {
  let baseY = y2 + 230; // Adjusted for ground level

  noStroke();
  // Antenna
  fill(0, 80, 110);
  rect(x2 - 49, baseY - 318, 5, 23);
  ellipse(x2 - 47, baseY - 318, 10);
  push();
  // If player has a speed boost from a power up the antenna is red
  if(hasSpeedBoost2) {
    fill(255, 0, 0);
  } else {
    fill(0, 200, 255);
  }
  rect(x2 - 41, baseY - 318, 5, 23);
  ellipse(x2 - 39, baseY - 318, 12);
  fill(255);
  stroke(200);
  arc(x2 - 35, baseY - 318, 5, 7, -HALF_PI, HALF_PI, PIE);
  fill(0);
  noStroke();
  arc(x2 - 33, baseY - 318, 3, 5, -HALF_PI, HALF_PI, PIE);
  pop();

  // Body
  fill(0, 200, 255);
  ellipse(x2 - 39, baseY - 242, 60, 70);
  ellipse(x2 - 39, baseY - 282, 45);

  // Spots
  push();
  fill(255, 200, 200);
  arc(x2 - 20, baseY - 241, 30, 48, -HALF_PI, HALF_PI, PIE);
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
  arc(x2 - 19, baseY - 282, 15, 22, -HALF_PI, HALF_PI, PIE);
  fill(0);
  noStroke();
  arc(x2 - 13, baseY - 282, 10, 12, -HALF_PI, HALF_PI, PIE);
  pop();

  // Leg
  push();
  rect(x2 - 52, baseY - 218, 15, 25);
  ellipse(x2 - 40, baseY - 194, 20, 10);

  rect(x2 - 27, baseY - 218, 10, 25);
  ellipse(x2 - 18, baseY - 194, 25, 10);
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
  arc(x2 - 39, baseY - 229, 3, 10, 0, 3, PIE);
  arc(x2 - 35, baseY - 231, 3, 10, 5, 3, PIE);
  arc(x2 - 43, baseY - 231, 3, 10, 7, 3, PIE);
  pop();
}
// the coin class
class Coin {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  // Method to display the coin
  draw() {
    fill(255, 255, 0); // Coin color (yellow)
    ellipse(this.x, this.y, this.width, this.height);
  }

  // Method to check if the coin is caught by a character
  checkCollision(charX, charY, charWidth, charHeight) {
    return (
      this.x < charX + charWidth &&
      this.x + this.width > charX &&
      this.y < charY + charHeight &&
      this.y + this.height > charY
    );
  }
}
//coin design
function drawCoins() {
  fill(255, 255, 0);
  if (random(1) < 0.01) {
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

  coin = coin.filter((coin) => coin.x - scrollOffset + coin.width > 0);

  for (let i = coin.length - 1; i >= 0; i--) {
    let c = coin[i];
    ellipse(c.x - scrollOffset, c.y, c.width, c.height);

    if (
      c.x - scrollOffset < x1 + xWidth1 &&
      c.x - scrollOffset + c.width > x1 &&
      c.y < y1 + yHeight1 &&
      c.y + c.height > y1
    ) {
      coin.splice(i, 1);
      score++;
    } else if (
      c.x - scrollOffset < x2 + xWidth2 &&
      c.x - scrollOffset + c.width > x2 &&
      c.y < y2 + yHeight2 &&
      c.y + c.height > y2
    ) {
      coin.splice(i, 1);
      score++;
    }
  }
}

//fall object class
class FallingObject {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  move() {
    this.y += this.speed; // Moves the object down
  }

  draw() {
    push();

    fill(169, 169, 169);
    stroke(105, 105, 105);
    strokeWeight(4); // Stroke thickness
    ellipse(this.x, this.y, this.width, this.height);

    noFill();
    strokeWeight(3);

    let cx = this.x - 5;
    let cy = this.y;

    // Top left crack
    line(cx - 15, cy - 20, cx - 5, cy - 30);
    line(cx - 5, cy - 30, cx + 5, cy - 20);
    line(cx - 5, cy - 30, cx + 5, cy - 35);
    line(cx + 5, cy - 20, cx + 30, cy - 5);
    line(cx + 5, cy - 20, cx - 15, cy - 10);

    // Middle left crack
    line(cx - 25, cy + 10, cx - 15, cy + 0);
    line(cx - 15, cy + 0, cx + 5, cy + 10);
    line(cx - 15, cy + 0, cx - 5, cy - 5);
    line(cx - 5, cy - 5, cx + 5, cy - 10);
    line(cx - 5, cy - 5, cx + 5, cy + 5);
    line(cx + 5, cy + 10, cx + 10, cy + 15);
    line(cx + 5, cy + 10, cx + 20, cy + 10);

    // Bottom right crack
    line(cx + 15, cy + 30, cx + 30, cy + 5);
    line(cx + 25, cy + 15, cx + 10, cy + 20);
    line(cx + 30, cy + 5, cx + 35, cy - 5);

    pop();
  }

  checkCollision(charX, charY, charWidth, charHeight) {
    return (
      this.x < charX + charWidth &&
      this.x + this.width > charX &&
      this.y < charY + charHeight &&
      this.y + this.height > charY
    );
  }

  isOffScreen() {
    return this.y > height;
  }
}

//spawining and check collisons with char
function fallEnemy() {
  // Spawn new falling object occasionally
  if (random(1) < 0.02) {
    let objWidth = random(55, 55);
    let objHeight = random(55, 55);
    let objX = random(0, width);
    let objSpeed = random(2, 5);

    fallingObjects.push(
      new FallingObject(objX, 0, objWidth, objHeight, objSpeed)
    );
  }

  for (let i = fallingObjects.length - 1; i >= 0; i--) {
    let obj = fallingObjects[i];
    obj.move();
    obj.draw();

    // Check for collisions with Character 1
    if (obj.checkCollision(x1, y1, xWidth1, yHeight1)) {
      char1Stopped = true;
      fallingObjects.splice(i, 1);
      continue;
    }

    // Check for collisions with Character 2
    if (obj.checkCollision(x2, y2, xWidth2, yHeight2)) {
      char2Stopped = true;
      fallingObjects.splice(i, 1);
      continue;
    }

    // Remove objects that fall off-screen
    if (obj.isOffScreen()) {
      fallingObjects.splice(i, 1);
    }
  }
}

//gpt https://chatgpt.com/share/674c15c6-6254-8005-8fbf-8234525435b3
function drawGradientBackground(color1, color2, color3) {
  noStroke();

  for (let y = 0; y < height / 2; y++) {
    let inter = map(y, 0, height / 2, 0, 1);
    let c = lerpColor(color(color1), color(color2), inter);
    fill(c);
    rect(0, y, width, 1);
  }

  for (let y = height / 2; y < height; y++) {
    let inter = map(y, height / 2, height, 0, 1);
    let c = lerpColor(color(color2), color(color3), inter);
    fill(c);
    rect(0, y, width, 1);
  }
}
//the spikeplatform class
class SpikePlatform {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(scrollOffset) {
    fill(129, 129, 129);
    rect(this.x - scrollOffset, this.y, this.width, this.height);

    fill(200, 50, 50); // Spikes color
    let spikeCount = this.width / 10;
    for (let i = 0; i < spikeCount; i++) {
      let spikeX = this.x - scrollOffset + i * 10;
      triangle(spikeX, this.y, spikeX + 5, this.y - 10, spikeX + 10, this.y);
    }
  }

  checkCollision(charX, charY, charWidth, charHeight, scrollOffset) {
    let platformX = this.x - scrollOffset;
    let spikeCount = this.width / 10;

    for (let i = 0; i < spikeCount; i++) {
      let spikeX = platformX + i * 10;
      let spikeTipX = spikeX + 5;
      let spikeBaseY = this.y;
      let spikeTipY = this.y - 10;

      if (
        this.pointInTriangle(
          charX,
          charY,
          spikeX,
          spikeBaseY,
          spikeTipX,
          spikeTipY,
          spikeX + 10,
          spikeBaseY
        ) ||
        this.pointInTriangle(
          charX + charWidth,
          charY,
          spikeX,
          spikeBaseY,
          spikeTipX,
          spikeTipY,
          spikeX + 10,
          spikeBaseY
        ) ||
        this.pointInTriangle(
          charX,
          charY + charHeight,
          spikeX,
          spikeBaseY,
          spikeTipX,
          spikeTipY,
          spikeX + 10,
          spikeBaseY
        ) ||
        this.pointInTriangle(
          charX + charWidth,
          charY + charHeight,
          spikeX,
          spikeBaseY,
          spikeTipX,
          spikeTipY,
          spikeX + 10,
          spikeBaseY
        )
      ) {
        return true;
      }
    }
    return false;
  }

  pointInTriangle(px, py, x1, y1, x2, y2, x3, y3) {
    let areaOrig = Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1));
    let area1 = Math.abs((x1 - px) * (y2 - py) - (x2 - px) * (y1 - py));
    let area2 = Math.abs((x2 - px) * (y3 - py) - (x3 - px) * (y2 - py));
    let area3 = Math.abs((x3 - px) * (y1 - py) - (x1 - px) * (y3 - py));
    return areaOrig === area1 + area2 + area3;
  }
}
//spike platform array
let spikePlatforms = [];

// generate spike platform
function createSpikePlatforms() {
  if (random(1) < 0.003) {
    let objWidth = random(55, 100); // Random width
    let objHeight = 20;
    let objX = scrollOffset + width + random(50, 300);
    let objY = random(200, 400);

    // Check if the new platform overlaps with any existing ones
    let overlap = spikePlatforms.some((platform) => {
      return (
        objX < platform.x + platform.width &&
        objX + objWidth > platform.x &&
        objY < platform.y + platform.height &&
        objY + objHeight > platform.y
      );
    });

    // Only add the new platform if it doesn't overlap
    if (!overlap) {
      spikePlatforms.push(new SpikePlatform(objX, objY, objWidth, objHeight));
    }
  }
}

//draw spikeplatforms
function drawSpikePlatforms(scrollOffset) {
  createSpikePlatforms();

  // Filter out platforms that are no longer on screen
  spikePlatforms = spikePlatforms.filter(
    (platform) => platform.x - scrollOffset + platform.width > 0
  );

  // Draw remaining platforms
  for (let platform of spikePlatforms) {
    platform.draw(scrollOffset);
  }
} 
//if character collide with spikeplatform
function checkAllSpikeCollisions(
  charX,
  charY,
  charWidth,
  charHeight,
  scrollOffset
) {
  for (let platform of spikePlatforms) {
    if (
      platform.checkCollision(charX, charY, charWidth, charHeight, scrollOffset)
    ) {
      return true;
    }
  }
  return false;
}
//the background stars moon and clouds
function backDrop() {
  //Chat GPT https://chatgpt.com/c/674ed8b4-f554-8002-85a0-4292ae02cc7b 
  // Generate 100 stars at random positions within the whole canvas
  for (let i = 0; i < 100; i++) {
    let star = {
      x: random(width), // Random x position within the canvas width
      y: random(height), // Random y position within the canvas height
    };
    stars.push(star); // Add the star to the array
  }

  // Draw the gradient background
  drawGradientBackground("#6C3483", "#5DADE2", "#FFB7C4");

  //Chat GPT https://chatgpt.com/c/674ed8b4-f554-8002-85a0-4292ae02cc7b 
  // Draw stars from the pre-generated positions
  for (let i = 0; i < stars.length; i++) {
    drawStar(stars[i].x, stars[i].y); // Draw each star at its position
  }
}

function clouds() {
  push();
  fill("#EFA7C9");
  ellipse(125, 100, 70, 60);
  rect(58, 115, 200, 20, 15);
  pop();
}

function moon() {
  fill("#E8DAEF");
  ellipse(930, 120, 160);

  fill("#6C3483");
  ellipse(904, 100, 32);
  ellipse(960, 100, 32);

  fill("#A569BD");
  ellipse(974, 140, 24);
  ellipse(960, 162, 18);
  ellipse(919, 64, 18);
}

function drawStar(x, y) {
  fill(255);
  noStroke();
  ellipse(x, y, 3);
}

//other sources
//https://p5js.org/
//https://youtu.be/T-HGdc8L-7w?si=LnlGBQj76fS5QpAi

//Start of new power-up code

class PowerUp {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.powerUpTimeOut = 10000; // The power up lasts for 10 seconds
  }

  // Method to draw the power-up
  draw(scrollOffset) {
    fill(255, 0, 0);  // Power-up color (red)
    noStroke();
    let x = this.x - scrollOffset;
    // Left triangle
    triangle(x - this.width/2, this.y - this.height/2, x - this.width/2, this.y + this.height/2, x, this.y);
    // Right triangle
    triangle(x, this.y - this.height/2, x, this.y + this.height/2, x + this.width/2, this.y);
  }

  // Method to check if the power-up is caught by a character
  checkCollision(charX, charY, charWidth, charHeight, scrollOffset) {
    let powerUpx = this.x - scrollOffset;

    return (
      powerUpx < charX + charWidth &&
      powerUpx + this.width > charX &&
      this.y < charY + charHeight &&
      this.y + this.height > charY
    );
  }

  // Method to apply the power-up effect
  applyPowerUp(isPlayer1) { 
    const boostedMoveStepSpeed = 8;
    if(isPlayer1) {
      moveStep1 = boostedMoveStepSpeed;
      hasSpeedBoost1 = true;
      setTimeout(() => {
        hasSpeedBoost1 = false;
        moveStep1 = 3;
      }, this.powerUpTimeOut);
    } else {
      moveStep2 = boostedMoveStepSpeed;
      hasSpeedBoost2 = true;
      setTimeout(() => {
        moveStep2 = 3;
        hasSpeedBoost2 = false;
      }, this.powerUpTimeOut);
    }
  }

}

// Array to store all visible power-ups 
let powerup = [];

// This function handles the drawing of the power-ups
function drawPowerUps() {

  // Generate new power-up randomly
  if (random(1) < 0.01) {
    let powerupWidth = 25;
    let powerupHeight = 25;
    let powerupX = scrollOffset + width + random(50, 300);
    let powerupY = random(100, 350);

    powerup.push(new PowerUp (
      powerupX,
      powerupY,
      powerupWidth,
      powerupHeight,
    ));
  }

  // Remove power-ups no longer visible on the screen
  powerup = powerup.filter((powerup) => powerup.x - scrollOffset + powerup.width > 0);

  // Draw the visible power-ups to the game screen
  for (let i = powerup.length - 1; i >= 0; i--) {
    let p = powerup[i];
    p.draw(scrollOffset);
  }
}

// Check of a player has collected a power-up
function checkPowerUp(
  charX,
  charY,
  charWidth,
  charHeight,
  scrollOffset,
  isPlayer1 // To keep track of if it's player 1 or player 2 that collected the power-up
) {
  for (let i = powerup.length - 1; i >= 0; i--) {
    let p = powerup[i];
    if (p.checkCollision(charX, charY, charWidth, charHeight, scrollOffset)) {
      p.applyPowerUp(isPlayer1);
      powerup.splice(i, 1);
    }
  }
}