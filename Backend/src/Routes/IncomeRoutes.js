const router = require('express').Router();

const IncomeController = require('../controllers/IncomeController');
const { memoryUpload } = require('../helper/memoryUpload');

router.get('/', IncomeController.index);

router.post('/store', memoryUpload('incomes'), IncomeController.store);
router.get('/:id/find', IncomeController.find);
router.put('/:id/update', memoryUpload('incomes'), IncomeController.update);
router.delete('/:id/delete', IncomeController.deleteI);

module.exports = router;