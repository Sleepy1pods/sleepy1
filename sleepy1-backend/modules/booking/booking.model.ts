import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    checkInDate: string;
    checkInTime: string;
    checkOutDate: string;
    checkOutTime: string;
    gender: string;
}

const bookingSchema = new Schema<IBooking>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        checkInDate: { type: String, required: true },
        checkInTime: { type: String, required: true },
        checkOutDate: { type: String, required: true },
        checkOutTime: { type: String, required: true },
        gender: { type: String, required: true },
    }, { timestamps: true }
);

export default mongoose.model<IBooking>("Booking", bookingSchema);
