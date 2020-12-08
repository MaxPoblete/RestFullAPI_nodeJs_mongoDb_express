const express = require('express');
const router = express.Router();

//call controllers
const customersController = require('../controllers/customersController');
const productsController = require('../controllers/productsController');
const ordersController = require('../controllers/ordersController');

module.exports = function(){

    //----customers----
    router.post('/customers', customersController.add);
    router.get('/customers', customersController.list);
    router.get('/customers/:id',customersController.show);
    router.put('/customers/:id',customersController.update);
    router.delete('/customers/:id',customersController.delete);

    //----products---- 
    router.get('/products/search/:query',productsController.search);
    router.post('/products',productsController.add);
    router.get('/products',productsController.list);
    router.get('/products/:id',productsController.show);
    router.put('/products/:id',productsController.update);
    router.delete('/products/:id',productsController.delete);

    //-----Oreder-----
    router.post('/orders', ordersController.add);
    router.get('/orders',ordersController.list);
    router.get('/orders/customer/:id',ordersController.byCustomer);
    router.get('/orders/:id',ordersController.show);
    router.put('/orders/:id',ordersController.update);
    router.delete('/orders/:id',ordersController.delete);



    return router;

    //Oerder


};
