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

// registerPaint('slanted', class {
//     paint (ctx, geom) {
//       ctx.fillStyle = 'hsl(296, 100%, 50%)';
//       ctx.beginPath();
//       ctx.moveTo(0, 0);
//       ctx.lineTo(geom.width, 0);
//       ctx.lineTo(geom.width - 20, geom.height);
//       ctx.lineTo(0, geom.height);
//       ctx.fill();
//     }
//   })
registerPaint('theshow', show);