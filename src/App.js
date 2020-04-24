import React, { useState, useEffect } from "react";
import Snake from "./Snake";
import Food from "./Food";
import "./css.scss";

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

function App() {
  const [snakeDots, setSnakeDots] = React.useState([
    [0, 0],
    [2, 0],
  ]);
  const [food, setFood] = useState(getRandomCoordinates());
  const [direction, setDirection] = useState({ direction: "RIGHT" });
  const [speed] = useState(300);

  useEffect(() => {
    document.onkeydown = onKeyDown;
    const interval = setInterval(() => {
      moveSnake();
    }, speed);
    snakeOutOfBorders();
    checkItCollapsed();
    checkIfEat();
    return () => clearInterval(interval);
  }, [snakeDots]);

  const onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        setDirection({ direction: "UP" });
        break;
      case 40:
        setDirection({ direction: "DOWN" });
        break;
      case 37:
        setDirection({ direction: "LEFT" });
        break;
      case 39:
        setDirection({ direction: "RIGHT" });
        break;
    }
  };

  const moveSnake = () => {
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch (direction.direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
    }
    dots.push(head);
    dots.shift();
    setSnakeDots(dots);
  };

  function checkIfEat() {
    let head = snakeDots[snakeDots.length - 1];
    let newfood = food;
    if (head[0] == newfood[0] && head[1] == newfood[1]) {
      setFood(getRandomCoordinates());
      enlargeSnake();
    }
  }

  function enlargeSnake() {
    let newSnake = [...snakeDots];
    newSnake.unshift([]);
    setSnakeDots(newSnake);
  }

  function checkItCollapsed() {
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        onGameOver();
      }
    });
  }

  function snakeOutOfBorders() {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      onGameOver();
    }
  }

  function onGameOver() {
    alert("Game over");
    setDirection({ direction: "RIGHT" });
    setSnakeDots([
      [0, 0],
      [2, 0],
    ]);
  }

  return (
    <div className="game-area">
      <Snake snakeDots={snakeDots}></Snake>
      <Food dot={food}></Food>
    </div>
  );
}

export default App;
