let moves = 0;

const isGold = (maze, x, y) => {
  //   console.log(`${moves} x: ${x} y: ${y}`);
  if (maze[x][y] == "X") {
    console.log(`Eureka!! Gold found at x: ${x} y: ${y} in ${moves} moves!`);
    for (const row of maze) {
      console.log(row.join(""));
    }
    throw new Error("");
  }
};

const Counter_Dir = {
  r: ["u", "r", "d", "l"],
  u: ["l", "u", "r", "d"],
  l: ["d", "l", "u", "r"],
  d: ["r", "d", "l", "u"],
};

const nextMove = (maze, x, y, lastDir) => {
  const maxX = maze[0].length - 1;
  const maxY = maze.length - 1;

  return Counter_Dir[lastDir].find((next) => {
    switch (next) {
      case "r": {
        if (x < maxX && maze[x + 1][y] != "\u2588") {
          return true;
        }
        return false;
      }
      case "u": {
        if (y < maxY && maze[x][y + 1] != "\u2588") {
          return true;
        }
        return false;
      }
      case "l": {
        if (x > 0 && maze[x - 1][y] != "\u2588") {
          return true;
        }
        return false;
      }
      case "d": {
        if (y > 0 && maze[x][y - 1] != "\u2588") {
          return true;
        }
        return false;
      }
    }
  });
};

const markPath = (maze, x, y) => {
  if (maze[x][y] == " ") {
    maze[x][y] = "+";
  } else if (maze[x][y] == "+") {
    maze[x][y] = "#";
  }
  moves++;
};

const findGold = (maze, startX, startY, goldX, goldY) => {
  moves = 0;
  maze[goldX][goldY] = "X";
  maze[startX][startY] = "S";
  let dir = "r";
  let x = startX;
  let y = startY;
  try {
    do {
      dir = nextMove(maze, x, y, dir);
      markPath(maze, x, y);
      switch (dir) {
        case "r": {
          x++;
          break;
        }
        case "u": {
          y++;
          break;
        }
        case "l": {
          x--;
          break;
        }
        case "d": {
          y--;
          break;
        }
      }
      isGold(maze, x, y);
    } while (moves < 100);
  } catch (err) {}
};

const copyMaze = (maze) => {
  return maze.map(function (arr) {
    return arr.slice();
  });
};

const ogMaze = [
  [
    "\u2588",
    "\u2588",
    "\u2588",
    "\u2588",
    "\u2588",
    "\u2588",
    "\u2588",
    "\u2588",
    "\u2588",
    "\u2588",
    "\u2588",
  ],
  [" ", " ", " ", " ", "\u2588", " ", " ", " ", " ", " ", "\u2588"],
  [
    "\u2588",
    " ",
    "\u2588",
    " ",
    "\u2588",
    "\u2588",
    "\u2588",
    "\u2588",
    "\u2588",
    " ",
    "\u2588",
  ],
  ["\u2588", " ", "\u2588", " ", " ", " ", " ", " ", "\u2588", " ", "\u2588"],
  [
    "\u2588",
    " ",
    "\u2588",
    "\u2588",
    "\u2588",
    "\u2588",
    "\u2588",
    " ",
    "\u2588",
    " ",
    "\u2588",
  ],
  ["\u2588", " ", " ", " ", "\u2588", " ", " ", " ", " ", " ", "\u2588"],
  [
    "\u2588",
    " ",
    "\u2588",
    " ",
    "\u2588",
    "\u2588",
    "\u2588",
    "\u2588",
    "\u2588",
    " ",
    "\u2588",
  ],
  ["\u2588", " ", "\u2588", " ", " ", " ", "\u2588", " ", " ", " ", "\u2588"],
  [
    "\u2588",
    " ",
    "\u2588",
    "\u2588",
    "\u2588",
    " ",
    "\u2588",
    "\u2588",
    "\u2588",
    " ",
    "\u2588",
  ],
  ["\u2588", " ", " ", " ", "\u2588", " ", " ", " ", "\u2588", " ", " "],
  [
    "\u2588",
    "\u2588",
    "\u2588",
    "\u2588",
    "\u2588",
    "\u2588",
    "\u2588",
    "\u2588",
    "\u2588",
    "\u2588",
    "\u2588",
  ],
];

findGold(copyMaze(ogMaze), 1, 0, 9, 10);
findGold(copyMaze(ogMaze), 7, 4, 9, 10);
findGold(copyMaze(ogMaze), 7, 4, 5, 5);
findGold(copyMaze(ogMaze), 7, 4, 1, 3);
