const express = require("express");
const { EventModel } = require("../models/event.model");

const eventRouter = express.Router();
const jwt = require("jsonwebtoken");

// eventRouter.get("/",async(req,res)=>{
//     try{
//      let data=await EventModel.find()
//      res.send(data)
//     }
//     catch(err){
//         console.log(err)
//     }

// })

eventRouter.post("/post", async (req, res) => {
  const payload = req.body;
  try {
    const new_event = new EventModel(payload);
    await new_event.save();
    res.send("Created the event!!");
  } catch (err) {
    return res.status(404).send({ message: `${error.message}` });
  }
});

eventRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  const event = await EventModel.findOne({ _id: id });
  // console.log(event);
  const userID_in_event = event.userID;
  const userID_making_req = req.body.userID;

  try {
    if (userID_making_req !== userID_in_event) {
      res.send({ msg: "You are not authorized" });
    } else {
      await EventModel.findByIdAndDelete({ _id: id });
      res.send("Deleted the event");
    }
  } catch (err) {
    return res.status(404).send({ message: `${error.message}` });
  }
});

eventRouter.patch("/addplayers/:id", async (req, res) => {
  try {
    const { token } = req.body;
    const id = req.params.id;
    const decoded = jwt.verify(token, "masai");
    const userId = decoded.userID;
    console.log(id);
    console.log(userId);
    const event = await EventModel.findByIdAndUpdate(
      { _id: id },
      { $push: { players: userId } },
      { new: true }
    );

    console.log(event);
    return res.status(200).send("added the users");
  } catch (error) {
    return res.status(404).send({ message: `${error.message}` });
  }
});

eventRouter.get("/playerdel/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let data = await EventModel.findOne({ _id: id }).populate("players");
    res.send(data);
  } catch (err) {
    return res.status(404).send({ message: `${error.message}` });
  }
});

module.exports = { eventRouter };
