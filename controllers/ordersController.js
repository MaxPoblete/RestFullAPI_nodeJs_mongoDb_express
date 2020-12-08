const { model } = require('../models/Orders');
const Orders = require('../models/Orders');

exports.add = async(req, res)=>{

    try{
        const order = new Orders(req.body);
        await order.save();
        res.json(order);
    }catch(error){
        res.status(400).json({message:'error en la peticion'});
    }
};

exports.list = async(req, res)=>{

    try{
        const orders = await Orders.find({})
        .populate('customer')
        .populate({
         path: 'products.product',
         model: 'Products'
        });
        res.json(orders);
    }catch(error){
        res.status(400).json({message:'error en la peticion..!'});
    }
};

//show order
exports.show = async(req, res, next)=>{

    try{
        const order = await Orders.findById(req.params.id)
        .populate('customer')
        .populate({
         path: 'products.product',
         model: 'Products'
        });
        if(!order){
            res.status(404).json({message:'orden no existe..!'});
            next();
        }
        res.json(order);

    }catch(error){
        res.status(400).json({
            message:'error en la peticion..!'
        });
    }
};

exports.update = async(req, res) =>{
    try{
        const order = await Orders.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            {new: true }
        )
        .populate('customer')
        .populate({
            path: 'products.product',
            model: 'Products'
        });

        res.json(order);
    }catch(error){
        res.status(400).json({message: 'error al procesar la peticion'});
    }
};

exports.delete = async(req, res)=>{

    try{
        await Orders.findOneAndDelete({_id: req.params.id});
        res.json({message:'la orden a sido eliminada'});
    }catch(error){
        res.status(400).json({
            message:'error en la peticion'
        });
    }
}

exports.byCustomer = async(req, res)=>{
    try{
        const orders = await Orders.find({customer: req.params.id})
        .populate('customer')
        .populate({
            path: 'products.product',
            model: 'Products'
        });
        res.json(orders);
    }catch(error){
        res.status(400).json({
            message:'error en la peticion'
        });
    }
};
