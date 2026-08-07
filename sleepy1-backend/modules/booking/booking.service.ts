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

    async getBookingById(id: string, userId: string) {
        const booking = await bookingModel.findOne({ _id: id, userId });
        if (!booking) {
            throw new Error("Booking not found");
        }
        return booking;
    }

    async getAvailabilityByDate(date: string) {
        const bookings = await bookingModel.find({ checkInDate: date });
        return bookings.map(b => b.checkInTime);
    }
}

export default new BookingService();
