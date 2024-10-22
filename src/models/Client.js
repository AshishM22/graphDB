import mongoose, { Schema } from "mongoose";

const ClientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

export const Client = new mongoose.model("Client", ClientSchema);
