const express = require("express");
const { EventModel } = require("../models/event.model");

const eventhomeRouter = express.Router();

eventhomeRouter.get("/", async (req, res) => {
  try {
    let data = await EventModel.find();
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

eventhomeRouter.get("/filter/:game", async (req, res) => {
  const game = req.params.game;
  try {
    let data = await EventModel.find({ game: game });
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

eventhomeRouter.get("/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    let data = await EventModel.find({ _id: ID });
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

// eventhomeRouter.patch("/addplayers/:id", async (req, res) => {
//   try {
//     const token = req.headers.authorization;
//     const id = req.params.id;
//     const decoded = jwt.verify(token, "masai");
//     const userId = decoded.userID;
//     //  console.log(id);
//     //  console.log(userId)
//     const event = await EventModel.findByIdAndUpdate(
//       { _id: id },
//       { $push: { players: userId } },
//       { new: true }
//     );
//     console.log(event);
//     return res.status(200).send("added the users");
//   } catch (error) {
//     return res.status(404).send({ message: `${error.message}` });
//   }
// });



module.exports = { eventhomeRouter };
