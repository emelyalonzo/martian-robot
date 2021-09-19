const cardinalPoints = 'NESW'; 

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
  };
};

function goingLost(Robot, boundX, boundY, lostRobots) {
  if ((Robot.orientation===1 && Robot.x+1 > boundX) || (Robot.orientation===0 && Robot.y+1 > boundY) || (Robot.orientation ===3 && Robot.x-1 < 0) || (Robot.orientation ===2 && Robot.y-1 < 0)){
      let newLost = [Robot.x,Robot.y]
      lostRobots.push(newLost)
      return true //Robot is going to get lost
  } else {
      return false //Robot is not going to get lost
  };
};

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
  };
};

module.exports = function move(Robot, boundX, boundY, lostRobots, scent) {

  //Consideration: When a robot gets lost, it is forever because outside the grid there is a huge black hole and no one can came back, the robot has gone to the dark side ;)
  for (let i = 0; i < Robot.instructions.length  && !Robot.lost; i++){
    const command = Robot.instructions[i]; 
    //Calculate the new orientation
    let nO = turn(command, Robot.orientation); 
    Robot.orientation = nO;
    //Check if in this position there is a scent
    let position = [Robot.x, Robot.y, Robot.orientation];
    //Check if there is a scent in the position, if so go to the next instruction
    if (findArrayInArray(position, scent) !== -1){
      continue;
    };
    //Check if the robot is going to get lost
    if (goingLost(Robot,boundX,boundY,lostRobots)) {
        scent.push(position);
        Robot.lost = true;
    };
    //if moving to another position
    if (command === "F"){ 
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
      };
    };
  };

  let result = [Robot.x.toString(), Robot.y.toString()];
  let cardinalPoint = cardinalPoints.substring(Robot.orientation, Robot.orientation+1);
  result.push(cardinalPoint);
  if (Robot.lost) {
    result.push("LOST");
  };
  let a = result.join(" ");
  return a; //the final output on a string with whitespace
};