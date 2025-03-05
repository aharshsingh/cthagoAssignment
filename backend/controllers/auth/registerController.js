const path = require("path");
const userFilePath = path.join(__dirname, "../../database/user.json");
const readFile = require('../../utils/readFile.js');
const {hashPassword} = require('../../utils/passwordHash.js');
const writeFile = require('../../utils/writeFile.js');

const registerController = {
    async register(req,res,next){
        try {
            const {userName, email, password} = req.body;
            let User = readFile(userFilePath);
            // console.log(User)
            const exists = User.users.find(user => user.email === email);
            if(exists){
                return res.json({"error": "Email is already registered"})
            }
            const { salt, hashedPassword } = hashPassword(password);
            const newUser = {
                userName, 
                email, 
                password: hashedPassword,
                salt
            }
            User.users.push(newUser)
            writeFile(User, userFilePath);
            return res.json(newUser);
        } catch (error) {
            console.log(error)
            return res.json({"error": "Internal server error"})
        }
    }
}
module.exports = registerController;
