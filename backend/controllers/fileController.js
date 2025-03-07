const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');
const generateId = require('../utils/generateId');
const path = require('path')
const FilePath = path.join(__dirname, "../database/scan.json");
const AIMatching = require('../utils/AImatching');
const userFilePath = path.join(__dirname, "../database/user.json");

const fileController = {
    async upload(req,res,next){
        try {
            // if (!req.body || req.body.length === 0) {
            //     return res.status(400).json({ error: "No file uploaded" });
            // }
            const userId = req.headers['userid'];
            const fileName = req.headers['filename'];
            fileContent = req.body.toString("utf-8");
            if(!fileContent){
                return res.status(400).json({error: "File not uploaded"});
            }
            let Scan = readFile(FilePath);
            const _id = generateId();
            const createdAt = new Date().toISOString();
            Scan.scans.push({
                _id,
                userId,
                fileName,
                fileContent,
                createdAt
            })
            writeFile(Scan, FilePath)
            return res.status(200).json({ message: "File received", content: fileContent, "scanId": _id });
        } catch (error) {
            console.log(error);
            return res.status(500).json({"error": "Internal server error"})
        }
    },
    async match(req,res,next){
        try {
            const {docId} = req.params;
            const {userId} = req.body;
            let User = readFile(userFilePath);
            let userIndex = User.users.findIndex(user=> user.userId === userId);
            if(!userIndex){
                return res.json({error: 'User not found'});
            }
            if(User.users[userIndex].credits <= 0){
                return res.json({error: 'Insufficient credits'});
            }
            var maxMatch = -1;
            var maxMatchId;
            const Scan = readFile(FilePath);
            const scan = Scan.scans.find(doc => doc._id === docId);
            if(!scan){
                return res.json({"error": "File not found"});
            }
            for(let existingFile = 0; existingFile < Scan.scans.length; existingFile++){
                if(Scan.scans[existingFile]._id !== docId){
                    var match = await AIMatching(scan.fileContent, Scan.scans[existingFile].fileContent);
                    if(maxMatch < match){
                        maxMatch = match;
                        maxMatchId = Scan.scans[existingFile]._id;
                    }
                }
            }
            User.users[userIndex].credits -= 1;
            User.users[userIndex].totalScan += 1;
            writeFile(User, userFilePath);
            res.json(maxMatch+ " " +maxMatchId);
        } catch (error) {
            console.log(error)
            return res.json({"error": "Internal server error"})
        }
    }
}
module.exports = fileController;;