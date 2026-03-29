const router = require("express").Router(); 

const UserController = require('../controllers/UserController');
const { memoryUpload } = require("../helper/memoryUpload");
const { authenticateToken } = require("../middleware/authMiddleware");

router.post('/register',  UserController.register);
router.post('/login', UserController.login);

router.get('/', authenticateToken, UserController.index)
router.get('/:id/find',  UserController.find)
router.put('/:id/update', memoryUpload("users"), UserController.update)
router.delete('/:id/delete',  UserController.deleteU)

module.exports = router;