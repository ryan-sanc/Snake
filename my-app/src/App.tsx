import React, { useEffect, useRef, useState } from "react";
import { useInterval } from "usehooks-ts";
import AppleLogo from "./applePixels.png";
import Monitor from "./oldMonitor.png";
import "./App.css";
const canvasX = 1000;
const canvasY = 1000;
const initialSnake = [
  [4, 10],
  [4, 10],
];
const initialApple = [14, 10];
const scale = 50;
const timeDelay = 100;

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState(initialSnake);
  const [apple, setApple] = useState(initialApple);
  const [direction, setDirection] = useState([0, -1]);
  const [delay, setDelay] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useInterval(() => runGame(), delay);
  useEffect(() => {
    let fruit = document.getElementById("fruit") as HTMLCanvasElement;
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        // Draw the snake
        snake.forEach(([x, y], index) => {
          if (index === 0) {
            // Head of the snake
            ctx.fillStyle = "#6B8E23";
            ctx.beginPath();
            ctx.arc(x + 0.5, y + 0.5, 0.5, 0, Math.PI * 2);
            ctx.fill();

            // Draw eyes on the head
            ctx.fillStyle = "#fff";
            ctx.beginPath();
            ctx.arc(x + 0.7, y + 0.3, 0.1, 0, Math.PI * 2);
            ctx.arc(x + 0.3, y + 0.3, 0.1, 0, Math.PI * 2);
            ctx.fill();
          } else if (index === snake.length - 1) {
            // Tail of the snake
            ctx.fillStyle = "#9ACD32";
            ctx.beginPath();
            ctx.arc(x + 0.5, y + 0.5, 0.4, 0, Math.PI * 2); // Draw tail as a smaller circle
            ctx.fill();
          } else {
            // Body of the snake
            ctx.fillStyle = "#8FBC8F"; // medium green color for the body
            ctx.fillRect(x, y, 1, 1); // Draw the body segment as a square
          }
        });

        // Draw the fruit (apple)
        ctx.drawImage(fruit, apple[0], apple[1], 1, 1);
      }
    }
  }, [snake, apple, gameOver]);
  function handleSetScore() { }

  function play() {
    setSnake(initialSnake);
    setApple(initialApple);
    setDirection([1, 0]);
    setDelay(timeDelay);
    setScore(0);
    setGameOver(false);
  }

  function checkCollision(head: number[]) { }

  function appleAte(newSnake: number[][]) { }

  function runGame() { }

  function changeDirection(e: React.KeyboardEvent<HTMLDivElement>) {
    switch (e.key) {
      case "ArrowLeft":
        // Prevent reversing direction
        if (direction[0] !== 1) setDirection([-1, 0]);
        break;
      case "ArrowUp":
        if (direction[1] !== 1) setDirection([0, -1]);
        break;
      case "ArrowRight":
        if (direction[0] !== -1) setDirection([1, 0]);
        break;
      case "ArrowDown":
        if (direction[1] !== -1) setDirection([0, 1]);
        break;
    }
  }
  return (
    <div onKeyDown={(e) => changeDirection(e)}>
      <img id="fruit" src={AppleLogo} alt="fruit" width="30" />
      <img src={Monitor} alt="fruit" width="4000" className="monitor" />
      <canvas
        className="playArea"
        ref={canvasRef}
        width={`${canvasX}px`}
        height={`${canvasY}px`}
      />
      {gameOver && <div className="gameOver">Game Over</div>}
      <button onClick={play} className="playButton">
        Play
      </button>
      <div className="scoreBox">
        <h2>Score: {score}</h2>
        <h2>High Score: {localStorage.getItem("snakeScore")}</h2>
      </div>
    </div>
  );
}
