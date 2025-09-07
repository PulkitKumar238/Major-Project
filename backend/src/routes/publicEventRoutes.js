import { Router } from "express";
import {
  getAllEvents,
  getEventByIdPublic,
  getEventsByType,
  getFeaturedEvents,
  getEventStats
} from "../controllers/publicEventController.js";

const router = Router();

// Public routes - no authentication required
router.get("/", getAllEvents);
router.get("/featured", getFeaturedEvents);
router.get("/stats", getEventStats);
router.get("/type/:eventType", getEventsByType);
router.get("/:eventId", getEventByIdPublic);

export default router;
