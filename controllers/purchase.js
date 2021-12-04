const { response, request } = require('express');
const Purchase = require('../models/purchase');

const purchasePost = async (req, res) => {
  
    const {Quantity, idProduct, ProductName} = req.body;
    const Stock = Quantity;
    const purchase = new Purchase({Quantity, idProduct, ProductName, Stock});
    const date = purchase.Date;

    const month = date.getMonth();
    const nextMonth = month+1;
    const year = date.getFullYear();
    const monthFilter = await Purchase.find({ "$expr": { "$eq": [{ "$month": "$Date" }, nextMonth] } , idProduct});  
    try {
        let sumStock = 0;
        for (let i in monthFilter) {
            if(monthFilter[i].Date.getFullYear() === year) sumStock += monthFilter[i].Stock;
        }
        if ((sumStock + Quantity) > 30) {
            return res.status(400).json({
                msg: 'This purchase is not allowed, it exceeds 30 units for the product in this month'
            })
        } else {
            //Guardar en DB
        await purchase.save();
    
        res.status(200).json({
            purchase
        });
        }
        
        
    } catch (err) {
        res.status(500).json({
            msg: 'Contact the administrator',
            err
        })
    }
    
}

module.exports = {
    purchasePost
}