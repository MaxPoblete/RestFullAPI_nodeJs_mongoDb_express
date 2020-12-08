const Products = require('../models/Products');

//list all products
exports.list = async(req, res)=>{

    try{
        const  products = await Products.find({});
        res.json(products);
    }catch(error){
        console.log(error);
        res.status(400).json({message:'error en la peticion'});
    }
};

//call one products
exports.show = async(req, res)=>{

    try{
        const product = await Products.findById(req.params.id);
        if(!product){
            res.status(404).json({
                message:'el producto no existe..!'
            });
        }
        res.json(product);
    }catch(error){
        res.status(400).json({message:'error en la peticion..!'});
    }
};

//update for one pruduct 
exports.update = async(req, res)=>{

    try{

        const produc = await Products.findByIdAndUpdate(
            {_id: req.params.id},
            req.body,
            {new:true}
        );
        res.json({
            message:'producto actualizardo.!'
        });
    }catch(error){
        res.status().json({message:'error en l apeticion'});
    }
};

//add products
exports.add = async(req, res, next)=>{
    const product =  new Products(req.body);
    try{
        await product.save();
        res.json({message:'nuevo producto agregado'});
    }catch(error) {
        if(error.code === 11000) {
            res.status(400).json({
                message: `ya existe un producto con ese SKU: ${req.body.sku}`,
            });
        }else{
            res.status(400).json({
                message: 'error en la peticion'
            });
        }
    }
};

//delete products
exports.delete = async(req, res)=>{

    try{
        await Products.findByIdAndDelete({_id: req.params.id});
        res.json({message:'producto eliminado..!'});
    }catch(error){
        res.status(400).json({message:'error en la peticion..!'});
    }
};

exports.search = async(req, res)=>{
    try{
        const products = await Products.find({
            name: new RegExp(req.params.query, 'i'),
        });
        res.json(products);
    }catch(error){
        res.status(400).json({
            message:'error en la peticion..!'
        });
    }
};