import jwt from "jsonwebtoken";
import authModel from "./auth.model.js";

class AuthService {
  private generateToken(id: string) {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
      expiresIn: (process.env.JWT_EXPIRES_IN || "30d") as any,
    });
  }

  async register(data: any) {
    const existingUser = await authModel.findOne({
      email: data.email,
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = await authModel.create(data);
    const token = this.generateToken(user._id.toString());

    return { user, token };
  }

  async login(data: any) {
    const user = await authModel.findOne({
      email: data.email,
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await user.comparePassword(data.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = this.generateToken(user._id.toString());

    return { user, token };
  }
}

export default new AuthService();