const cardinalPoints = 'NESW'; //if we go clockwise, these are the possible orientations
// let lostRobots = [] // This array will look like [[1,2],[3,4]]


function turn(instruction, orientation) {
    //This function changes the orientation of the robot with a string and an int given
    switch (instruction) {
        case "R":
            orientation++;
            if (orientation === 4){orientation = 0};
          return orientation;
        case "L":
            orientation--;
            if (orientation === -1){orientation = 3};
          return orientation;
        default: // Going straight, so we don't need to change the orientation
          return orientation;
      }
}

module.exports = function move(Robot, boundX, boundY, lostRobots, scent) {

  for (let i = 0; i < Robot.instructions.length  && !Robot.lost; i++){
    const command = Robot.instructions[i]; //This takes the new instruction
    //position[2] = command;
    let nO = turn(command, Robot.orientation); //We calculate the new orientation
    Robot.orientation = nO;
    //we check if in this position there is a scent
    let position = [Robot.x, Robot.y, Robot.orientation];
    // if (scent.includes(position) === true) { //This position and orientation has a scent, so we ignore it
    //      break; // We ignore the instruction because there is prohibition 
    // }
    if (findArrayInArray(position, scent) == 1){
      break;
    }
    //We check if this orientation is within the bounds of the grid
    if (goingLost(Robot,boundX,boundY,lostRobots)) {
        //let newScent = [Robot.x,Robot.y,Robot.orientation];
        scent.push(position);
        Robot.lost = true;
    }
    switch (Robot.orientation) {
        case 0:
          Robot.y++;
          continue;
        case 1:
          Robot.x++;
          continue;
        case 2:
          Robot.y--;
          continue;
        case 3:
          Robot.x--;
          continue;
    }
  };
  let result = [Robot.x.toString(), Robot.y.toString()];
  let cardinalPoint = cardinalPoints.substring(Robot.orientation, Robot.orientation+1);
  result.push(cardinalPoint);
  if (Robot.lost) {
    result.push("LOST");
  };
  let a = result.join(" ");
  return a;
}

function goingLost(Robot, boundX, boundY, lostRobots) {
    if ((Robot.orientation===1 && Robot.x+1 > boundX) || (Robot.orientation===0 && Robot.y+1 > boundY) || (Robot.orientation ===3 && Robot.x-1 < 0) || (Robot.orientation ===2 && Robot.y-1 < 0)){
        let newLost = [Robot.x,Robot.y]
        lostRobots.push(newLost)
        return true //if the robot is lost
    } else {
        return false //if the robot isn't lost
    }
}

 function findArrayInArray(innerArray, outerArray) {
   const innerArrayString = JSON.stringify(innerArray);
   let index = 0;
   const inArray = outerArray.some(function (element) {
       index ++;
       return JSON.stringify(element) === innerArrayString;
   });
   if (inArray) {
       return index - 1;
   } else {
       return -1;
   }
 }