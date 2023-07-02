const express = require('express');
const router = express.Router();
const { Streamers } = require('../models');

//endpoint to get submitted streamers list
router.get("/", async (req, res) => {
    const listOfStreamers = await Streamers.findAll();
    res.json(listOfStreamers);
})

//endpoint to get particular streamer info
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const streamer = await Streamers.findByPk(id);
    res.json(streamer);
})

//endpoint to submit a streamer
router.post("/", async (req, res) => {
    const streamer = req.body;
    await Streamers.create(streamer);
    res.json(streamer);
})

//endpoint to cast a vote
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const streamer = await Streamers.findByPk(id);
    const newVotes = req.body;
    await streamer.update(newVotes);
    res.json(streamer);
})


module.exports = router;