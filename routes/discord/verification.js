const express = require('express');
const router = express.Router();
const { isValid } = require('../../authentication/validation');
const { checkForUser, addUser } = require('../../utils/database/queries/userHandler');

router.post('/verification', isValid, (req, res) => {
    try {
        // Data validation
        if (!req.body.username || !req.body.email || !req.body.discordId) return res.status(400).json({ status: 400, message: "Bad request" });

        let username = req.body.username;
        let email = req.body.email;
        let discordID = req.body.discordId;

        if (checkForUser(discordID) === true) return res.status(400).json({ status: 400, message: "User already exists" });
        addUser(username, email, discordID);

        res.status(200).json({ status: 200, message: "User verified!" });
        return;
    } catch (e) {
        console.log(e);
        res.status(500).json({ status: 500, message: "Internal server error" });
    }
});

module.exports = router;