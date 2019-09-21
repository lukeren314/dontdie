function checkObjectCollision(center1, halfsize1, rect) {
  let center2 = createVector(rect[0] + rect[2] / 2, rect[1] + rect[3] / 2);
  let halfsize2 = createVector(rect[2] / 2, rect[3] / 2);
  if (
    abs(center1.x - center2.x) > halfsize1.x + halfsize2.x ||
    abs(center1.y - center2.y) > halfsize1.y + halfsize2.y
  ) {
    return false;
  }
  return true;
}

function findObjectOverlap(center1, halfsize1, rect) {
  let center2 = createVector(rect[0] + rect[2] / 2, rect[1] + rect[3] / 2);
  let halfsize2 = createVector(rect[2] / 2, rect[3] / 2);

  overlap = createVector(
    Math.sign(center1.x - center2.x) *
      (halfsize1.x + halfsize2.x - abs(center1.x - center2.x)),
    Math.sign(center1.y - center2.y) *
      (halfsize1.y + halfsize2.y - abs(center1.y - center2.y))
  );
  return overlap;
}

function checkRectCollision(rect1, rect2) {
  let center1 = createVector(rect1[0] + rect1[2] / 2, rect1[1] + rect1[3] / 2);
  let halfsize1 = createVector(rect1[2] / 2, rect1[3] / 2);
  let center2 = createVector(rect2[0] + rect2[2] / 2, rect2[1] + rect2[3] / 2);
  let halfsize2 = createVector(rect2[2] / 2, rect2[3] / 2);
  if (
    abs(center1.x - center2.x) > halfsize1.x + halfsize2.x ||
    abs(center1.y - center2.y) > halfsize1.y + halfsize2.y
  ) {
    return false;
  }
  return true;
}
function checkCollision(center1, halfsize1, center2, halfsize2) {
  if (
    abs(center1.x - center2.x) > halfsize1.x + halfsize2.x ||
    abs(center1.y - center2.y) > halfsize1.y + halfsize2.y
  ) {
    return false;
  }
  return true;
}
function findOverlap(center1, halfsize1, center2, halfsize2) {
  overlap = createVector(
    Math.sign(center1.x - center2.x) * (halfsize1.x + halfsize2.x) -
      abs(center1.x - center2.x),
    Math.sign(center1.y - center2.y) * (halfsize1.y + halfsize2.y) -
      abs(center1.y - center2.y)
  );
  return overlap;
}
