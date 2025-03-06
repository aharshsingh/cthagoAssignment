const readFile = require('../utils/readFile');
const path = require('path');
const userFilePath = path.join(__dirname, "../database/user.json");
const scanFilePath = path.join(__dirname, "../database/scan.json");
const userController = {
    async userProfile(req,res,next){
        try {
            const {userId} = req.params
            const User = readFile(userFilePath);
            let user = User.users.find(user => user.userId === userId);
            const { salt, password, ...data } = user;
            user = { ...data };
            const Scan = readFile(scanFilePath);
            let pastScan = Scan.scans.filter(scan=> scan.userId !== userId);
            const scanWithoutContent = pastScan.map(({ fileContent,userId, ...rest }) => rest);
            user = {...user, pastScan: scanWithoutContent};
            res.json(user);
        } catch (error) {
            console.log(error)
            return res.json({"error": "Internal server error"});
        }
    }
}

module.exports = userController;
