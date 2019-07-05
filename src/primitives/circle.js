export default function(ctx, sx, sy, endx, endy, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.lineWidth = 5;
  ctx.arc(sx, sy, endx, endy, 2 * Math.PI, false);
  ctx.closePath();
  ctx.stroke();
}
