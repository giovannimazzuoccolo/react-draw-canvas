export default function canvasArrow(ctx, p0, p1, headLength) {

  console.log('canvas', p0, p1, headLength );

  // constants (could be declared as globals outside this function)
  const PI = Math.PI;
  const degreesInRadians225 = (225 * PI) / 180;
  const degreesInRadians135 = (135 * PI) / 180;

  // calc the angle of the line
  var dx = p1.x - p0.x;
  var dy = p1.y - p0.y;
  var angle = Math.atan2(dy, dx);

  // calc arrowhead points
  var x225 = p1.x + headLength * Math.cos(angle + degreesInRadians225);
  var y225 = p1.y + headLength * Math.sin(angle + degreesInRadians225);
  var x135 = p1.x + headLength * Math.cos(angle + degreesInRadians135);
  var y135 = p1.y + headLength * Math.sin(angle + degreesInRadians135);

  // draw line plus arrowhead
  ctx.beginPath();
  // draw the line from p0 to p1
  ctx.moveTo(p0.x, p0.y);
  ctx.lineTo(p1.x, p1.y);
  // draw partial arrowhead at 225 degrees
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(x225, y225);
  // draw partial arrowhead at 135 degrees
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(x135, y135);
  // stroke the line and arrowhead
  ctx.stroke();
  ctx.closePath();
}
