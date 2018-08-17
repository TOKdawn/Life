class show {
    paint(ctx, geom, properties) {
        let x = geom.width / 2;
        let y = geom.height / 2;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(200, 200, 50, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();

    }
}
registerPaint('theshow', show);