const readFile = require('../utils/readFile');
const path = require('path');
const userFilePath = path.join(__dirname, "../database/user.json");
let User = readFile(userFilePath);
const writeFile = require('../utils/writeFile');

const adminController = {
    async getCreditRequest(req,res,next){
        try {
            const requestUsers = User.users.filter(user=> user.creditRequest === true);
            if(!requestUsers){
                return res.json({"message": "no request found"});
            }            
            res.json(requestUsers);
        } catch (error) {
            return res.json({error: 'Internal server error'});
        }
    },

    async approveCreditRequest(req,res,next){
        try {
            const {userId} = req.params;
            const {credits} = req.body;
            const userIndex = User.users.findIndex(user=> user.userId === userId);
            if(userIndex){
                return res.json({error: "user not found"});
            }
            User.users[userIndex].credits = credits;
            User.users[userIndex].creditRequest = false;
            writeFile(User, userFilePath);
            res.json({"message": "Request approved!"});
        } catch (error) {
            return res.json({error: 'Internal server error'});
        }
    },

    async getUserScans(req,res,next){
        try {
            
        } catch (error) {
            return res.json({error: 'Internal server error'});
        }
    }
}

module.exports = adminController