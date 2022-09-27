const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note. 

💡 HINT: You may want to filter the data first 😉*/

//(a) Home Team name for 2014 world cup final
const filter2014 = fifaData.filter((event) => {
    return event.Year === 2014 && event.Stage === 'Final';
})

const mapHomeTeam2014 = filter2014.map((event) => {
    return event['Home Team Name'];
})
console.log(mapHomeTeam2014)

//(b) Away Team name for 2014 world cup final
const mapAwayTeam2014 = filter2014.map((event) => {
    return event['Away Team Name'];
})
console.log(mapAwayTeam2014)

//(c) Home Team goals for 2014 world cup final
const mapHomeTeamGoals2014 = filter2014.map((event) => {
    return event['Home Team Goals'];
})
console.log(mapHomeTeamGoals2014);

// (d) Away Team goals for 2014 world cup final
const mapAwayTeamGoals2014 = filter2014.map((event) => {
    return event['Away Team Goals'];
})
console.log(mapAwayTeamGoals2014);

//(e) Winner of 2014 world cup final */
let winner2014 = null;
if (mapHomeTeamGoals2014 > mapAwayTeamGoals2014) {
    winner2014 = mapHomeTeam2014;
}
else {
    winner2014 = mapAwayTeam2014;
}
console.log(winner2014)

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa data as its argument
2. Return an array of objects with the data of the teams that made it to the final stage

💡 HINT - you should be looking at the stage key inside of the objects
*/

function getFinals(arr) {
    /* code here */
    const filteredFinals = arr.filter((event) => {
        return event.Stage === 'Final';
    })
    return filteredFinals;
 }



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(arr, callback) {
    /* code here */
    const filteredFinals = callback(arr);
    const years = filteredFinals.map((event) => {
        return event.Year;
    })
    return years;
}

// getYears(fifaData, getFinals)


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game. 
💡 HINT: Don't worry about ties for now (Please see the README file for info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(arr, callback) {
    /* code here */
    const filteredFinals = callback(arr);
    const winners = filteredFinals.map((event) => {
        if(event['Home Team Goals'] > event['Away Team Goals']) {
           return event['Home Team Name']
        }
        else {
           return event ['Away Team Name'];
        }
    });
    return winners;
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Receive a callback function as the third parameter that will take getYears from task 3 as an argument
4. Receive a callback function as the fourth parameter that will take getWinners from task 4 as an argument
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

💡 HINT: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(arr, getFinalsCallback, getYearsCallback, getWinnersCallback) {
    /* code here */
    const filteredFinals = getFinalsCallback(arr);
    const years = getYearsCallback(filteredFinals, getFinalsCallback)
    const winners = getWinnersCallback(arr, getFinalsCallback);
    const winnerStrings = []
    for (let i = 0; i < winners.length; i++) {
      let str = `In ${years[i]}, ${winners[i]} won the world cup!`;
        winnerStrings.push(str)
    }
    return winnerStrings;
}

getWinnersByYear(fifaData, getFinals, getYears, getWinners)


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function `getAverageGoals` to do the following: 
 1. Receive a callback function as a parameter that will take `getFinals` (from task 2) as an argument; ensure you pass in `fifaData` as its argument
 
 💡 HINT: Example of invocation: `getAverageGoals(getFinals(fifaData));`

 2. Calculate the AVERAGE number of the TOTAL home team goals AND TOTAL away team goals scored PER MATCH

 3. Round to the second decimal place and return the value
 
 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2 steps) 
 
*/

function getAverageGoals(getFinalsCallback) {
    /* code here */
    const filteredFinals = getFinalsCallback;
    console.log(filteredFinals)
    let totalScore = filteredFinals.reduce((total, event) => {
        return total + event['Home Team Goals'] + event['Away Team Goals'];
    }, 0);
    // toFixed() rounds a decinal to its nearest place
    return (totalScore / filteredFinals.length).toFixed(2);
 }

getAverageGoals(getFinals(fifaData))



/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(/* code here */) {

    /* code here */

}



/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

}


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
