<h1 align="center">Martian Robot</h1>
 
## 📝 Table of Contents
- [About](#about)
- [Requirements](#requirements)
- [Getting Started](#getting_started)
- [Built Using](#built_using)

## 🧐 About <a name = "about"></a>
The surface of Mars can be modelled by a rectangular grid around which robots are able to move according to instructions provided from Earth. This program determines each sequence of robot positions and reports the final position of the robot.

## 🖇 Requirements <a name="requirements"></a>
A robot position consists of a grid coordinate (a pair of integers: x-coordinate followed by y-coordinate) and an orientation (N, S, E, W for north, south, east, and west). A robot instruction is a string of the letters "L", "R", and "F" which represent, respectively, the instructions:
- Left: the robot turns left 90 degrees and remains on the current grid point.
- Right: the robot turns right 90 degrees and remains on the current grid point.
- Forward: the robot moves forward one grid point in the direction of the current orientation and maintains the same orientation.
The direction North corresponds to the direction from grid point (x, y) to grid point (x,y+1).
There is also a possibility that additional command types may be required in the future and provision should be made for this.
Since the grid is rectangular and bounded (...yes Mars is a strange planet), a robot that moves "off" an edge of the grid is lost forever. 
However, lost robots leave a robot "scent" that prohibits future robots from dropping off the world at the same grid point. The scent is left at the last grid position the robot occupied before disappearing over the edge. An instruction to move "off" the world from a grid point from which a robot has been previously lost is simply ignored by the current robot

<h2> The input</h2>
The first line of input is the upper-right coordinates of the rectangular world, the lower-left coordinates are assumed to be 0, 0.

The remaining input consists of a sequence of robot positions and instructions (one line per robot). A position consists of two integers specifying the initial coordinates of the robot and an orientation (N, S, E, W), all separated by whitespace on one line. A robot instruction is a string of the letters "L", "R", and "F" on one line.
Each robot is processed sequentially.

The maximum value for any coordinate is 50.
All instruction strings will be less than 100 characters in length.

<h2> The output</h2>
For each robot position/instruction in the input, the output should indicate the final grid position and orientation of the robot. If a robot falls off the edge of the grid the word "LOST" should be printed after the position and orientation. <br>

Sample input <br>
- 5 3 
- 1 1 E 
- RFRFRFRF 
- 3 2 N 
- FRRFLLFFRRFLL 
- 0 3 W 
- LLFFFRFLFL 

Sample output <br>
- 1 1 E 
- 3 3 N LOST
- 4 2 N

![Diseño sin título](https://user-images.githubusercontent.com/68464035/133938618-f7d528ed-eabd-4166-a833-cde98d493944.png)
In this picture you can the path of the second robot of the sample, the green is my solution, and the red is the one followed by the documentation.
The input sample lose a robot, and since it get lost, can't came back to the grid, that is why my solution is different from the sample

Despite this, the program works perfectly and takes into account the scent of robots

## 🏁 Getting Started <a name = "getting_started"></a>

Download the files and type on the terminal 
```
npm install  
```
```
node app.js 
```

## ⛏️ Built Using <a name = "built_using"></a>

- [JAVASCRIPT](https://developer.mozilla.org/es/docs/Web/JavaScript) 
- [NODE JS](https://nodejs.org/es/) 
- [READLINE](https://nodejs.org/api/readline.html)
