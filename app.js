//The robots move by running this function, so we import it 
const move = require("./envir.js");
//For a CLI approach, is used the readline module
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function input(prompt) {
    return new Promise((callback, error) => {
        rl.question(prompt, (userInput)=> {
            callback(userInput);
        }, ()=> {
            error();
        });
    });
};

class Robot {
    constructor(x, y, orientation, instructions, lost) {
      this.x = x;
      this.y = y;
      this.orientation = orientation;
      this.instructions = instructions;
      this.lost = lost;
    }
};
  
let result = "";
//For taking the orientation information, going clockwise, these are the possible orientations numbered by 0123 for NESW
const cardinalPoints = 'NESW'; 
let lostRobots = []; //[[x,y],[x2,y2]...]
let scent = []; //[[x,y,cardinalNumber],[x2,y2,cardinalNumber]...]
let robots = []; //[{object1},{object2}]
const upperRight = []; //[x,y]

function gridBounds (answer){
    //This function receives the string of the user and save the numbers into the array upperRight
    answer = answer.split(" ", 2);
    let int = parseInt(answer[0], 10);
    let int2 = parseInt(answer[1], 10);
    upperRight.push(int);
    upperRight.push(int2);  
};

function addRobot (answer){
    //This function adds an instance of Robot to the array robots
    answer = answer.split(" ", 4);
    //The user says a letter as the orientation (N,E,S,W), so we convert it to a number with cardinalPoints
    let cardinalNum = cardinalPoints.indexOf(answer[2]);
    let newRobot = new Robot(parseInt(answer[0], 10), parseInt(answer[1], 10), cardinalNum, answer[3], false);
    console.log(newRobot);
    robots.push(newRobot);
};

const main = async () => {
    bounds = await input("Enter the upper-right coordinates: ");
    gridBounds(bounds); 

    //Then we ask for the three robots
    for (let i = 0; i < 3; i++) {
        robotInfo = await input("Enter the robot coordinates, orientation and instructions: ");
        addRobot(robotInfo); //This function adds an instance of Robot to the array robots 
    }

    //The output
    for (element in robots) {
        result = move(robots[element], upperRight[0], upperRight[1], lostRobots, scent);
        console.log(result);
        console.log(scent);
    }
    rl.close();
};

main();