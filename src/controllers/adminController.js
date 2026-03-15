import User from "../models/userModel.js";
import Room from "../models/roomModel.js";
import Booking from "../models/bookingModel.js";
import Contact from "../models/contactModel.js";

export const getAdminStats = async (req, res) => {
  try {
    const now = new Date();

    // Total counts
    const totalRooms = await Room.countDocuments();
    const availableRooms = await Room.countDocuments({ availability: true });
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: "pending" });
    const confirmedBookings = await Booking.countDocuments({ status: "confirmed" });
    const cancelledBookings = await Booking.countDocuments({ status: "cancelled" });
    const totalUsers = await User.countDocuments();
    const unreadMessages = await Contact.countDocuments({ isRead: false });

    // Total revenue (confirmed bookings only)
    const revenueAgg = await Booking.aggregate([
      { $match: { status: "confirmed" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

    // Monthly revenue for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const monthlyRevenueAgg = await Booking.aggregate([
      {
        $match: {
          status: "confirmed",
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: { $sum: "$totalAmount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Build full 6-month array (fill missing months with 0)
    const monthlyRevenue = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const monthName = d.toLocaleString("en-US", { month: "short" });
      const found = monthlyRevenueAgg.find(
        (m) => m._id.year === year && m._id.month === month
      );
      monthlyRevenue.push({
        month: monthName,
        year,
        revenue: found ? found.revenue : 0,
        bookings: found ? found.count : 0,
      });
    }

    // Recent bookings (last 10)
    const recentBookings = await Booking.find()
      .populate({ path: "roomId", populate: { path: "category" } })
      .sort({ createdAt: -1 })
      .limit(10);

    // Recent contact messages (last 5)
    const recentMessages = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      data: {
        totalRooms,
        availableRooms,
        totalBookings,
        pendingBookings,
        confirmedBookings,
        cancelledBookings,
        totalRevenue,
        monthlyRevenue,
        totalUsers,
        unreadMessages,
        recentBookings,
        recentMessages,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch admin stats",
      error: error.message,
    });
  }
};

export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.UserId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    return res.status(200).json({
      success: true,
      message: `User ${user.isActive ? "activated" : "deactivated"} successfully`,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to toggle user status",
      error: error.message,
    });
  }
};

export const changeUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!role || !["User", "Admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be 'User' or 'Admin'",
      });
    }

    const user = await User.findById(req.params.UserId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.role = role;
    await user.save();

    return res.status(200).json({
      success: true,
      message: `User role updated to ${role} successfully`,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to change user role",
      error: error.message,
    });
  }
};
