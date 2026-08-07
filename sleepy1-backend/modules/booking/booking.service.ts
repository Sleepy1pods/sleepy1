import bookingModel from "./booking.model.js";

class BookingService {
    async createBooking(data: any) {
        const booking = await bookingModel.create(data);
        return booking;
    }

    async getBookings(userId: string) {
        const bookings = await bookingModel.find({ userId }).sort({ createdAt: -1 });
        return bookings;
    }
}

export default new BookingService();
