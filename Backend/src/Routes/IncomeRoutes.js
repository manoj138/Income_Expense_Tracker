const router = require('express').Router();

const IncomeController = require('../controllers/IncomeController');

router.get('/', IncomeController.index);

router.post('/store', IncomeController.store);
router.get('/:id/find', IncomeController.find);
router.put('/:id/update', IncomeController.update);
router.delete('/:id/delete', IncomeController.deleteI);

module.exports = router;