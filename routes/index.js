const express = require('express');
const router = express.Router();


router.use('/api', require('./locationRoutes'));




module.exports = router;