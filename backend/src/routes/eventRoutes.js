import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
  submitEvent,
  getUserEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from "../controllers/eventController.js";

const router = Router();

// All event routes require authentication
router.use(authenticate);

// Submit a new event
router.post("/submit", submitEvent);

// Get user's events with optional status filter
router.get("/my-events", getUserEvents);

// Get specific event by ID (only if user owns it)
router.get("/:eventId", getEventById);

// Update event (only if pending and user owns it)
router.put("/:eventId", updateEvent);

// Delete event (only if pending and user owns it)
router.delete("/:eventId", deleteEvent);

export default router;
