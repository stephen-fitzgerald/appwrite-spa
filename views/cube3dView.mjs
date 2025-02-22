// @ts-check
/* jshint esversion: 6 */

import { AbstractView } from "./_AbstractView.mjs";

export class Cube3dView extends AbstractView {
  constructor(args = {}) {
    super(args);

    this.lastTime = undefined;
    this.points = [];
    this.canvas = undefined;
    this.ctx = undefined;
    this.W = 800;
    this.H = 600;
    this.MODEL_MIN_X = undefined;
    this.MODEL_MAX_X = undefined;
    this.MODEL_MIN_Y = undefined;
    this.MODEL_MAX_Y = undefined;
    this.theta = 0;
    this.dtheta = -0.02;
    this.strokeColor = 'coral';
    this.strokeWidth = 1;
    this.dotSize = 4;
    this.animationFrameId = undefined;
  }


  /**
  * @override
  * @async
  * @param {{ resource: string; id: string; verb: string; }} request 
  * @returns {Promise<string | undefined>} the html for the view
  */
  async buildHTML(request) {
    console.log(request);
    if (this.animationFrameId != undefined) {
      window.cancelAnimationFrame(this.animationFrameId);
    }

    this.html = `<h1>Cube 3D</h1>
                <canvas id="theCanvas" width="${this.W}" height="${this.H}"></canvas>`;
    return this.html;
  }

  /**
   * @override
   */
  addListeners() {
    document.title = this.title || "untitled";

    let bodyStyles = window.getComputedStyle(document.body);
    this.strokeColor = bodyStyles.getPropertyValue('--text-clr');

    this.canvas = document.getElementById('theCanvas');
    //@ts-expect-error
    this.ctx = this.canvas.getContext('2d');
    //@ts-expect-error
    this.W = this.canvas.width;
    //@ts-expect-error
    this.H = this.canvas.height;

    this.initGeometry();
  }

  /**
   * @override
   * @param {number} time
   * @memberof Cube3dView
   */
  modelToView(time) {
    this.render(time);
  }

  /**
   * @override
   * @memberof Cube3dView
   */
  destroy() {
    if (this.animationFrameId != undefined) {
      window.cancelAnimationFrame(this.animationFrameId);
    }
  }


  initGeometry() {
    var xLoc = 0, yLoc = 0, zLoc = 0;
    var xSz = 2, ySz = 2, zSz = 2;
    var dx = xSz / 5, dy = ySz / 5, dz = zSz / 5;

    for (var x = xLoc - xSz / 2; x <= xLoc + xSz / 2; x += dx) {
      for (var y = yLoc - ySz / 2; y <= yLoc + ySz / 2; y += dy) {
        for (var z = zLoc - zSz / 2; z <= zLoc + zSz / 2; z += dz) {
          this.trackMaxAndMin(x, y);
          this.points.push([x, y, z]);
        }
      }
    }
  }

  trackMaxAndMin(x, y) {
    if (this.MODEL_MAX_X == undefined || x > this.MODEL_MAX_X) {
      this.MODEL_MAX_X = x;
    }
    if (this.MODEL_MIN_X == undefined || x < this.MODEL_MIN_X) {
      this.MODEL_MIN_X = x;
    }
    if (this.MODEL_MAX_Y == undefined || y > this.MODEL_MAX_Y) {
      this.MODEL_MAX_Y = y;
    }
    if (this.MODEL_MIN_Y == undefined || y < this.MODEL_MIN_Y) {
      this.MODEL_MIN_Y = y;
    }
  }

  render(time) {

    if (this.lastTime == undefined) {
      this.lastTime = time;
    }

    let dt = time - this.lastTime;

    this.ctx.clearRect(0, 0, this.W, this.H);

    this.theta += this.dtheta;

    this.points.forEach((point) => {
      point = this.rotateX(point, 0.4 * this.theta);
      point = this.rotateY(point, this.theta);
      point = this.rotateZ(point, 0.2 * this.theta);
      this.renderPoint(point);
    });

    this.animationFrameId = requestAnimationFrame(this.render.bind(this));
  }

  rotateY(point, theta) {
    var x = point[0];
    var y = point[1];
    var z = point[2];

    return ([
      Math.cos(theta) * x - Math.sin(theta) * z,
      y,
      Math.sin(theta) * x + Math.cos(theta) * z
    ]);
  }

  rotateX(point, theta) {
    var x = point[0], y = point[1], z = point[2];

    return ([
      x,
      Math.cos(theta) * y - Math.sin(theta) * z,
      Math.sin(theta) * y + Math.cos(theta) * z
    ]);
  }

  rotateZ(point, theta) {
    var x = point[0], y = point[1], z = point[2];

    return ([
      Math.cos(theta) * x - Math.sin(theta) * y,
      Math.sin(theta) * x + Math.cos(theta) * y,
      z
    ]);
  }

  renderPoint(point) {
    var projectedPt = this.project(point);
    var x = projectedPt[0],
      y = projectedPt[1];
    var sz = this.dotSize ? this.dotSize : 1;

    this.ctx.beginPath();
    this.ctx.lineWidth = this.strokeWidth ? this.strokeWidth : 1;
    this.ctx.strokeStyle = this.strokeColor ? this.strokeColor : 'white';
    this.ctx.moveTo(x - sz, this.H - (y - sz));
    this.ctx.lineTo(x + sz, this.H - (y - sz));
    this.ctx.lineTo(x + sz, this.H - (y + sz));
    this.ctx.lineTo(x - sz, this.H - (y + sz));
    this.ctx.lineTo(x - sz, this.H - (y - sz));
    this.ctx.stroke();
  }

  project(point) {
    var pPt = this.perspectiveProjection(point);
    var x = pPt[0], y = pPt[1];

    return (
      [
        0.125 * this.W + 0.75 * this.W * (x - this.MODEL_MIN_X) / (this.MODEL_MAX_X - this.MODEL_MIN_X),
        0.125 * this.H + 0.75 * this.H * (1 - (y - this.MODEL_MIN_Y) / (this.MODEL_MAX_Y - this.MODEL_MIN_Y))
      ]
    );
  }

  perspectiveProjection(point) {
    var x = point[0], y = point[1], z = point[2];

    return (
      [
        8 * x / (z + 16),
        8 * y / (z + 16)
      ]
    );
  }

}
