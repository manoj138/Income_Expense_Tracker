const router = require('express').Router();

const ExpenseController = require("../controllers/ExpenseController");

router.get('/', ExpenseController.index)
router.post('/store', ExpenseController.store);
router.get('/:id/find', ExpenseController.find)
router.put('/:id/update', ExpenseController.update)
router.delete('/:id/delete', ExpenseController.deleteE);

module.exports = router;