const {Router} = require('express');
const { check } = require('express-validator');

const { salePost } = require('../controllers/sale'); 


const { validation } = require('../middlewares/validation'); 

const router = Router();


router.post('/', [
   check('Quantity', 'Quantity is required').not().isEmpty(),
   check('Quantity', 'Quantity must be a positive number').isFloat({min: 0}),
   check('idProduct', 'idProduct is required').not().isEmpty(),
   check('ProductName', 'Product is required').not().isEmpty(),
   validation
], salePost);

module.exports = router;