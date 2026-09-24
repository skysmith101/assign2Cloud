const db = require("../config/db");

const Auth = {
  async authenticate(username, password) {
    const sql = `SELECT userID, username, urole FROM users WHERE username = ? AND passwd = ?`;
    const [rows] = await db.execute(sql, [username, password]);
    return rows[0] || null;
  },
};

module.exports = Auth;