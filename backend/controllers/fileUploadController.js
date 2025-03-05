const fileUploadController = {
    async upload(req,res,next){
        try {
            if (!req.body || req.body.length === 0) {
                return res.status(400).json({ error: "No file uploaded" });
            }
            const fileContent = req.body.toString("utf-8");
            console.log("Extracted File Content:", fileContent);
            return res.json({ message: "File received", content: fileContent });
        } catch (error) {
            return res.json({"error": "Internal server error"})
        }
    }
}
module.exports = fileUploadController;