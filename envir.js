// const cardinalPoints = 'NESW'; //if we go clockwise, these are the possible orientations
// let lostRobots = [] // This array will look like [[1,2],[3,4]]


module.exports = function turn(instruction, orientation) {
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

module.exports = function move(robotX, robotY, robotOrientation, boundX, boundY, instructions, lostRobots, scent) {
    //To follow the instructions, I'll apply a for loop
    let orientation = robotOrientation;
    let x = robotX;
    let y = robotY;
    let position = [x, y, orientation];
    for (let i = 0; i < instructions.length; i++){
        const command = instructions[i];
        position[2] = command;
        let nO = turn (command, orientation); //We calculate the new orientation
        //we check if in this position there is a scent
        if (scent.indexOf(position) !== -1) { 
            continue; // We ignore the instruction because there is prohibition 
        }
        //We check if this orientation is within the bounds of the grid
        if (lost(nO, x,y,boundX,boundY,lostRobots)) {
            let newScent = [x,y];
            scent.push(newScent);
            break;
        }
        //Since this instruction is not following a scent and our robot is not getting lost, we follow it
        switch (command) {
            case 0:
              y++;
              continue;
            case 1:
              x++;
              continue;
            case 2:
              y--;
              continue;
            case 3:
              x--;
        }
    }
    position.join(' ');
    return position;
}

function lost(orientation, x, y, boundX, boundY, lostRobots) {
    if ((orientation===1 && x+1 > boundX) || (orientation===0 && y+1 > boundY) || (orientation ===3 && x-1 < 0) || (orientation ===2 && y-1 < 0)){
        let newLost = [x,y]
        lostRobots.push(newLost)
        return true //if the robot is lost
    } else {
        return false //if the robot isn't lost
    }
}