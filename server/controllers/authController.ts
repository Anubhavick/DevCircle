import { Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import axios from "axios";
import userService from "../services/userService";
import type { StringValue } from "ms";

// GitHub OAuth callback handler
export const githubCallback = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: "Authorization code required" });
    }

    // Exchange code for access token
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Get user data from GitHub
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const githubUser = userResponse.data;

    // Check if user exists
    let user = await userService.getUserByGithubId(String(githubUser.id));

    if (!user) {
      // Create new user - you'll need to implement college verification
      // For now, using a placeholder college
      user = await userService.createUser({
        githubId: String(githubUser.id),
        username: githubUser.login,
        email: githubUser.email || `${githubUser.login}@github.user`,
        avatar: githubUser.avatar_url,
        college: process.env.COLLEGE_ID || "default_college",
        githubProfile: githubUser.html_url,
      });

      // Give initial karma points to new users
      await userService.updateHelpScore(user._id, 10);
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const signOptions: SignOptions = {
      expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as StringValue
    };

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      jwtSecret,
      signOptions
    );

    // Redirect to frontend with token
    const redirectUrl = `${process.env.CLIENT_URL}/auth/callback?token=${token}`;
    res.redirect(redirectUrl);
  } catch (error: any) {
    console.error("GitHub OAuth error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
};

// Login endpoint to initiate GitHub OAuth
export const githubLogin = (req: Request, res: Response) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user:email`;
  res.json({ url: githubAuthUrl });
};

// Verify JWT token
export const verifyToken = async (req: Request, res: Response) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ error: "Server configuration error" });
    }

    const decoded = jwt.verify(token, jwtSecret) as {
      id: string;
      email: string;
      username: string;
    };

    const user = await userService.getUserById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
