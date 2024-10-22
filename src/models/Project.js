import mongoose, { Schema } from "mongoose";
import { Client } from "./Client.js";

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["NOT STARTED", "IN PROGRESS", "COMPLETED"],
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: Client,
  },
});

export const Project = new mongoose.model("Project", ProjectSchema);
