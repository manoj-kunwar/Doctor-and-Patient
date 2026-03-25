import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

//  SEND MESSAGE
router.post("/send", async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message,
      userId,
      doctorId,
      senderType,
    } = req.body;

    const newMessage = new Message({
      name,
      email,
      subject,
      message,
      userId,
      doctorId,
      senderType,
    });

    await newMessage.save();

    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// GET ALL MESSAGES
router.get("/list", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, messages });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// GET USER MESSAGES
router.get("/user/:userId", async (req, res) => {
  try {
    const messages = await Message.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json({ success: true, messages });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

//  GET DOCTOR MESSAGES
router.get("/doctor/:doctorId", async (req, res) => {
  try {
    const messages = await Message.find({
      doctorId: req.params.doctorId,
    }).sort({ createdAt: -1 });

    res.json({ success: true, messages });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});
//  UPDATE MESSAGE
router.put("/update/:id", async (req, res) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, message: updatedMessage });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

//  DELETE MESSAGE
router.delete("/delete/:id", async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

export default router;