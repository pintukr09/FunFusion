// controllers/sessionController.js
import { Session } from "../models/sessionModel.js";

export const pingSession = async (req, res) => {
  const userId = req.user.id;

  try {
    const session = await Session.findOne({ userId });

    if (session) {
      session.lastPing = Date.now();
      await session.save();
    } else {
      await Session.create({ userId });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Ping failed" });
  }
};
