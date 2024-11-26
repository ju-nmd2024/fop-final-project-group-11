//variables char 1
let x1 = 89,
  y1 = 342,
  xWidth1 = 40,
  yHeight1 = 40,
  moveStep1 = 5,
  gravity1 = 1,
  jump1 = -15,
  jumpVelo1 = 0,
  isJump1 = false;
//variables char 2
let x2 = 39,
  y2 = 342,
  xWidth2 = 40,
  yHeight2 = 40,
  moveStep2 = 5,
  gravity2 = 1,
  jump2 = -15,
  jumpVelo2 = 0,
  isJump2 = false;
//platform array
let platforms = [
  { x: 165, y: 300, width: 100, height: 20 },
  { x: 315, y: 240, width: 100, height: 20 },
  { x: 500, y: 250, width: 150, height: 20 },
  { x: 670, y: 300, width: 150, height: 20 },
];
//the scrolling world
let scrollOffset = 0,
  scrollSpeed = 2,
  groundSegments = [{ x: 0, width: 1200 }];
let char1Stopped = false,
  char2Stopped = false;

//setup
function setup() {
  createCanvas(1200, 500);
  background(255);
}
//make char move
function moving() {
  //make char1 move with keys
  if (!char1Stopped) {
    if (keyIsDown(RIGHT_ARROW)) x1 += moveStep1;
    if (keyIsDown(LEFT_ARROW)) x1 -= moveStep1;
    if (isJump1 || !isOnAnyPlatform(x1, y1, xWidth1, yHeight1, jumpVelo1)) {
      y1 += jumpVelo1;
      jumpVelo1 += gravity1;
    }
    //stay on platforms
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
    //stay on ground
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
    //stop if fall into hole
    if (y1 > height) char1Stopped = true;
  }

  // move char2 with wad
  if (!char2Stopped) {
    if (keyIsDown(68)) x2 += moveStep2;
    if (keyIsDown(65)) x2 -= moveStep2;
    if (isJump2 || !isOnAnyPlatform(x2, y2, xWidth2, yHeight2, jumpVelo2)) {
      y2 += jumpVelo2;
      jumpVelo2 += gravity2;
    }
    //stay on platform
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
    //stay on ground
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
    //stop if fall in hole
    if (y2 > height) char2Stopped = true;
  }

  scrollOffset += scrollSpeed;
}
// collision detection
function isOnPlatform(x, y, width, height, velocity, platform) {
  return (
    x + width > platform.x &&
    x < platform.x + platform.width &&
    y + height <= platform.y &&
    y + height + velocity >= platform.y
  );
}

function isOnAnyPlatform(x, y, width, height, velocity) {
  for (let platform of platforms)
    if (isOnPlatform(x, y, width, height, velocity, platform)) return true;
  for (let segment of groundSegments)
    if (
      x + width > segment.x - scrollOffset &&
      x < segment.x - scrollOffset + segment.width &&
      y + height + velocity >= 382 &&
      y + height <= 382 + abs(velocity)
    )
      return true;
  return false;
}

function draw() {
  clear();
  background(255);
  drawPlatforms();
  ground();
  if (!char1Stopped || !char2Stopped) moving();
  if (!char1Stopped) charOne();
  if (!char2Stopped) charTwo();
}
//how to jump
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
//the characters
function charOne() {
  fill(255, 0, 0);
  rect(x1, y1, xWidth1, yHeight1);
}
function charTwo() {
  fill(0, 0, 255);
  rect(x2, y2, xWidth2, yHeight2);
}
//make the platforms dynamically
function drawPlatforms() {
  fill(100, 23, 40);
  if (random(1) < 0.02)
    platforms.push({
      x: scrollOffset + width + random(50, 300),
      y: random(100, 350),
      width: random(80, 120),
      height: 20,
    });
  platforms = platforms.filter(
    (platform) => platform.x - scrollOffset + platform.width > 0
  );
  for (let platform of platforms)
    rect(
      platform.x - scrollOffset,
      platform.y,
      platform.width,
      platform.height
    );
}
//the ground
function ground() {
  fill(0, 255, 0);
  for (let segment of groundSegments)
    rect(segment.x - scrollOffset, 382, segment.width, height - 382);
  let lastSegment = groundSegments[groundSegments.length - 1];
  if (lastSegment.x - scrollOffset + lastSegment.width / 2 < width)
    groundSegments.push({
      x:
        lastSegment.x +
        lastSegment.width +
        (random(1) < 0.5 ? random(50, 120) : 0),
      width: random(100, 800),
    });
  if (groundSegments[0].x - scrollOffset + groundSegments[0].width < 0)
    groundSegments.shift();
}
