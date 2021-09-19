const move = require("./envir.js");
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let result = "";
const cardinalPoints = 'NESW'; //if we go clockwise, these are the possible orientations
let lostRobots = [] // This array will look like [[1,2],[3,4]]
let scent = [];
let robots = [];
const upperRight = [];


class Robot {
  constructor(x, y, orientation, instructions, lost) {
    this.x = x;
    this.y = y;
    this.orientation = orientation;
    this.instructions = instructions;
    this.lost = lost;
  }
}

function input(prompt) {
    return new Promise((callback, error) => {
        rl.question(prompt, (userInput)=> {
            callback(userInput);
        }, ()=> {
            error();
        });
    });
}

function gridBounds (answer){
    //This function receives the string of the user and save the numbers into an array upperRight
    answer = answer.split(" ", 2);
    let int = parseInt(answer[0], 10);
    let int2 = parseInt(answer[1], 10);
    upperRight.push(int);
    upperRight.push(int2);  
}

function addRobot (answer){
    answer = answer.split(" ", 4);
    //The user says one letter as an orientation, so we convert it to a number
    let cardinalNum = cardinalPoints.indexOf(answer[2]);
    //To store the robots information we use instances of Robot Object
    var newRobot = new Robot(parseInt(answer[0], 10), parseInt(answer[1], 10), cardinalNum, answer[3], false);
    console.log(newRobot);
    robots.push(newRobot);
}

const main = async () => {
    bounds = await input("Enter the upper-right coordinates: ");
    gridBounds(bounds); //bounds is a string of the grid's coordinates
    //Then we ask for each one of the three robot's information
    for (let i = 0; i < 3; i++) {
        robotInfo = await input("Enter the robot coordinates, orientation and instructions: ");
        addRobot(robotInfo); //This function adds an instance of Robot to the array robots 
    }
    //We move the robots and print the resulting position for each
    for (element in robots) {
        let result= move(robots[element], upperRight[0], upperRight[1], lostRobots, scent)
        console.log(result);
    }
    rl.close();
};

main();