"use client";

import React, { useEffect, useRef } from "react";
import "./treeViz.css";

interface TreeCanvasProps {
  gap: number;
  width: number;
  height: number;
}
// Tree positioning
const xgap = 20;
const ygap = 20;

const treeHeight = 50; // Maximum height in pixels
const growSpeed = 0.02; // Percent of tree per frame

const waitTime = 1.2; // Seconds after moving mouse to start growth

function getDistance(dx: number, dy: number) {
  return Math.sqrt(dx * dx + dy * dy);
}

export default function TreeCanvas({ gap, width, height }: TreeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx || ctx === null) return;
    ctx.imageSmoothingEnabled = false;

    // Calculate counts based on canvas size
    let count_across: number = 0;
    let count_up: number = 0;

    var plants: Plant[][] = [];

    var active = true;

    let centerX = canvas.width * 0.5;
    let centerY = canvas.height * 0.5;

    class Plant {
      x: number;
      y: number;
      height: number;
      angle: number;
      constructor(height: number) {
        this.height = height;
        this.x = 0;
        this.y = 0;
        this.angle = 0;
      }
      color() {
        return (
          "rgb(" +
          (this.y / 3 + this.height * 200 + 10) +
          "," +
          (this.y / 4 + 256 - this.height * 128) +
          ", " +
          (this.angle === 0 ? 0 : Math.pow(Math.abs(this.angle), 0.5) * 200) +
          ")"
        );
      }
      drawMe() {
        if (!ctx) return;
        ctx.lineWidth = 2;
        const sin = Math.sin(this.angle);
        const cos = Math.cos(this.angle);
        const basex = sin * this.height * treeHeight + this.x;
        const basey = -cos * this.height * treeHeight + this.y;
        ctx.strokeStyle = this.color();
        drawLine(this.x, this.y, basex, basey, ctx);
      }

      updateAngle() {
        const finnick = 0.01;
        if (this.angle > finnick || this.angle < -finnick) {
          this.angle *= 0.93;
        } else {
          this.angle = 0;
        }
      }

      growMe(y: number, x: number) {
        const oldHeight = this.height;
        const meanFriendHeight = getMeanFriendHeight(y, x);
        const totalFriendHeight = meanFriendHeight * 8;
        if (this.height === 0) {
          if (totalFriendHeight >= 0.4 && totalFriendHeight < 1) {
            this.height += growSpeed;
          }
        } else if (
          totalFriendHeight + this.height >= 2.2 &&
          meanFriendHeight >= this.height - 0.2
        ) {
          this.height = 0.0;
        } else if (totalFriendHeight + this.height < 1.5) {
          this.height += growSpeed;
        }
        return this.height !== oldHeight;
      }
    }

    function getMeanFriendHeight(y: number, x: number) {
      let row = plants[y];
      let rowDown, rowUp;
      let maxX = row.length - 1;
      let maxY = plants.length - 1;
      let total = 0;
      let friendCount = 0;

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
    function growAndDraw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let changed = false;
      for (var i = 0; i < plants.length; i++) {
        for (var j = 0; j < plants[i].length; j++) {
          if (active) {
            changed = plants[i][j].growMe(i, j) || changed;
          }
          plants[i][j].drawMe();
          plants[i][j].updateAngle();
        }
      }
      if (!changed) active = false;
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
        const cursor = e instanceof MouseEvent ? e : e.targetTouches[0];
        const rect = canvas.getBoundingClientRect();
        const static_x = cursor.clientX - rect.left;
        this.x = static_x - centerX;
        const static_y = cursor.clientY - rect.top;
        this.y = static_y - centerY;
        const x_speed = this.x - this.px;
        const mouse_speed = getDistance(x_speed, this.y - this.py);
        const ymax = plants.length;
        const xmax = plants[0].length;

        const impactRadius = 200;

        for (var i = 0; i < ymax; i++) {
          for (var j = 0; j < xmax; j++) {
            const plant = plants[i][j];
            let xdistance = this.x - plant.x;
            let ydistance = this.y - plant.y;

            if (
              plant.height > 0 &&
              Math.abs(xdistance) + Math.abs(ydistance) < impactRadius
            ) {
              const distance = getDistance(xdistance, ydistance);
              const impact = 1 - distance / impactRadius;
              let angle = (impact * mouse_speed) / 100;
              if (this.x > plant.x) {
                angle = -angle;
              }
              angle += (impact * x_speed) / 150;
              plant.angle += angle;
              const posAngle = Math.abs(plant.angle);
              if (posAngle > Math.PI / 2) {
                const new_height = Math.max(
                  0,
                  plant.height - (posAngle - Math.PI / 2) * 5
                );
                plant.height = new_height;
                if (new_height === 0) plant.angle = 0;
              }
            }
          }
        }

        this.px = this.x;
        this.py = this.y;
        active = false;
        window.clearTimeout(this.timer);
        this.timer = window.setTimeout(() => {
          active = true;
        }, waitTime * 1000);
      }
    }

    function createTrees(count_across: number, count_up: number) {
      plants = [];
      for (let i = 0; i < count_up; i++) {
        const row = [];
        for (let j = 0; j < count_across; j++) {
          const height = Math.random() + 0.25;
          row.push(new Plant(height));
        }
        plants.push(row);
      }
      return plants;
    }

    function placeTrees() {
      if (!canvas || !canvas.parentElement) return;

      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      centerX = canvas.width * 0.5;
      centerY = canvas.height * 0.5;

      count_across = Math.floor(canvas.width / xgap);
      count_up = Math.floor(canvas.height / ygap);
      plants = createTrees(count_across, count_up);

      for (var i = 0; i < plants.length; i++) {
        for (var j = 0; j < plants[i].length; j++) {
          const height = i - plants.length / 2;
          const ypos = ygap * height + ygap * 2;
          let xpos = xgap * (j - plants[i].length / 2) + height * 2;
          if (i % 2 === 0) {
            xpos -= xgap / 2;
          }
          plants[i][j].x = xpos;
          plants[i][j].y = ypos;
        }
      }
      active = true; // grow to clear excess trees before render
    }

    const pointer = new Pointer();

    window.addEventListener("mousemove", pointer.move.bind(pointer), false);
    window.addEventListener("touchmove", pointer.move.bind(pointer), false);
    window.addEventListener("resize", placeTrees);

    const step = () => {
      growAndDraw();
      requestAnimationFrame(step);
    };
    placeTrees();
    step();

    return () => {
      window.removeEventListener("mousemove", pointer.move.bind(pointer));
      window.removeEventListener("touchmove", pointer.move.bind(pointer));
      window.removeEventListener("resize", placeTrees);
    };
  }, [gap, width, height]);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef}>trees</canvas>
    </div>
  );
}
