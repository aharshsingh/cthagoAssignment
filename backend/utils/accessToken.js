const crypto = require("crypto");

function generateAccessToken(userId) {
  const randomBytes = crypto.randomBytes(16).toString("hex");
  const data = `${userId}:${randomBytes}`;
  return Buffer.from(data).toString("base64");
}

function decodeAccessToken(token) {
  try {
    const decodedData = Buffer.from(token, "base64").toString("utf8");
    const [userId, randomBytes] = decodedData.split(":");
    return { userId, randomBytes };
  } catch (error) {
    return { error: "Invalid or tampered token" };
  }
}

module.exports = {generateAccessToken, decodeAccessToken}