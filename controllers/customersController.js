const Customers = require('../models/Customers');

//list customers
exports.list = async (req, res) =>{

    try{
        const customers = await Customers.find({});
        res.json(customers);
    }catch(error){
        console.log(error);
        res.send(error);
        next();
    }
};

//add customer
exports.add = async(req, res, next)=>{
    const customer = new Customers(req.body);

    try{
        await customer.save();
        res.json({message: 'nuevo cliente agregado!'});
    }catch(error){
        console.log(error);
        res.send(error);
        next();
    }
};

//show one customers for id 
exports.show = async(req, res)=>{

    try{
        const custoner = await Customers.findById(req.params.id);
        if(!custoner){
            res.status(404).json({
                message:'el cliente no existe'
            });
        }
        res.json(custoner);
    }catch(error){
        res.status(400).json({
            message:'error al procesar la peticion'
        });
    }
}

//update customer for id
exports.update = async(req, res) =>{

    try{
        const customer = await Customers.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new:true}
        );
        res.json({
            message: 'cliente actualizado correctamente'
        });
    }catch(error){
        res.status(400).json({
            message: 'error al procesar la peticion'
        });
    }
}
exports.delete = async(req, res)=>{

    try{
        await Customers.findOneAndDelete({_id: req.params.id});
        res.json({message:'el cliente ha sido eliminado..!'});
    }catch(error){
        res.status(400).json({message:'error al prescesar solicitud'});
    }
}


