//We set the object for out robots
function Robot(x, y, orientation, instructions, lost) {
  this.x = x;
  this.y = y;
  this.orientation = orientation;
  this.instructions = instructions;
  this.lost = lost;
}
let a = 2; //Since the input is for 3 robots this value is 3-1
const cardinalPoints = 'NESW'; //if we go clockwise, these are the possible orientations
let lostRobots = [] // This array will look like [[1,2],[3,4]]
let scent = [];
let robots = [];
const upperRight = [];
const turn = require("./envir.js");
const move = require("./envir.js");

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// rl.setPrompt('Enter the upper-right coordinates > ');
// rl.prompt();
// rl.on('line', (line) => { 
// line = line.split(" ", 2);
// upperRight.push(line[0]);
// upperRight.push(line[1]);  
// }).on('close', () => {
// console.log('Have a nice day!');
// });

rl.question('Set the upper-right coordinates: ', (answer) => {
  answer = answer.split(" ", 2);
  upperRight.push(answer[0]);
  upperRight.push(answer[1]);  
});


rl.setPrompt('Enter the robot coordinates, orientation and instructions > ');
rl.prompt();
rl.on('line', (line) => {
  line = line.split(" ", 4);
  let cardinalNum = cardinalPoints.indexOf(line[2]);
  var newRobot = new Robot(line[0], line[1], cardinalNum, line[3], false);
  console.log(newRobot);
  robots.push(newRobot);

  if (a === 0){ //if there are no more robots
    for (let i = 0; i < robots.length; i++){
      let finalPosition = [robots[i].x, robots[i].y, robots[i].orientation]
      finalPosition.join(' ');
      console.log(finalPosition);
    }
    rl.close();
  } else if (a > 0){
    rl.setPrompt('Enter the robot coordinates, orientation and instructions > ');
    rl.prompt();
    a--;
  }
  
}).on('close', () => {
  console.log('Have a nice day!');
});

//TO DO: Execute the program and ask for grid boundaries