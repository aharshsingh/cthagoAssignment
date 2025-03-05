const fs = require("fs");

function writeFile(User, usersFilePath) {
    fs.writeFileSync(usersFilePath, JSON.stringify(User, null, 2), "utf-8");
}

module.exports = writeFile;