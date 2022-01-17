import mongoose from "mongoose";

const apiCountSchema = mongoose.Schema({
  count: { type: Number, default: 0 },
  webId: { type: String },
});

const ApiCount = mongoose.model("apiCount", apiCountSchema);

export default ApiCount;
