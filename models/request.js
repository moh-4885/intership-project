const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const leavingRequstSchema = new Schema({
  absenceDate: String,
  startHour: String,
  endHour: String,
  motifabsense: String,
  type: String,
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    default: "inprograss",
  },
});
module.exports = mongoose.model("levingrequeste", leavingRequstSchema);
