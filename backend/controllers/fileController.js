const readFile = require('../utils/readFile');
const writefile = require('../utils/writeFile');
const generateId = require('../utils/generateId');
const path = require('path')
const FilePath = path.join(__dirname, "../database/scan.json");
const AIMatching = require('../utils/AImatching');

const fileController = {
    async upload(req,res,next){
        try {
            // if (!req.body || req.body.length === 0) {
            //     return res.status(400).json({ error: "No file uploaded" });
            // }
            const userId = req.headers['userid'];
            const fileName = req.headers['filename'];
            fileContent = req.body.toString("utf-8");
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
            writefile(Scan, FilePath)
            return res.json({ message: "File received", content: fileContent, "scanId": _id });
        } catch (error) {
            console.log(error);
            return res.json({"error": "Internal server error"})
        }
    },
    async match(req,res,next){
        try {
            const {docId} = req.params;
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
            
            res.json(maxMatch+ " " +maxMatchId);
        } catch (error) {
            console.log(error)
            return res.json({"error": "Internal server error"})
        }
    }
}
module.exports = fileController;;