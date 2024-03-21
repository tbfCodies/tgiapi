const { connectDB, closeDB, pool } = require('../databaseHandler');

/*
* @returns {number} date

* Returns the current date
*/
const getDate = () => {
    const date = new Date();
    return date.getTime();
}

/*
* @param {string} userId
* @returns {boolean} result

* Checks if the user exists in the database
*/
const checkForUser = async (userId) => {

    // Error handling
    if (!userId) return false;

    try {
        // Check if user exists by returning TRUE or FALSE
        const query = `SELECT userID FROM linkedAccount WHERE accountID = @userID AND typeID='1';`;
        const result = await pool.query(query, { userID: userId });

        return result ? true : false;
    } catch (e) {
        console.error(e);
        return false;
    }
};

/*
* @param {string} username
* @param {string} email
* @param {string} discordId
* @returns {boolean} result

* Adds a user to the database
*/
const addUser = async (username, email, discordId) => {
    if (!userId || !username || !email) return false;
    try {
        const query = `INSERT INTO userAccount (userName, email, joinDate) VALUES (@userName, @eMail, @date); SELECT userID FROM userAccount WHERE userName=@userName and email=@eMail;`

        await pool.query(query, { userName: username, eMail: email, date: getDate }).then((res) => {
            const second = `INSERT INTO linkedAccount (accountID, typeID, userID) VALUES (@discordID, 1, @userID);`;
            pool.query(second, { discordID: discordId, userID: res.userID });

            return true;
        })
    } catch (e) {
        console.error(e);
        return false;
    }

};

const updateNickname = async (discordId, nickname) => {
    if (!discordId || !nickname) return false;
    try {
        const fetchUserId = `SELECT userID FROM linkedAccount WHERE accountID = @userID AND typeID='1';`;
        const res = pool.query(fetchUserId, { userID: discordId });

        const updateNickname = `UPDATE userAccount SET userName = @nickName WHERE userID=@userId'`;
        pool.query(updateNickname, { userId: res.userID, nickName: nickname });

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

const updateRoles = async (discordId, roles, type) => {
    if (!discordId || !roles || !type) return false;
    try {
        if (type == "add") {
            const fetchUserId = `SELECT userID FROM linkedAccount WHERE accountID = @userID AND typeID='1';`;
            const res = pool.query(fetchUserId, { userID: discordId });

            roles.forEach(role => {
                const first = `SELECT roleID FROM role WHERE dsID = @dsID;`; // Discord roleID
                const result = pool.query(first, { dsID: role.dsID })

                const fetchUserId = `SELECT userID FROM linkedAccount WHERE accountID = @userID AND typeID='1';`;
                const res = pool.query(fetchUserId, { userID: discordId });

                // Builder - (1, 1), (2, 1), (3, 1)
                const roleArray = result.map(role => role.roleID); // [1, 2, 3 ...]
                const finalArray = roleArray.map(role => `(${role}, ${user.userID})`).join(', '); // (1, 1), (2, 1), (3, 1)

                const third = `INSERT INTO userRole (roleID, userID) VALUES ${finalArray};`;
                pool.query(third);

                res.status(200).json({ status: 200, message: "Roles updated!" });
                return true;
            })

            res.status(400).json({ status: 400, message: "Bad request - [ROLES-A-FE]" });
            return false;
        }

        if (type == "remove") {
            roles.forEach(role => {
                const first = `SELECT roleID FROM role WHERE dsID = @dsID;`; // Discord roleID
                const result = pool.query(first, { dsID: role.dsID })

                const fetchUserId = `SELECT userID FROM linkedAccount WHERE accountID = @userID AND typeID='1';`;
                const user = pool.query(fetchUserId, { userID: discordId });

                // Builder - (1, 1), (2, 1), (3, 1)
                const roleArray = result.map(role => role.roleID); // [1, 2, 3 ...]
                const finalArray = roleArray.map(role => `(${role}, ${user.userID})`).join(', '); // (1, 1), (2, 1), (3, 1)

                const third = `DELETE FROM userRole WHERE roleID = @roleID AND userID = @userID;`;
                pool.query(third, { roleID: finalArray, userID: user.userID });

                res.status(200).json({ status: 200, message: "Roles updated!" });
                return true;
            })

            res.status(400).json({ status: 400, message: "Bad request - [ROLES-R-FE]" });
            return false;
        }

        res.status(400).json({ status: 400, message: "Bad request" });
        return false;
    } catch (e) {
        console.error(e);
        return false;
    }
};

module.exports = {
    checkForUser,
    addUser,
    updateNickname,
    updateRoles
}