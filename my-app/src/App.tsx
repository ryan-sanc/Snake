import React, { useEffect, useRef, useState } from "react";
import { useInterval } from "usehooks-ts";
import AppleLogo from "./applePixels.png";
import Monitor from "./oldMonitor.png";
import Wall from "./wall.jpg";
import "./App.css";
const canvasX = 1000;
const canvasY = 1000;

const initialSnake = [
  [4, 10],
  [4, 10],
];

const initialApple = [7, 10];
const scale = 50;
const timeDelay = 100;

const initialWalls = [
  [3, 5],[4, 5], [5, 5], [6, 5], [6, 4], [6,3],
  [10, 15], [11, 15], [12,15], [13,15], [14, 15], [15,15], [16,15],
  [14,14], [14,13], [14,12], [14, 11], [14,10]
]

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState(initialSnake);
  const [apple, setApple] = useState(initialApple);
  const [direction, setDirection] = useState([0, -1]);
  const [delay, setDelay] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [walls, setWalls] = useState(initialWalls);

  useInterval(() => runGame(), delay);
  useEffect(() => {
    let fruit = document.getElementById("fruit") as HTMLCanvasElement;
    let wallImage = document.getElementById("wallImage") as HTMLCanvasElement;
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
            ctx.fillRect(x+0.05, y+0.05, 0.9, 0.9); // Draw the body segment as a square
          }
        });

        // Draw the fruit (apple)
        ctx.drawImage(fruit, apple[0], apple[1], 1, 1);

        walls.forEach(([x, y],) => 
          ctx.drawImage(wallImage, x, y, 1, 1));
      }
    }
  }, [snake, apple, gameOver]);

  function randomizeWall() {

  }
  function handleSetScore() { }

  function play() {
    setSnake(initialSnake);
    setApple(initialApple);
    setDirection([1, 0]);
    setDelay(timeDelay);
    setScore(0);
    setGameOver(false);
  }

  function checkCollision(head: number[]) {
    // for (let i = 0; i < head.length; i++) {
    //   if (head[i] < 0 || head[i] * scale >= canvasX) return true;
    // }
    for (const s of snake) {
      if (head[0] === s[0] && head[1] === s[1]) return true;
    }

    for (let w of walls){
      if (head[0] === w[0] && head[1] === w[1]) return true;
    }
    return false;
  }

  function randomizeAppleCoord() {
    let newCoord;
    let isValid;
    do {
      isValid = true;
      newCoord = apple.map(() => Math.floor((Math.random() * canvasX) / scale));
      for (let w of walls)
        if (newCoord[0] === w[0] && newCoord[1] === w[1]){
          isValid = false;
          continue;
        }
      for (let s of snake)
        if (newCoord[0] === s[0] && newCoord[1] === s[1]){
          isValid = false;
          continue;
        }
    } while (!isValid);
    return newCoord;
  }

  function appleAte(newSnake: number[][]) {
    let coord = randomizeAppleCoord();
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = coord;
      setScore(score + 1);
      setApple(newApple);
      return true;
    }
    return false;
  }

  function runGame() {
    const newSnake = [...snake];
    const newSnakeHead = [
      newSnake[0][0] + direction[0],
      newSnake[0][1] + direction[1],
    ];
    if (newSnakeHead[0] < 0)
      newSnakeHead[0] = Math.floor(canvasX / scale);
    else if (newSnakeHead[0] * scale >= canvasX)
      newSnakeHead[0] = 0;

    if (newSnakeHead[1] < 0)
      newSnakeHead[1] = Math.floor(canvasY / scale);
    else if (newSnakeHead[1] * scale >= canvasY)
      newSnakeHead[1] = 0;
      
    newSnake.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) {
      setDelay(null);
      setGameOver(true);
      handleSetScore();
    }
    if (!appleAte(newSnake)) {
      newSnake.pop();
    }
    setSnake(newSnake);
  }

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
      <img id="wallImage" src={Wall} alt="wallImage" width="0" />
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

export default App;