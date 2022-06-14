const express = require('express');
const router = express.Router();
const Pet = require('../database/models/pet.model');

// @GET: to get all pets from database
router.get('/', async (req, res) => {
    try {
        const pets = await Pet.find();
        res.json(pets);
    } catch (err) {
        res.send('Error: ' + err);
    }
});

// @POST: to add pets from excel file to database
// to be changed
router.post('/', async (req, res) => {
    const pet = new Pet({
        name: req.body.name,
        type: req.body.type,
        breed: req.body.breed,
        age: req.body.age
    });

    try {
        const p = await pet.save();
        res.json({id: p._id});
    } catch (err) {
        res.send('Error: ' + err);
    }
});

// @GET: to get specific pet from the database
router.get('/:id', async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet)   return res.send(`No pet with id ${req.params.id} found`)
        res.json(pet);
    } catch(err) {
        res.send('Error: ' + err);
    }
});

// @PATCH: to update the details of a specific pet
router.patch('/:id', async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id).exec();
        if (!pet)   return res.status(400).send(`No pet with id ${req.params.id} found`);

        let query = {$set: {}};
        for (let key in req.body) {
            if (pet[key] && pet[key] != req.body[key]) {
                query.$set[key] = req.body[key];
            }
        }

        const updatedPet = await Pet.updateOne({_id: req.params.id}, query).exec();
        res.json(`Pet with id ${req.params.id} updated successfully.`)
    } catch(err) {
        res.send('Error: '+ err);
    }
});

// @DELETE: to delete a specific pet
router.delete('/:id', async (req, res) => {
    try {
        const pet = await Pet.findByIdAndDelete(req.params.id);
        if (!pet)   return res.send(`No pet with id ${req.params.id} found`);
        
        res.send(`Pet with id ${req.params.id} successfully deleted`);
    } catch(err) {
        res.send('Error: ' + err);
    }
});

module.exports = router;