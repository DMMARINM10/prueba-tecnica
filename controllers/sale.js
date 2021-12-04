const { response, request } = require('express');
const Purchase = require('../models/purchase');
const Sale = require('../models/sale');

const salePost = async (req, res) => {
    
    try {
        const {Quantity, idProduct, ProductName} = req.body;
        const productList = await Purchase.find({idProduct}).sort({Date: 1});
        let sumStock = 0;
        for (i in productList) {
           sumStock += productList[i].Stock;
        }
        if (sumStock < Quantity) {
            return res.status(400).json({
                 msg: 'This sale is not allowed, There are not enough units in stock'
            })           
        } else {
            let count = Quantity;
         
            for (i in productList) {
                if (productList[i].Stock >= count) {
                    const id = productList[i]._id;
                    const Stock = productList[i].Stock - count;
                    await Purchase.findByIdAndUpdate(id, {Stock});
    
                    const sale = new Sale ({Quantity, idProduct, ProductName});
    
                    await sale.save();
    
                    res.status(200).json({
                        sale
                    });
                } else {
                    const id = productList[i]._id;
                    count-= productList[i].Stock;
                    await Purchase.findByIdAndUpdate(id, {Stock: 0});
                    
                }
            }
        } } catch (err) {
            res.status(500).json({
                msg: 'Contact the administrator',
                err
            })
        }

}

module.exports = {
    salePost
}