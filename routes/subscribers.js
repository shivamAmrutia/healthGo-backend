const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');


//getting all
router.get('/',async(req,res) => {
    try{
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//getting one
router.get('/:id', getSubscriber ,(req,res) => {
    res.json(res.subscriber);
})

//creating one
router.post('/',async(req,res) => {
    const subscriber = new Subscriber({
        diseaseName: req.body.diseaseName,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        category: req.body.category,
        symptoms: req.body.symptoms,
        remedies: req.body.remedies,
    })

    try {
        const newSubscriber = await subscriber.save();    
        res.status(201).json(newSubscriber);
    } 
    catch (err) {
        res.status(400).json({message: err.message});
    }
})

//updating one
router.patch('/:id',getSubscriber,async(req,res) => {
    if(req.body.diseaseName != null){
        res.subscriber.diseaseName = req.body.diseaseName 
    }
    if(req.body.description != null){
        res.subscriber.description = req.body.description 
    }
    if(req.body.imageUrl != null){
        res.subscriber.imageUrl = req.body.imageUrl 
    }
    if(req.body.category != null){
        res.subscriber.category = req.body.category 
    }
    if(req.body.symptoms != null){
        res.subscriber.symptoms = req.body.symptoms 
    }
    if(req.body.remedies != null){
        res.subscriber.remedies = req.body.remedies
    }
    try{
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
})

//deleting one
router.delete('/:id',getSubscriber,async (req,res) => {
    try{
        await res.subscriber.deleteOne();
        res.json({message: 'Deleted'});
    }
    catch(err){
        res.status(500).json({message: err.message}); 
    }
})

async function getSubscriber(req,res,next){
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if(subscriber == null){
            return res.status(404).json({message: 'Cannot find subscriber'});
        }
    } 
    catch (err) {
        return res.status(500).json({message: err.message});
    }

    res.subscriber = subscriber;
    next();
}

module.exports =router;