const express = require('express');
const router = express.Router();
const {registerView, loginView, registerUser, loginUser} = require('../controllers/loginController');
const { dashboardView } = require('../controllers/dashboardController');
const { protectRoute } = require('../auth/protect');

router.get('/register', registerView);
router.get('/login', loginView);
router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/dashboard', protectRoute, dashboardView);

module.exports = router;