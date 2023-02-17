const express = require('express');
const userController = require('../controllers/userController');
const userMiddlewares = require('../middlewares/userMiddlewares');

const router = express.Router();

router.post('/signup', userMiddlewares.parseBody, userController.create);
router.post('/login', userMiddlewares.parseBody, userController.login);
router.post('/logout', userMiddlewares.requireAuth, userController.logout);

module.exports = router;