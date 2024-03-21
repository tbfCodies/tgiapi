const express = require('express');
const router = express.Router();
const { isValid } = require('../../authentication/validation');

const { checkForUser, updateNickname } = require('../../utils/database/queries/userHandler');

router.post('/checkuser', isValid, (req, res) => {
    try {

        if (!req.body.discordId) return res.status(400).json({ status: 400, message: "Bad request" });
        let discordID = req.body.discordId;

        if (checkForUser(discordID) === false) return res.status(400).json({ status: 400, message: "User does not exist" });

        res.status(200).json({ status: 200, message: "User exists!" });
        return;

    } catch (e) {
        console.error(e);
        res.status(500).json({ status: 500, message: "Internal server error" });
    }

});

module.exports = router;