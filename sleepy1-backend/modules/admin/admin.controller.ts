import type { Request, Response } from "express";
import adminService from "./admin.service.js";

class AdminController {
  dashboard = async (_req: Request, res: Response) => {
    try {
      const data = await adminService.getDashboardStats();
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  bookings = async (_req: Request, res: Response) => {
    try {
      const data = await adminService.getAllBookings();
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  users = async (_req: Request, res: Response) => {
    try {
      const data = await adminService.getAllUsers();
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  locations = async (_req: Request, res: Response) => {
    try {
      const data = await adminService.getLocations();
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
}

export default new AdminController();
