const path = require('path');
const userFilePath = path.join(__dirname, "../database/user.json");
const readFile = require('./readFile');
const writeFile = require('./writeFile');

const resetAllCredits = () => {
    const User = readFile(userFilePath);
    User.users.forEach(user => {
        user.credits = 20;
    });
    writeFile(User, userFilePath);
    console.log("runned")
};

const scheduleCreditReset = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const timeUntilMidnight = midnight - now;
    setTimeout(() => {
        resetAllCredits(); 
        setInterval(resetAllCredits, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);
};

module.exports = { scheduleCreditReset, resetAllCredits };
