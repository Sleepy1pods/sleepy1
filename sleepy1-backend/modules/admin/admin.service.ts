import authModel from "../auth/auth.model.js";
import bookingModel from "../booking/booking.model.js";

class AdminService {
  async getDashboardStats() {
    const totalBookings = await bookingModel.countDocuments();
    const totalUsers = await authModel.countDocuments({ role: { $ne: 'admin' } });
    const recentBookings = await bookingModel.find().sort({ createdAt: -1 }).limit(5);
    return { totalBookings, totalUsers, revenue: totalBookings * 150, recentBookings };
  }

  async getAllBookings() {
    return bookingModel.find().sort({ createdAt: -1 });
  }

  async getAllUsers() {
    return authModel.find({ role: { $ne: 'admin' } }).select("-password").sort({ createdAt: -1 });
  }

  async getLocations() {
    return [
      {
        id: 'loc-iiit-dharwad',
        slug: 'iiit-dharwad',
        name: 'IIIT Dharwad',
        city: 'Dharwad',
        terminal: 'Main Campus',
        heroImage: '/iiit_dharwad.png',
        podCount: 1,
        availablePods: 1,
        availability: 'Low',
        rating: '4.9 ⭐',
        status: 'Active'
      }
    ];
  }
}

export default new AdminService();
