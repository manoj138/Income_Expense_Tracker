const router = require('express').Router();

const ExpenseController = require("../controllers/ExpenseController");
const { memoryUpload } = require('../helper/memoryUpload');

router.get('/', ExpenseController.index)
router.post('/store', memoryUpload('expense'), ExpenseController.store);
router.get('/:id/find', ExpenseController.find)
router.put('/:id/update',  memoryUpload('expense'), ExpenseController.update)
router.delete('/:id/delete', ExpenseController.deleteE);

module.exports = router;