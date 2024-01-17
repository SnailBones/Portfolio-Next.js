"use client";

import React, { useEffect, useRef, useState } from "react";
import "./treeViz.css";

interface TreeCanvasProps {
  gap: number;
  width: number;
  height: number;
}

const TreeCanvas: React.FC<TreeCanvasProps> = ({ gap, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const [plants, setPlants] = useState<any[]>([]); // Adapt this to your Plant structure

  const count_up = 32;
  const count_across = 64;
  //   const xgap = 2 * gap; // these numbers get overwritten, oops
  const ygap = 15;
  const growSpeed = 0.02; // Percent of tree per frame
  const treeHeight = 50; // Maximum height in pixels

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx || ctx === null) return;
    ctx.imageSmoothingEnabled = false;

    var plants: Plant[][] = [];
    var totalCarbon = 150;
    var carbon = 150; // Carbon in atmosphere, i.e. a weird way of keeping track of total negative trees

    var active = true; // One initial grow at begining to cull overpopulated trees.

    // var oldcarbon = 0; // TODO for testing
    var growthGoal = 0; //Initial value doesn't matter, used to track growth spurts
    const spurtSize = 750; // size of growth spurt, measured in units of fully grown trees;
    const waitTime = 400; // milliseconds after damage to grow

    let centerX = canvas.width * 0.5;
    let centerY = canvas.height * 0.5;

    class Plant {
      x: number;
      y: number;
      height: number;
      angle: number;
      // TODO no more x and y
      constructor(x: number, y: number, height: number) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.angle = 0; // but performance!
      }
      color() {
        return (
          "rgb(" +
          (this.y / 3 + this.height * 200 + 10) +
          "," +
          (this.y / 4 + 256 - this.height * 128) +
          ", " +
          192 * Math.abs(this.angle) +
          ")"
        );
      } //Math.sqrt(Math.abs(this.angle))+")"};
      drawMe() {
        if (!ctx) return;
        let xpos = this.x;
        let ypos = this.y;
        ctx.lineWidth = 2;
        let trunkHeight = treeHeight;
        // let baseHeight = 10;
        let sin = Math.sin(this.angle);
        let cos = Math.cos(this.angle);
        let basex = sin * this.height * trunkHeight + xpos;
        let basey = -cos * this.height * trunkHeight + ypos;
        ctx.strokeStyle = "#653";
        ctx.fillStyle = "#012";
        ctx.strokeStyle = this.color();
        drawLine(xpos, ypos, basex, basey, ctx);
      }

      updateAngle() {
        let finnick = 0.01;
        if (this.angle > finnick) {
          this.angle *= 0.95;
        } else if (this.angle < -finnick) {
          this.angle *= 0.95;
        } else {
          this.angle = 0;
        }
      }

      growMe(y: any, x: number) {
        let friendHeight = getMeanFriendHeight(y, x);
        let meanFriendHeight = friendHeight * 8;
        if (this.height == 0) {
          if (
            (meanFriendHeight >= 0.4 && meanFriendHeight < 1) ||
            (carbon > totalCarbon - 1 && (x == 0 || x == count_across - 1))
          ) {
            this.height += growSpeed;
            carbon -= growSpeed;
          }
        } else if (
          meanFriendHeight + this.height >= 2.2 &&
          friendHeight >= this.height - 0.2
        ) {
          carbon += this.height;
          this.height = 0.0;
        } else if (meanFriendHeight + this.height < 1.5) {
          carbon -= growSpeed;
          this.height += growSpeed;
        }
      }
    }

    // Create all the trees here
    // + 1 because the top row would be invisible anyway
    for (let i = -count_up + 7; i < count_up; i++) {
      let row = [];
      for (let j = -count_across / 2; j < count_across / 2; j++) {
        let height = Math.random() + 0.25;
        carbon -= height;
        row.push(new Plant(0, 0, height));
      }
      plants.push(row);
      positionTrees();
    }

    const step = () => {
      draw();
      requestAnimationFrame(step);
    };
    step();
    positionTrees();

    function getMeanFriendHeight(y: number, x: number) {
      let row = plants[y];
      let rowDown, rowUp;
      let maxX = row.length - 1;
      let maxY = plants.length - 1;
      // let neighbors = [];
      let total = 0;
      let friendCount = 0;
      //let offset = y%2? 1 : -1

      let onTop = y == 0,
        onRight = x == maxX,
        onBottom = y == maxY,
        onLeft = x == 0;

      if (!onBottom) {
        rowDown = plants[y + 1];
        total += rowDown[x].height;
        friendCount++;
      }
      if (!onTop) {
        rowUp = plants[y - 1];
        total += rowUp[x].height;
        friendCount++;
      }

      if (y % 2) {
        if (!onTop && !onRight && rowUp) {
          total += rowUp[x + 1].height;
          friendCount++;
        }
        if (!onBottom && !onRight && rowDown) {
          total += rowDown[x + 1].height;
          friendCount++;
        }
      } else {
        if (!onTop && !onLeft && rowUp) {
          total += rowUp[x - 1].height;
          friendCount++;
        }
        if (!onBottom && !onLeft && rowDown) {
          total += rowDown[x - 1].height;
          friendCount++;
        }
      }

      if (!onLeft) {
        total += row[x - 1].height;
        friendCount++;
      }
      if (!onRight) {
        total += row[x + 1].height;
        friendCount++;
      }

      let friendHeight = total / friendCount;
      return friendHeight;
    }

    // Drawing functions

    function drawLine(
      start_x: number,
      start_y: number,
      end_x: number,
      end_y: number,
      ctx: CanvasRenderingContext2D
    ) {
      ctx.beginPath();
      ctx.moveTo(start_x + centerX, start_y + centerY);
      ctx.lineTo(end_x + centerX, end_y + centerY);
      ctx.stroke();
    }

    //handles drawing and growing
    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let oldCarbon = carbon;

      for (var i = 0; i < plants.length; i++) {
        for (var j = 0; j < plants[i].length; j++) {
          if (active) {
            plants[i][j].growMe(i, j);
          }
          plants[i][j].drawMe();
          plants[i][j].updateAngle();
        }
      }
      // rather than stopping at zero, the goalpost is 50 more trees
      // than when growing started.
      // or auto stop when growth just doesn't happen
      // or NOT when you start breaking it
      // or NOT when a tree dies and breaks the carbon
      // but yes when the numbers happen to line exactly up yeah
      if (active && (carbon <= growthGoal || carbon == oldCarbon)) {
        active = false;
      }
    }

    class Pointer {
      x: number;
      y: number;
      px: number;
      py: number;
      moveDistance: number;
      timer: number | undefined;

      constructor() {
        this.x = -10000;
        this.y = -10000;
        this.px = 0;
        this.py = 0;
        this.moveDistance = 0;
        this.timer = undefined;
      }

      move(e: MouseEvent | TouchEvent) {
        if (!canvas) return;
        e.preventDefault();
        var cursor = e instanceof MouseEvent ? e : e.targetTouches[0];
        var rect = canvas.getBoundingClientRect();
        let static_x = cursor.clientX - rect.left;
        this.x = static_x - centerX;
        let static_y = cursor.clientY - rect.top;
        this.y = static_y - centerY;
        var mouse_speed = getDistance(this.x - this.px, this.y - this.py * 2);
        var ymin = 0;
        var ymax = Math.min(plants.length, static_y / ygap);
        var xmin = 0;
        var xmax = plants[0].length;

        for (var i = ymin; i < ymax; i++) {
          for (var j = xmin; j < xmax; j++) {
            let plant = plants[i][j];
            // Optimization: skip the square root calculation
            // if we know it's far enough away via Euclidian distance
            let xdistance = this.x - plant.x;
            let ydistance = (this.y - plant.y) * 2;
            if (Math.abs(xdistance) + Math.abs(ydistance) < 200) {
              let distance = getDistance(xdistance, ydistance);
              let angle = Math.max(
                0,
                ((0.008 - distance / 20000) * mouse_speed * mouse_speed) / 50
              );
              if (angle > Math.PI / 4) {
                let new_height = Math.max(0, plant.height - angle);
                carbon += plant.height - new_height;
                plant.height = new_height;
              } else {
                if (this.x > plant.x) {
                  angle = -angle;
                }
                plant.angle += angle;
              }
            }
          }
        }

        this.px = this.x;
        this.py = this.y;
        if (carbon > -10000) {
          growthGoal = carbon - spurtSize;
          // start regrowing after 2 seconds of no activity
          window.clearTimeout(this.timer);
          this.timer = window.setTimeout(() => {
            active = true;
          }, waitTime);
        }
      }
    }
    var pointer = new Pointer();

    window.addEventListener("mousemove", pointer.move.bind(pointer), false);
    canvas.addEventListener("touchmove", pointer.move.bind(pointer), false);

    function positionTrees() {
      if (!canvas || !canvas.parentElement) return;
      // Resizing Canvas
      let max_width = 1200;
      canvas.width = Math.min(
        canvas.parentElement.offsetWidth,
        // max_width,
        max_width
      );
      canvas.height = Math.min(canvas.width, canvas.parentElement.offsetHeight);
      centerX = canvas.width * 0.5;
      centerY = canvas.height * 0.5;

      // Moving Trees
      const xgap = (canvas.width / count_across) * 0.8;
      const ygap = canvas.height / count_up / 2;
      for (var i = 0; i < plants.length; i++) {
        for (var j = 0; j < plants[i].length; j++) {
          let height = i - plants.length / 2;
          let ypos = ygap * height + 50;
          let xpos = xgap * (j - plants[i].length / 2) + height * 2;
          if (i % 2 == 0) {
            xpos -= xgap / 2;
          }
          plants[i][j].x = xpos;
          plants[i][j].y = ypos;
        }
      }
    }

    // Event listeners and initialization logic
    window.addEventListener("resize", positionTrees);

    // Clean up
    return () => {
      window.removeEventListener("resize", positionTrees);
    };
  }, [gap, width, height]);

  // Additional functions and event handlers
  function getDistance(dx: number, dy: number) {
    return Math.sqrt(dx * dx + dy * dy);
  }

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef}>trees</canvas>
    </div>
  );
};
export default TreeCanvas;
