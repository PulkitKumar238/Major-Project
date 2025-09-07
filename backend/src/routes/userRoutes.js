import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
  getUserProfile,
  updateUserProfile,
  saveEvent,
  unsaveEvent,
  registerForEvent,
  unregisterFromEvent,
  getSavedEvents,
  getRegisteredEvents
} from "../controllers/userController.js";

const router = Router();

// All user routes require authentication
router.use(authenticate);

// Profile management
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);

// Event interaction
router.post("/events/:eventId/save", saveEvent);
router.delete("/events/:eventId/save", unsaveEvent);
router.post("/events/:eventId/register", registerForEvent);
router.delete("/events/:eventId/register", unregisterFromEvent);

// User's saved and registered events
router.get("/saved-events", getSavedEvents);
router.get("/registered-events", getRegisteredEvents);

export default router;
