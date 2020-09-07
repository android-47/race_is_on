// author: Javier Garcia Ramirez
// create date: Thursday, July 22nd, 2020
// last modified: Thursday, July 30th, 2020
// filename: 8.race_is_on.js
// description: generate random speeds, for 10 race objects, given a range and distance by user; identify the winner
// runtime: 1.303
// creation time: 4 hours 13 minutes

const timer = require('execution-time')();
const prompt = require('prompt-sync')({sigint: true});

const contestentSpeeds = [];
const contestentTimes = [];
const contestentNames = ['Pig #1', 'Pig #2', 'Pig #3', 'Pig #4', 'Pig #5', 
'Pig #6', 'Pig #7', 'Pig #8', 'Pig #9', 'Pig #10'];
const userPrompts = ['Enter airplane MIN speed in MPH (1-500): ', 
'Enter airplane MAX speed in MPH (1-500): ', 
'Enter distance in miles (1-300): '];


var userStatus = {
    pass: false,
    placeholder: 0, // placeholder represents prompt
    minSpeed: 0,
    maxSpeed: 0,
    distance: 0
};


function checkInput(userInput){
    // appropriate response for each scenerio
    const potentialErrors = ['', 
    'Invaliid input; Minimum speed must be between 1 and 500\n', 
    'Invaliid input; Maximum speed must between 1 and 500 and higher than the minimum speed\n', 
    'Invaliid input; Distance must be between 1 and 300\n'];
    if (userStatus.placeholder === 0) {
        if (userInput < 1 || 500 < userInput){return potentialErrors[1]} 
        else {userStatus.minSpeed = userInput}
    } else if (userStatus.placeholder === 1) { 
        if (userInput < 1 || userInput < userStatus.minSpeed || 500 < userInput){return potentialErrors[2]} 
        else {userStatus.maxSpeed = userInput}
    } else if (userStatus.placeholder === 2){
        if (userInput < 1 || 300 < userInput){return potentialErrors[3]} 
        else {userStatus.distance = userInput}
    }
    userStatus.placeholder++; // if input is valid, advance to next question
    userStatus.pass = true;
    return potentialErrors[0]; // return nothing
}


for (x of userPrompts){
    while (userStatus.pass === false){
        let testInput = parseInt(prompt(x)); // receive input as int
        retry = checkInput(testInput);
        console.log(retry);
    }
    // pass was true so it can exit while loop, but returns to false so it can move to the next element of userPrompts
    userStatus.pass = false; 
}


timer.start(); // begin timer after receiving valid inputs 
for (let i = 0; i < 10; i++){
    // generate a random number for the speed between the inputed maxSpeed and minSpeeds
    let randomSpeed = Math.floor((Math.random() * (userStatus.maxSpeed - userStatus.minSpeed + 1)) + userStatus.minSpeed);
    contestentSpeeds.push(randomSpeed);

    // used algebra on (velocity = distance/time) in order to isolate and find race times
    let raceTime = userStatus.distance/contestentSpeeds[i];
    contestentTimes.push(raceTime)

    // multiply times by 60 so we can know the total minutes and toFixed so we can know the seconds too
    console.log("NAME:", contestentNames[i], "--- SPEED(mph):", contestentSpeeds[i], "--- TIME(minutes):", (contestentTimes[i]*60).toFixed(2));
}


let winner = Math.min(...contestentTimes);
const runtime = timer.stop();
console.log(`\nWinner: Pig #${(contestentTimes).indexOf(winner)+1}`);
console.log(`Runtime (milliseconds): ${(runtime.time).toFixed(3)}\n`);