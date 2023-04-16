const mongoose = require("mongoose");
const eventSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    game: String,
    total_player: Number,
    count: Number,
    hours:{type: Number,min: 0,max: 23},
    minutes:{type: Number,min: 0,max: 59},
    seconds:{type: Number,min: 0,max: 59},
    userID: String,
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  {
    versionKey:false,
    timestamps: true,
  }
);

const EventModel = mongoose.model("events", eventSchema);

module.exports = { EventModel };

// "title":"Crack Football",
//     "description":"There are 11 players",
//     "game":"Football",
//     "total_player":11,
//      "start_time": {
//         "hours": 22,
//         "minutes": 0,
//         "seconds": 0
//     }
