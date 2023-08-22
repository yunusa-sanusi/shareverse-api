const express = require('express');
const router = express.Router();

const { dashboard, updateUser, deleteUser } = require('../controllers/users');

router.route('/:username').get(dashboard).patch(updateUser).delete(deleteUser);

module.exports = router;
