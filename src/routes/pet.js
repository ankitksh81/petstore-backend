const express = require("express");
const router = express.Router();
const Pet = require("../database/models/pet.model");
const { parseData } = require("../utils/parse");
const fs = require("fs");
const upload = require("../middlewares/multer");

// @GET: to get all pets from database
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    if (!pets) return res.status(404).send({ message: `No pets found` });
    res.status(200).json({ pets });
  } catch (err) {
    res.status(502).send({ message: `Error retrieving pets, ${err}` });
  }
});

// @POST: to add pets from excel file to database
router.post("/", upload.single("pets"), async (req, res, next) => {
  if (!req.file) {
    const error = new Error(`Error uploading file`);
    error.httpStatusCode = 400;
    return next(error);
  }

  try {
    const data = await parseData(`uploads/${req.file.filename}`);
    await Pet.insertMany(data);
    res.status(200).json({ message: `Data inserted successfully` });
  } catch (err) {
    res.status(500).send({ message: `Could not post to database, ${err}` });
  } finally {
    // cleanup xlsx file uploads
    fs.unlinkSync(`uploads/${req.file.filename}`);
  }
});

// @GET: to get specific pet from the database
router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet)
      return res
        .status(404)
        .send({ message: `No pet with id ${req.params.id} found` });
    res.status(200).json({ pet });
  } catch (err) {
    res.status(500).send({ message: `Error retrieving pet, ${err}` });
  }
});

// @PATCH: to update the details of a specific pet
router.patch("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).exec();
    if (!pet)
      return res
        .status(400)
        .send({ message: `No pet with id ${req.params.id} found` });

    let query = { $set: {} };
    for (let key in req.body) {
      if (pet[key] && pet[key] != req.body[key]) {
        query.$set[key] = req.body[key];
      }
    }

    await Pet.updateOne({ _id: req.params.id }, query).exec();
    res
      .status(200)
      .json({ message: `Pet with id ${req.params.id} updated successfully.` });
  } catch (err) {
    res.status(500).send({ message: `Error updating pet, ${err}` });
  }
});

// @DELETE: to delete a specific pet
router.delete("/:id", async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet)
      return res
        .statusCode(404)
        .send({ message: `No pet with id ${req.params.id} found` });
    res
      .status(200)
      .send({ message: `Pet with id ${req.params.id} successfully deleted` });
  } catch (err) {
    res.status(500).send({ message: `Error deleting pet, ${err}` });
  }
});

module.exports = router;
