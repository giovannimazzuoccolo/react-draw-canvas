export default function(ctx, sx, sy, endx, endy, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(sx, sy, endx, endy);
}