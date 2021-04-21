const window = {}

// TinyColor v1.4.1
// https://github.com/bgrins/TinyColor
// 2016-07-07, Brian Grinstead, MIT License

registerPaint('corners-gradient', class {
  static get inputArguments() {
    return [
      '<color>',
      '<color>',
      '<color>',
      '<color>'
    ];
  }

  paint(ctx, geom, properties, args) {
    this.quadGradient(ctx, geom, {
      topLeft: args[0].toString(),
      topRight: args[1].toString(),
      bottomLeft: args[3].toString(),
      bottomRight: args[2].toString()
    });
  }

  quadGradient(ctx, geom, corners) { 
      var w = geom.width;
      var h = geom.height;
      var gradient, startColor, endColor, fac;
    
      // convert colors to array like [1,0,0,1] (red)
      for (let corner in corners) {
        corners[corner] = window.tinycolor(corners[corner]).toRgb()
        for (let color in corners[corner]) {
          if (color === 'a') continue
          corners[corner][color] /= 255
        }
        corners[corner] = [corners[corner]['r'], corners[corner]['g'], corners[corner]['b'], corners[corner]['a']]
      }
    
      for(var i = 0; i < h; i++) {
          gradient = ctx.createLinearGradient(0, i, w, i);
          fac = i / (h - 1);

          startColor = this.arrayToRGBA(
            this.lerp(corners.topLeft, corners.bottomLeft, fac)
          );
          endColor = this.arrayToRGBA(
            this.lerp(corners.topRight, corners.bottomRight, fac)
          );
        
          gradient.addColorStop(0, startColor);
          gradient.addColorStop(1, endColor);
        
          ctx.fillStyle = gradient;
          ctx.fillRect(0, i, w, 1);
      }
  }

  arrayToRGBA(arr) {
      var ret = arr.map(function(v) {
          // map to [0, 255] and clamp
          return Math.max(Math.min(Math.round(v * 255), 255), 0);
      });

      // alpha should retain its value
      ret[3] = arr[3];
    
      return 'rgba(' + ret.join(',') + ')';
  }

  lerp(a, b, fac) {
      return a.map(function(v, i) {
          return v * (1 - fac) + b[i] * fac;
      });
  }

})