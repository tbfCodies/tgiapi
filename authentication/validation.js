const { connectDB, closeDB, pool } = require('../utils/database/databaseHandler');

function isValid(req, res, next) {
    // Data validation, check if the token is parsed with the request
    if (!req.body.token) {
        return res.status(400).json({ status: 400, message: "Bad request" });
    }

    const query = `SELECT token FROM apiToken WHERE token = @vToken;`;
    pool.query(query, { vToken: req.body.token }, (err, result) => {
        // Error handling
        if (err) return res.status(500).json({ status: 500, message: "Internal server error" });

        // If the token is not found in the database, return 403
        if (result.recordset.length === 0) return res.status(403).json({ status: 403, message: "Forbidden" });

        // Token is valid, continue
        return next();
    });

}

module.exports = { isValid };