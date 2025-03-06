import { Mistral } from '@mistralai/mistralai';
const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({apiKey});
const readFile = require('./readFile');
const path = require('path');
const scanFilePath = path.join(__dirname, "../database/scan.json");

async function AIMatching(content) {
    try {
        const Scan = readFile(scanFilePath);
        const chatResponse = await client.chat.complete({
            model: 'mistral-large-latest',
            messages: [
                { role: "system", content: "You are an AI that generates test questions." },
                { role: "user", content: `Create a question for a test based on this description: ${testDescription} test is oral interview and don't provide answer i need question only! And i donot need any other statment only question and dont repeat questions. difficulty of the question will be ${difficulty}` }
            ],
          });
        console.log('Chat:', chatResponse.choices[0].message.content);   
        return chatResponse.choices[0].message.content
    } catch (error) {
        console.error("Error generating question:", error);
        return null;
    }
}
module.exports = AIMatching;