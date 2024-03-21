const express = require('express');
const router = express.Router();
const { isValid } = require('../../authentication/validation');

const { checkForUser, updateNickname } = require('../../utils/database/queries/userHandler');

router.post('/updatenickname', isValid, (req, res) => {
    try {
        if (!req.body.discordId || !req.body.nickname) return res.status(400).json({ status: 400, message: "Bad request" });
        let discordID = req.body.discordId;
        let nickname = req.body.nickname;

        if (checkForUser(discordID) === false) return res.status(400).json({ status: 400, message: "User does not exist" });
        updateNickname(discordID, nickname);

        res.status(200).json({ status: 200, message: "Nickname updated!" });
        return;
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: 500, message: "Internal server error" });
    }

});

module.exports = router;