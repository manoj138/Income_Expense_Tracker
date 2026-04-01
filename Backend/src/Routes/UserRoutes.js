const router = require("express").Router(); 

const UserController = require('../controllers/UserController');
const { authenticateToken } = require("../middleware/authMiddleware");

router.post('/register',  UserController.register);
router.post('/login', UserController.login);

router.get('/', authenticateToken, UserController.index)
router.get('/:id/find', authenticateToken, UserController.find)
router.put('/:id/update', authenticateToken, UserController.update)
router.delete('/:id/delete', authenticateToken, UserController.deleteU)

module.exports = router;
