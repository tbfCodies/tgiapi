const express = require('express');
const router = express.Router();

const { connectDB, closeDB, pool } = require('../../utils/database/databaseHandler');
const { tokenGen } = require('../../authentication/tokenGen');

router.get('/token', (req, res) => {

    try {
        let token = tokenGen();

        const query = `INSERT INTO apiToken (token) VALUES (@vToken);`;
        pool.query(query, { vToken: token });

        res.status(200).json({ status: 200, token: token });
        return;
    } catch (e) {
        console.log(e);
        res.status(500).json({ status: 500, message: "Internal server error" });
    }

});

module.exports = router;