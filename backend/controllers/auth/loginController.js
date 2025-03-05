const path = require("path");
const userFilePath = path.join(__dirname, "../../database/user.json");
const accessTokenFilePath = path.join(__dirname, "../../database/accessToken.json");
const readFile = require('../../utils/readFile.js');
const {verifyPassword} = require('../../utils/passwordHash.js');
const writeFile = require('../../utils/writeFile.js');
const {generateAccessToken} = require('../../utils/accessToken.js');
const generateId = require("../../utils/generateId.js");

const loginController = {
    async login(req,res,next){
        try {
            const {email, password} = req.body;
            let User = readFile(userFilePath);
            const user = User.users.find(user => user.email === email);
            if(!user){
                return res.json({"error": "Email not registered"})
            }
            if(!verifyPassword(password, user.password, user.salt)){
                return res.json({"error": "invaild password"});
            }
            const token = generateAccessToken(user.userId);
            const _id = generateId();
            const newLogin = { 
                _id,
                userId: user.userId, 
                accessToken: token
            }
            let accessToken = readFile(accessTokenFilePath);
            accessToken.tokens.push(newLogin)
            writeFile(accessToken, accessTokenFilePath);
            return res.json(newLogin);
        } catch (error) {
            console.log(error)
            return res.json({"error": "Internal server error"})
        }
    }
}
module.exports = loginController;
