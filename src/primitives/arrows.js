export default function canvasArrow(context, color, fromx, fromy, tox, toy, width = 8) {
    const headlen = width*5;
    const back = 4.0;
    const angle1 = Math.PI / 13.0;
    const angle2 = Math.atan2(toy - fromy, tox - fromx);
    const diff1 = angle2 - angle1;
    const diff2 = angle2 + angle1;
    const xx = getBack(back, fromx, fromy, tox, toy);
    const yy = getBack(back, fromy, fromx, toy, tox);

    context.beginPath();

    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);

    context.strokeStyle =  color;

    context.lineWidth = width;

    context.moveTo(xx, yy);
    context.lineTo(xx - headlen * Math.cos(diff1), yy - headlen * Math.sin(diff1));

    context.moveTo(xx, yy);
    context.lineTo(xx - headlen * Math.cos(diff2), yy - headlen * Math.sin(diff2));

    //context.stroke();
}

function getBack(len, x1, y1, x2, y2) {
    return x2 - (len * (x2 - x1) / (Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2))));
}