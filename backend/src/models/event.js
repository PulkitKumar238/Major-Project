import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    eventType: {
      type: String,
      enum: ["conference", "workshop", "seminar", "symposium", "webinar", "other"],
      required: true,
    },
    academicCategory: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    submissionDeadline: {
      type: Date,
    },

    venueInstitution: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      default: "offline",
    },

    expectedAttendees: {
      type: Number,
      default: 0,
    },
    registrationFee: {
      type: String,
      default: "Free",
    },

    websiteURL: {
      type: String,
      trim: true,
    },
    registrationLink: {
      type: String,
      trim: true,
    },

    organizerName: {
      type: String,
      required: true,
      trim: true,
    },
    affiliation: {
      type: String,
      required: true,
      trim: true,
    },
    contactEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
