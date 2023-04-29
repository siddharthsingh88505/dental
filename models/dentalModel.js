import { Decimal128 } from "bson";
import mongoose from "mongoose";

const dentalSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    diagnostic: { type: String, required: true },
    doctor: { type: String, trim: true },
    contact: { type: Number, required: true },
    date: {type: String, required: true},
    time: {type: String, required: true }
})

const dentalModel = mongoose.model("appointmentrecord", dentalSchema);

export { dentalModel };
