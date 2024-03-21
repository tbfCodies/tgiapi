const express = require("express");
const router = express.Router();
const { isValid } = require("../../authentication/validation");

const {
  checkForUser,
  updateRoles,
} = require("../../utils/database/queries/userHandler");

router.post("/updateroles", isValid, (req, res) => {
  try {
    if (!req.body.discordId || !req.body.roles)
      return res.status(400).json({ status: 400, message: "Bad request" });
    let discordID = req.body.discordId;
    let roles = req.body.roles;
    let type = req.body.type; // add or remove

    if (checkForUser(discordID) === false)
      return res
        .status(400)
        .json({ status: 400, message: "User does not exist" });
    updateRoles(discordID, roles, type);

    res.status(200).json({ status: 200, message: "Roles updated!" });
    return;
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
});

module.exports = router;
