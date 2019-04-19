export default function drawPen(ctx, color, x, y) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();
}