const express = require('express');
const router = express.Router();

router.get('/status', (req, res) => {
    // return json
    res.json({
        status: 'ok',
        message: 'API is running'
    });
});

module.exports = router;