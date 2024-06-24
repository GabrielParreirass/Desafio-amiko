import mongoose from "mongoose";
const ChamadaSchema = new mongoose.Schema({
    name: String,
    hospital: {
      name: String,
      roomNumber: Number,
    },
  });

export default ChamadaSchema;