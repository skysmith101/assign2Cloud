const jwt = require("jsonwebtoken");
const Auth = require("../models/authModel");

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key_123";

async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: "Username and password are required",
      });
    }
    
    const user = await Auth.authenticate(username, password);

    if(!user){
        return res.status(401).json({
            success: false,
            error: "invalid user or pass",
        });
    }

    const payload ={
        id: user.userID,
        username: user.username,
        role: user.urole,
    };

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "30m"});

    res.status(200).json({
        success: true,
        message: "authentication successful",
        token: token,
    });
}catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = { login };