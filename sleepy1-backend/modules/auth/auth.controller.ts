import type { Request, Response } from "express";
import authService from "./auth.service.js";
import bookingModel from "../booking/booking.model.js";

class AuthController {
  private sendTokenResponse(res: Response, statusCode: number, user: any, token: string) {
    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      httpOnly: true,
      sameSite: "none" as const,
      secure: true
    };

    // Strip password from output
    user.password = undefined;

    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      token,
      data: user,
    });
  }

  register = async (req: Request, res: Response) => {
    try {
      const { user, token } = await authService.register(req.body);
      this.sendTokenResponse(res, 201, user, token);
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const { user, token } = await authService.login(req.body);
      this.sendTokenResponse(res, 200, user, token);
    } catch (error: any) {
      res.status(401).json({ success: false, message: error.message });
    }
  }

  logout = async (req: Request, res: Response) => {
    res.cookie("token", "none", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
      sameSite: "none" as const,
      secure: true
    });

    res.status(200).json({
      success: true,
      message : "Logged out successfully",
      data: {},
    });
  }
  
  getMe = async (req: Request, res: Response) => {
    try {
      const bookings = await bookingModel.find({ userId: req.user._id }).sort({ createdAt: -1 });
      
      res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: {
          user: req.user,
          bookings: bookings
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new AuthController();