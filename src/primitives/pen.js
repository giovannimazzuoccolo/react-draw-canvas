export default function drawPen(ctx, startX, startY, x, y, color) {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineWidth = 5;
    ctx.strokeStyle = color;
    ctx.moveTo(startX, startY);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();
}